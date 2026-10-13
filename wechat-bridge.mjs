import http from 'node:http';
import fs from 'node:fs';

const finalDir = new URL('./wechat-final-20261011/', import.meta.url);
const imagesBase64 = [1,2,3,4,5].map(i => fs.readFileSync(new URL(String(i).padStart(2,'0') + '.b64', finalDir), 'utf8').trim());
if (imagesBase64.length !== 5 || imagesBase64.some(s => s.length < 1000)) throw new Error('FINAL_IMAGE_SOURCE_INCOMPLETE');

let cachedResult = null;
let running = null;

function json(res, status, body) {
  res.writeHead(status, {'content-type':'application/json; charset=utf-8'});
  res.end(JSON.stringify(body));
}

async function wxJson(url, options = {}) {
  const r = await fetch(url, options);
  const t = await r.text();
  let data;
  try { data = JSON.parse(t); } catch { throw new Error('Non-JSON response: ' + t.slice(0, 300)); }
  return data;
}

async function getToken() {
  const u = new URL('https://api.weixin.qq.com/cgi-bin/token');
  u.searchParams.set('grant_type', 'client_credential');
  u.searchParams.set('appid', process.env.APPID);
  u.searchParams.set('secret', process.env.APPSECRET);
  const data = await wxJson(u);
  if (!data.access_token) throw new Error('TOKEN_ERROR ' + JSON.stringify(data));
  return data.access_token;
}

async function fetchImage(url) {
  const r = await fetch(url, {
    headers: {
      'user-agent': 'Mozilla/5.0',
      'referer': 'https://www.woshipm.com/'
    },
    redirect: 'follow'
  });
  if (!r.ok) throw new Error('IMAGE_FETCH_ERROR ' + r.status + ' ' + url);
  const type = (r.headers.get('content-type') || 'image/jpeg').split(';')[0];
  const buf = Buffer.from(await r.arrayBuffer());
  if (!buf.length) throw new Error('IMAGE_EMPTY ' + url);
  return {buf, type};
}

async function uploadBodyImage(token, image, index) {
  const form = new FormData();
  const ext = image.type.includes('png') ? 'png' : 'jpg';
  form.append('media', new Blob([image.buf], {type:image.type}), 'article-' + index + '.' + ext);
  const data = await wxJson('https://api.weixin.qq.com/cgi-bin/media/uploadimg?access_token=' + encodeURIComponent(token), {
    method:'POST',
    body:form
  });
  if (!data.url) throw new Error('UPLOADIMG_ERROR ' + JSON.stringify(data));
  return data.url;
}

async function uploadCover(token, image) {
  const form = new FormData();
  const ext = image.type.includes('png') ? 'png' : 'jpg';
  form.append('media', new Blob([image.buf], {type:image.type}), 'cover.' + ext);
  const data = await wxJson('https://api.weixin.qq.com/cgi-bin/material/add_material?access_token=' + encodeURIComponent(token) + '&type=image', {
    method:'POST',
    body:form
  });
  if (!data.media_id) throw new Error('COVER_ERROR ' + JSON.stringify(data));
  return data.media_id;
}

async function getCoverImage(fallbackImage) {
  // WeChat requires a cover: first original screenshot as temporary cover.
  return fallbackImage;
}

async function submitDraft() {
  const token = await getToken();
  const images = imagesBase64.map((b64, index) => {
    const buf = Buffer.from(b64, 'base64');
    if (buf.length < 2000 || buf[0] !== 0xff || buf[1] !== 0xd8) throw new Error('INVALID_JPEG_' + (index+1));
    return {buf, type:'image/jpeg'};
  });

  const wxUrls = [];
  for (let i = 0; i < images.length; i++) {
    wxUrls.push(await uploadBodyImage(token, images[i], i + 1));
  }

  const thumbMediaId = await uploadCover(token, await getCoverImage(images[0]));

  let content = fs.readFileSync(new URL('article.html', finalDir), 'utf8');
  if (content.includes('偏偏这个时候') || !content.includes('公众号让一个人做媒体')) throw new Error('WRONG_ARTICLE_REVISION');
  if ((content.match(/\{\{IMG[1-5]\}\}/g)||[]).length !== 5) throw new Error('IMAGE_PLACEHOLDER_COUNT_MISMATCH');
  wxUrls.forEach((u, i) => {
    content = content.replaceAll('{{IMG' + (i + 1) + '}}', u);
  });

  if (content.includes('{{IMG') || (content.match(/<img\b/g)||[]).length !== 5) throw new Error('BODY_IMAGE_REPLACEMENT_FAILED');
  const payload = {
    articles: [{
      title: '微信又放大招！个人小程序能打赏了，一人公司机会来了',
      author: process.env.AUTHOR || '阿天AI编程',
      digest: process.env.DIGEST || '',
      content,
      content_source_url: '',
      thumb_media_id: thumbMediaId,
      need_open_comment: 1, // 默认允许所有用户留言，自动精选仍需公众号后台确认
      only_fans_can_comment: 0
    }]
  };

  const draft = await wxJson('https://api.weixin.qq.com/cgi-bin/draft/add?access_token=' + encodeURIComponent(token), {
    method:'POST',
    headers:{'content-type':'application/json; charset=utf-8'},
    body:JSON.stringify(payload)
  });

  if (!draft.media_id) throw new Error('DRAFT_ERROR ' + JSON.stringify(draft));
  return {ok:true, media_id:draft.media_id, uploaded_images:wxUrls.length, custom_cover:false, temporary_cover:'first-body-image', source:'approved-final-three-sections-five-screenshots', title:payload.articles[0].title};
}


