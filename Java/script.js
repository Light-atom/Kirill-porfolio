document.addEventListener('DOMContentLoaded', function() {
  // Элементы интерфейса
  const toggleBtn = document.querySelector('.toggle_btn');
  const toggleBtnIcon = document.querySelector('.toggle_btn i');
  const dropdownMenu = document.querySelector('.dropdown-menu');
  const scrollDownBtn = document.querySelector('.scroll-down');
  const header = document.querySelector('header');

  // ========== Бургер-меню ==========
  if (toggleBtn && dropdownMenu) {
    toggleBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      dropdownMenu.classList.toggle('open');
      
      // Анимация иконки
      if (toggleBtnIcon) {
        toggleBtnIcon.classList.toggle('fa-bars');
        toggleBtnIcon.classList.toggle('fa-xmark');
      }
      
      // Плавное изменение высоты меню
      if (dropdownMenu.classList.contains('open')) {
        dropdownMenu.style.maxHeight = dropdownMenu.scrollHeight + 'px';
      } else {
        dropdownMenu.style.maxHeight = '0';
      }
    });

    // Закрытие меню при клике вне его области
    document.addEventListener('click', function(e) {
      if (!dropdownMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
        dropdownMenu.classList.remove('open');
        dropdownMenu.style.maxHeight = '0';
        if (toggleBtnIcon) {
          toggleBtnIcon.classList.remove('fa-xmark');
          toggleBtnIcon.classList.add('fa-bars');
        }
      }
    });
  }

  // ========== Стрелка вниз ==========
  if (scrollDownBtn) {
    scrollDownBtn.addEventListener('click', function(e) {
      e.preventDefault();
      const aboutSection = document.querySelector('#about');
      if (aboutSection) {
        const headerHeight = header ? header.offsetHeight : 0;
        window.scrollTo({
          top: aboutSection.offsetTop - headerHeight,
          behavior: 'smooth'
        });
      }
    });
  }

  // ========== Плавный скролл для всех якорных ссылок ==========
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      // Пропускаем пустые ссылки
      if (this.getAttribute('href') === '#') return;
      
      e.preventDefault();
      
      // Закрытие меню (если есть)
      if (dropdownMenu) {
        dropdownMenu.classList.remove('open');
        dropdownMenu.style.maxHeight = '0';
      }
      
      // Обновление иконки бургера (если есть)
      if (toggleBtnIcon) {
        toggleBtnIcon.classList.remove('fa-xmark');
        toggleBtnIcon.classList.add('fa-bars');
      }
      
      // Плавный скролл
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ========== Анимация секций при скролле ==========
  const animateElements = document.querySelectorAll('.animate');
  if (animateElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    animateElements.forEach(element => observer.observe(element));
  }
});