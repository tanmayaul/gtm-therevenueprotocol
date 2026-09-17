// Keep the whole page on one screen on desktop. The embed renders at its natural size;
// only when the viewport is too short is the entire surface scaled down together,
// so dates and booking fields are never cropped.
(function () {
  const shell = document.getElementById('embed-shell');
  const content = document.getElementById('cal-inline');
  const booking = shell.closest('.booking');
  let pending = false;
  function fit() {
    pending = false;
    if (window.innerWidth < 1200) {
      shell.style.removeProperty('--calendar-scale');
      shell.style.removeProperty('--calendar-height');
      return;
    }
    const naturalHeight = content.offsetHeight;
    if (!naturalHeight) return;
    // Space between the header and the footer, minus main's padding and the link under the card.
    // Measured from the viewport, not from main, because an overflowing card would stretch main.
    const main = booking.parentElement;
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    const mainStyle = getComputedStyle(main);
    const padding = parseFloat(mainStyle.paddingTop) + parseFloat(mainStyle.paddingBottom);
    const link = booking.querySelector('.direct-link');
    const reserve = (link ? link.getBoundingClientRect().height : 0) + 12;
    const column = window.innerHeight - header.getBoundingClientRect().bottom - footer.offsetHeight - padding;
    const available = Math.max(320, column - reserve);
    const scale = Math.max(.7, Math.min(1, available / naturalHeight));
    shell.style.setProperty('--calendar-scale', scale);
    shell.style.setProperty('--calendar-height', Math.ceil(naturalHeight * scale) + 2 + 'px');
  }
  function schedule() {
    if (!pending) { pending = true; requestAnimationFrame(fit); }
  }
  new ResizeObserver(schedule).observe(content);
  window.addEventListener('resize', schedule);
  document.fonts.ready.then(schedule);
  schedule();
})();
