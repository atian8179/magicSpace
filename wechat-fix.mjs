import http from 'node:http';

async function j(url, options={}) {
  const r = await fetch(url, options);
  const t = await r.text();
  let d;
  try { d = JSON.parse(t); } catch { throw new Error('non_json'); }
  return d;
}

async function run() {
  const u = new URL('https://api.weixin.qq.com/cgi-bin/token');
  u.searchParams.set('grant_type','client_credential');
  u.searchParams.set('appid',process.env.APPID);
  u.searchParams.set('secret',process.env.APPSECRET);
  const a = await j(u);
  if (!a.access_token) throw new Error('token '+JSON.stringify(a));
  const t = a.access_token;

  const old = await j('https://api.weixin.qq.com/cgi-bin/draft/get?access_token='+encodeURIComponent(t),{
    method:'POST',
    headers:{'content-type':'application/json'},
    body:JSON.stringify({media_id:process.env.DRAFT_MEDIA_ID})
  });
  const item = (old.news_item || [])[0];
  if (!item) throw new Error('draft_get '+JSON.stringify(old));

  const urls = [];
  const seen = new Set();
  const re = /<img\b[^>]*(?:src|data-src)=["']([^"']+)["'][^>]*>/gi;
  let m;
  while ((m = re.exec(item.content)) && urls.length < 4) {
    if (!seen.has(m[1])) { seen.add(m[1]); urls.push(m[1]); }
  }
  if (urls.length < 4) throw new Error('images '+urls.length);

  let content = Buffer.from(process.env.ARTICLE_B64,'base64').toString('utf8');
  urls.forEach((x,i)=>{ content = content.replaceAll('{{IMG'+(i+1)+'}}',x); });

  const out = await j('https://api.weixin.qq.com/cgi-bin/draft/update?access_token='+encodeURIComponent(t),{
    method:'POST',
    headers:{'content-type':'application/json; charset=utf-8'},
    body:JSON.stringify({
      media_id:process.env.DRAFT_MEDIA_ID,
      index:0,
      articles:{
        title:item.title,
        author:item.author||'',
        digest:item.digest||'',
        content,
        content_source_url:item.content_source_url||'',
        thumb_media_id:item.thumb_media_id,
        need_open_comment:item.need_open_comment||0,
        only_fans_can_comment:item.only_fans_can_comment||0
      }
    })
  });
  if (out.errcode && out.errcode !== 0) throw new Error('update '+JSON.stringify(out));
  console.log('FIX_SUCCESS '+JSON.stringify(out));
}

http.createServer((req,res)=>{
  res.writeHead(200,{'content-type':'text/plain'});
  res.end('ok');
}).listen(process.env.PORT||10000,'0.0.0.0',()=>{
  console.log('fixer ready');
  run().catch(e=>console.error('FIX_FAILED '+e.message));
});
