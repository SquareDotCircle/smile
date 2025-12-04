/**
 * Main JavaScript
 * Inspired by SPA patterns from reference analysis
 */

// Device detection
const deviceInfo = {
  isMobile: /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
  isTouch: 'ontouchstart' in window,
  width: window.innerWidth,
  height: window.innerHeight
};

// Add device classes
if (deviceInfo.isMobile) {
  document.documentElement.classList.add('mobile');
} else {
  document.documentElement.classList.add('desktop');
}

if (deviceInfo.isTouch) {
  document.documentElement.classList.add('touch');
}

// Navigation toggle for mobile
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navToggle.classList.toggle('active');
  });
}

// Hide nav on scroll down, show on scroll up
let lastScroll = 0;
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll <= 0) {
    nav.style.transform = 'translateY(0)';
    return;
  }
  
  if (currentScroll > lastScroll && currentScroll > 100) {
    // Scrolling down
    nav.style.transform = 'translateY(-100%)';
  } else {
    // Scrolling up
    nav.style.transform = 'translateY(0)';
  }
  
  lastScroll = currentScroll;
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Language switcher (placeholder)
const langButton = document.querySelector('.lang');
if (langButton) {
  langButton.addEventListener('click', () => {
    const currentLang = langButton.textContent;
    const newLang = currentLang === 'EN' ? 'ES' : 'EN';
    langButton.textContent = newLang;
    // In a real app, this would trigger language switching
    console.log(`Language switched to: ${newLang}`);
  });
}

// Log device info
console.log('Device Info:', deviceInfo);
console.log('Template:', document.body.dataset.template);

// Add intersection observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
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

// Observe cards for animation
document.querySelectorAll('.card').forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(card);
});

// Window resize handler
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    deviceInfo.width = window.innerWidth;
    deviceInfo.height = window.innerHeight;
    console.log('Window resized:', deviceInfo.width, 'x', deviceInfo.height);
  }, 250);
});

console.log('✨ Site initialized');

