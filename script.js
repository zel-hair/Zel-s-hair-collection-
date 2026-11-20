
document.addEventListener("DOMContentLoaded", () => {

  // MOBILE NAVIGATION
  const menuToggle = document.querySelector(
    ".menu-toggle, .hamburger, #menuToggle"
  );

  const navigation = document.querySelector(
    ".nav-links, .navigation, #navLinks"
  );

  if (menuToggle && navigation) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navigation.classList.toggle("active");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navigation.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navigation.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // SCROLL REVEAL
  const revealElements = document.querySelectorAll(
    ".reveal, .shop-category, .vibe-card"
  );

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealElements.forEach(element => observer.observe(element));
  } else {
    revealElements.forEach(element =>
      element.classList.add("visible")
    );
  }

  // WHAT'S YOUR VIBE?
  const vibeCards = document.querySelectorAll(
    ".vibe-card, [data-vibe]"
  );

  vibeCards.forEach(card => {
    card.addEventListener("click", () => {
      vibeCards.forEach(item =>
        item.classList.remove("selected")
      );

      card.classList.add("selected");
    });
  });

  // CUSTOMER REVIEWS
  const reviews = document.querySelectorAll(".review-card");
  const previousButton = document.querySelector(
    ".review-prev, #reviewPrev"
  );
  const nextButton = document.querySelector(
    ".review-next, #reviewNext"
  );

  let currentReview = 0;

  function showReview(index) {
    if (!reviews.length) return;

    reviews.forEach((review, i) => {
      review.hidden = i !== index;
      review.classList.toggle("active", i === index);
    });
  }

  if (reviews.length) {
    showReview(currentReview);

    previousButton?.addEventListener("click", () => {
      currentReview =
        (currentReview - 1 + reviews.length) % reviews.length;
      showReview(currentReview);
    });

    nextButton?.addEventListener("click", () => {
      currentReview = (currentReview + 1) % reviews.length;
      showReview(currentReview);
    });
  }

  // NEWSLETTER
  const newsletterForm = document.querySelector(
    ".newsletter-form, #newsletterForm"
  );

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", event => {
      event.preventDefault();

      const emailInput = newsletterForm.querySelector(
        'input[type="email"]'
      );

      const message = newsletterForm.querySelector(
        ".newsletter-message"
      );

      if (!emailInput || !emailInput.value.trim()) return;

      if (!emailInput.checkValidity()) {
        emailInput.reportValidity();
        return;
      }

      if (message) {
        message.textContent =
          "Thank you for your interest in Zel's Hair Collection!";
      }

      newsletterForm.reset();
    });
  }

});
