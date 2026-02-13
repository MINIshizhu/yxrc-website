/* ===================================
   YXRC 安防工程公司官网 - 主交互脚本
   =================================== */

// DOM 加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
  initNavbar();
  initMobileMenu();
  initScrollAnimations();
  initParticles();
  initSmoothScroll();
  initCounterAnimation();
  initImageLazyLoad();
});

/* 导航栏滚动效果 */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  let lastScrollTop = 0;
  const scrollThreshold = 100;

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // 添加滚动样式
    if (scrollTop > scrollThreshold) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // 向上滚动时显示导航栏，向下滚动时隐藏（可选功能）
    // if (scrollTop > lastScrollTop && scrollTop > 200) {
    //   navbar.style.transform = 'translateY(-100%)';
    // } else {
    //   navbar.style.transform = 'translateY(0)';
    // }

    lastScrollTop = scrollTop;
  });
}

/* 移动端菜单 */
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!hamburger || !navMenu) return;

  // 汉堡菜单点击事件
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');

    // 防止滚动
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
  });

  // 点击导航链接后关闭菜单
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // 点击页面其他地方关闭菜单
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

/* 滚动触发动画 */
function initScrollAnimations() {
  const scrollElements = document.querySelectorAll('.scroll-animate');

  if (scrollElements.length === 0) return;

  const elementInView = (el, offset = 100) => {
    const elementTop = el.getBoundingClientRect().top;
    return elementTop <= (window.innerHeight || document.documentElement.clientHeight) - offset;
  };

  const displayScrollElement = (element) => {
    element.classList.add('scrolled');
  };

  const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
      if (elementInView(el, 100)) {
        displayScrollElement(el);
      }
    });
  };

  // 初始检查
  handleScrollAnimation();

  // 滚动时检查
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleScrollAnimation();
        ticking = false;
      });
      ticking = true;
    }
  });
}

/* 粒子背景效果 */
function initParticles() {
  const particlesContainer = document.querySelector('.particles');
  if (!particlesContainer) return;

  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    createParticle(particlesContainer);
  }
}

function createParticle(container) {
  const particle = document.createElement('div');
  particle.className = 'particle';

  // 随机位置
  particle.style.left = Math.random() * 100 + '%';
  particle.style.top = Math.random() * 100 + '%';

  // 随机大小
  const size = Math.random() * 4 + 2;
  particle.style.width = size + 'px';
  particle.style.height = size + 'px';

  // 随机动画延迟
  particle.style.animationDelay = Math.random() * 20 + 's';
  particle.style.animationDuration = (Math.random() * 10 + 10) + 's';

  // 随机颜色
  const colors = ['#0066ff', '#00d4ff', '#00ff88'];
  particle.style.background = colors[Math.floor(Math.random() * colors.length)];

  container.appendChild(particle);
}

/* 平滑滚动 */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });
}

/* 数字计数动画 */
function initCounterAnimation() {
  const counters = document.querySelectorAll('.counter');

  if (counters.length === 0) return;

  const animateCounter = (counter) => {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = parseInt(counter.getAttribute('data-duration')) || 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
      current += increment;
      if (current < target) {
        counter.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };

    updateCounter();
  };

  // 使用 Intersection Observer 触发动画
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
        entry.target.classList.add('animated');
        animateCounter(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

/* 图片懒加载 */
function initImageLazyLoad() {
  const images = document.querySelectorAll('img[data-src]');

  if (images.length === 0) return;

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

  images.forEach(img => imageObserver.observe(img));
}

/* 标签筛选功能 */
function initFilterTabs() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const filterItems = document.querySelectorAll('.filter-item');

  if (filterButtons.length === 0 || filterItems.length === 0) return;

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // 移除所有按钮的活跃状态
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      filterItems.forEach(item => {
        if (filter === 'all' || item.classList.contains(filter)) {
          item.style.display = 'block';
          item.classList.add('animate-fadeIn');
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* 轮播图功能 */
function initCarousel() {
  const carousel = document.querySelector('.carousel');
  if (!carousel) return;

  const slides = carousel.querySelectorAll('.carousel-slide');
  const prevBtn = carousel.querySelector('.carousel-prev');
  const nextBtn = carousel.querySelector('.carousel-next');
  const indicators = carousel.querySelectorAll('.carousel-indicator');

  if (slides.length === 0) return;

  let currentIndex = 0;
  let autoPlayInterval;

  const showSlide = (index) => {
    // 处理边界
    if (index >= slides.length) index = 0;
    if (index < 0) index = slides.length - 1;

    // 隐藏所有幻灯片
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));

    // 显示当前幻灯片
    slides[index].classList.add('active');
    indicators[index].classList.add('active');

    currentIndex = index;
  };

  const nextSlide = () => showSlide(currentIndex + 1);
  const prevSlide = () => showSlide(currentIndex - 1);

  // 按钮事件
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);

  // 指示器事件
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => showSlide(index));
  });

  // 自动播放
  const startAutoPlay = () => {
    autoPlayInterval = setInterval(nextSlide, 5000);
  };

  const stopAutoPlay = () => {
    clearInterval(autoPlayInterval);
  };

  // 鼠标悬停时停止自动播放
  carousel.addEventListener('mouseenter', stopAutoPlay);
  carousel.addEventListener('mouseleave', startAutoPlay);

  // 开始自动播放
  startAutoPlay();
}

/* 图片灯箱功能 */
function initLightbox() {
  const lightboxImages = document.querySelectorAll('[data-lightbox]');

  if (lightboxImages.length === 0) return;

  // 创建灯箱元素
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = `
    <div class="lightbox-content">
      <button class="lightbox-close">&times;</button>
      <img src="" alt="">
      <button class="lightbox-prev">&#10094;</button>
      <button class="lightbox-next">&#10095;</button>
    </div>
  `;
  document.body.appendChild(lightbox);

  const lightboxImg = lightbox.querySelector('img');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');

  let currentIndex = 0;
  const images = Array.from(lightboxImages);

  const showLightbox = (index) => {
    currentIndex = index;
    lightboxImg.src = images[index].src || images[index].getAttribute('data-lightbox');
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const hideLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };

  const showNext = () => {
    currentIndex = (currentIndex + 1) % images.length;
    showLightbox(currentIndex);
  };

  const showPrev = () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showLightbox(currentIndex);
  };

  // 事件监听
  images.forEach((img, index) => {
    img.addEventListener('click', () => showLightbox(index));
  });

  closeBtn.addEventListener('click', hideLightbox);
  nextBtn.addEventListener('click', showNext);
  prevBtn.addEventListener('click', showPrev);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) hideLightbox();
  });

  // 键盘导航
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;

    if (e.key === 'Escape') hideLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });
}

/* 回到顶部按钮 */
function initBackToTop() {
  const backToTopBtn = document.querySelector('.back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* 工具函数：防抖 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/* 工具函数：节流 */
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/* 页面加载完成提示 */
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
  console.log('YXRC 官网已加载完成');
});
