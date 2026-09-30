import base64, copy, json, os, re, time, httpx
from bs4 import BeautifulSoup
from PIL import Image, ImageDraw, ImageFilter
from io import BytesIO

ARTICLE_B64_PATH = "miniapp_article_v4.b64"
OUT = "public"
os.makedirs(OUT, exist_ok=True)

client = httpx.Client(
    follow_redirects=True,
    timeout=httpx.Timeout(70.0, connect=30.0),
    headers={"User-Agent":"Mozilla/5.0","Referer":"https://mp.weixin.qq.com/"}
)

def get_with_retry(url, headers=None, tries=4):
    last = None
    for attempt in range(tries):
        try:
            r = client.get(url, headers=headers)
            r.raise_for_status()
            return r
        except Exception as e:
            last = e
            if attempt < tries - 1:
                time.sleep(1.5 * (attempt + 1))
    raise last

with open(ARTICLE_B64_PATH, "r", encoding="utf-8") as f:
    html = base64.b64decode(f.read()).decode("utf-8")

soup = BeautifulSoup(html, "html.parser")

# --- v1.1 editorial color language ---
PRIMARY = "#07C160"
BODY = "#171717"
MUTED = "#6F746F"
HIGHLIGHT = "#F2D56B"
QUOTE_BG = "#EAF8F0"
QUOTE_TEXT = "#111111"
CAPSULE_BG = "#EAF8F0"
CAPSULE_BORDER = "#BFECCF"

# Body text normalization.
for p in soup.find_all("p"):
    st = p.get("style", "")
    if "font-size:17px" in st:
        st = re.sub(r"color:#222", f"color:{BODY}", st)
        p["style"] = st

# Section titles: one stable brand color, normal bold.
for h2 in soup.find_all("h2"):
    h2["style"] = (
        f"font-size:22px;line-height:1.55;font-weight:700;color:{PRIMARY};"
        "margin:40px 0 18px 0;padding:0;"
    )

# Section numbers follow H2 color but remain lightweight.
for p in soup.find_all("p"):
    txt = p.get_text(" ", strip=True)
    if re.fullmatch(r"0[1-5]\s*/\s*05", txt):
        p["style"] = (
            f"font-size:12px;line-height:1.5;color:{PRIMARY};letter-spacing:1px;"
            "margin:38px 0 4px 0;padding:0;font-weight:700;"
        )

# Gold quote cards: pure sage card, centered, no line/border, narrower than body.
quote_texts = (
    "一个解决“卖”，一个解决“赏”",
    "AI 负责降低“做出来”的门槛",
)
for sec in soup.find_all("section"):
    # Only nested standalone quote sections can become gold-quote cards.
    # Never style the root article container.
    if sec.find_parent("section") is None:
        continue
    if sec.find(["h1","h2","img","table","section"]):
        continue
    ps = sec.find_all("p", recursive=False)
    if len(ps) != 1:
        continue
    txt = ps[0].get_text(" ", strip=True)
    if any(txt.startswith(key) for key in quote_texts):
        sec["style"] = (
            f"width:88%;box-sizing:border-box;margin:34px auto;padding:24px 22px;"
            f"background-color:{QUOTE_BG};border:0;border-radius:12px;"
        )
        p = ps[0]
        fs = "17px" if len(txt) > 42 else "18px"
        lh = "1.82" if len(txt) > 42 else "1.78"
        p["style"] = (
            f"margin:0;padding:0;text-align:center;font-size:{fs};"
            f"line-height:{lh};font-weight:700;color:{QUOTE_TEXT};"
        )

# Highlighter treatment.
highlight_spans = []
for span in soup.find_all("span"):
    st = span.get("style", "")
    if "text-decoration-line:underline" in st or "text-decoration-color:#FFE477" in st:
        highlight_spans.append(span)

for span in highlight_spans:
    txt = span.get_text(" ", strip=True)
    if txt.startswith("到了 9 月 24 日"):
        # Same idea is immediately elevated into a quote card; don't double-emphasize.
        span["style"] = f"font-weight:700;color:{BODY};"
    else:
        span["style"] = (
            f"font-weight:700;color:{BODY};"
            f"text-decoration-line:underline;text-decoration-color:{HIGHLIGHT};"
            "text-decoration-thickness:8px;text-underline-offset:-4px;"
            "text-decoration-skip-ink:none;"
        )

