/**
 * Nexus - Futuristic Website
 * Handles: cursor, loader, theme, nav, parallax, particles, testimonials, contact, AI demos
 */

(function () {
  'use strict';

  // ========== Loader ==========
  window.addEventListener('load', function () {
    const loader = document.getElementById('loader');
    if (loader) {
      loader.classList.add('hidden');
      setTimeout(function () {
        loader.style.display = 'none';
      }, 500);
    }
  });

  // ========== Custom Cursor ==========
  const cursor = document.getElementById('cursor');
  const cursorFollower = document.getElementById('cursorFollower');

  if (cursor && cursorFollower && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
    });

    function animateFollower() {
      followerX += (mouseX - followerX) * 0.15;
      followerY += (mouseY - followerY) * 0.15;
      cursorFollower.style.left = followerX + 'px';
      cursorFollower.style.top = followerY + 'px';
      requestAnimationFrame(animateFollower);
    }
    animateFollower();

    document.querySelectorAll('a, button, .btn, .service-card, .portfolio-card, .feature-tab').forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        cursor.classList.add('hover');
        cursorFollower.classList.add('hover');
      });
      el.addEventListener('mouseleave', function () {
        cursor.classList.remove('hover');
        cursorFollower.classList.remove('hover');
      });
    });
  } else {
    document.body.classList.add('no-cursor');
  }

  // ========== Theme Toggle ==========
  const themeToggle = document.getElementById('themeToggle');
  const stored = localStorage.getItem('theme');

  if (stored) {
    document.documentElement.setAttribute('data-theme', stored);
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });
  }

  // ========== Mobile Nav ==========
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
      document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    navMenu.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // ========== Smooth scroll for anchor links ==========
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ========== AOS (Animate On Scroll) ==========
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 700,
      offset: 80,
      once: true,
      easing: 'ease-out-cubic'
    });
  }

  // ========== Parallax ==========
  const parallaxElements = document.querySelectorAll('[data-parallax]');

  window.addEventListener('scroll', function () {
    const scrollY = window.scrollY;
    parallaxElements.forEach(function (el) {
      const rate = parseFloat(el.getAttribute('data-parallax')) || 0.3;
      const yPos = -(scrollY * rate);
      el.style.transform = 'translate3d(0, ' + yPos + 'px, 0)';
    });
  });

  // ========== Particles ==========
  const particlesContainer = document.getElementById('particles');
  if (particlesContainer) {
    const count = 30;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.left = Math.random() * 100 + '%';
      p.style.top = Math.random() * 100 + '%';
      p.style.animationDelay = Math.random() * 15 + 's';
      p.style.animationDuration = (10 + Math.random() * 10) + 's';
      particlesContainer.appendChild(p);
    }
  }

  // ========== Feature Tabs (AI sections) ==========
  const featureTabs = document.querySelectorAll('.feature-tab');
  const featurePanels = document.querySelectorAll('.feature-panel');

  featureTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      const target = this.getAttribute('data-tab');
      featureTabs.forEach(function (t) { t.classList.remove('active'); });
      featurePanels.forEach(function (p) {
        p.classList.remove('active');
        if (p.getAttribute('data-panel') === target) p.classList.add('active');
      });
      this.classList.add('active');
    });
  });

  // ========== AI Chat (demo) ==========
  const chatInput = document.getElementById('chatInput');
  const chatSend = document.querySelector('.chat-send');
  const chatMessages = document.querySelector('.chat-messages');

  if (chatSend && chatMessages) {
    function addMessage(text, isUser) {
      const div = document.createElement('div');
      div.className = 'chat-msg ' + (isUser ? 'user' : 'bot');
      div.textContent = text;
      chatMessages.appendChild(div);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    chatSend.addEventListener('click', function () {
      const val = chatInput && chatInput.value.trim();
      if (!val) return;
      addMessage(val, true);
      if (chatInput) chatInput.value = '';
      setTimeout(function () {
        addMessage('Thanks for your message! This is a demo. In production, an AI would reply here.', false);
      }, 800);
    });

    if (chatInput) {
      chatInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          chatSend.click();
        }
      });
    }
  }

  // ========== AI Translator (demo) ==========
  const translatorBtn = document.querySelector('.translator-btn');
  const translatorTextarea = document.querySelector('.translator-textarea');
  const translatorOutput = document.querySelector('.translator-output');

  if (translatorBtn && translatorOutput) {
    translatorBtn.addEventListener('click', function () {
      const text = translatorTextarea ? translatorTextarea.value.trim() : '';
      translatorOutput.textContent = text
        ? '[Demo] Translation of: "' + text.substring(0, 50) + (text.length > 50 ? '..."' : '"')
        : 'Translation will appear here...';
    });
  }

  // ========== AI Search (demo) ==========
  const aiSearchInput = document.getElementById('aiSearchInput');
  const searchBtn = document.querySelector('.search-btn');
  const searchResults = document.getElementById('searchResults');

  if (searchBtn && searchResults) {
    searchBtn.addEventListener('click', function () {
      const query = aiSearchInput ? aiSearchInput.value.trim() : '';
      searchResults.innerHTML = query
        ? '<p class="search-placeholder">[Demo] AI results for: <strong>' + escapeHtml(query) + '</strong>. In production, this would show real AI-powered search results.</p>'
        : '<p class="search-placeholder">Your AI-powered results will appear here.</p>';
    });

    if (aiSearchInput) {
      aiSearchInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          searchBtn.click();
        }
      });
    }

    document.querySelectorAll('.suggestion-chip').forEach(function (chip) {
      chip.addEventListener('click', function () {
        if (aiSearchInput) aiSearchInput.value = this.textContent.trim();
        searchBtn.click();
      });
    });
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // ========== Testimonial Slider ==========
  const track = document.getElementById('testimonialTrack');
  const dotsContainer = document.getElementById('testimonialDots');
  const cards = track ? track.querySelectorAll('.testimonial-card') : [];
  let currentSlide = 0;
  const totalSlides = cards.length;
  function goToSlide(index) {
    if (!track || !totalSlides) return;
    currentSlide = (index + totalSlides) % totalSlides;
    const slideWidth = 100 / totalSlides;
    track.style.transform = 'translateX(-' + (currentSlide * slideWidth) + '%)';
    if (dotsContainer) {
      dotsContainer.querySelectorAll('.testimonial-dot').forEach(function (d, i) {
        d.classList.toggle('active', i === currentSlide);
      });
    }
  }

  if (totalSlides && dotsContainer) {
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('button');
      dot.className = 'testimonial-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Go to testimonial ' + (i + 1));
      dot.addEventListener('click', function () {
        goToSlide(i);
      });
      dotsContainer.appendChild(dot);
    }

    let autoplay = setInterval(function () {
      goToSlide(currentSlide + 1);
    }, 5000);

    if (track) {
      track.parentElement.addEventListener('mouseenter', function () {
        clearInterval(autoplay);
      });
      track.parentElement.addEventListener('mouseleave', function () {
        autoplay = setInterval(function () {
          goToSlide(currentSlide + 1);
        }, 5000);
      });
    }
  }

  // ========== Contact Form ==========
  const contactForm = document.getElementById('contactForm');
  const notification = document.getElementById('notification');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      // Demo: just show notification
      if (notification) {
        notification.classList.add('show');
        setTimeout(function () {
          notification.classList.remove('show');
        }, 3000);
      }
      contactForm.reset();
    });
  }

  // ========== Nav bar background on scroll ==========
  const nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 50);
    });
  }
})();
