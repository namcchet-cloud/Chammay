const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.navigation');
toggle?.addEventListener('click',()=>{
  const open=toggle.getAttribute('aria-expanded')==='true';
  toggle.setAttribute('aria-expanded',String(!open));
  toggle.setAttribute('aria-label',open?'Mở menu':'Đóng menu');
  nav?.classList.toggle('is-open',!open);
});
nav?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{
  nav.classList.remove('is-open');
  toggle?.setAttribute('aria-expanded','false');
  toggle?.setAttribute('aria-label','Mở menu');
}));
const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}
  });
},{threshold:.12,rootMargin:'0px 0px -24px 0px'});
document.querySelectorAll('.reveal').forEach(node=>observer.observe(node));