# English product/model capsule: align it to the account color language.
for span in soup.find_all("span"):
    txt = span.get_text(" ", strip=True)
    if txt == "AI Coding":
        span["style"] = (
            "display:inline-block;padding:1px 7px;margin:0 2px;"
            f"background-color:{CAPSULE_BG};color:{PRIMARY};"
            f"border:1px solid {CAPSULE_BORDER};border-radius:999px;"
            "font-size:14px;line-height:1.6;vertical-align:1px;"
        )

# Table structural color.
for td in soup.find_all("td"):
    txt = td.get_text(" ", strip=True)
    if txt in ("公众号", "小程序"):
        st = td.get("style", "")
        st = re.sub(r"color:#159570", f"color:{PRIMARY}", st)
        td["style"] = st

def rounded_mask(size, radius):
    m = Image.new("L", size, 0)
    d = ImageDraw.Draw(m)
    d.rounded_rectangle((0, 0, size[0]-1, size[1]-1), radius=radius, fill=255)
    return m

def bake_soft_shadow(source):
    im = source.convert("RGB")
    max_w = 1340
    if im.width > max_w:
        nh = round(im.height * max_w / im.width)
        im = im.resize((max_w, nh), Image.Resampling.LANCZOS)

    # Enough white breathing room for a natural device/card-style shadow.
    left = right = 34
    top = 24
    bottom = 54
    radius = 12
    cw = im.width + left + right
    ch = im.height + top + bottom

    base = Image.new("RGBA", (cw, ch), (255,255,255,255))

    # Large ambient shadow.
    ambient = Image.new("RGBA", (cw, ch), (0,0,0,0))
    ad = ImageDraw.Draw(ambient)
    box1 = (left + 4, top + 10, left + im.width - 4, top + im.height + 14)
    ad.rounded_rectangle(box1, radius=radius+4, fill=(18, 31, 26, 34))
    ambient = ambient.filter(ImageFilter.GaussianBlur(22))
    base = Image.alpha_composite(base, ambient)

    # Smaller contact shadow for depth without a hard edge.
    contact = Image.new("RGBA", (cw, ch), (0,0,0,0))
    cd = ImageDraw.Draw(contact)
    box2 = (left + 10, top + 8, left + im.width - 10, top + im.height + 10)
    cd.rounded_rectangle(box2, radius=radius, fill=(18, 31, 26, 24))
    contact = contact.filter(ImageFilter.GaussianBlur(10))
    base = Image.alpha_composite(base, contact)

    mask = rounded_mask(im.size, radius)
    base.paste(im.convert("RGBA"), (left, top), mask)
    return base.convert("RGB")

# Preserve a publish copy with the exact same layout/styles; only image URLs differ.
publish_soup = copy.deepcopy(soup)
publish_imgs = publish_soup.find_all("img")
for i, tag in enumerate(publish_imgs, 1):
    tag["src"] = "{{IMG" + str(i) + "}}"
    tag["style"] = (
        "display:block;width:100%;height:auto;margin:26px 0 8px 0;"
        "padding:0;border:0;border-radius:0;"
    )
    for a in ["data-src","data-original","referrerpolicy","crossorigin"]:
        tag.attrs.pop(a, None)

# Localize every body image and bake the exact shadow asset used for preview/publish.
imgs = soup.find_all("img")
assets = []
for i, tag in enumerate(imgs, 1):
    src = tag.get("src", "")
    if not src:
        continue
    if src.startswith("data:image/"):
        raw = base64.b64decode(src.split(",",1)[1])
        im = Image.open(BytesIO(raw))
    else:
        headers = {"User-Agent":"Mozilla/5.0","Referer":"https://www.woshipm.com/"}
        r = get_with_retry(src, headers=headers)
        raw = r.content
        im = Image.open(BytesIO(raw))

    rendered = bake_soft_shadow(im)
    buf = BytesIO()
    rendered.save(buf, format="JPEG", quality=86, optimize=True)
    raw = buf.getvalue()
    mime = "image/jpeg"
    with open(os.path.join(OUT, f"publish-img-{i}.jpg"), "wb") as pf:
        pf.write(raw)

    tag["src"] = "data:image/jpeg;base64," + base64.b64encode(raw).decode("ascii")
    tag["style"] = (
        "display:block;width:100%;height:auto;margin:26px 0 8px 0;"
        "padding:0;border:0;border-radius:0;"
    )
    for a in ["data-src","data-original","referrerpolicy","crossorigin"]:
        tag.attrs.pop(a, None)

    assets.append({
        "index":i,
        "source":src,
        "bytes":len(raw),
        "mime":mime,
        "shadow":"baked-dual-gaussian"
    })

