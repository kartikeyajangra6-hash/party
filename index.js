// ========== PARTICLE SYSTEM ==========
class ParticleSystem {
  constructor(container, count = 60) {
    this.container = container;
    this.count = count;
    this.init();
  }

  init() {
    for (let i = 0; i < this.count; i++) {
      this.createParticle();
    }
  }

  createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';

    // Random properties
    const size = Math.random() * 5 + 2;
    const colors = ['#ff4d4d', '#ff6a2b', '#ff8040', '#00ffff', '#ffffff'];
    const color = colors[Math.floor(Math.random() * colors.length)];

    Object.assign(particle.style, {
      width: `${size}px`,
      height: `${size}px`,
      left: `${Math.random() * 100}%`,
      background: color,
      boxShadow: `0 0 ${size * 3}px ${color}`,
      animationDuration: `${Math.random() * 15 + 15}s`,
      animationDelay: `${Math.random() * 10}s`
    });

    this.container.appendChild(particle);
  }
}

// ========== CUSTOM CURSOR ==========
class CustomCursor {
  constructor() {
    this.dot = document.getElementById('cursorDot');
    this.ring = document.getElementById('cursorRing');
    if (!this.dot || !this.ring) return;

    this.mouseX = 0;
    this.mouseY = 0;
    this.dotX = 0;
    this.dotY = 0;
    this.ringX = 0;
    this.ringY = 0;

    this.init();
  }

  init() {
    document.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    });

    this.animate();
    this.setupHoverEffects();
  }

  animate() {
    // Dot follows instantly
    this.dotX += (this.mouseX - this.dotX) * 0.3;
    this.dotY += (this.mouseY - this.dotY) * 0.3;

    // Ring follows with delay
    this.ringX += (this.mouseX - this.ringX) * 0.12;
    this.ringY += (this.mouseY - this.ringY) * 0.12;

    this.dot.style.left = `${this.dotX}px`;
    this.dot.style.top = `${this.dotY}px`;
    this.ring.style.left = `${this.ringX}px`;
    this.ring.style.top = `${this.ringY}px`;

    requestAnimationFrame(() => this.animate());
  }

  setupHoverEffects() {
    const hoverElements = document.querySelectorAll('a, button, .card, .faq-box, .rule-card, .slide, .magnetic');

    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        this.dot.classList.add('hover');
        this.ring.classList.add('hover');
      });
      el.addEventListener('mouseleave', () => {
        this.dot.classList.remove('hover');
        this.ring.classList.remove('hover');
      });
    });
  }
}

// ========== TYPING EFFECT ==========
class TypeWriter {
  constructor(element, texts, speed = 80, pause = 2000) {
    this.element = element;
    this.texts = texts;
    this.speed = speed;
    this.pause = pause;
    this.textIndex = 0;
    this.charIndex = 0;
    this.isDeleting = false;

    if (this.element) this.type();
  }

  type() {
    const currentText = this.texts[this.textIndex];

    if (this.isDeleting) {
      this.element.textContent = currentText.substring(0, this.charIndex - 1);
      this.charIndex--;
    } else {
      this.element.textContent = currentText.substring(0, this.charIndex + 1);
      this.charIndex++;
    }

    let typeSpeed = this.speed;

    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    if (!this.isDeleting && this.charIndex === currentText.length) {
      typeSpeed = this.pause;
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.textIndex = (this.textIndex + 1) % this.texts.length;
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

// ========== MAGNETIC EFFECT ==========
class MagneticEffect {
  constructor() {
    this.elements = document.querySelectorAll('.magnetic');
    this.init();
  }

  init() {
    this.elements.forEach(el => {
      el.addEventListener('mousemove', (e) => this.onMouseMove(e, el));
      el.addEventListener('mouseleave', (e) => this.onMouseLeave(e, el));
    });
  }

  onMouseMove(e, el) {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  }

  onMouseLeave(e, el) {
    el.style.transform = 'translate(0, 0)';
  }
}

// ========== SCROLL EFFECTS ==========
class ScrollEffects {
  constructor() {
    this.navbar = document.querySelector('.navbar');
    this.revealElements = document.querySelectorAll('.HH, .events, .wrapper, .vibe-container, .gallery-section, .who-section, .got, .got2, .got3, .inside');

    this.init();
  }

  init() {
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
      if (this.navbar) {
        this.navbar.classList.toggle('scrolled', window.scrollY > 100);
      }
    });

    // Scroll reveal
    this.revealElements.forEach(el => el.classList.add('scroll-reveal'));

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, { threshold: 0.1, rootMargin: '-50px' });

    this.revealElements.forEach(el => this.observer.observe(el));

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }
}

