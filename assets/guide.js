'use strict';
// Shared step navigation for all ml4sx guides: stepper, pager, keys, footer, fine print.
const $=id=>document.getElementById(id);
const pad=n=>String(n).padStart(2,'0');
const GUIDES=[['Inside-the-next-word.html','Next word'],['Inside-the-emerging-image.html','Emerging image'],['Inside-the-refusal.html','Refusal'],['Inside-the-map.html','Map']];
const Guide={
 step:0,fineOpen:false,
 init(cfg){
  this.cfg=cfg;this.lessons=cfg.lessons;this.N=cfg.lessons.length;
  this.buildStepper();this.buildFooter();
  $('prev').onclick=()=>this.go(this.step-1);
  $('next').onclick=()=>this.go((this.step+1)%this.N);
  const about=$('about');
  document.querySelectorAll('[data-about]').forEach(b=>b.onclick=()=>{cfg.leave?.();about.showModal();});
  $('closeAbout').onclick=()=>about.close();
  about.onclick=e=>{if(e.target!==about)return;const r=about.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)about.close();};
  document.querySelector('h1 a')?.addEventListener('click',e=>{e.preventDefault();this.go(0);});
  document.addEventListener('keydown',e=>{if(about.open||['SELECT','INPUT','TEXTAREA'].includes(document.activeElement?.tagName)||e.altKey||e.ctrlKey||e.metaKey)return;if(e.key==='ArrowRight'){e.preventDefault();this.go(this.step+1);}if(e.key==='ArrowLeft'){e.preventDefault();this.go(this.step-1);}});
  window.addEventListener('hashchange',()=>{const n=this.hashStep();if(n!==null&&n!==this.step)this.go(n);});
  // --k = how much a 640×400 diagram is shrunk on screen; guide CSS uses it to keep diagram text readable.
  const stage=$('stage'),full=matchMedia('(min-width:1000px) and (min-height:600px)');
  new ResizeObserver(()=>{const w=stage.clientWidth-36,h=stage.clientHeight-8,shown=full.matches?Math.min(w,h*1.6):w;stage.style.setProperty('--k',Math.max(1,640/Math.max(1,shown)).toFixed(3));}).observe(stage);
  this.go(this.hashStep()??0,false);
 },
 hashStep(){const n=Number(location.hash.replace('#step-',''))-1;return Number.isInteger(n)&&n>=0&&n<this.N?n:null;},
 buildStepper(){
  const nav=$('stepper'),L=this.lessons;nav.style.setProperty('--count',this.N);let html='';
  this.cfg.chapters.forEach((c,ci)=>{const first=L.findIndex(l=>l.ch===ci),n=L.filter(l=>l.ch===ci).length;html+=`<div class="chapter-label${ci?' chapter-start':''}" data-ch="${ci}" style="grid-column:${first+1} / span ${n}">Chapter ${ci+1} · ${c}</div>`;});
  L.forEach((l,i)=>{html+=`<button class="step${i&&l.ch!==L[i-1].ch?' chapter-start':''}" data-step="${i}" style="grid-column:${i+1}" title="${i+1}. ${l.title.replace(/<br>/g,' ')}"><span class="num">${pad(i+1)}</span><span class="name">${l.short}</span></button>`;});
  nav.innerHTML=html;nav.querySelectorAll('.step').forEach(b=>b.onclick=()=>this.go(+b.dataset.step));
 },
 buildFooter(){
  const here=decodeURIComponent(location.pathname.split('/').pop());
  $('guides').innerHTML='<span class="label" style="display:inline">Guides</span>'+GUIDES.map(([f,t])=>f===here?`<b aria-current="page">${t}</b>`:`<a href="${f}">${t}</a>`).join('');
 },
 go(n,announce=true){
  this.cfg.leave?.();
  const i=this.step=Math.max(0,Math.min(this.N-1,n)),l=this.lessons[i],L=this.lessons;
  $('kicker').textContent=`Step ${pad(i+1)} · ${l.kicker}`;$('stepTitle').innerHTML=l.title;$('stepBody').textContent=l.body;$('keyIdea').textContent=l.key;$('tryThis').textContent=l.try;$('sceneLabel').textContent=l.scene;
  $('stepCounter').textContent=`Step ${i+1} of ${this.N}`;$('prev').disabled=i===0;$('prevTitle').textContent=i?L[i-1].short:'—';
  $('nextKicker').textContent=i===this.N-1?'Finished':'Next';$('nextTitle').textContent=i===this.N-1?'Start again':L[i+1].short;
  document.querySelectorAll('.step').forEach((el,j)=>{el.classList.toggle('current',j===i);el.classList.toggle('done',j<i);if(j===i)el.setAttribute('aria-current','step');else el.removeAttribute('aria-current');});
  document.querySelectorAll('.chapter-label').forEach(el=>el.classList.toggle('current',+el.dataset.ch===l.ch));
  const cur=document.querySelector('.step.current'),nav=$('stepper');if(cur&&nav.scrollWidth>nav.clientWidth)nav.scrollTo({left:cur.offsetLeft-nav.clientWidth/2+cur.offsetWidth/2,behavior:announce?'smooth':'auto'});
  this.cfg.draw();
  const st=$('stage');st.classList.remove('step-entry');void st.offsetWidth;st.classList.add('step-entry');
  history.replaceState(null,'',`#step-${i+1}`);
  if(announce)$('status').textContent=`Step ${i+1} of ${this.N}: ${l.title.replace(/<br>/g,' ')}`;
 },
 // Collapsible caveats; stays open across re-renders once the reader opens it.
 fine(...ps){return `<details class="fine" ${this.fineOpen?'open':''}><summary>Fine print</summary>${ps.map(p=>`<p>${p}</p>`).join('')}</details>`;},
 bindFine(){document.querySelectorAll('details.fine').forEach(d=>d.ontoggle=()=>{this.fineOpen=d.open;});}
};
