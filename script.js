
// ZEL'S HAIR COLLECTION — HOMEPAGE INTERACTIONS
// Matches index.html and style.css in this folder.

document.addEventListener('DOMContentLoaded', () => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // MOBILE NAVIGATION
  const menuButton = document.querySelector('.menu-button');
  const mainNav = document.getElementById('mainNav');

  const closeMenu = () => {
    if (!menuButton || !mainNav) return;
    mainNav.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open menu');
  };

  if (menuButton && mainNav) {
    menuButton.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('is-open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });

    mainNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') closeMenu();
    });

    document.addEventListener('click', event => {
      if (mainNav.classList.contains('is-open') &&
          !mainNav.contains(event.target) &&
          !menuButton.contains(event.target)) closeMenu();
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 760) closeMenu();
    });
  }

  // SCROLL REVEALS
  const revealTargets = document.querySelectorAll(
    '.category-intro, .category-card, .vibe-content, .wholesale-heading, .wholesale-description, ' +
    '.appointment-heading, .appointment-image, .appointment-content, .delivery-heading, ' +
    '.delivery-step, .gallery-heading, .gallery-video, .reviews-heading, .newsletter-inner'
  );

  if (!reducedMotion && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });

    revealTargets.forEach(element => {
      element.classList.add('reveal-item');
      revealObserver.observe(element);
    });
  } else {
    revealTargets.forEach(element => element.classList.add('is-visible'));
  }

  // WHAT'S YOUR VIBE?
  const vibeOptions = document.querySelectorAll('.vibe-option');
  const vibeMessage = document.getElementById('vibeMessage');

  const vibeMessages = {
    waves: "Hi, Waves Girly! Zel's got you covered with some beautiful waves for your taste!",
    pixie: "Hi, Pixie Cut Babe! Zel's got you covered with hair options to complement your style!",
    straight: "Hi, Straight Doll! Sleek looks are always a statement. Zel's got something for your taste!",
    curly: "Hi, Curly Hair Lady! Let's get those curls talking. Zel's got you covered!",
    afro: "Hi, Afro Queen! Zel's got you covered with some beautiful hair options to complement your taste."
  };

  if (vibeOptions.length && vibeMessage) {
    vibeOptions.forEach(option => {
      option.setAttribute('aria-pressed', 'false');

      option.addEventListener('click', function () {
        const message = vibeMessages[this.dataset.vibe];
        if (!message) return;

        vibeOptions.forEach(item => {
          item.classList.remove('active');
          item.setAttribute('aria-pressed', 'false');
        });

        this.classList.add('active');
        this.setAttribute('aria-pressed', 'true');

        vibeMessage.replaceChildren();

        const messageText = document.createElement('span');
        messageText.textContent = message;

        const shopLink = document.createElement('a');
        shopLink.href = '#shop';
        shopLink.textContent = 'SHOP';

        vibeMessage.append(
          messageText,
          document.createElement('br'),
          document.createElement('br'),
          document.createTextNode('Click on '),
          shopLink,
          document.createTextNode(' to explore hair!')
        );

        vibeMessage.classList.add('visible');
      });
    });
  }

  // WHOLESALE IMAGE PEEK CAROUSEL
  const wholesaleCarousel = document.querySelector('.wholesale-carousel');

  if (wholesaleCarousel) {
    wholesaleCarousel.addEventListener('keydown', event => {
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;

      event.preventDefault();

      const direction = event.key === 'ArrowRight' ? 1 : -1;

      wholesaleCarousel.scrollBy({
        left: direction * wholesaleCarousel.clientWidth * 0.78,
        behavior: reducedMotion ? 'auto' : 'smooth'
      });
    });
  }

  // CUSTOMER REVIEWS
  const reviewTrack = document.querySelector('.reviews-track');
  const reviewCards = reviewTrack
    ? Array.from(reviewTrack.querySelectorAll('.review-card'))
    : [];

  const previousReview = document.getElementById('prevReview');
  const nextReview = document.getElementById('nextReview');

  let currentReview = 0;

  function showReview(index) {
    if (!reviewTrack || !reviewCards.length) return;

    currentReview = (index + reviewCards.length) % reviewCards.length;

    const offset = reviewCards[currentReview].offsetLeft - reviewTrack.offsetLeft;
    reviewTrack.style.transform = `translateX(-${offset}px)`;

    reviewCards.forEach((card, cardIndex) => {
      const isCurrent = cardIndex === currentReview;

      card.setAttribute('aria-hidden', String(!isCurrent));

      if (isCurrent) card.removeAttribute('inert');
      else card.setAttribute('inert', '');
    });
  }

  if (reviewTrack && reviewCards.length) {
    previousReview?.addEventListener('click', () => showReview(currentReview - 1));
    nextReview?.addEventListener('click', () => showReview(currentReview + 1));

    showReview(0);

    window.addEventListener('resize', () => showReview(currentReview));
  }

  // NEWSLETTER FORM
  // Front-end acknowledgement only; no mailing service is connected yet.
  const newsletterForm = document.getElementById('newsletterForm');
  const newsletterFeedback = document.getElementById('newsletterFeedback');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', event => {
      event.preventDefault();

      if (!newsletterForm.checkValidity()) {
        newsletterForm.reportValidity();
        return;
      }

      if (newsletterFeedback) {
        newsletterFeedback.textContent =
          'Thank you for your interest! Newsletter sign-up will be available soon.';
      }

      newsletterForm.reset();
    });
  }
});
