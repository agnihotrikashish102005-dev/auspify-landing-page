/**
 * AUSPIFY - Bring Future Through Tech
 * Landing Page Interactive Script
 */

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------------------------------
  // 1. Current Year in Footer
  // --------------------------------------------------------------------------
  const currentYearElem = document.getElementById('currentYear');
  if (currentYearElem) {
    currentYearElem.textContent = new Date().getFullYear();
  }

  // --------------------------------------------------------------------------
  // 2. Theme Toggle (Light / Dark Mode)
  // --------------------------------------------------------------------------
  const themeToggle = document.getElementById('themeToggle');
  const htmlElem = document.documentElement;

  // Retrieve saved theme or system preference
  const savedTheme = localStorage.getItem('auspify-theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme) {
    htmlElem.setAttribute('data-theme', savedTheme);
  } else if (systemPrefersDark) {
    htmlElem.setAttribute('data-theme', 'dark');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = htmlElem.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      htmlElem.setAttribute('data-theme', newTheme);
      localStorage.setItem('auspify-theme', newTheme);
      showToast(`Switched to ${newTheme} mode`, 'info');
    });
  }

  // --------------------------------------------------------------------------
  // 3. Sticky Navigation & Scroll Header Effect
  // --------------------------------------------------------------------------
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  // --------------------------------------------------------------------------
  // 4. Mobile Menu Navigation Drawer (Hamburger)
  // --------------------------------------------------------------------------
  const menuToggle = document.getElementById('menuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  const toggleMobileMenu = (open) => {
    const isOpen = open !== undefined ? open : !mobileDrawer.classList.contains('is-open');
    menuToggle.classList.toggle('is-active', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    mobileDrawer.classList.toggle('is-open', isOpen);
    mobileDrawer.setAttribute('aria-hidden', String(!isOpen));

    if (isOpen) {
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    } else {
      document.body.style.overflow = '';
    }
  };

  if (menuToggle && mobileDrawer) {
    menuToggle.addEventListener('click', () => toggleMobileMenu());

    // Close mobile menu when clicking any nav link
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => toggleMobileMenu(false));
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer.classList.contains('is-open')) {
        toggleMobileMenu(false);
      }
    });
  }

  // --------------------------------------------------------------------------
  // 5. Active Link Highlight on Scroll
  // --------------------------------------------------------------------------
  const navLinks = document.querySelectorAll('.nav-menu .nav-link');
  const sections = document.querySelectorAll('section[id], main > section');

  const highlightNav = () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };
  window.addEventListener('scroll', highlightNav, { passive: true });

  // --------------------------------------------------------------------------
  // 6. Intersection Observer: Scroll Reveal Animations (Step 4)
  // --------------------------------------------------------------------------
  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry, idx) => {
        if (entry.isIntersecting) {
          // Slight staggered entry
          setTimeout(() => {
            entry.target.classList.add('is-visible');
          }, idx * 60);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    animatedElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback if IntersectionObserver not supported
    animatedElements.forEach(el => el.classList.add('is-visible'));
  }

  // --------------------------------------------------------------------------
  // 7. Animated Numbers / Metrics Counter
  // --------------------------------------------------------------------------
  const statNumbers = document.querySelectorAll('.stat-number');
  let animatedStats = false;

  const animateCounters = () => {
    statNumbers.forEach(counter => {
      const target = parseFloat(counter.getAttribute('data-target'));
      const isDecimal = target % 1 !== 0;
      const duration = 1800; // ms
      const startTime = performance.now();

      const updateCounter = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out quadratic function
        const easeOut = 1 - (1 - progress) * (1 - progress);
        const currentVal = easeOut * target;

        if (isDecimal) {
          counter.textContent = currentVal.toFixed(1);
        } else {
          counter.textContent = Math.floor(currentVal);
        }

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = isDecimal ? target.toFixed(1) : target;
        }
      };

      requestAnimationFrame(updateCounter);
    });
  };

  const statsSection = document.getElementById('stats');
  if (statsSection && 'IntersectionObserver' in window) {
    const statsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animatedStats) {
          animatedStats = true;
          animateCounters();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });

    statsObserver.observe(statsSection);
  }

  // --------------------------------------------------------------------------
  // 8. Interactive Solutions Tabs
  // --------------------------------------------------------------------------
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tabTarget = button.getAttribute('data-tab');

      // Update button active state
      tabButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      });
      button.classList.add('active');
      button.setAttribute('aria-selected', 'true');

      // Switch active pane
      tabPanes.forEach(pane => {
        pane.classList.remove('active');
        if (pane.id === `tab-${tabTarget}`) {
          pane.classList.add('active');
        }
      });
    });
  });

  // --------------------------------------------------------------------------
  // 9. Interactive FAQ Accordion
  // --------------------------------------------------------------------------
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const accordionItem = header.parentElement;
      const collapse = accordionItem.querySelector('.accordion-collapse');
      const isExpanded = header.getAttribute('aria-expanded') === 'true';

      // Close all other accordion items (single open behavior)
      document.querySelectorAll('.accordion-item').forEach(item => {
        if (item !== accordionItem) {
          item.classList.remove('active');
          item.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
          item.querySelector('.accordion-collapse').style.maxHeight = null;
        }
      });

      // Toggle current
      if (!isExpanded) {
        accordionItem.classList.add('active');
        header.setAttribute('aria-expanded', 'true');
        collapse.style.maxHeight = collapse.scrollHeight + 'px';
      } else {
        accordionItem.classList.remove('active');
        header.setAttribute('aria-expanded', 'false');
        collapse.style.maxHeight = null;
      }
    });
  });

  // --------------------------------------------------------------------------
  // 10. Interactive Modal Dialog
  // --------------------------------------------------------------------------
  const modalOverlay = document.getElementById('contactModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const openModalButtons = document.querySelectorAll('.open-modal-btn');
  const projectModalForm = document.getElementById('projectModalForm');

  const openModal = () => {
    if (modalOverlay) {
      // Close mobile drawer if open
      if (mobileDrawer && mobileDrawer.classList.contains('is-open')) {
        toggleMobileMenu(false);
      }
      modalOverlay.classList.add('is-active');
      modalOverlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      // Focus first input
      setTimeout(() => {
        const firstInput = modalOverlay.querySelector('input');
        if (firstInput) firstInput.focus();
      }, 100);
    }
  };

  const closeModal = () => {
    if (modalOverlay) {
      modalOverlay.classList.remove('is-active');
      modalOverlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  };

  openModalButtons.forEach(btn => btn.addEventListener('click', openModal));

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('is-active')) {
      closeModal();
    }
  });

  // Modal Form Submission
  if (projectModalForm) {
    projectModalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('modalFullName').value.trim();
      const email = document.getElementById('modalEmail').value.trim();

      closeModal();
      projectModalForm.reset();
      showToast(`Thank you, ${name}! Your request has been received. We'll email ${email} shortly.`);
    });
  }

  // --------------------------------------------------------------------------
  // 11. CTA Newsletter Form Submission
  // --------------------------------------------------------------------------
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('emailInput');
      const email = emailInput.value.trim();

      if (email) {
        emailInput.value = '';
        showToast(`🎉 Success! We've sent consultation info to ${email}.`);
      }
    });
  }

  // --------------------------------------------------------------------------
  // 12. Toast Notification Helper
  // --------------------------------------------------------------------------
  function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <span class="toast-icon">${type === 'success' ? '✓' : 'ℹ'}</span>
      <span class="toast-text">${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(15px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 350);
    }, 4000);
  }
});
