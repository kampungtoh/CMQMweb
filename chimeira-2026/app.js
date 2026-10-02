'use strict';
const registrationOrigin='https://chimeira-2026-registration.garytoh.chatgpt.site';
const frame=document.getElementById('registration-frame');
let selectedWorkshop='',readingSize=18;
const postToForm=message=>frame.contentWindow?.postMessage(message,registrationOrigin);
function setFont(size){
 readingSize=size;document.documentElement.style.fontSize=size+'px';
 
 
 postToForm({type:'chimeira-reading-size',size});
 document.getElementById('standalone-registration').href=registrationOrigin+'/?font='+size+(selectedWorkshop?'&workshop='+selectedWorkshop:'');
}
setFont(readingSize);

frame.addEventListener('load',()=>{postToForm({type:'chimeira-reading-size',size:readingSize});if(selectedWorkshop)postToForm({type:'chimeira-stage-workshop',workshop:selectedWorkshop});});
document.querySelectorAll('[data-session]').forEach(button=>button.addEventListener('click',()=>{
 document.querySelectorAll('[data-session]').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
 document.querySelectorAll('[data-period]').forEach(row=>{row.hidden=button.dataset.session!=='all'&&row.dataset.period!==button.dataset.session;});
}));
document.querySelectorAll('[data-workshop]').forEach(button=>button.addEventListener('click',()=>{
 selectedWorkshop=button.dataset.workshop;
 document.querySelectorAll('.workshop-select').forEach(b=>{const selected=b.dataset.workshop===selectedWorkshop;b.setAttribute('aria-pressed',String(selected));b.textContent=(selected?'已選擇工作坊 ':'選擇工作坊 ')+b.dataset.workshop;b.closest('.workshop').classList.toggle('is-selected',selected);});
 postToForm({type:'chimeira-stage-workshop',workshop:selectedWorkshop});
 document.getElementById('standalone-registration').href=registrationOrigin+'/?workshop='+selectedWorkshop+'&font='+readingSize;
 document.getElementById('registration').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
}));
window.addEventListener('message',event=>{
 if(event.origin!==registrationOrigin||event.source!==frame.contentWindow)return;
 if(event.data?.type==='chimeira-form-ready'){postToForm({type:'chimeira-reading-size',size:readingSize});if(selectedWorkshop)postToForm({type:'chimeira-stage-workshop',workshop:selectedWorkshop});}
 if(event.data?.type==='chimeira-form-height'&&Number.isFinite(event.data.height))frame.style.height=Math.min(5000,Math.max(400,event.data.height+24))+'px';
});
// Real 2025 photographs, with native modal focus and keyboard navigation.
const photoButtons=Array.from(document.querySelectorAll('[data-photo]'));
const dialog=document.getElementById('photo-dialog');let photoIndex=0,photoTrigger=null;
function showPhoto(index){photoIndex=(index+photoButtons.length)%photoButtons.length;const b=photoButtons[photoIndex];const img=document.getElementById('photo-large');img.src=b.dataset.photo;img.alt=b.dataset.caption;document.getElementById('photo-caption').textContent=b.dataset.caption;document.getElementById('photo-count').textContent=(photoIndex+1)+' / '+photoButtons.length;}
photoButtons.forEach((b,index)=>b.addEventListener('click',()=>{photoTrigger=b;showPhoto(index);dialog.showModal();}));
document.getElementById('photo-close').addEventListener('click',()=>dialog.close());
document.getElementById('photo-prev').addEventListener('click',()=>showPhoto(photoIndex-1));
document.getElementById('photo-next').addEventListener('click',()=>showPhoto(photoIndex+1));
dialog.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();showPhoto(photoIndex+1);}if(e.key==='ArrowLeft'){e.preventDefault();showPhoto(photoIndex-1);}});
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
dialog.addEventListener('close',()=>photoTrigger?.focus());

// Animate visible AI banners only; honour reduced motion.
const chapters=document.querySelectorAll(".chapter-cover,.speaker-topic-image");
if("IntersectionObserver" in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>entry.target.classList.toggle("is-in-view",entry.isIntersecting)),{threshold:0.12});chapters.forEach(chapter=>observer.observe(chapter));}

// An original canvas galaxy around the original shield. Motion stays in the viewport.
(()=>{
 const canvas=document.getElementById('logo-galaxy'),stage=canvas?.closest('.galaxy-stage'),button=document.getElementById('galaxy-pause');
 if(!canvas||!stage||!button)return;
 const ctx=canvas.getContext('2d');if(!ctx)return;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let w=1,h=1,raf=0,t=0,last=0,visible=true,paused=reduced.matches;
 const stars=Array.from({length:95},(_,i)=>({r:.13+(i*0.61803398875)%0.40,a:i*2.3999632,size:i%8===0?2.2:.7+(i%4)*.3,color:['#90eaf2','#b9a9ff','#a7ead4','#f1d49e'][i%4]}));
 function draw(){
  ctx.clearRect(0,0,w,h);const cx=w/2,cy=h/2;
  for(const s of stars){const a=s.a+t*(.025+(s.size*.006)),r=s.r*w;const x=cx+Math.cos(a)*r,y=cy+Math.sin(a)*r*.76;ctx.beginPath();ctx.fillStyle=s.color;ctx.globalAlpha=.42+.4*Math.sin(s.a+t*.4)**2;ctx.shadowColor=s.color;ctx.shadowBlur=s.size>2?12:3;ctx.arc(x,y,s.size,0,Math.PI*2);ctx.fill();}
  ctx.globalAlpha=1;ctx.shadowBlur=0;
  for(let n=0;n<3;n++){ctx.beginPath();ctx.strokeStyle=['#79dbe94a','#baa0ff38','#d1eb9f35'][n];ctx.lineWidth=1;ctx.ellipse(cx,cy,w*(.35+n*.05),h*(.17+n*.04),n*.55+t*.015,0,Math.PI*2);ctx.stroke();}
 }
 function tick(now){raf=0;if(paused||!visible||document.hidden)return;t+=Math.min((now-last)/1000,.06);last=now;draw();raf=requestAnimationFrame(tick);}
 function sync(){cancelAnimationFrame(raf);raf=0;stage.classList.toggle('galaxy-paused',paused||!visible||document.hidden);button.setAttribute('aria-pressed',String(paused));button.textContent=paused?'播放星系動畫':'暫停星系動畫';draw();if(!paused&&visible&&!document.hidden){last=performance.now();raf=requestAnimationFrame(tick);}}
 new ResizeObserver(()=>{const rect=stage.getBoundingClientRect(),dpr=Math.min(devicePixelRatio||1,1.5);w=rect.width;h=rect.height;canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);draw();}).observe(stage);
 if('IntersectionObserver' in window)new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();},{threshold:.05}).observe(stage);
 button.addEventListener('click',()=>{paused=!paused;sync();});reduced.addEventListener('change',()=>{paused=reduced.matches;sync();});document.addEventListener('visibilitychange',sync);sync();
})();
