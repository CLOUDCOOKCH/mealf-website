import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import MarkdownIt from 'markdown-it';

const root=path.resolve(import.meta.dirname,'..');
const source=path.join(root,'content/wiki');
const out=path.join(root,'dist/wiki');
const manifest=JSON.parse(fs.readFileSync(path.join(source,'sources.json'),'utf8'));
const compose=fs.readFileSync(path.join(root,'content/compose.yml'),'utf8');
fs.writeFileSync(path.join(root,'dist/downloads/compose.yml'),compose);
const landingPath=path.join(root,'dist/index.html');
const landing=fs.readFileSync(landingPath,'utf8').replace(/(<code id="hosting-compose">)[\s\S]*?(<\/code>)/,(_match,open,close)=>open+compose.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('\"','&quot;')+close);
fs.writeFileSync(landingPath,landing);
const groups=[
 {title:'Start here',pages:['Home','Installation','First-Run-Setup','Cloudflare-Tunnel','HTTPS-and-Reverse-Proxy']},
 {title:'Use & configure',pages:['Configuration','PWA-and-Offline-Use','AI-Recipe-Import','Bring-Integration','Meal-Reminders']},
 {title:'Maintain',pages:['Backup-and-Recovery','Upgrades-and-Maintenance','Troubleshooting']}
];
const labels={'Home':'Overview','Installation':'Installation','First-Run-Setup':'First-run setup','Cloudflare-Tunnel':'Cloudflare Tunnel','HTTPS-and-Reverse-Proxy':'HTTPS & reverse proxy','Configuration':'Configuration','PWA-and-Offline-Use':'PWA & offline use','AI-Recipe-Import':'AI recipe import','Bring-Integration':'Bring! integration','Meal-Reminders':'Meal reminders','Backup-and-Recovery':'Backup & recovery','Upgrades-and-Maintenance':'Upgrades & maintenance','Troubleshooting':'Troubleshooting'};
const order=groups.flatMap(g=>g.pages);
const route=name=>name==='Home'?'./':name.toLowerCase()+'.html';
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const brand=s=>s.replaceAll('MealF','Mealf');
const slug=s=>s.toLowerCase().replace(/[^\p{L}\p{N}\s_-]/gu,'').trim().replace(/\s/g,'-');
const svg=(name)=>`<svg class="icon" aria-hidden="true"><use href="#${name}"/></svg>`;
const icons=`<svg class="icon-definitions" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs><symbol id="arrow" viewBox="0 0 24 24"><path d="M5 12h14m-6-6 6 6-6 6"/></symbol><symbol id="copy" viewBox="0 0 24 24"><rect x="8" y="8" width="12" height="13" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/></symbol><symbol id="search" viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></symbol><symbol id="chevron" viewBox="0 0 24 24"><path d="m9 5 7 7-7 7"/></symbol><symbol id="external" viewBox="0 0 24 24"><path d="M6 18 18 6M6 6h12v12"/></symbol></defs></svg>`;
const md=new MarkdownIt({html:false,linkify:false,typographer:false});
const defaultLink=md.renderer.rules.link_open??((tokens,idx,options,env,self)=>self.renderToken(tokens,idx,options));
md.renderer.rules.link_open=(tokens,idx,options,env,self)=>{
 const token=tokens[idx]; const href=token.attrGet('href');
 if(href==='../downloads/compose.yml')token.attrSet('download','compose.yml');
 if(href&&!/^(?:https?:|mailto:|#|\.\.\/downloads\/)/.test(href)){
  const [target,hash]=href.split('#');
  const key=target.replace(/\.md$/,'');
  if(order.includes(key))token.attrSet('href',route(key)+(hash?'#'+hash:''));
  else token.attrSet('href','https://github.com/CLOUDCOOKCH/aircooker-server/blob/main/'+path.posix.normalize('docs/wiki/'+target)+(hash?'#'+hash:''));
 }
 if(/^https?:/.test(token.attrGet('href')||''))token.attrSet('rel','noopener noreferrer');
 return defaultLink(tokens,idx,options,env,self);
};
const originalText=md.renderer.rules.text;
md.renderer.rules.text=(tokens,idx,options,env,self)=>{const t=tokens[idx];const content=t.content;t.content=brand(content);const rendered=originalText(tokens,idx,options,env,self);t.content=content;return rendered;};
md.renderer.rules.table_open=()=>'<div class="wiki-table" role="region" aria-label="Reference table" tabindex="0"><table>\n';
md.renderer.rules.table_close=()=>'</table></div>\n';
md.renderer.rules.fence=(tokens,idx)=>{
 const t=tokens[idx];const lang=t.info.trim().split(/\s/)[0]||'code';
 const code=`<div class="wiki-code"><div class="wiki-code-bar"><span>${esc(lang==='sh'?'Terminal':lang)}</span><button type="button" class="wiki-copy" aria-label="Copy ${esc(lang)} code">${svg('copy')}<span>Copy</span></button></div><pre tabindex="0"><code${lang?' class="language-'+esc(lang)+'"':''}>${esc(t.content)}</code></pre></div>`;
 if(lang==='mermaid')return `<figure class="wiki-diagram"><div tabindex="0" role="region" aria-label="Recipe import workflow diagram"><img src="recipe-import-flow.svg" width="960" height="520" alt="Sources enter the private import queue. Complete website metadata goes straight to an editable draft. Media and incomplete metadata use AI with consent, followed by schema validation. User confirmation saves the recipe." /></div><figcaption>Recipe import: source, extraction, review, then save. Scroll horizontally if needed.</figcaption></figure><details class="wiki-diagram-source"><summary>View diagram source</summary>${code}</details>`;
 return code;
};
function tocMarkup(headings){return `<ul>${headings.filter(h=>h.level<=3).map(h=>`<li class="toc-level-${h.level}"><a href="#${h.id}">${esc(h.text)}</a></li>`).join('')}</ul>`;}
fs.mkdirSync(out,{recursive:true});
const search=[];
for(const name of order){
 const file=name+'.md'; const original=fs.readFileSync(path.join(source,file),'utf8');
 const info=manifest.files.find(f=>f.file===file);
 const sha=crypto.createHash('sha1').update(`blob ${Buffer.byteLength(original)}\0`).update(original).digest('hex');
 if((info.localBlobSha||info.blobSha)!==sha)throw Error('Source integrity mismatch: '+file);
 const markdown=original.replace('{{MEALF_COMPOSE}}',()=> '```yaml\n'+compose+'```');
 const tokens=md.parse(markdown,{});const headings=[];const used=new Map();let sections=[];let section={heading:labels[name],anchor:'',text:''};
 for(let i=0;i<tokens.length;i++){
  const t=tokens[i];
  if(t.type==='heading_open'){
   const level=Number(t.tag.slice(1));const title=brand(tokens[i+1].content);
   if(level===1){tokens[i+1].content=brand(tokens[i+1].content);continue;}
   const base=slug(title);const n=used.get(base)||0;used.set(base,n+1);const id=base+(n?'-'+n:'');
   t.attrSet('id',id);headings.push({id,text:title,level});
   if(section.text)sections.push(section);section={heading:title,anchor:id,text:''};
  }
  if(t.type==='inline'||t.type==='fence')section.text+=' '+brand(t.content).replace(/\[([^\]]+)\]\([^)]+\)/g,'$1').replace(/[`*#]/g,'').replace(/\s+/g,' ');
 }
 if(section.text)sections.push(section);
 const group=groups.find(g=>g.pages.includes(name));
 const title=name==='Home'?'Mealf wiki':brand(tokens.find(t=>t.type==='inline').content);
 const description=brand(tokens.find((t,i)=>t.type==='inline'&&tokens[i-1]?.type==='paragraph_open')?.content||title).replace(/\[([^\]]+)\]\([^)]+\)/g,'$1').replace(/[`*_]/g,'').replace(/\s+/g,' ').slice(0,180);
 const content=md.renderer.render(tokens,md.options,{});
 search.push({title:labels[name],url:route(name),group:group.title,description,sections});
 const nav=groups.map(g=>`<div class="wiki-nav-group"><h2>${esc(g.title)}</h2><ul>${g.pages.map(p=>`<li><a href="${route(p)}"${p===name?' aria-current="page"':''}>${esc(labels[p])}</a></li>`).join('')}</ul></div>`).join('');
 const position=order.indexOf(name); const prev=order[position-1];const next=order[position+1];
 const toc=tocMarkup(headings);
 const page=`<!doctype html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#f8f7f1"><meta name="description" content="${esc(description)}"><title>${esc(title)} — Mealf</title><link rel="canonical" href="https://mealf-kitchen.cloudcook.chatgpt.site/wiki/${name==='Home'?'':route(name)}"><link rel="icon" href="../assets/favicon.png"><link rel="preload" href="../assets/manrope.woff2" as="font" type="font/woff2" crossorigin><link rel="stylesheet" href="../styles.css"><link rel="stylesheet" href="wiki.css"><script src="wiki.js" defer></script></head>
<body class="wiki-page">${icons}<a class="skip-link" href="#wiki-main">Skip to content</a>
<header class="wiki-header"><div class="wiki-brand"><a class="brand" href="../" aria-label="Mealf home"><img src="../assets/mealf-wordmark.png" alt="mealf" width="115" height="58"></a><a class="wiki-brand-label" href="./" aria-label="Wiki home">Wiki</a></div><nav aria-label="Main navigation"><a href="../#kitchen">The app</a><a href="../#self-host">Self-hosting</a><a href="./" aria-current="page">Wiki</a><a class="wiki-github" href="https://github.com/CLOUDCOOKCH/aircooker-server">GitHub ${svg('external')}</a></nav></header>
<div class="wiki-layout"><aside class="wiki-sidebar" aria-label="Wiki navigation"><div class="wiki-search"><label for="wiki-search">Search the wiki</label><div class="wiki-search-field">${svg('search')}<input id="wiki-search" type="search" placeholder="Search guides…" autocomplete="off" spellcheck="false" aria-controls="wiki-search-results"><kbd aria-hidden="true">/</kbd></div></div><details class="wiki-navigation" open><summary>Browse wiki ${svg('chevron')}</summary><nav aria-label="Wiki topics">${nav}</nav></details><p class="wiki-preview">Development preview.<br><a href="https://github.com/CLOUDCOOKCH/aircooker-server/blob/main/docs/IMPLEMENTATION.md">Check your version’s status ${svg('external')}</a></p></aside>
<main id="wiki-main" class="wiki-main"><section id="wiki-search-results" class="wiki-search-results" aria-labelledby="search-heading" hidden><h1 id="search-heading">Search the wiki</h1><p id="wiki-search-status" role="status" aria-live="polite"></p><div id="wiki-result-list"></div><button type="button" id="wiki-search-clear" class="wiki-clear">Clear search &amp; return to this guide ${svg('arrow')}</button></section><div id="wiki-reading"><nav class="wiki-breadcrumb" aria-label="Breadcrumb"><a href="./">Wiki</a>${svg('chevron')}<span>${esc(group.title)}</span></nav>${headings.length?`<details class="wiki-mobile-toc"><summary>On this page ${svg('chevron')}</summary><nav aria-label="On this page">${toc}</nav></details>`:''}<article class="wiki-prose">${content.replace(/<h1>/,'<h1 id="page-title">').replace(name==='Home'?'<h1 id="page-title">Mealf Wiki</h1>':'__no_match__','<h1 id="page-title">Mealf wiki</h1>')}</article><div class="wiki-source"><p>${info.localBlobSha?'Adapted to this site’s installation · Updated 22 October 2026':'From the project wiki · Snapshot 22 October 2026'}</p><a href="${info.source}">${info.localBlobSha?'Repository reference':'View source on GitHub'} ${svg('external')}</a></div><nav class="wiki-pagination" aria-label="Adjacent guides">${prev?`<a href="${route(prev)}"><span>Previous guide</span><strong>${esc(labels[prev])}</strong></a>`:'<span></span>'}${next?`<a href="${route(next)}"><span>Next guide</span><strong>${esc(labels[next])} ${svg('arrow')}</strong></a>`:'<span></span>'}</nav></div></main>
${headings.length?`<aside class="wiki-toc" aria-label="On this page"><h2>On this page</h2><nav>${toc}</nav><a class="wiki-top" href="#page-title">Back to top ${svg('arrow')}</a></aside>`:'<aside></aside>'}</div><footer class="wiki-footer"><p>Mealf. A little more together.</p><a href="../">Back to the kitchen ${svg('arrow')}</a></footer><span class="visually-hidden" id="wiki-copy-status" role="status" aria-live="polite"></span></body></html>`;
 fs.writeFileSync(path.join(out,name==='Home'?'index.html':route(name)),page);
}
fs.writeFileSync(path.join(out,'search-index.json'),JSON.stringify(search));
console.log(`Built ${order.length} wiki pages from verified source files.`);
