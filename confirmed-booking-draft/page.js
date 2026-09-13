'use strict';
const dialog=document.querySelector('#preview-dialog');
const title=document.querySelector('#dialog-title');
const body=document.querySelector('#dialog-content');
let lastFocus=null;
function openDialog(heading,paragraphs,note){lastFocus=document.activeElement;title.textContent=heading;body.replaceChildren();if(note){const p=document.createElement('p');p.className='dialog-note';p.textContent=note;body.append(p);}paragraphs.forEach(text=>{const p=document.createElement('p');p.textContent=text;body.append(p);});dialog.showModal();dialog.scrollTop=0;document.querySelector('#dialog-close').focus();}
document.querySelector('#dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('close',()=>lastFocus?.focus());
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
let videos=[];
document.addEventListener('click',event=>{const video=event.target.closest('[data-video]');if(video){const v=videos[Number(video.dataset.video)];if(v)openDialog(v.title,v.paragraphs,'Recording pending. This is the exact script for this video.');else openDialog('Video script unavailable',['Please refresh the page and try again.']);return;}const calendar=event.target.closest('[data-calendar]');if(calendar){event.preventDefault();openDialog('Add to '+calendar.dataset.calendar,['Tuesday, September 22, 2026. 10:00–10:30 a.m. America/Chicago.','On the finished page, this button will add the actual booked appointment to your calendar.'],'Sample booking only. No calendar event has been created.');}const action=event.target.closest('[data-action]');if(action)openDialog(action.dataset.action==='join'?'Your meeting details':'Choose another time',['This design uses a sample appointment to show the confirmation experience. The finished page will use the meeting and rescheduling links from the actual booking.'],'Design preview. No live appointment is connected.');});

fetch('videos.json?v=9').then(r=>{if(!r.ok)throw Error('Script fetch failed');return r.json();}).then(data=>{
 videos=data;
 const grid=document.querySelector('#video-grid');const faq=document.querySelector('#faq-list');
 videos.slice(1).forEach((v,index)=>{
  const button=document.createElement('button');button.className='faq-video';button.dataset.video=String(index+1);
  const frame=document.createElement('div');frame.className='faq-video-frame';
  const topline=document.createElement('div');topline.className='faq-video-top';topline.textContent='REGENCY LEADS';
  const question=document.createElement('h3');question.textContent=v.title;
  const play=document.createElement('span');play.className='faq-play';play.textContent='▶';play.setAttribute('aria-hidden','true');
  const bottom=document.createElement('div');bottom.className='faq-video-bottom';
  const label=document.createElement('span');label.textContent='Preview script';const runtime=document.createElement('span');runtime.textContent=v.runtime;bottom.append(label,runtime);
  frame.append(topline,question,play,bottom);button.append(frame);grid.append(button);
  const details=document.createElement('details');details.className='faq';if(v.title==='Do I pay upfront?')details.id='payment';const summary=document.createElement('summary');const text=document.createElement('span');text.textContent=v.title;const plus=document.createElement('span');plus.className='pm';plus.textContent='+';plus.setAttribute('aria-hidden','true');summary.append(text,plus);const answer=document.createElement('div');answer.className='faq-a';v.paragraphs.slice(v.paragraphs[0]===v.title?1:0).forEach(t=>{const p=document.createElement('p');p.textContent=t;answer.append(p);});details.append(summary,answer);faq.append(details);
 });
}).catch(()=>{document.querySelector('#video-grid').textContent='The scripts could not load. Please refresh to try again.';document.querySelector('#faq-list').textContent='The answers could not load. Please refresh to try again.';});
(function deckCarousel() {
  const SLIDES = [
    ['deck/slide-1.png', 'Cover'],
    ['deck/slide-2.png', 'Company overview'],
    ['deck/slide-3.png', 'Challenges in retirement lead gen'],
    ['deck/slide-4.png', 'Value proposition'],
    ['deck/slide-5.png', 'The appointment engine'],
    ['deck/slide-6.png', 'How it works'],
    ['deck/slide-7.png', 'Who is on the other side'],
    ['deck/slide-8.png', 'Team'],
    ['deck/slide-9.png', 'Thank you'],
  ];
  const frame = document.getElementById('deckFrame');
  const img = document.getElementById('deckImg');
  const cap = document.getElementById('deckCaption');
  const dots = document.getElementById('deckDots');
  if (!frame || !img) { return; }
  let i = 0;
  const cache = {};
  const preload = (n) => { const s = SLIDES[n] && SLIDES[n][0]; if (s && !cache[s]) { const im = new Image(); im.src = s; cache[s] = im; } };
  SLIDES.forEach((s, n) => {
    const b = document.createElement('button');
    b.type = 'button'; b.setAttribute('aria-label', 'Slide ' + (n + 1) + ': ' + s[1]);
    b.addEventListener('click', () => go(n));
    dots.appendChild(b);
  });
  function render() {
    const [src, title] = SLIDES[i];
    img.classList.add('fading');
    const swap = () => {
      img.src = src;
      img.alt = 'Slide ' + (i + 1) + ' of ' + SLIDES.length + ': ' + title;
      const done = () => img.classList.remove('fading');
      if (img.complete) { requestAnimationFrame(done); } else { img.onload = done; }
    };
    setTimeout(swap, 120);
    cap.innerHTML = '';
    cap.appendChild(document.createTextNode(title + ' '));
    const n = document.createElement('span'); n.textContent = (i + 1) + ' / ' + SLIDES.length; cap.appendChild(n);
    Array.from(dots.children).forEach((d, n2) => { if (n2 === i) d.setAttribute('aria-current', 'true'); else d.removeAttribute('aria-current'); });
    preload(i + 1); preload(i - 1);
  }
  function go(n) { i = (n + SLIDES.length) % SLIDES.length; render(); }
  document.getElementById('deckPrev').addEventListener('click', () => go(i - 1));
  document.getElementById('deckNext').addEventListener('click', () => go(i + 1));
  frame.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(i - 1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); go(i + 1); }
  });
  let x0 = null;
  frame.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX; }, { passive: true });
  frame.addEventListener('touchend', (e) => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0; x0 = null;
    if (Math.abs(dx) > 40) { go(dx < 0 ? i + 1 : i - 1); }
  }, { passive: true });
  render();
  preload(1);

})();
