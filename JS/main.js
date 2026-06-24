document.addEventListener('DOMContentLoaded', () => {

  // ================== DARK MODE ==================
  const toggleBtn = document.getElementById('darkModeToggle');
  
  if (toggleBtn) { // Sécurité : on vérifie que le bouton existe sur la page
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
  }

  // ================== NAVBAR AU SCROLL ==================
  const navbar = document.getElementById('mainNavbar');

  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
      } else {
        navbar.classList.remove('navbar-scrolled');
      }
    });
  }

  // ================== BOUTON RETOUR EN HAUT ==================
  const backToTopBtn = document.getElementById('backToTop');

  if (backToTopBtn) {
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
  }

  // ================== ANIMATION FADE-IN AU SCROLL ==================
  const fadeSections = document.querySelectorAll('.fade-in-section');
  
  if (fadeSections.length > 0) {
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    });

    fadeSections.forEach(section => fadeObserver.observe(section));
  }

  // ================== COMPTEURS ANIMÉS ==================
  const counters = document.querySelectorAll('.counter');

  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counterElement = entry.target;
          const target = parseInt(counterElement.dataset.target, 10); 
          let current = 0;
          const increment = target / 100; 

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

    counters.forEach(counter => { counterObserver.observe(counter); });
  }

  // ================== FILTRAGE DYNAMIQUE DES FREELANCES ==================
  const filtreBoutons = document.querySelectorAll('.filtre-btn');
  const freelanceCards = document.querySelectorAll('#freelances-container > div');

  if (filtreBoutons.length > 0) {
    filtreBoutons.forEach(bouton => {
      bouton.addEventListener('click', () => {
        const categorieChoisie = bouton.dataset.categorie;

        filtreBoutons.forEach(b => {
          b.classList.remove('btn-primary');
          b.classList.add('btn-outline-primary');
        });
        bouton.classList.remove('btn-outline-primary');
        bouton.classList.add('btn-primary');

        freelanceCards.forEach(card => {
          if (categorieChoisie === 'tous' || card.dataset.categorie === categorieChoisie) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // ================== VALIDATION FORMULAIRE DE CONTACT ==================
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();

      let formulaireValide = true; 

      // Validation du NOM
      const nomInput = document.getElementById('nom');
      const erreurNom = document.getElementById('erreur-nom');

      if (nomInput && nomInput.value.trim() === '') {
        if (erreurNom) erreurNom.textContent = 'Le nom est requis.';
        nomInput.classList.add('is-invalid');
        nomInput.classList.remove('is-valid');
        formulaireValide = false;
      } else if (nomInput) {
        if (erreurNom) erreurNom.textContent = '';
        nomInput.classList.remove('is-invalid');
        nomInput.add('is-valid');
      }

      // Validation du PRÉNOM
      const prenomInput = document.getElementById('prenom');
      const erreurPrenom = document.getElementById('erreur-prenom');

      if (prenomInput && prenomInput.value.trim() === '') {
        if (erreurPrenom) erreurPrenom.textContent = 'Le prénom est requis.';
        prenomInput.classList.add('is-invalid');
        prenomInput.classList.remove('is-valid');
        formulaireValide = false;
      } else if (prenomInput) {
        if (erreurPrenom) erreurPrenom.textContent = '';
        prenomInput.classList.remove('is-invalid');
        prenomInput.classList.add('is-valid');
      }

      // Validation de l'EMAIL
      const emailInput = document.getElementById('email');
      const erreurEmail = document.getElementById('erreur-email');
      const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (emailInput) {
        if (emailInput.value.trim() === '') {
          if (erreurEmail) erreurEmail.textContent = "L'email est requis.";
          emailInput.classList.add('is-invalid');
          emailInput.classList.remove('is-valid');
          formulaireValide = false;
        } else if (!regexEmail.test(emailInput.value.trim())) {
          if (erreurEmail) erreurEmail.textContent = "Le format de l'email est invalide.";
          emailInput.classList.add('is-invalid');
          emailInput.classList.remove('is-valid');
          formulaireValide = false;
        } else {
          if (erreurEmail) erreurEmail.textContent = '';
          emailInput.classList.remove('is-invalid');
          emailInput.classList.add('is-valid');
        }
      }

      // Validation du SUJET
      const sujetInput = document.getElementById('sujet');
      const erreurSujet = document.getElementById('erreur-sujet');

      if (sujetInput && sujetInput.value === '') {
        if (erreurSujet) erreurSujet.textContent = 'Veuillez choisir un sujet.';
        sujetInput.classList.add('is-invalid');
        sujetInput.classList.remove('is-valid');
        formulaireValide = false;
      } else if (sujetInput) {
        if (erreurSujet) erreurSujet.textContent = '';
        sujetInput.classList.remove('is-invalid');
        sujetInput.classList.add('is-valid');
      }

      // Validation du MESSAGE
      const messageInput = document.getElementById('message');
      const erreurMessage = document.getElementById('erreur-message');

      if (messageInput) {
        if (messageInput.value.trim() === '') {
          if (erreurMessage) erreurMessage.textContent = 'Le message est requis.';
          messageInput.classList.add('is-invalid');
          messageInput.classList.remove('is-valid');
          formulaireValide = false;
        } else if (messageInput.value.trim().length < 20) {
          if (erreurMessage) erreurMessage.textContent = 'Le message doit contenir au moins 20 caractères.';
          messageInput.classList.add('is-invalid');
          messageInput.classList.remove('is-valid');
          formulaireValide = false;
        } else {
          if (erreurMessage) erreurMessage.textContent = '';
          messageInput.classList.remove('is-invalid');
          messageInput.classList.add('is-valid');
        }
      }

      // Message de succès
      const messageSucces = document.getElementById('message-succes');
      if (formulaireValide && messageSucces) {
        messageSucces.classList.remove('d-none');
        contactForm.reset(); // Vide le formulaire après envoi réussi
      }
    });
  }

});
