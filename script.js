// CAT-SET Professional SOC & NOC Platform - Script
document.addEventListener('DOMContentLoaded', async () => {
  // ==================== PARTICLES.JS CONFIGURATION ====================
  if (typeof tsParticles !== 'undefined') {
    await tsParticles.load('particles-container', {
      particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: '#00d4ff' },
        shape: { type: 'circle' },
        opacity: { value: 0.5 },
        size: { value: 3, random: true, anim: { enable: true, speed: 2 } },
        line_linked: {
          enable: true,
          distance: 150,
          color: '#00d4ff',
          opacity: 0.2,
          width: 1,
        },
        move: {
          enable: true,
          speed: 1,
          direction: 'none',
          random: false,
          straight: false,
          out_mode: 'out',
          bounce: false,
        },
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: { enable: true, mode: 'repulse' },
          onclick: { enable: true, mode: 'push' },
          resize: true,
        },
        modes: {
          repulse: { distance: 100, duration: 0.4 },
          push: { particles_nb: 4 },
        },
      },
      retina_detect: true,
    });
  }

  // ==================== SMOOTH SCROLL ====================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ==================== SCROLL REVEAL ANIMATIONS ====================
  const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Apply scroll reveal to sections and cards
  document.querySelectorAll('section, .metric-card, .service-card, .comparison-card').forEach(el => {
    el.classList.add('scroll-reveal');
    observer.observe(el);
  });

  // ==================== METRIC COUNTER ANIMATION ====================
  const countElements = document.querySelectorAll('[data-target]');
  function animateCounter(element) {
    const target = parseInt(element.dataset.target);
    const increment = target / 50;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current);
      }
    }, 30);
  }

  // Trigger counters when they become visible
  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  countElements.forEach(el => counterObserver.observe(el));

  // ==================== FAQ ACCORDION ====================
  document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
      const isOpen = button.getAttribute('aria-expanded') === 'true';
      const answer = button.nextElementSibling;
      const icon = button.querySelector('.faq-icon');

      // Close all other items
      document.querySelectorAll('.faq-question').forEach(otherBtn => {
        if (otherBtn !== button && otherBtn.getAttribute('aria-expanded') === 'true') {
          otherBtn.setAttribute('aria-expanded', 'false');
          otherBtn.nextElementSibling.classList.remove('active');
          otherBtn.querySelector('.faq-icon').classList.remove('active');
        }
      });

      // Toggle current item
      button.setAttribute('aria-expanded', !isOpen);
      if (!isOpen) {
        answer.classList.add('active');
        icon.classList.add('active');
      } else {
        answer.classList.remove('active');
        icon.classList.remove('active');
      }
    });
  });

  // ==================== CONTACT FORM ====================
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const company = document.getElementById('company').value;
      const message = document.getElementById('message').value;

      if (name && email && message) {
        const mailtoLink = `mailto:catseconline@gmail.com?subject=Consulta SOC/NOC de ${name}&body=Nombre: ${name}%0DEmail: ${email}%0DEmpresa: ${company}%0DMensaje: ${message}`;
        window.location.href = mailtoLink;
      } else {
        alert('Por favor completa los campos requeridos.');
      }
    });
  }

  // ==================== SCROLL PARALLAX EFFECT ====================
  window.addEventListener('scroll', () => {
    const hero = document.getElementById('hero');
    if (hero) {
      const offset = window.scrollY * 0.5;
      hero.style.transform = `translateY(${offset}px)`;
    }
  });
});

// ==================== DARK/LIGHT MODE TOGGLE (OPTIONAL) ====================
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
document.documentElement.style.colorScheme = prefersDark ? 'dark' : 'light';

