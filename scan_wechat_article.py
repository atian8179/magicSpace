import asyncio, os, io, json, math, httpx, base64
from PIL import Image, ImageDraw
from weixin_articles_mcp.fetcher import fetch_html
from weixin_articles_mcp.parser import parse_article
from weixin_articles_mcp.media import filter_image_urls
from weixin_articles_mcp.markdown import html_to_markdown

URL = "https://mp.weixin.qq.com/s/nFSSzluc57xPv50Zbh4owg"

async def main():
    html = await fetch_html(URL)
    article = parse_article(html)
    urls = filter_image_urls(article.image_urls, 64)
    os.makedirs("public", exist_ok=True)
    with open("public/article.md", "w", encoding="utf-8") as f:
        f.write(
            f"# {article.title}\n\nAccount: {article.account}\nPublished: {article.publish_time}\nImages: {len(urls)}\n\n"
            + html_to_markdown(article.body_html)
        )

    client = httpx.Client(
        follow_redirects=True,
        timeout=30,
        headers={
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120 Safari/537.36",
            "Referer": "https://mp.weixin.qq.com/",
        },
    )
    imgs = []
    meta = []
    for i, u in enumerate(urls, 1):
        r = client.get(u)
        im = Image.open(io.BytesIO(r.content)).convert("RGB")
        original = im.size
        im.thumbnail((360, 480))
        imgs.append((i, im.copy()))
        meta.append({"i": i, "url": u, "status": r.status_code, "original_size": list(original)})

    with open("public/meta.json", "w", encoding="utf-8") as f:
        json.dump(
            {
                "title": article.title,
                "account": article.account,
                "publish_time": article.publish_time,
                "count": len(imgs),
                "images": meta,
            },
            f,
            ensure_ascii=False,
            indent=2,
        )

    cols, rows, cellw, cellh = 4, 4, 400, 540
    batches = math.ceil(len(imgs) / 16)
    for b in range(batches):
        subset = imgs[b * 16 : (b + 1) * 16]
        sheet = Image.new("RGB", (cols * cellw, rows * cellh), "#ECECEC")
        draw = ImageDraw.Draw(sheet)
        for k, (idx, im) in enumerate(subset):
            x, y = (k % cols) * cellw, (k // cols) * cellh
            px = x + (cellw - im.width) // 2
            py = y + 42 + (cellh - 42 - im.height) // 2
            sheet.paste(im, (px, py))
            draw.rectangle([x + 8, y + 8, x + 64, y + 38], fill="white")
            draw.text((x + 18, y + 14), str(idx), fill="black")
        path = f"public/contact-{b+1}.jpg"
        sheet.save(path, quality=84, optimize=True)
        with open(path, "rb") as rf, open(f"public/contact-{b+1}.txt", "w", encoding="utf-8") as tf:
            tf.write("data:image/jpeg;base64," + base64.b64encode(rf.read()).decode("ascii"))

    print(json.dumps({"title": article.title, "account": article.account, "count": len(imgs), "batches": batches}, ensure_ascii=False))

asyncio.run(main())
