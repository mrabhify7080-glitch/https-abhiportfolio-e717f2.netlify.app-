/* ============================================================
   ABHISHEK — Digital Growth Strategist
   JavaScript: Animations, Interactions & Form Logic
   ============================================================ */

(function () {
  'use strict';

  // ---------- SCROLL PROGRESS BAR ----------
  const scrollProgress = document.getElementById('scrollProgress');

  function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = progress + '%';
  }

  // ---------- HEADER SCROLL EFFECT ----------
  const header = document.getElementById('header');
  let lastScroll = 0;

  function handleHeaderScroll() {
    const currentScroll = window.scrollY;

    if (currentScroll > 50) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }

    lastScroll = currentScroll;
  }

  // ---------- SCROLL REVEAL (IntersectionObserver) ----------
  function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

    if (!('IntersectionObserver' in window)) {
      // Fallback: show all elements immediately
      revealElements.forEach(function (el) {
        el.classList.add('visible');
      });
      return;
    }

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  }

  // ---------- MOBILE MENU ----------
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  let menuOpen = false;

  function toggleMenu() {
    menuOpen = !menuOpen;
    hamburger.classList.toggle('active', menuOpen);
    mobileMenu.classList.toggle('active', menuOpen);
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  }

  hamburger.addEventListener('click', toggleMenu);

  hamburger.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleMenu();
    }
  });

  // Close menu when clicking links
  mobileMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      if (menuOpen) {
        toggleMenu();
      }
    });
  });

  // ---------- SMOOTH SCROLL FOR ANCHOR LINKS ----------
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 80;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    });
  });

  // ---------- FAQ ACCORDION ----------
  const faqItems = document.querySelectorAll('.faq__item');

  faqItems.forEach(function (item) {
    const question = item.querySelector('.faq__question');
    const answer = item.querySelector('.faq__answer');

    question.addEventListener('click', function () {
      const isActive = item.classList.contains('active');

      // Close all FAQ items
      faqItems.forEach(function (otherItem) {
        otherItem.classList.remove('active');
        var otherAnswer = otherItem.querySelector('.faq__answer');
        otherAnswer.style.maxHeight = null;
      });

      // Toggle current
      if (!isActive) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // ---------- MAGNETIC BUTTON EFFECT ----------
  function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn--primary, .btn--red, .header__cta');

    buttons.forEach(function (btn) {
      btn.addEventListener('mousemove', function (e) {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = 'translate(' + x * 0.15 + 'px, ' + (y * 0.15 - 2) + 'px)';
      });

      btn.addEventListener('mouseleave', function () {
        btn.style.transform = '';
      });
    });
  }

  // ---------- CONTACT FORM VALIDATION ----------
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('contact-name');
      const email = document.getElementById('contact-email');
      const details = document.getElementById('contact-details');

      let isValid = true;

      // Reset states
      [name, email, details].forEach(function (field) {
        field.style.borderColor = '';
      });

      if (!name.value.trim()) {
        name.style.borderColor = '#B11226';
        isValid = false;
      }

      if (!email.value.trim() || !isValidEmail(email.value)) {
        email.style.borderColor = '#B11226';
        isValid = false;
      }

      if (!details.value.trim()) {
        details.style.borderColor = '#B11226';
        isValid = false;
      }

      if (isValid) {
        // Show success state
        var submitBtn = contactForm.querySelector('.contact__submit .btn');
        var originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Brief Sent ✓';
        submitBtn.style.background = '#22C55E';
        submitBtn.disabled = true;

        setTimeout(function () {
          submitBtn.innerHTML = originalText;
          submitBtn.style.background = '';
          submitBtn.disabled = false;
          contactForm.reset();
        }, 3000);
      }
    });
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // ---------- HERO PARALLAX (subtle) ----------
  function initHeroParallax() {
    const heroVisual = document.querySelector('.hero__visual');
    if (!heroVisual) return;

    var ticking = false;

    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          var scrollY = window.scrollY;
          if (scrollY < window.innerHeight) {
            heroVisual.style.transform = 'translateY(calc(-50% + ' + scrollY * 0.15 + 'px))';
          }
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // ---------- ABOUT KEYWORDS HOVER STAGGER ----------
  function initKeywordEffects() {
    const keywords = document.querySelectorAll('.about__keyword');
    keywords.forEach(function (kw, i) {
      kw.style.transitionDelay = i * 0.05 + 's';
    });
  }

  // ---------- COMBINED SCROLL HANDLER (debounced) ----------
  var scrollTicking = false;

  function onScroll() {
    if (!scrollTicking) {
      requestAnimationFrame(function () {
        updateScrollProgress();
        handleHeaderScroll();
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // ---------- INIT ----------
  document.addEventListener('DOMContentLoaded', function () {
    initScrollReveal();
    initMagneticButtons();
    initHeroParallax();
    initKeywordEffects();

    // Initial calls
    updateScrollProgress();
    handleHeaderScroll();
  });
})();
