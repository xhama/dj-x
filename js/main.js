// DJ XHAMA — splash, reveal, nav

(() => {
  const splash = document.getElementById('splash');
  const nav = document.getElementById('nav');

  // Splash: Enter / Listen dismiss the splash, then jump to the target.
  splash.querySelectorAll('[data-enter]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(btn.getAttribute('href'));
      document.body.classList.remove('is-splashed');
      splash.classList.add('is-gone');
      if (target) {
        // let the fade start before scrolling so the site is visible underneath
        setTimeout(() => target.scrollIntoView({ behavior: 'instant', block: 'start' }), 50);
      }
      setTimeout(() => splash.remove(), 1100);
    });
  });

  // Nav background after scrolling past the fold
  const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Reveal-on-scroll
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
  );
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

  // Booking rows pre-select the event type in the contact form
  const eventSelect = document.getElementById('event-type');
  document.querySelectorAll('.booking[data-event]').forEach((row) => {
    row.addEventListener('click', () => {
      const value = row.dataset.event;
      [...eventSelect.options].forEach((opt) => {
        opt.selected = opt.text === value;
      });
    });
  });

  // Performance video: only load/play while on screen, and never with reduced motion.
  // Autoplay refusal (e.g. low-power mode) just leaves the poster frame showing.
  const video = document.getElementById('perf-video');
  if (video) {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!reducedMotion.matches) {
      const vio = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) video.play().catch(() => {});
            else video.pause();
          });
        },
        { rootMargin: '100px' }
      );
      vio.observe(video);
    }
  }

  document.getElementById('year').textContent = new Date().getFullYear();
})();
