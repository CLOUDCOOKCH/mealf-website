'use strict';
(()=>{
 const input=document.getElementById('wiki-search');
 const reading=document.getElementById('wiki-reading');
 const panel=document.getElementById('wiki-search-results');
 const results=document.getElementById('wiki-result-list');
 const status=document.getElementById('wiki-search-status');
 const nav=document.querySelector('.wiki-navigation');
 const mobile=matchMedia('(max-width:760px)');
 const adjustNav=()=>{nav.open=!mobile.matches};adjustNav();mobile.addEventListener('change',adjustNav);
 let indexPromise;
 const loadIndex=()=>indexPromise??=(fetch(new URL('search-index.json',document.currentScript?.src||location.href)).then(r=>{if(!r.ok)throw Error('Search unavailable');return r.json()}).catch(e=>{indexPromise=null;throw e}));
 let revision=0;
 const normal=s=>s.toLocaleLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'');
 const plain=(tag,text)=>{const e=document.createElement(tag);e.textContent=text;return e};
 const snippet=(s,terms)=>{
  const text=s.trim().replace(/\s+/g,' ');const at=Math.max(0,normal(text).indexOf(terms[0]));
  const start=Math.max(0,at-60);return (start?'…':'')+text.slice(start,start+220)+(text.length>start+220?'…':'');
 };
 async function search(){
  const current=++revision;const q=input.value.trim();
  const url=new URL(location.href);if(q)url.searchParams.set('q',q);else url.searchParams.delete('q');history.replaceState(null,'',url);
  panel.hidden=!q;reading.hidden=!!q;document.body.toggleAttribute('data-searching',!!q);
  if(!q){results.replaceChildren();status.textContent='';return;}
  results.replaceChildren();status.textContent='Searching the guides…';
  try{
   const index=await loadIndex();if(current!==revision)return;
   const terms=normal(q).split(/\s+/).filter(Boolean);
   const ranked=index.map(page=>{
    const title=normal(page.title);const all=normal(page.title+' '+page.sections.map(s=>s.heading+' '+s.text).join(' '));
    if(!terms.every(t=>all.includes(t)))return null;
    const sections=page.sections.map(s=>({...s,score:terms.reduce((score,t)=>score+(normal(s.heading).includes(t)?15:0)+(normal(s.text).includes(t)?2:0),0)})).sort((a,b)=>b.score-a.score);
    return {page,section:sections[0],score:terms.reduce((sum,t)=>sum+(title.includes(t)?30:0),0)+(sections[0]?.score||0)};
   }).filter(Boolean).sort((a,b)=>b.score-a.score);
   status.textContent=ranked.length?`${ranked.length} ${ranked.length===1?'guide':'guides'} found for “${q}”.`:`No guides found for “${q}”. Try “setup”, “Cloudflare”, “Gemini”, or “backup”.`;
   for(const {page,section} of ranked){
    const item=document.createElement('article');item.className='wiki-result';
    item.append(plain('small',page.group+(section?.anchor?' · '+section.heading:'')));
    const h=plain('h2','');const a=plain('a',page.title);a.href=page.url+(section?.anchor?'#'+section.anchor:'');h.append(a);item.append(h,plain('p',snippet(section?.text||page.description,terms)));results.append(item);
   }
  }catch{if(current===revision)status.textContent='Search could not load. Check your connection and try again, or browse the guides in the topic menu.';}
 }
 let timer;input.addEventListener('input',()=>{clearTimeout(timer);timer=setTimeout(search,120)});
 document.getElementById('wiki-search-clear').addEventListener('click',()=>{input.value='';search();input.focus()});
 document.addEventListener('keydown',e=>{if(e.key==='/'&&!e.ctrlKey&&!e.metaKey&&!e.altKey&&!/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)&&!document.activeElement.isContentEditable){e.preventDefault();input.focus()}if(e.key==='Escape'&&document.activeElement===input){input.value='';search();input.blur()}});
 input.addEventListener('focus',()=>{loadIndex().catch(()=>{})},{once:true});
 const initial=new URL(location.href).searchParams.get('q');if(initial){input.value=initial;search()}
 const copyStatus=document.getElementById('wiki-copy-status');
 const timers=new WeakMap();
 document.querySelectorAll('.wiki-copy').forEach(button=>button.addEventListener('click',async()=>{
  const code=button.closest('.wiki-code').querySelector('code');const label=button.querySelector('span');clearTimeout(timers.get(button));
  try{await navigator.clipboard.writeText(code.textContent);label.textContent='Copied';copyStatus.textContent='Code copied.'}
  catch{const selection=getSelection();const range=document.createRange();range.selectNodeContents(code);selection.removeAllRanges();selection.addRange(range);label.textContent='Selected';copyStatus.textContent='Code selected. Use your browser’s Copy command.'}
  timers.set(button,setTimeout(()=>label.textContent='Copy',2200));
 }));
 if('IntersectionObserver' in window){
  const links=[...document.querySelectorAll('.wiki-toc a[href^="#"]')];
  const observer=new IntersectionObserver(entries=>{
   const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top);
   if(visible[0]){for(const a of links)a.removeAttribute('aria-current');links.find(a=>a.hash==='#'+visible[0].target.id)?.setAttribute('aria-current','location')}
  },{rootMargin:'-5% 0px -65% 0px'});
  document.querySelectorAll('.wiki-prose h2,.wiki-prose h3').forEach(h=>observer.observe(h));
 }
})();
