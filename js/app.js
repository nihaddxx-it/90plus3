const intro=document.getElementById('intro');
const video=document.getElementById('introVideo');
const enter=document.getElementById('enterSite');

function finishIntro(){
  intro.classList.add('is-finished');
  try{
    video.pause();
    if(Number.isFinite(video.duration)) video.currentTime=Math.max(0,video.duration-.05);
  }catch(e){}
}

video.addEventListener('ended',finishIntro);
video.addEventListener('error',finishIntro);

window.addEventListener('load',()=>{
  const p=video.play();
  if(p&&p.catch)p.catch(()=>setTimeout(finishIntro,900));
  setTimeout(()=>{if(!intro.classList.contains('is-finished')&&video.readyState<2)finishIntro()},1800);
});

enter.addEventListener('click',()=>{
  document.body.classList.add('show-home');
  history.replaceState(null,'','#home');
  window.scrollTo(0,0);
  setTimeout(()=>document.querySelector('.drop-countdown')?.classList.add('is-compact'),2100);
});

document.querySelectorAll('.filter-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const group=btn.parentElement;
    group.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
  });
});

document.querySelectorAll('.product-card').forEach(card=>{
  card.addEventListener('pointerenter',()=>card.classList.add('is-active'));
  card.addEventListener('pointerleave',()=>card.classList.remove('is-active'));
  card.addEventListener('click',()=>{
    if(matchMedia('(hover: none)').matches){
      document.querySelectorAll('.product-card.is-active').forEach(c=>c.classList.remove('is-active'));
      card.classList.add('is-active');
      clearTimeout(card._activeTimer);
      card._activeTimer=setTimeout(()=>card.classList.remove('is-active'),1200);
    }
  });
});

document.querySelector('.order-btn')?.addEventListener('click',()=>{
  alert('Sifariş bölməsi növbəti mərhələdə qoşulacaq.');
});

document.querySelector('.lang')?.addEventListener('click',()=>{
  alert('Dil seçimi növbəti mərhələdə qoşulacaq.');
});


// Clickable collection interactions
document.querySelectorAll('[data-scroll-target]').forEach(el=>{
  el.addEventListener('click',e=>{
    const id=el.getAttribute('data-scroll-target');
    const target=document.getElementById(id);
    if(target){ e.preventDefault(); target.scrollIntoView({behavior:'smooth',block:'start'}); }
  });
});

document.querySelectorAll('.collection-floor button, .shop-card').forEach(el=>{
  el.addEventListener('click',()=>{
    if(el.classList.contains('thumb')){
      document.querySelectorAll('.thumb').forEach(t=>t.classList.remove('active'));
      el.classList.add('active');
      const src=el.querySelector('img')?.getAttribute('src');
      const hero=document.querySelector('.collection-model img');
      if(src&&hero) hero.src=src;
      return;
    }
    if(el.classList.contains('filter-chip')){
      document.querySelectorAll('.shop-card').forEach(card=>card.style.display='');
      return;
    }
    if(el.classList.contains('shop-card') && !el.classList.contains('ghost')){
      el.animate([{transform:'scale(1)'},{transform:'scale(.98)'},{transform:'scale(1)'}],{duration:220,easing:'ease-out'});
    }
  });
});

document.querySelectorAll('.filters .filter-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const text=btn.textContent.toLowerCase();
    const grid=document.getElementById('collection-grid');
    if(!grid) return;
    if(text.includes('polo')){
      document.querySelectorAll('.shop-card').forEach(card=>{
        card.style.display=(card.dataset.product||'').includes('polo')||card.classList.contains('ghost')?'':'none';
      });
      grid.scrollIntoView({behavior:'smooth',block:'start'});
    }else if(text.includes('futbol')||text.includes('forma')){
      document.querySelectorAll('.shop-card').forEach(card=>{
        card.style.display=(card.dataset.product||'').includes('football')||card.classList.contains('featured')||card.classList.contains('ghost')?'':'none';
      });
      grid.scrollIntoView({behavior:'smooth',block:'start'});
    }else{
      document.querySelectorAll('.shop-card').forEach(card=>card.style.display='');
      grid.scrollIntoView({behavior:'smooth',block:'start'});
    }
  });
});


// Drop countdown: starts from 9d 23h 24m 45s on first visit, then keeps ticking.
const countdown = document.querySelector('.drop-countdown');
const countdownKeys = {
  target: '90p3_drop_target_v1'
};
function getDropTarget(){
  const saved = Number(localStorage.getItem(countdownKeys.target));
  if(saved && saved > Date.now()) return saved;
  const next = Date.now() + (((9*24 + 23)*60 + 24)*60 + 45)*1000;
  localStorage.setItem(countdownKeys.target, String(next));
  return next;
}
const dropTarget = getDropTarget();
function pad2(n){ return String(Math.max(0, Math.floor(n))).padStart(2,'0'); }
function tickCountdown(){
  const left = Math.max(0, dropTarget - Date.now());
  const total = Math.floor(left / 1000);
  const days = Math.floor(total / 86400);
  const hours = Math.floor((total % 86400) / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;
  const map = [['cdDays',days],['cdHours',hours],['cdMinutes',minutes],['cdSeconds',seconds]];
  map.forEach(([id,val])=>{ const el=document.getElementById(id); if(el) el.textContent=pad2(val); });
}
tickCountdown();
setInterval(tickCountdown,1000);