// ========== TILT EFFECT ==========
class TiltEffect {
  constructor() {
    this.elements = document.querySelectorAll('.card, .rule-card');
    this.init();
  }

  init() {
    this.elements.forEach(el => {
      el.addEventListener('mousemove', (e) => this.onMove(e, el));
      el.addEventListener('mouseleave', (e) => this.onLeave(e, el));
    });
  }

  onMove(e, el) {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;

    el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  }

  onLeave(e, el) {
    el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
  }
}

// ========== PARALLAX ORB EFFECT ==========
class ParallaxOrbs {
  constructor() {
    this.orbs = document.querySelectorAll('.glow-orb');
    if (this.orbs.length) this.init();
  }

  init() {
    document.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 50;
      const y = (e.clientY / window.innerHeight - 0.5) * 50;

      this.orbs.forEach((orb, i) => {
        const factor = (i + 1) * 0.3;
        orb.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
      });
    });
  }
}

// ========== CAROUSEL (Enhanced) ==========
class Carousel {
  constructor() {
    this.slides = document.querySelectorAll('.slide');
    this.dots = document.querySelectorAll('.dot');
    this.track = document.querySelector('.track');
    this.current = 0;
    this.autoSlide = null;

    if (this.slides.length) this.init();
  }

  init() {
    this.move(0);
    this.startAuto();

    this.dots.forEach(dot => {
      dot.addEventListener('click', () => {
        this.stopAuto();
        this.move(parseInt(dot.dataset.index));
        this.startAuto();
      });
    });

    // Pause on hover
    if (this.track) {
      this.track.addEventListener('mouseenter', () => this.stopAuto());
      this.track.addEventListener('mouseleave', () => this.startAuto());
    }
  }

  move(index) {
    this.slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
      if (this.dots[i]) this.dots[i].classList.toggle('active', i === index);
    });

    if (this.track && this.slides[0]) {
      const slideWidth = this.slides[0].offsetWidth + 40;
      this.track.style.transform = `translateX(${-(index * slideWidth) + slideWidth}px)`;
    }

    this.current = index;
  }

  startAuto() {
    this.autoSlide = setInterval(() => {
      this.move((this.current + 1) % this.slides.length);
    }, 4000);
  }

  stopAuto() {
    clearInterval(this.autoSlide);
  }
}

// ========== COUNTER ANIMATION ==========
class CounterAnimation {
  constructor() {
    this.counters = document.querySelectorAll('[data-count]');
    if (this.counters.length) this.init();
  }

  init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    this.counters.forEach(counter => observer.observe(counter));
  }

  animate(el) {
    const target = parseInt(el.dataset.count);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const update = () => {
      current += step;
      if (current < target) {
        el.textContent = Math.floor(current);
        requestAnimationFrame(update);
      } else {
        el.textContent = target;
      }
    };

    update();
  }
}

// ========== INIT ALL ==========
document.addEventListener('DOMContentLoaded', () => {
  // Particles
  const particleContainer = document.getElementById('particles');
  if (particleContainer) new ParticleSystem(particleContainer, 50);

  // Custom cursor
  new CustomCursor();

  // Typing effect
  const typingElement = document.querySelector('.typing-text');
  if (typingElement) {
    new TypeWriter(typingElement, [
      'Most curated house party experience',
      'Where strangers become stories',
      'Chandigarh\'s best kept secret',
      'The vibe you\'ve been searching for'
    ], 70, 2500);
  }

  // Magnetic effect
  new MagneticEffect();

  // Scroll effects
  new ScrollEffects();

  // Tilt effect
  new TiltEffect();

  // Parallax orbs
  new ParallaxOrbs();

  // Carousel
  new Carousel();

  // Counter animation
  new CounterAnimation();
});

// Re-initialize on load
window.addEventListener('load', () => {
  // Trigger any position-dependent recalculations
  window.dispatchEvent(new Event('resize'));
});

// Performance: Reduce animations on low-power mode
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.style.setProperty('--animation-duration', '0.01s');
}