# QA: quote/highlighter block rhythm.
blocks = [x for x in soup.find_all(["p","section","h2","table","img"], recursive=True)
          if x.parent and x.parent.name == "section"]
# Fallback to top-level children of article section for rhythm analysis.
root = soup.find("section")
top_blocks = [x for x in root.find_all(recursive=False) if getattr(x, "name", None)] if root else []

quote_indices = []
highlight_indices = []
for idx, node in enumerate(top_blocks):
    if node.name == "section":
        ps = node.find_all("p", recursive=False)
        if len(ps) == 1:
            txt = ps[0].get_text(" ", strip=True)
            if any(txt.startswith(key) for key in quote_texts):
                quote_indices.append(idx)
    if node.find("span", style=re.compile("text-decoration-line:underline")):
        highlight_indices.append(idx)

conflicts = []
for qi in quote_indices:
    for hi in highlight_indices:
        if abs(qi-hi) <= 1:
            conflicts.append({"quote_block":qi,"highlight_block":hi})

body_html = str(soup)
preview = f"""<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>个人小程序能赞赏了｜v1.1 视觉语言预览</title>
<style>
*{{box-sizing:border-box}}
html,body{{margin:0;background:#F2F4F3}}
body{{font-family:-apple-system,BlinkMacSystemFont,"PingFang SC","Microsoft YaHei",Arial,sans-serif}}
.preview-bar{{max-width:760px;margin:20px auto 10px;padding:0 22px;color:#7D848C;font-size:12px;line-height:1.6}}
.preview-card{{max-width:760px;margin:0 auto 48px;background:#fff;padding:40px 28px 64px;border:1px solid #ECEFF1}}
@media(max-width:640px){{
  .preview-bar{{padding:0 16px}}
  .preview-card{{padding:28px 18px 48px;border-left:0;border-right:0}}
}}
</style>
</head>
<body>
<div class="preview-bar">公众号 v1.1 视觉语言验收稿｜金句卡/荧光笔已错开｜正文图片已全部内嵌</div>
<main class="preview-card">{body_html}</main>
</body>
</html>"""

check_soup = BeautifulSoup(preview, "html.parser")
preview_imgs = check_soup.find_all("img")
remote = [x.get("src","") for x in preview_imgs if not x.get("src","").startswith("data:image/")]
placeholders = re.findall(r'\{\{IMG\d+\}\}', preview)

check = {
    "article":"个人小程序能赞赏了！以后做小程序，可能真和写公众号一样",
    "visual_language":"wechat-green-v1.1",
    "image_count":len(preview_imgs),
    "embedded_image_count":sum(1 for x in preview_imgs if x.get("src","").startswith("data:image/")),
    "remote_image_count":len(remote),
    "placeholder_count":len(placeholders),
    "zero_broken_image_gate":len(preview_imgs)>0 and len(remote)==0 and len(placeholders)==0,
    "quote_cards":len(quote_indices),
    "highlighter_blocks":len(highlight_indices),
    "adjacent_quote_highlighter_conflicts":conflicts,
    "emphasis_rhythm_gate":len(conflicts)==0,
    "palette":{
        "primary":PRIMARY,
        "highlight":HIGHLIGHT,
        "quote_bg":QUOTE_BG,
        "quote_text":QUOTE_TEXT
    },
    "assets":assets
}

with open(os.path.join(OUT,"index.html"),"w",encoding="utf-8") as f:
    f.write(preview)
with open(os.path.join(OUT,"publish.html"),"w",encoding="utf-8") as f:
    f.write(str(publish_soup))
with open(os.path.join(OUT,"check.json"),"w",encoding="utf-8") as f:
    json.dump(check,f,ensure_ascii=False,indent=2)

print(json.dumps(check,ensure_ascii=False))
