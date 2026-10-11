import http from 'node:http';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

let status = {ok:false,stage:'starting',article:'personal-miniapp-checklist-20261011'};
const json = (res,code,data) => { res.writeHead(code,{'content-type':'application/json; charset=utf-8'});res.end(JSON.stringify(data));};
const sleep = ms=>new Promise(r=>setTimeout(r,ms));
async function wxJson(url,opts={}) {
 const response=await fetch(url,opts);
 const body=await response.text();
 try { return JSON.parse(body); } catch { throw new Error('WeChat returned HTTP '+response.status+' non-JSON: '+body.slice(0,140)); }
}
async function token() {
 const u=new URL('https://api.weixin.qq.com/cgi-bin/token');
 u.searchParams.set('grant_type','client_credential');
 u.searchParams.set('appid',process.env.APPID||'');
 u.searchParams.set('secret',process.env.APPSECRET||'');
 const j=await wxJson(u);
 if(!j.access_token)throw Error('TOKEN_ERROR '+JSON.stringify(j));
 return j.access_token;
}
async function uploadBody(t,img,i) {
 const form=new FormData();
 form.append('media',new Blob([img],{type:'image/png'}),'review-'+i+'.png');
 const j=await wxJson('https://api.weixin.qq.com/cgi-bin/media/uploadimg?access_token='+encodeURIComponent(t),{method:'POST',body:form});
 if(!j.url)throw Error('IMAGE_UPLOAD_'+i+': '+JSON.stringify(j));
 return j.url;
}
async function cover(t,img) {
 const form=new FormData();
 form.append('media',new Blob([img],{type:'image/png'}),'cover.png');
 const j=await wxJson('https://api.weixin.qq.com/cgi-bin/material/add_material?access_token='+encodeURIComponent(t)+'&type=image',{method:'POST',body:form});
 if(!j.media_id)throw Error('COVER_ERROR '+JSON.stringify(j));
 return j.media_id;
}
async function run() {
 const archiveUrl=process.env.ARTICLE_ARCHIVE_URL;
 if(!archiveUrl||!archiveUrl.startsWith('https://'))throw Error('ARTICLE_ARCHIVE_URL missing');
 status.stage='download';
 const r=await fetch(archiveUrl);
 if(!r.ok)throw Error('ARCHIVE_DOWNLOAD_HTTP_'+r.status);
 const b=Buffer.from(await r.arrayBuffer());
 if(b.length<100000)throw Error('ARCHIVE_TOO_SMALL '+b.length);
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'wx-article-'));
 const archive=path.join(dir,'assets.tar.gz');
 fs.writeFileSync(archive,b);
 execFileSync('tar',['-xzf',archive,'-C',dir],{timeout:30000});
 const article=path.join(dir,'assets','article.html');
 let content=fs.readFileSync(article,'utf8');
 const title='被微信拒审 3 次，我总结了个人小程序快速过审的 10 条高频 Checklist，直接拿去用！';
 if(!content.includes('第一轮')||!content.includes('3.0.1')||!content.includes('Checklist'))throw Error('WRONG_ARTICLE');
 for(let i=1;i<=4;i++)if(!content.includes('__WECHAT_UPLOAD_IMAGE_'+i+'__'))throw Error('MISSING_IMAGE_'+i);
 status.stage='wechat_token';
 const t=await token();
 const imgs=Array.from({length:4},(_,i)=>fs.readFileSync(path.join(dir,'assets',String(i+1)+'.png')));
 status.stage='upload_images';
 const urls=[];
 for(let i=0;i<4;i++) {
   urls.push(await uploadBody(t,imgs[i],i+1));
   console.log('IMAGE_UPLOADED '+(i+1)+'/4');
 }
 status.stage='upload_cover';
 const thumb=await cover(t,imgs[0]);
 urls.forEach((url,i)=>{content=content.replaceAll('__WECHAT_UPLOAD_IMAGE_'+(i+1)+'__',url)});
 if(content.includes('__WECHAT_UPLOAD_IMAGE_')||(content.match(/<img\\b/g)||[]).length!==4) throw Error('CONTENT_ASSET_VALIDATION_FAILED');
 status.stage='create_draft';
 const payload={articles:[{title,author:'阿天',digest:'国庆连遭三次拒审，个人主体类目、模拟抽烟、名称简介，10 条真实踩坑总结。',content,content_source_url:'',thumb_media_id:thumb,need_open_comment:0,only_fans_can_comment:0}]};
 const draft=await wxJson('https://api.weixin.qq.com/cgi-bin/draft/add?access_token='+encodeURIComponent(t),{method:'POST',headers:{'content-type':'application/json; charset=utf-8'},body:JSON.stringify(payload)});
 if(!draft.media_id)throw Error('DRAFT_ERROR '+JSON.stringify(draft));
 status={ok:true,stage:'created',media_id:draft.media_id,images:4,title,account:'阿天AI编程',cover:'temporary-review-screenshot'};
 console.log('DRAFT_CREATED '+JSON.stringify(status));
}
http.createServer((req,res)=>{
 const u=new URL(req.url,'http://localhost');
 if(u.pathname==='/health'||u.pathname==='/status')return json(res,200,status);
 return json(res,404,{error:'not_found'});
}).listen(process.env.PORT||10000,'0.0.0.0',()=>{
 console.log('article 20261011 bridge ready');
 run().catch(e=>{ status={ok:false,stage:'failed',error:String(e?.message||e)};console.error('DRAFT_FAILED '+status.error); });
});