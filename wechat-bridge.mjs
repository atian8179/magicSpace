import http from 'node:http';

const imageUrls = [
  process.env.IMG1,
  process.env.IMG2,
  process.env.IMG3,
  process.env.IMG4
];

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

async function submitDraft() {
  const token = await getToken();
  const images = [];
  for (const u of imageUrls) images.push(await fetchImage(u));

  const wxUrls = [];
  for (let i = 0; i < images.length; i++) {
    wxUrls.push(await uploadBodyImage(token, images[i], i + 1));
  }

  const thumbMediaId = await uploadCover(token, images[0]);

  let content = Buffer.from(process.env.ARTICLE_B64, 'base64').toString('utf8');
  wxUrls.forEach((u, i) => {
    content = content.replaceAll('{{IMG' + (i + 1) + '}}', u);
  });

  const payload = {
    articles: [{
      title: process.env.TITLE,
      author: process.env.AUTHOR || '',
      digest: process.env.DIGEST || '',
      content,
      content_source_url: '',
      thumb_media_id: thumbMediaId,
      need_open_comment: 0,
      only_fans_can_comment: 0
    }]
  };

  const draft = await wxJson('https://api.weixin.qq.com/cgi-bin/draft/add?access_token=' + encodeURIComponent(token), {
    method:'POST',
    headers:{'content-type':'application/json; charset=utf-8'},
    body:JSON.stringify(payload)
  });

  if (!draft.media_id) throw new Error('DRAFT_ERROR ' + JSON.stringify(draft));
  return {ok:true, media_id:draft.media_id, uploaded_images:wxUrls.length};
}

const server = http.createServer(async (req, res) => {
  const u = new URL(req.url, 'http://localhost');
  if (u.pathname === '/health') return json(res, 200, {ok:true});
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
