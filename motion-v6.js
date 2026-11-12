/* Chạm Mây v6: one motion controller, inspired by CLB architecture, not its effects. */
(()=>{'use strict';const root=document.documentElement;const reduced=matchMedia('(prefers-reduced-motion: reduce)');const intro=document.getElementById('cm-intro');const motion=()=>!reduced.matches;const finish=()=>{intro?.classList.add('cm-exit');setTimeout(()=>intro?.remove(),950)};
let seen=false;try{seen=sessionStorage.getItem('chammay-intro-v6')==='1';sessionStorage.setItem('chammay-intro-v6','1')}catch(_){}
if(!intro||seen||!motion()||document.visibilityState==='hidden')intro?.remove();else setTimeout(finish,1850);
root.classList.add('cm-ready');if(!motion())return;
// Observe chapters and stagger their child transitions; no perpetual scroll loop.
root.classList.add('cm-motion');const els=[...document.querySelectorAll('.reveal')];
if('IntersectionObserver'in window){const io=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){entry.target.classList.add('visible');io.unobserve(entry.target)}}},{threshold:.07,rootMargin:'0px 0px 60px 0px'});els.forEach(el=>{if(!el.classList.contains('visible'))io.observe(el)})}else els.forEach(el=>el.classList.add('visible'));
// Pointer tilt is restrained and disabled on touch or coarse pointers.
if(matchMedia('(hover:hover) and (pointer:fine)').matches){for(const card of document.querySelectorAll('[data-tilt]')){let frame=0;card.addEventListener('pointermove',e=>{if(frame)return;frame=requestAnimationFrame(()=>{frame=0;const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.setProperty('--tilt-x',(-y*3).toFixed(2)+'deg');card.style.setProperty('--tilt-y',(x*3).toFixed(2)+'deg')})},{passive:true});card.addEventListener('pointerleave',()=>{cancelAnimationFrame(frame);frame=0;card.style.setProperty('--tilt-x','0deg');card.style.setProperty('--tilt-y','0deg')})}}
// Stop atmospheric animation when page is hidden, preserve battery.
document.addEventListener('visibilitychange',()=>root.classList.toggle('cm-paused',document.hidden));
reduced.addEventListener?.('change',()=>{if(reduced.matches){root.classList.remove('cm-motion');els.forEach(el=>el.classList.add('visible'));intro?.remove()}});
})();
