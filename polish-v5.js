/* Accessible, low-cost scroll motion: only transform/opacity, no layout thrash */
(()=>{'use strict';const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;if(reduced)return;
const items=[...document.querySelectorAll('.quick-strip>div,.section-eyebrow,.story-quote,.contact-links>a')];
if(!('IntersectionObserver' in window))return;
items.forEach((el,i)=>{el.classList.add('cm-fade');el.style.setProperty('--cm-delay',`${Math.min(i%4,3)*85}ms`)});
const style=document.createElement('style');style.textContent='.cm-fade{opacity:0;transform:translate3d(0,22px,0);transition:opacity 850ms cubic-bezier(.22,1,.36,1),transform 850ms cubic-bezier(.22,1,.36,1);transition-delay:var(--cm-delay,0ms)}.cm-fade.cm-seen{opacity:1;transform:none}@media(prefers-reduced-motion:reduce){.cm-fade{opacity:1;transform:none;transition:none}}';document.head.append(style);
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('cm-seen');observer.unobserve(e.target)}}),{threshold:.06,rootMargin:'0px 0px 50px 0px'});items.forEach(el=>observer.observe(el));
})();