async function inspectArticle() {
 const u='https://mp.weixin.qq.com/s/ici1jKI0EiU02-6TMVAEyw';
 const r=await fetch(u,{headers:{'user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36','accept-language':'zh-CN,zh;q=0.9','accept':'text/html,application/xhtml+xml'}});
 const html=await r.text();
 const mainPos=html.indexOf('id="js_content"');
 const root=mainPos>=0 ? html.slice(mainPos,mainPos+700000) : html;
 const styleMap={};
 const tags={};
 const samples={p:[],section:[],span:[],strong:[],h1:[],h2:[],h3:[],img:[],blockquote:[],div:[]};
 for (const m of root.matchAll(/<(p|section|span|strong|h1|h2|h3|img|blockquote|div)\b([^>]{0,2500})>/gi)) {
  const tag=m[1].toLowerCase(), attrs=m[2]||'';
  tags[tag]=(tags[tag]||0)+1;
  const sm=attrs.match(/\bstyle\s*=\s*["']([^"']{0,2000})["']/i);
  if(!sm)continue;
  const style=sm[1].replace(/&quot;/g,'"').replace(/&amp;/g,'&');
  for(const part of style.split(';')) {
   const i=part.indexOf(':');if(i<1)continue;
   const prop=part.slice(0,i).trim().toLowerCase(), val=part.slice(i+1).trim().toLowerCase();
   if(!['font-size','line-height','letter-spacing','margin','margin-top','margin-bottom','margin-left','margin-right','padding','padding-top','padding-bottom','padding-left','padding-right','color','background-color','text-align','font-weight','border-radius','width','max-width'].includes(prop))continue;
   const key=tag+' / '+prop+' = '+val;
   styleMap[key]=(styleMap[key]||0)+1;
  }
  if(samples[tag]?.length<12) {
   const text=root.slice(m.index+m[0].length,m.index+m[0].length+350).replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').slice(0,100);
   samples[tag].push({style,text});
  }
 }
 const entries=Object.entries(styleMap).sort((a,b)=>b[1]-a[1]).slice(0,190);
 return {http:r.status,bytes:html.length,bodyFound:mainPos>=0,title:(html.match(/<title[^>]*>([^<]*)/)||[])[1]||'',challenge:html.includes('环境异常')||html.includes('访问过于频繁'),tags,styles:entries,samples};
}

const server = http.createServer(async (req, res) => {
  const u = new URL(req.url, 'http://localhost');
  if (u.pathname === '/health') return json(res, 200, {ok:true});
  if (u.pathname === '/inspect-article') { try { return json(res,200,await inspectArticle()); }catch(e){ return json(res,500,{error:String(e?.message||e)}); } }
  if (u.pathname !== '/run') return json(res, 404, {ok:false, error:'not_found'});
  if (u.searchParams.get('key') !== process.env.RUN_KEY) return json(res, 403, {ok:false, error:'forbidden'});

  if (cachedResult) return json(res, 200, cachedResult);
  if (!running) {
    running = submitDraft()
      .then(r => (cachedResult = r))
      .finally(() => { running = null; });
  }

  try {
    const result = await running;
    return json(res, 200, result);
  } catch (e) {
    console.error(String(e && e.message ? e.message : e));
    return json(res, 500, {ok:false, error:String(e && e.message ? e.message : e)});
  }
});

server.listen(process.env.PORT || 10000, '0.0.0.0', () => {
  console.log('wechat draft bridge ready');
});