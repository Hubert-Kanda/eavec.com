// script.js

// Menu mobile
const mobileMenu = document.getElementById("mobile-menu");
const navLinks = document.getElementById("nav-links");

mobileMenu.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  mobileMenu.classList.toggle("active");
});

// Fermer le menu en cliquant à l'extérieur
document.addEventListener("click", (e) => {
  if (
    !navLinks.contains(e.target) &&
    !mobileMenu.contains(e.target) &&
    navLinks.classList.contains("active")
  ) {
    navLinks.classList.remove("active");
    mobileMenu.classList.remove("active");
  }
});

// Animation au défilement
const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");

      // Animation des compteurs
      if (entry.target.classList.contains("stat-item")) {
        const counter = entry.target.querySelector(".counter");
        if (counter && !counter.classList.contains("animated")) {
          animateCounter(counter);
          counter.classList.add("animated");
        }
      }
    }
  });
}, observerOptions);

// Observer les éléments à animer
document
  .querySelectorAll(
    ".feature-card, .step, .testimonial-card, .stat-item, .faq-item"
  )
  .forEach((el) => {
    observer.observe(el);
  });

// Animation des compteurs
function animateCounter(counter) {
  const target = parseInt(counter.getAttribute("data-target"));
  const duration = 2000;
  const increment = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      counter.innerHTML =
        target.toLocaleString() + "<span class='exposant'>+</span>";
      clearInterval(timer);
    } else {
      counter.textContent = Math.floor(current).toLocaleString();
    }
  }, 16);
}

// Animation fluide pour les ancres
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });

      // Fermer le menu mobile si ouvert
      if (navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
        mobileMenu.classList.remove("active");
      }
    }
  });
});

// FAQ Accordion
const faqItems = document.querySelectorAll(".faq-item");
faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");
  question.addEventListener("click", () => {
    // Fermer les autres éléments ouverts
    faqItems.forEach((otherItem) => {
      if (otherItem !== item && otherItem.classList.contains("active")) {
        otherItem.classList.remove("active");
      }
    });

    // Ouvrir/fermer l'élément actuel
    item.classList.toggle("active");
  });
});

// Boutons de défilement
const scrollToTop = document.getElementById("scrollToTop");
const scrollToBottom = document.getElementById("scrollToBottom");

if (scrollToTop) {
  scrollToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

if (scrollToBottom) {
  scrollToBottom.addEventListener("click", () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  });
}

// Afficher/masquer le bouton de défilement vers le haut
window.addEventListener("scroll", () => {
  if (scrollToTop) {
    if (window.pageYOffset > 300) {
      scrollToTop.style.opacity = "1";
      scrollToTop.style.visibility = "visible";
    } else {
      scrollToTop.style.opacity = "0";
      scrollToTop.style.visibility = "hidden";
    }
  }
});

// Modal d'inscription
const signupModal = document.getElementById("signupModal");
const openSignupButtons = document.querySelectorAll(".open-signup");
const closeModalButton = document.querySelector(".close-modal");
const signupForm = document.getElementById("signupForm");

// Ouvrir le modal
openSignupButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    signupModal.classList.add("active");
    document.body.style.overflow = "hidden";
  });
});

// Fermer le modal
closeModalButton.addEventListener("click", () => {
  signupModal.classList.remove("active");
  document.body.style.overflow = "auto";
});

// Fermer le modal en cliquant à l'extérieur
signupModal.addEventListener("click", (e) => {
  if (e.target === signupModal) {
    signupModal.classList.remove("active");
    document.body.style.overflow = "auto";
  }
});

