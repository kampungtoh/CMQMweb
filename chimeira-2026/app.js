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

// Transparent three-dimensional orbits follow a gentle pointer or keyboard tilt.
(()=>{
 const canvas=document.getElementById('logo-galaxy'),stage=canvas?.closest('.galaxy-stage');
 if(!canvas||!stage)return;
 const ctx=canvas.getContext('2d');if(!ctx)return;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let w=1,h=1,raf=0,t=0,last=0,visible=true,rx=0,ry=0,targetX=0,targetY=0,touching=false;
 const clamp=v=>Math.max(-1,Math.min(1,v));
 const stars=Array.from({length:220},(_,i)=>{
  const r=.31+(i*.61803398875)%.16;
  return {r,a:(i%3)*Math.PI*2/3+r*14+Math.sin(i*7.1)*.3,z:Math.sin(i*2.7)*.075,size:i%13===0?2.2:.75+(i%4)*.28,color:['#246b86','#6476a5','#38806c','#a78037'][i%4]};
 });
 function project(x,y,z){
  const ax=.36+rx*.16,ay=ry*.18;
  const y1=y*Math.cos(ax)-z*Math.sin(ax),z1=y*Math.sin(ax)+z*Math.cos(ax);
  const x1=x*Math.cos(ay)+z1*Math.sin(ay),depth=-x*Math.sin(ay)+z1*Math.cos(ay);
  const scale=1/(1-depth*.48);return {x:w/2+x1*w*scale,y:h/2+y1*h*scale,scale,depth};
 }
 function draw(){
  ctx.clearRect(0,0,w,h);
  for(let n=0;n<3;n++){
   ctx.beginPath();ctx.strokeStyle=['#3a899f55','#6d80a747','#568e7447'][n];ctx.lineWidth=1;
   for(let i=0;i<=120;i++){const a=i*Math.PI*2/120+t*.014+n*.6,r=.345+n*.05,p=project(Math.cos(a)*r,Math.sin(a)*r*.77,Math.sin(a+n)*.11);if(i===0)ctx.moveTo(p.x,p.y);else ctx.lineTo(p.x,p.y);}ctx.stroke();
  }
  const points=stars.map(s=>{const a=s.a+t*.022;return {...s,...project(Math.cos(a)*s.r,Math.sin(a)*s.r*.81,s.z)};}).sort((a,b)=>a.depth-b.depth);
  for(const s of points){ctx.beginPath();ctx.fillStyle=s.color;ctx.globalAlpha=.48+.34*Math.sin(s.a+t*.22)**2;ctx.shadowColor=s.color;ctx.shadowBlur=s.size>2?10:3;ctx.arc(s.x,s.y,s.size*s.scale,0,Math.PI*2);ctx.fill();}
  ctx.globalAlpha=1;ctx.shadowBlur=0;
  stage.style.setProperty('--galaxy-x',(-rx*7).toFixed(2)+'deg');stage.style.setProperty('--galaxy-y',(ry*8).toFixed(2)+'deg');
 }
 function tick(now){raf=0;if(reduced.matches||!visible||document.hidden)return;t+=Math.min((now-last)/1000,.06);last=now;rx+=(targetX-rx)*.075;ry+=(targetY-ry)*.075;draw();raf=requestAnimationFrame(tick);}
 function sync(){cancelAnimationFrame(raf);raf=0;if(reduced.matches){rx=ry=targetX=targetY=0;}draw();if(!reduced.matches&&visible&&!document.hidden){last=performance.now();raf=requestAnimationFrame(tick);}}
 const reset=()=>{targetX=targetY=0;touching=false;};
 stage.addEventListener('pointerdown',e=>{if(e.pointerType==='touch')touching=true;},{passive:true});
 stage.addEventListener('pointermove',e=>{if(reduced.matches||(e.pointerType==='touch'&&!touching))return;const r=stage.getBoundingClientRect();targetX=clamp((e.clientY-r.top)/r.height*2-1);targetY=clamp((e.clientX-r.left)/r.width*2-1);},{passive:true});
 stage.addEventListener('pointerleave',reset);stage.addEventListener('pointerup',e=>{if(e.pointerType==='touch')reset();});stage.addEventListener('pointercancel',reset);stage.addEventListener('blur',reset);
 stage.addEventListener('keydown',e=>{if(reduced.matches)return;if(!['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Home'].includes(e.key))return;e.preventDefault();if(e.key==='Home')reset();else if(e.key==='ArrowUp')targetX=clamp(targetX-.3);else if(e.key==='ArrowDown')targetX=clamp(targetX+.3);else if(e.key==='ArrowLeft')targetY=clamp(targetY-.3);else targetY=clamp(targetY+.3);});
 new ResizeObserver(()=>{const rect=stage.getBoundingClientRect(),dpr=Math.min(devicePixelRatio||1,1.5);w=stage.clientWidth;h=stage.clientHeight;canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);draw();}).observe(stage);
 if('IntersectionObserver' in window)new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();},{threshold:.05}).observe(stage);
 reduced.addEventListener('change',sync);document.addEventListener('visibilitychange',sync);sync();
})();
