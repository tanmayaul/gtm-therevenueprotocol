return (async()=>{
 const failures=[]; const check=(ok,msg)=>{if(!ok)failures.push(msg)};
 check(document.title==='Your call is booked | Regency Leads','Page title');
 check(!/Revenue Protocol|\bTRP\b/.test(document.body.innerText),'Old visible branding');
 check(document.documentElement.scrollWidth<=innerWidth,'Horizontal overflow');
 check(document.querySelectorAll('.faq-video').length===14,'14 video FAQs');
 check(document.querySelectorAll('details.faq').length===14,'14 text FAQs');
 for(const btn of document.querySelectorAll('[data-video]')){btn.focus();btn.click();check(document.querySelector('dialog').open,'Video dialog '+btn.dataset.video);check(document.querySelector('#dialog-content').textContent.length>100,'Video script content');document.querySelector('#dialog-close').click();}
 for(const btn of document.querySelectorAll('[data-calendar]')){btn.click();check(document.querySelector('#dialog-title').textContent.includes(btn.dataset.calendar),'Calendar '+btn.dataset.calendar);document.querySelector('#dialog-close').click();}
 for(const d of document.querySelectorAll('details.faq')){d.querySelector('summary').click();check(d.open,'FAQ toggling');d.querySelector('summary').click();}
 check(document.querySelectorAll('#deckDots button').length===9,'9 slides');
 for(let i=0;i<9;i++){document.querySelectorAll('#deckDots button')[i].click();await new Promise(r=>setTimeout(r,180));check(document.querySelector('#deckCaption').textContent.includes((i+1)+' / 9'),'Slide '+(i+1));}
 document.querySelector('#deckNext').click();await new Promise(r=>setTimeout(r,180));check(document.querySelector('#deckCaption').textContent.includes('1 / 9'),'Carousel wrapping');
 document.querySelector('[data-action="reschedule"]').click();check(document.querySelector('dialog').open,'Rescheduling preview');document.querySelector('#dialog-close').click();
 check([...document.images].every(im=>im.complete&&im.naturalWidth>0),'Images loaded');
 window.scrollTo(0,0);return JSON.stringify({viewport:innerWidth,checks:'dialogs, calendars, FAQs, carousel, branding, overflow, images',failures});
})()