// Validation du formulaire d'inscription
if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Récupération des valeurs
    const name = document.getElementById("signup-name").value;
    const email = document.getElementById("signup-email").value;
    const phone = document.getElementById("signup-phone").value;
    const password = document.getElementById("signup-password").value;
    const confirmPassword = document.getElementById("signup-confirm").value;
    const terms = document.getElementById("signup-terms").checked;

    // Validation
    if (!name || !email || !phone || !password || !confirmPassword) {
      showNotification(
        "Veuillez remplir tous les champs obligatoires.",
        "error"
      );
      return;
    }

    if (!isValidEmail(email)) {
      showNotification("Veuillez entrer une adresse email valide.", "error");
      return;
    }

    if (password !== confirmPassword) {
      showNotification("Les mots de passe ne correspondent pas.", "error");
      return;
    }

    if (!terms) {
      showNotification(
        "Veuillez accepter les conditions d'utilisation.",
        "error"
      );
      return;
    }

    // Simulation d'inscription réussie
    showNotification(
      "Votre compte a été créé avec succès ! Vous pouvez maintenant vous connecter.",
      "success"
    );

    // Fermer le modal et réinitialiser le formulaire
    setTimeout(() => {
      signupModal.classList.remove("active");
      document.body.style.overflow = "auto";
      signupForm.reset();
    }, 2000);
  });
}

// Validation du formulaire de contact
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Récupération des valeurs
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    // Validation basique
    if (!name || !email || !subject || !message) {
      showNotification(
        "Veuillez remplir tous les champs obligatoires.",
        "error"
      );
      return;
    }

    if (!isValidEmail(email)) {
      showNotification("Veuillez entrer une adresse email valide.", "error");
      return;
    }

    // Simulation d'envoi réussi
    showNotification(
      "Votre message a été envoyé avec succès ! Nous vous répondrons bientôt.",
      "success"
    );

    // Réinitialisation du formulaire
    contactForm.reset();
  });
}

// Fonction de validation d'email
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Fonction d'affichage de notification
function showNotification(message, type = "info") {
  // Créer l'élément de notification
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${
              type === "success"
                ? "fa-check-circle"
                : type === "error"
                ? "fa-exclamation-circle"
                : "fa-info-circle"
            }"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;

  // Ajouter au corps du document
  document.body.appendChild(notification);

  // Animation d'entrée
  setTimeout(() => {
    notification.classList.add("show");
  }, 10);

  // Fermeture au clic
  const closeBtn = notification.querySelector(".notification-close");
  closeBtn.addEventListener("click", () => {
    closeNotification(notification);
  });

  // Fermeture automatique après 5 secondes
  setTimeout(() => {
    if (document.body.contains(notification)) {
      closeNotification(notification);
    }
  }, 5000);
}

// Fonction de fermeture de notification
function closeNotification(notification) {
  notification.classList.remove("show");
  setTimeout(() => {
    if (document.body.contains(notification)) {
      document.body.removeChild(notification);
    }
  }, 300);
}

// Styles pour les notifications
const notificationStyles = document.createElement("style");
notificationStyles.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        border-left: 4px solid #2563eb;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        padding: 15px 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-width: 300px;
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        z-index: 10000;
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification.success {
        border-color: #10b981;
    }
    
    .notification.error {
        border-color: #ef4444;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
        flex: 1;
    }
    
    .notification-content i {
        font-size: 1.2rem;
    }
    
    .notification.success i {
        color: #10b981;
    }
    
    .notification.error i {
        color: #ef4444;
    }
    
    .notification-close {
        background: none;
        border: none;
        cursor: pointer;
        padding: 5px;
        margin-left: 10px;
        color: #6b7280;
        transition: color 0.3s ease;
    }
    
    .notification-close:hover {
        color: #374151;
    }
`;

document.head.appendChild(notificationStyles);

// Gestion du chargement des ressources
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

// Gestion des erreurs d'images
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll("img");

  images.forEach((img) => {
    img.addEventListener("error", () => {
      img.src =
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjE4IiBmaWxsPSIjOTlhMmIzIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2Ugbm90IGZvdW5kPC90ZXh0Pjwvc3ZnPg==";
      img.alt = "Image non disponible";
    });
  });
});
const style = document.createElement("style");
style.textContent = darkModeCSS;
document.head.appendChild(style);
