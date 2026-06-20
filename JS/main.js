//  DARK MODE 
const toggleBtn = document.getElementById('darkModeToggle');

if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-mode');
  toggleBtn.innerHTML = '<i class="bi bi-sun-fill"></i> Light Mode';
}

toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');

  if (document.body.classList.contains('dark-mode')) {
    localStorage.setItem('theme', 'dark');
    toggleBtn.innerHTML = '<i class="bi bi-sun-fill"></i> Light Mode';
  } else {
    localStorage.setItem('theme', 'light');
    toggleBtn.innerHTML = '<i class="bi bi-moon-fill"></i> Dark Mode';
  }
});


//  NAVBAR AU SCROLL 
const navbar = document.getElementById('mainNavbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('navbar-scrolled');
  } else {
    navbar.classList.remove('navbar-scrolled');
  }
});

//  BOUTON RETOUR EN HAUT 
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
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

// ========== ANIMATION FADE-IN AU SCROLL ==========
const fadeSections = document.querySelectorAll('.fade-in-section');
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
});

fadeSections.forEach(section => fadeObserver.observe(section));

// ========== COMPTEURS ANIMÉS ==========
const counters = document.querySelectorAll('.counter');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counterElement = entry.target;
      const target = parseInt(counterElement.dataset.target);
      let current = 0;
      const increment = target / 100; // on divise l'animation en 100 étapes

      const updateCounter = () => {
        current += increment;
        if (current < target) {
          counterElement.textContent = Math.floor(current);
          requestAnimationFrame(updateCounter);
        } else {
          counterElement.textContent = target;
        }
      };

      updateCounter();
      counterObserver.unobserve(counterElement);
    }
  });
});

counters.forEach(counter => counterObserver.observe(counter));