// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const siteNav = document.getElementById('siteNav');

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  siteNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ============================================
// Scroll reveal animation
// ============================================
(function initScrollReveal() {
  const revealSelector = [
    '.feature-card', '.service-card', '.industry-card', '.process-step',
    '.contact-card', '.map-card', '.highlight',
    '.about-grid > *', '.about-highlight', '.about-extra-grid article',
    '.hero-copy', '.hero-visual', '.about-photo', '.about-copy',
    '.service-detail-card', '.services-cta', '.contact-method',
    '.section > .wrap > .eyebrow', '.section > .wrap > h2', '.section > .wrap > .section-sub'
  ].join(', ');

  const items = document.querySelectorAll(revealSelector);
  if (!items.length) return;

  items.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = ((i % 4) * 70) + 'ms';
  });

  if (!('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  items.forEach(el => observer.observe(el));
})();

// ============================================
// Page transition (fade between pages)
// ============================================
(function initPageTransitions() {
  document.body.classList.add('page-transition');
  requestAnimationFrame(() => {
    requestAnimationFrame(() => document.body.classList.add('loaded'));
  });

  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#')) return;
    if (href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:')) return;
    if (link.target === '_blank') return;

    link.addEventListener('click', (e) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
      e.preventDefault();
      document.body.classList.remove('loaded');
      setTimeout(() => { window.location.href = href; }, 260);
    });
  });
})();
