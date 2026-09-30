'use strict';
const registrationOrigin='https://chimeira-2026-registration.garytoh.chatgpt.site';
const frame=document.getElementById('registration-frame');
document.querySelectorAll('[data-session]').forEach(button=>button.addEventListener('click',()=>{
 document.querySelectorAll('[data-session]').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
 document.querySelectorAll('[data-period]').forEach(row=>{row.hidden=button.dataset.session!=='all'&&row.dataset.period!==button.dataset.session;});
}));
document.querySelectorAll('[data-workshop]').forEach(button=>button.addEventListener('click',()=>{
 const workshop=button.dataset.workshop;
 frame.src=registrationOrigin+'/?embed=1&workshop='+workshop;
 document.getElementById('standalone-registration').href=registrationOrigin+'/?workshop='+workshop;
 document.getElementById('registration').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
}));
window.addEventListener('message',event=>{
 if(event.origin!==registrationOrigin||event.source!==frame.contentWindow)return;
 if(event.data?.type==='chimeira-form-height'&&Number.isFinite(event.data.height))frame.style.height=Math.min(3000,Math.max(400,event.data.height+24))+'px';
});
