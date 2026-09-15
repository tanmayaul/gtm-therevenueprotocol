// Scale the entire embedded surface together; never crop dates or booking fields.
(function () {
  const shell = document.getElementById('embed-shell');
  const content = document.getElementById('cal-inline');
  let pending = false;
  function fit() {
    pending = false;
    if (window.innerWidth < 1000) {
      shell.style.removeProperty('--calendar-scale');
      shell.style.removeProperty('--calendar-height');
      return;
    }
    const naturalHeight = content.offsetHeight;
    if (!naturalHeight) return;
    const top = shell.getBoundingClientRect().top + window.scrollY;
    const reserve = 80; // Direct booking link, footer and a little breathing room.
    const available = Math.max(320, window.innerHeight - top - reserve);
    const scale = Math.max(.65, Math.min(.82, available / naturalHeight));
    shell.style.setProperty('--calendar-scale', scale);
    shell.style.setProperty('--calendar-height', Math.ceil(naturalHeight * scale) + 4 + 'px');
  }
  function schedule() {
    if (!pending) { pending = true; requestAnimationFrame(fit); }
  }
  new ResizeObserver(schedule).observe(content);
  window.addEventListener('resize', schedule);
  document.fonts.ready.then(schedule);
  schedule();
})();
