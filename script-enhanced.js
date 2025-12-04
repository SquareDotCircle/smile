/**
 * Enhanced JavaScript
 * Based on SPA patterns from reference site
 */

// ============================================
// Device Detection & Initialization
// ============================================

const App = {
  device: {
    isMobile: /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
    isTouch: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
    width: window.innerWidth,
    height: window.innerHeight,
    type: 'desktop'
  },
  
  init() {
    this.detectDevice();
    this.setupLoader();
    this.setupNavigation();
    this.setupScrollEffects();
    this.setupAnimations();
    this.setupForms();
    this.setupCookies();
    this.setupSmoothScroll();
    
    console.log('✨ App initialized', this.device);
  },
  
  detectDevice() {
    if (this.device.isMobile) {
      if (window.innerWidth > 767) {
        this.device.type = window.innerWidth > window.innerHeight ? 'tabletL' : 'tabletS';
      } else {
        this.device.type = 'mobile';
      }
      document.documentElement.classList.add('mobile', this.device.type);
    } else {
      document.documentElement.classList.add('desktop', 'smooth');
    }
    
    if (this.device.isTouch) {
      document.documentElement.classList.add('touch');
    }
  },
  
  // ============================================
  // Loader
  // ============================================
  
  setupLoader() {
    const loader = document.querySelector('.loader');
    
    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.classList.add('hidden');
      }, 800);
    });
  },
  
  // ============================================
  // Navigation
  // ============================================
  
  setupNavigation() {
    const nav = document.querySelector('.nav');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinkItems = document.querySelectorAll('.nav-links .link');
    
    // Remove lastScroll variable as it's no longer needed
    // Toggle mobile menu
    if (navToggle) {
      navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
      });
    }
    
    // Close mobile menu on link click
    navLinkItems.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 768) {
          navToggle.classList.remove('active');
          navLinks.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
    });
    
    // Hide/show nav on scroll & toggle hamburger
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      
      // Add scrolled class and show hamburger
      if (currentScroll > 50) {
        nav.classList.add('nav-scrolled');
        navToggle.classList.add('show');
      } else {
        nav.classList.remove('nav-scrolled');
        navToggle.classList.remove('show');
        // Close menu when scrolling back to top
        if (window.innerWidth >= 768) {
          navToggle.classList.remove('active');
          navLinks.classList.remove('active');
        }
      }
      
      // Navbar is now persistent, removed auto-hide logic
    });
    
    // Active link on scroll
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
      const scrollY = window.pageYOffset;
      
      sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 150;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-links .link[href="#${sectionId}"]`);
        
        if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLinkItems.forEach(link => link.classList.remove('act'));
          navLink.classList.add('act');
        }
      });
    });
    
    // Language switcher
    const langButton = document.querySelector('.lang');
    if (langButton) {
      langButton.addEventListener('click', () => {
        const currentLang = langButton.querySelector('span').textContent;
        const newLang = currentLang === 'EN' ? 'ES' : 'EN';
        langButton.querySelector('span').textContent = newLang;
        document.body.dataset.lang = newLang.toLowerCase();
        console.log(`Language switched to: ${newLang}`);
      });
    }
  },
  
  // ============================================
  // Scroll Effects
  // ============================================
  
  setupScrollEffects() {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);
    
    // Observe elements for fade-in
    const animateElements = document.querySelectorAll('.split-layout, .card-follow, .contribute-card');
    
    animateElements.forEach((el, index) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(40px)';
      el.style.transition = `opacity 0.8s ease ${index * 0.1}s, transform 0.8s ease ${index * 0.1}s`;
      observer.observe(el);
    });
  },
  
  // ============================================
  // Animations
  // ============================================
  
  setupAnimations() {
    // Parallax effect on intro background
    const introBg = document.querySelector('.intro-bg');
    if (introBg) {
      window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;
        introBg.style.transform = `translateY(${rate}px)`;
      });
    }
  },
  
  // ============================================
  // Forms
  // ============================================
  
  setupForms() {
    const form = document.querySelector('.form');
    
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        console.log('Form submitted:', data);
        
        // Show success message
        const button = form.querySelector('button[type="submit"]');
        const originalText = button.textContent;
        button.textContent = 'Message Sent!';
        button.disabled = true;
        
        setTimeout(() => {
          button.textContent = originalText;
          button.disabled = false;
          form.reset();
        }, 3000);
      });
      
      // Floating label effect
      const fields = form.querySelectorAll('.field input, .field textarea');
      fields.forEach(field => {
        field.addEventListener('focus', () => {
          field.parentElement.classList.add('focused');
        });
        
        field.addEventListener('blur', () => {
          if (!field.value) {
            field.parentElement.classList.remove('focused');
          }
        });
      });
    }
  },
  
  // ============================================
  // Cookies
  // ============================================
  
  setupCookies() {
    const cookieBanner = document.querySelector('.cookies');
    const acceptButton = document.getElementById('acceptCookies');
    
    // Check if cookies were already accepted
    if (!localStorage.getItem('cookiesAccepted')) {
      setTimeout(() => {
        cookieBanner.style.display = 'block';
        setTimeout(() => {
          cookieBanner.classList.add('show');
        }, 100);
      }, 2000);
    }
    
    if (acceptButton) {
      acceptButton.addEventListener('click', () => {
        localStorage.setItem('cookiesAccepted', 'true');
        cookieBanner.classList.remove('show');
        setTimeout(() => {
          cookieBanner.style.display = 'none';
        }, 300);
      });
    }
  },
  
  // ============================================
  // Smooth Scroll
  // ============================================
  
  setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
          const navHeight = document.querySelector('.nav').offsetHeight;
          const targetPosition = target.offsetTop - navHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }
};

// ============================================
// Window Events
// ============================================

let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    App.device.width = window.innerWidth;
    App.device.height = window.innerHeight;
    
    // Re-detect device type on resize
    const oldType = App.device.type;
    document.documentElement.classList.remove(oldType);
    
    if (window.innerWidth < 768) {
      App.device.type = 'mobile';
    } else if (window.innerWidth < 1024) {
      App.device.type = window.innerWidth > window.innerHeight ? 'tabletL' : 'tabletS';
    } else {
      App.device.type = 'desktop';
    }
    
    document.documentElement.classList.add(App.device.type);
    
    console.log('Window resized:', App.device.width, 'x', App.device.height);
  }, 250);
});

// ============================================
// Initialize App
// ============================================

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => App.init());
} else {
  App.init();
}

// ============================================
// Performance Monitoring
// ============================================

window.addEventListener('load', () => {
  if (window.performance && window.performance.timing) {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log(`⚡ Page loaded in ${pageLoadTime}ms`);
  }
});

// ============================================
// Export for debugging
// ============================================

window.App = App;

