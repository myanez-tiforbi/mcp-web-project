// script.js — smooth scroll and basic dark mode toggle
document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        try { history.replaceState(null, '', href); } catch (err) { /* ignore */ }
      }
      // close mobile menu if open
      const mobile = document.getElementById('mobile-menu');
      if (mobile && !mobile.classList.contains('translate-x-full')) {
        mobile.classList.add('translate-x-full');
        mobile.classList.remove('translate-x-0');
      }
    });
  });

  // Dark mode toggle
  const toggle = document.getElementById('theme-toggle');
  function applyTheme(theme) {
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    if (toggle) toggle.textContent = theme === 'dark' ? 'Modo claro' : 'Modo oscuro';
  }

  const stored = localStorage.getItem('theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initial = stored ? stored : (prefersDark ? 'dark' : 'light');
  applyTheme(initial);

  if (toggle) {
    toggle.addEventListener('click', () => {
      const current = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem('theme', next);
    });
  }

  // Mobile menu toggle
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileClose = document.getElementById('mobile-close');
  function openMobile() {
    if (mobileMenu) { mobileMenu.classList.remove('translate-x-full'); mobileMenu.classList.add('translate-x-0'); }
  }
  function closeMobile() {
    if (mobileMenu) { mobileMenu.classList.add('translate-x-full'); mobileMenu.classList.remove('translate-x-0'); }
  }
  if (menuBtn) menuBtn.addEventListener('click', openMobile);
  if (mobileClose) mobileClose.addEventListener('click', closeMobile);

  // Parallax effect for hero image
  const heroImg = document.getElementById('hero-img');
  if (heroImg) {
    let latestScroll = 0;
    let ticking = false;
    window.addEventListener('scroll', () => {
      latestScroll = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const movement = latestScroll * 0.2; // slower than scroll
          heroImg.style.transform = `translateY(${movement}px)`;
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // Accordion functionality for FAQ
  const accButtons = document.querySelectorAll('.accordion-btn');
  accButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      const panel = btn.nextElementSibling;
      if (!panel) return;
      if (!expanded) {
        panel.classList.add('accordion-open');
        // adjust max-height to scrollHeight for smooth open
        panel.style.maxHeight = panel.scrollHeight + 'px';
      } else {
        panel.style.maxHeight = 0;
        panel.classList.remove('accordion-open');
      }
    });
  });
});
