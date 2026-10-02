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

// A quiet, transparent galaxy shares the hero background and surrounds the original shield.
(()=>{
 const canvas=document.getElementById('logo-galaxy'),stage=canvas?.closest('.galaxy-stage');
 if(!canvas||!stage)return;
 const ctx=canvas.getContext('2d');if(!ctx)return;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let w=1,h=1,raf=0,t=0,last=0,visible=true;
 const stars=Array.from({length:160},(_,i)=>{
  const r=.24+(i*.61803398875)% .32;
  return {r,a:(i%3)*Math.PI*2/3+r*13+Math.sin(i*7.1)*.32,size:i%13===0?1.8:.5+(i%4)*.25,color:['#38798f','#747fa8','#548f7d','#b29559'][i%4]};
 });
 function draw(){
  ctx.clearRect(0,0,w,h);const cx=w/2,cy=h/2;
  for(const s of stars){const a=s.a+t*.016,r=s.r*w,x=cx+Math.cos(a)*r,y=cy+Math.sin(a)*r*.79;ctx.beginPath();ctx.fillStyle=s.color;ctx.globalAlpha=.28+.35*Math.sin(s.a+t*.22)**2;ctx.shadowColor=s.color;ctx.shadowBlur=s.size>1.5?8:2;ctx.arc(x,y,s.size,0,Math.PI*2);ctx.fill();}
  ctx.globalAlpha=1;ctx.shadowBlur=0;
  for(let n=0;n<3;n++){ctx.beginPath();ctx.strokeStyle=['#5497a32b','#929fbc20','#78ab9025'][n];ctx.lineWidth=.8;ctx.ellipse(cx,cy,w*(.35+n*.05),h*(.18+n*.035),n*.62+t*.012,0,Math.PI*2);ctx.stroke();}
 }
 function tick(now){raf=0;if(reduced.matches||!visible||document.hidden)return;t+=Math.min((now-last)/1000,.06);last=now;draw();raf=requestAnimationFrame(tick);}
 function sync(){cancelAnimationFrame(raf);raf=0;draw();if(!reduced.matches&&visible&&!document.hidden){last=performance.now();raf=requestAnimationFrame(tick);}}
 new ResizeObserver(()=>{const rect=stage.getBoundingClientRect(),dpr=Math.min(devicePixelRatio||1,1.5);w=rect.width;h=rect.height;canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);draw();}).observe(stage);
 if('IntersectionObserver' in window)new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();},{threshold:.05}).observe(stage);
 reduced.addEventListener('change',sync);document.addEventListener('visibilitychange',sync);sync();
})();
