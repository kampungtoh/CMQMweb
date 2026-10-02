'use strict';
const registrationOrigin='https://chimeira-2026-registration.garytoh.chatgpt.site';
const frame=document.getElementById('registration-frame');
const names={A:'智慧抗生素管理',B:'病人旅程與智慧品質照護',C:'醫療安全 × AI'};
const descriptions={A:'從臨床情境出發，設計 AI 提醒、人工覆核與成效指標。',B:'從門診到返家，找出資訊斷點與值得改善的照護接觸點。',C:'從風險訊號、人因與人工覆核，設計 AI 病人安全護欄。'};
let selectedWorkshop='',audience='external',readingSize=18;
try { const saved=Number(localStorage.getItem('chimeira-reading-size'));if([18,20,22].includes(saved))readingSize=saved;}catch{}
const postToForm=message=>frame.contentWindow?.postMessage(message,registrationOrigin);
function setFont(size){
 readingSize=size;document.documentElement.style.fontSize=size+'px';
 document.querySelectorAll('[data-font]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.font)===size)));
 try{localStorage.setItem('chimeira-reading-size',String(size));}catch{}
 postToForm({type:'chimeira-reading-size',size});
 document.getElementById('standalone-registration').href=registrationOrigin+'/?font='+size+(selectedWorkshop?'&workshop='+selectedWorkshop:'');
}
setFont(readingSize);
document.querySelectorAll('[data-font]').forEach(b=>b.addEventListener('click',()=>setFont(Number(b.dataset.font))));
frame.addEventListener('load',()=>{postToForm({type:'chimeira-reading-size',size:readingSize});if(selectedWorkshop)postToForm({type:'chimeira-stage-workshop',workshop:selectedWorkshop});});
document.querySelectorAll('[data-session]').forEach(button=>button.addEventListener('click',()=>{
 document.querySelectorAll('[data-session]').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
 document.querySelectorAll('[data-period]').forEach(row=>{row.hidden=button.dataset.session!=='all'&&row.dataset.period!==button.dataset.session;});
}));
function showInterest(key){
 document.querySelectorAll('[data-interest]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.interest===key)));
 document.getElementById('guide-code').textContent='工作坊 '+key;
 document.getElementById('guide-title').textContent=names[key];
 document.getElementById('guide-description').textContent=descriptions[key];
 const b=document.getElementById('guide-select');b.dataset.workshop=key;b.textContent='選擇工作坊 '+key;
}
document.querySelectorAll('[data-interest]').forEach(b=>b.addEventListener('click',()=>showInterest(b.dataset.interest)));
function renderPath(){
 document.getElementById('path-workshop').textContent=selectedWorkshop?selectedWorkshop+'｜'+names[selectedWorkshop]:'一場平行工作坊';
 document.getElementById('path-afternoon').textContent=audience==='internal'?'資格確認者參加院內共識營':'上午活動後自由交流';
 document.getElementById('path-note').textContent=audience==='internal'?'院內同仁可登記下午共識營；登記後仍須由主辦單位確認資格及名額。':'院外參加者可報名上午論壇及一場工作坊。';
 document.querySelectorAll('[data-audience]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.audience===audience)));
}
document.querySelectorAll('[data-audience]').forEach(b=>b.addEventListener('click',()=>{audience=b.dataset.audience;renderPath();}));
document.querySelectorAll('[data-workshop]').forEach(button=>button.addEventListener('click',()=>{
 selectedWorkshop=button.dataset.workshop;showInterest(selectedWorkshop);renderPath();
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
