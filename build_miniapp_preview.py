import base64, json, os, re, httpx
from bs4 import BeautifulSoup
from PIL import Image
from io import BytesIO

ARTICLE_URL = "https://auric-device-m9zdn4s.shipstatic.com/article.html"
OUT = "public"
os.makedirs(OUT, exist_ok=True)

client = httpx.Client(
    follow_redirects=True,
    timeout=30,
    headers={"User-Agent":"Mozilla/5.0","Referer":"https://mp.weixin.qq.com/"}
)

html = client.get(ARTICLE_URL).text

# v1.0 typography: section titles use normal bold rather than ExtraBold.
html = re.sub(r'(<h2\b[^>]*?)font-weight:800', r'\1font-weight:700', html)

soup = BeautifulSoup(html, "html.parser")
imgs = soup.find_all("img")
assets = []

for i, tag in enumerate(imgs, 1):
    src = tag.get("src", "")
    if not src:
        continue
    if src.startswith("data:image/"):
        assets.append({"index":i,"source":"already-inline"})
        continue

    headers = {"User-Agent":"Mozilla/5.0","Referer":"https://www.woshipm.com/"}
    r = client.get(src, headers=headers)
    r.raise_for_status()

    raw = r.content
    ctype = (r.headers.get("content-type") or "").split(";")[0].lower()
    # Re-encode to JPEG to keep the single-file preview compact and portable.
    try:
        im = Image.open(BytesIO(raw)).convert("RGB")
        max_w = 1400
        if im.width > max_w:
            h = round(im.height * max_w / im.width)
            im = im.resize((max_w, h))
        buf = BytesIO()
        im.save(buf, format="JPEG", quality=82, optimize=True)
        raw = buf.getvalue()
        mime = "image/jpeg"
    except Exception:
        mime = ctype if ctype.startswith("image/") else "image/jpeg"

    data = "data:" + mime + ";base64," + base64.b64encode(raw).decode("ascii")
    tag["src"] = data
    for a in ["data-src","data-original","referrerpolicy","crossorigin"]:
        if a in tag.attrs:
            del tag.attrs[a]
    assets.append({"index":i,"source":src,"bytes":len(raw),"mime":mime})

# Add a minimal preview shell without changing WeChat body styling.
body_html = str(soup)
preview = f"""<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>个人小程序能赞赏了｜发布前验收预览</title>
<style>
*{{box-sizing:border-box}}
html,body{{margin:0;background:#F2F4F5}}
body{{font-family:-apple-system,BlinkMacSystemFont,"PingFang SC","Microsoft YaHei",Arial,sans-serif}}
.preview-bar{{max-width:760px;margin:20px auto 10px;padding:0 22px;color:#7D848C;font-size:12px;line-height:1.6}}
.preview-card{{max-width:760px;margin:0 auto 48px;background:#fff;padding:40px 28px 64px;border:1px solid #ECEFF1}}
@media(max-width:640px){{.preview-bar{{padding:0 16px}}.preview-card{{padding:28px 18px 48px;border-left:0;border-right:0}}}}
</style>
</head>
<body>
<div class="preview-bar">公众号 1.0 发布前验收稿｜正文图片已全部内嵌｜确认无误后才投递草稿箱</div>
<main class="preview-card">{body_html}</main>
</body>
</html>"""

check_soup = BeautifulSoup(preview, "html.parser")
preview_imgs = check_soup.find_all("img")
remote = [x.get("src","") for x in preview_imgs if not x.get("src","").startswith("data:image/")]
placeholders = re.findall(r'\{\{IMG\d+\}\}', preview)

check = {
    "article":"个人小程序能赞赏了！以后做小程序，可能真和写公众号一样",
    "image_count":len(preview_imgs),
    "embedded_image_count":sum(1 for x in preview_imgs if x.get("src","").startswith("data:image/")),
    "remote_image_count":len(remote),
    "placeholder_count":len(placeholders),
    "zero_broken_image_gate": len(preview_imgs)>0 and len(remote)==0 and len(placeholders)==0,
    "assets":assets,
}

with open(os.path.join(OUT,"index.html"),"w",encoding="utf-8") as f:
    f.write(preview)
with open(os.path.join(OUT,"check.json"),"w",encoding="utf-8") as f:
    json.dump(check,f,ensure_ascii=False,indent=2)

print(json.dumps(check,ensure_ascii=False))
