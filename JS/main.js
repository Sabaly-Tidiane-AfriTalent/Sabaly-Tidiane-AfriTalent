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

// ========== FILTRAGE DYNAMIQUE DES FREELANCES ==========
const filtreBoutons = document.querySelectorAll('.filtre-btn');
const freelanceCards = document.querySelectorAll('#freelances-container > div');

filtreBoutons.forEach(bouton => {
  bouton.addEventListener('click', () => {
    const categorieChoisie = bouton.dataset.categorie;

    // Gestion du style actif sur les boutons
    filtreBoutons.forEach(b => {
      b.classList.remove('btn-primary');
      b.classList.add('btn-outline-primary');
    });
    bouton.classList.remove('btn-outline-primary');
    bouton.classList.add('btn-primary');

    // Affichage/masquage des cartes
    freelanceCards.forEach(card => {
      if (categorieChoisie === 'tous' || card.dataset.categorie === categorieChoisie) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();

  let formulaireValide = true; // on suppose que tout est bon au départ

  // --- Validation du NOM ---
  const nomInput = document.getElementById('nom');
  const erreurNom = document.getElementById('erreur-nom');

  if (nomInput.value.trim() === '') {
    erreurNom.textContent = 'Le nom est requis.';
    nomInput.classList.add('is-invalid');
    nomInput.classList.remove('is-valid')
    formulaireValide = false;
  } else {
    erreurNom.textContent = '';
    nomInput.classList.remove('is-invalid');
    nomInput.classList.add('is-valid');
  }

 // --- Validation du PRÉNOM ---
  const prenomInput = document.getElementById('prenom');
  const erreurPrenom = document.getElementById('erreur-prenom');

  if (prenomInput.value.trim() === '') {
    erreurPrenom.textContent = 'Le prenom est requis.';
    prenomInput.classList.add('is-invalid');
    prenomInput.classList.remove('is-valid');
    formulaireValide = false;
  } else {
    erreurPrenom.textContent = '';
    prenomInput.classList.remove('is-invalid');
  prenomInput.classList.add('is-valid');
}
// --- Validation de l'EMAIL ---
const emailInput = document.getElementById('email');
const erreurEmail = document.getElementById('erreur-email');
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (emailInput.value.trim() === '') {
  erreurEmail.textContent = "L'email est requis.";
  emailInput.classList.add('is-invalid');
  emailInput.classList.remove('is-valid');
  formulaireValide = false;
} else if (!regexEmail.test(emailInput.value.trim())) {
  erreurEmail.textContent = 'Le format de l\'email est invalide.';
  emailInput.classList.add('is-invalid');
  emailInput.classList.remove('is-valid');
  formulaireValide = false;
} else {
  erreurEmail.textContent = '';
  emailInput.classList.remove('is-invalid');
  emailInput.classList.add('is-valid');
}

// --- Validation du SUJET ---
  const sujetInput = document.getElementById('sujet');
  const erreurSujet = document.getElementById('erreur-sujet');

  if (sujetInput.value === '') {
    erreurSujet.textContent = 'Veuillez choisir un sujet.';
    sujetInput.classList.add('is-invalid');
    sujetInput.classList.remove('is-valid');
    formulaireValide = false;
  } else {
    erreurSujet.textContent = '';
    sujetInput.classList.remove('is-invalid');
    sujetInput.classList.add('is-valid');
  }

  // --- Validation du MESSAGE ---
  const messageInput = document.getElementById('message');
  const erreurMessage = document.getElementById('erreur-message');

  if (messageInput.value.trim() === '') {
    erreurMessage.textContent = 'Le message est requis.';
    messageInput.classList.add('is-invalid');
    messageInput.classList.remove('is-valid');
    formulaireValide = false;
  } else if (messageInput.value.trim().length < 20) {
    erreurMessage.textContent = 'Le message doit contenir au moins 20 caractères.';
    messageInput.classList.add('is-invalid');
    messageInput.classList.remove('is-valid');
    formulaireValide = false;
  } else {
    erreurMessage.textContent = '';
    messageInput.classList.remove('is-invalid');
    messageInput.classList.add('is-valid');
  }

  // --- Si tout est valide, on affiche le message de succès ---
  const messageSucces = document.getElementById('message-succes');

  if (formulaireValide) {
    messageSucces.classList.remove('d-none');
    contactForm.reset(); // vide le formulaire
    // on retire aussi les bordures vertes après reset
    contactForm.querySelectorAll('.is-valid').forEach(el => el.classList.remove('is-valid'));
  } else {
    messageSucces.classList.add('d-none');
  }

});

