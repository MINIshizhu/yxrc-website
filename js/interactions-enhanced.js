/* ===================================
   高级交互脚本 - 滚动动画与微交互
   =================================== */

(function() {
  'use strict';

  // ===================================
  // 滚动触发动画 (类似AOS)
  // ===================================

  class ScrollAnimations {
    constructor() {
      this.elements = document.querySelectorAll('[data-aos]');
      this.init();
    }

    init() {
      // 初始隐藏所有元素
      this.elements.forEach(el => {
        el.classList.add('aos-init');
      });

      // 监听滚动
      this.handleScroll();
      window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
    }

    handleScroll() {
      const windowHeight = window.innerHeight;
      const triggerPoint = windowHeight * 0.85; // 当元素进入视口85%时触发

      this.elements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        const delay = el.getAttribute('data-aos-delay') || 0;

        if (elementTop < triggerPoint) {
          setTimeout(() => {
            el.classList.add('aos-animate');
          }, parseInt(delay));
        }
      });
    }
  }

  // ===================================
  // 数字计数动画
  // ===================================

  class CounterAnimation {
    constructor() {
      this.counters = document.querySelectorAll('.counter');
      this.animated = new Set();
      this.init();
    }

    init() {
      // 使用Intersection Observer
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !this.animated.has(entry.target)) {
            this.animateCounter(entry.target);
            this.animated.add(entry.target);
          }
        });
      }, { threshold: 0.5 });

      this.counters.forEach(counter => observer.observe(counter));
    }

    animateCounter(counter) {
      const target = parseInt(counter.getAttribute('data-target'));
      const duration = 2000; // 2秒
      const startTime = performance.now();
      const startValue = 0;

      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // 使用缓动函数
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.floor(startValue + (target - startValue) * easeOutQuart);

        counter.textContent = currentValue.toLocaleString();

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          counter.textContent = target.toLocaleString();
        }
      };

      requestAnimationFrame(animate);
    }
  }

  // ===================================
  // 平滑滚动
  // ===================================

  class SmoothScroll {
    constructor() {
      this.init();
    }

    init() {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
          e.preventDefault();
          const target = document.querySelector(anchor.getAttribute('href'));
          if (target) {
            const offsetTop = target.offsetTop - 80; // 考虑导航栏高度
            window.scrollTo({
              top: offsetTop,
              behavior: 'smooth'
            });
          }
        });
      });
    }
  }

  // ===================================
  // 按钮涟漪效果
  // ===================================

  class ButtonRipple {
    constructor() {
      this.buttons = document.querySelectorAll('.btn-ripple');
      this.init();
    }

    init() {
      this.buttons.forEach(button => {
        button.addEventListener('click', (e) => this.createRipple(e, button));
      });
    }

    createRipple(event, button) {
      const circle = document.createElement('span');
      const diameter = Math.max(button.clientWidth, button.clientHeight);
      const radius = diameter / 2;

      const rect = button.getBoundingClientRect();
      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${event.clientX - rect.left - radius}px`;
      circle.style.top = `${event.clientY - rect.top - radius}px`;
      circle.classList.add('ripple');

      const ripple = button.querySelector('.ripple');
      if (ripple) {
        ripple.remove();
      }

      button.appendChild(circle);

      // 动画结束后移除
      setTimeout(() => circle.remove(), 600);
    }
  }

  // ===================================
  // 滚动进度条
  // ===================================

  class ScrollProgress {
    constructor() {
      this.createProgressBar();
      this.init();
    }

    createProgressBar() {
      const progressBar = document.createElement('div');
      progressBar.className = 'scroll-progress';
      document.body.appendChild(progressBar);
      this.progressBar = progressBar;
    }

    init() {
      window.addEventListener('scroll', () => this.updateProgress(), { passive: true });
    }

    updateProgress() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / scrollHeight) * 100;
      this.progressBar.style.width = `${progress}%`;
    }
  }

  // ===================================
  // 导航栏滚动效果
  // ===================================

  class NavbarScroll {
    constructor() {
      this.navbar = document.querySelector('.navbar');
      this.lastScroll = 0;
      this.init();
    }

    init() {
      window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
    }

    handleScroll() {
      const currentScroll = window.pageYOffset;

      if (currentScroll > 50) {
        this.navbar.classList.add('scrolled');
      } else {
        this.navbar.classList.remove('scrolled');
      }

      this.lastScroll = currentScroll;
    }
  }

  // ===================================
  // 表单验证增强
  // ===================================

  class FormValidation {
    constructor() {
      this.forms = document.querySelectorAll('form');
      this.init();
    }

    init() {
      this.forms.forEach(form => {
        const inputs = form.querySelectorAll('.form-input, .form-textarea');

        inputs.forEach(input => {
          // 聚焦效果
          input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
          });

          input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
            this.validateField(input);
          });

          // 实时验证
          input.addEventListener('input', () => {
            if (input.classList.contains('is-invalid')) {
              this.validateField(input);
            }
          });
        });
      });
    }

    validateField(input) {
      const value = input.value.trim();
      const type = input.type;
      const required = input.hasAttribute('required');

      // 移除之前的状态
      input.classList.remove('is-valid', 'is-invalid');

      if (!required && !value) {
        return true; // 非必填且为空，不验证
      }

      let isValid = true;

      // 必填验证
      if (required && !value) {
        isValid = false;
      }

      // 邮箱验证
      if (type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isValid = emailRegex.test(value);
      }

      // 电话验证
      if (type === 'tel' && value) {
        const phoneRegex = /^1[3-9]\d{9}$/;
        isValid = phoneRegex.test(value);
      }

      // 添加状态类
      if (value) {
        input.classList.add(isValid ? 'is-valid' : 'is-invalid');
      }

      return isValid;
    }
  }

  // ===================================
  // 懒加载图片
  // ===================================

  class LazyLoad {
    constructor() {
      this.images = document.querySelectorAll('img[data-src]');
      this.init();
    }

    init() {
      if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target;
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              imageObserver.unobserve(img);
            }
          });
        });

        this.images.forEach(img => imageObserver.observe(img));
      } else {
        // 降级处理
        this.images.forEach(img => {
          img.src = img.dataset.src;
        });
      }
    }
  }

  // ===================================
  // 卡片悬停效果增强
  // ===================================

  class CardHoverEffect {
    constructor() {
      this.cards = document.querySelectorAll('.card-enhanced');
      this.init();
    }

    init() {
      this.cards.forEach(card => {
        card.addEventListener('mousemove', (e) => this.handleMouseMove(e, card));
        card.addEventListener('mouseleave', (e) => this.handleMouseLeave(e, card));
      });
    }

    handleMouseMove(e, card) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    }

    handleMouseLeave(e, card) {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    }
  }

  // ===================================
  // 初始化所有功能
  // ===================================

  function init() {
    // 等待DOM完全加载
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        new ScrollAnimations();
        new CounterAnimation();
        new SmoothScroll();
        new ButtonRipple();
        new ScrollProgress();
        new NavbarScroll();
        new FormValidation();
        new LazyLoad();
        new CardHoverEffect();
      });
    } else {
      new ScrollAnimations();
      new CounterAnimation();
      new SmoothScroll();
      new ButtonRipple();
      new ScrollProgress();
      new NavbarScroll();
      new FormValidation();
      new LazyLoad();
      new CardHoverEffect();
    }
  }

  // 导出初始化函数
  window.EnhancedInteractions = {
    init,
    ScrollAnimations,
    CounterAnimation,
    SmoothScroll,
    ButtonRipple,
    ScrollProgress,
    NavbarScroll,
    FormValidation,
    LazyLoad,
    CardHoverEffect
  };

  // 自动初始化
  init();

})();
