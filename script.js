document.addEventListener("DOMContentLoaded", () => {
  const currentYear = document.querySelector("[data-current-year]");
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.getElementById("primary-navigation");
  const searchToggle = document.querySelector(".search-toggle");
  const searchPanel = document.getElementById("site-search");
  const searchInput = document.getElementById("site-search-input");
  const newsletterForm = document.getElementById("newsletter-form");
  const newsletterMessage = document.getElementById("newsletter-message");
  const assistantLauncher = document.querySelector(".assistant-launcher");
  const assistantPanel = document.getElementById("assistant-panel");
  const assistantClose = document.querySelector(".assistant-close");
  const cartCount = document.querySelector(".cart-count");
  const sliderPrev = document.querySelector("[data-slider-prev]");
  const sliderNext = document.querySelector("[data-slider-next]");
  const slider = document.querySelector("[data-product-slider]");

  function setCartCount(value) {
    if (!cartCount) return;
    cartCount.textContent = value;
    cartCount.setAttribute("aria-label", `Shopping cart, ${value} items`);
  }

  setCartCount(0);

  // Mobile nav toggle
  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  // Search panel toggle
  if (searchToggle && searchPanel && searchInput) {
    searchToggle.addEventListener("click", () => {
      const isOpen = searchPanel.hidden;
      searchPanel.hidden = !isOpen;
      searchToggle.setAttribute("aria-expanded", String(isOpen));
      if (isOpen) {
        setTimeout(() => searchInput.focus(), 100);
      }
    });
  }

  // Search form submit: simple front-end demo only
  if (searchPanel) {
    searchPanel.addEventListener("submit", (event) => {
      event.preventDefault();
      const query = searchInput.value.trim();
      if (!query) {
        searchInput.focus();
        return;
      }

      const targetUrl = `search.html?q=${encodeURIComponent(query)}`;
      window.location.href = targetUrl;
    });
  }

  // Product slider controls
  if (slider && sliderPrev && sliderNext) {
    const scrollAmount = 300;

    sliderPrev.addEventListener("click", () => {
      slider.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });

    sliderNext.addEventListener("click", () => {
      slider.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });
  }

  // Newsletter validation and demo submission
  if (newsletterForm && newsletterMessage) {
    newsletterForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const emailField = newsletterForm.querySelector('input[type="email"]');
      const consentCheckbox = newsletterForm.querySelector('input[type="checkbox"]');
      const email = emailField.value.trim();

      if (!email || !email.includes("@") || !email.includes(".")) {
        newsletterMessage.textContent = "Please enter a valid email address.";
        newsletterMessage.style.color = "#9d4d4d";
        return;
      }

      if (!consentCheckbox || !consentCheckbox.checked) {
        newsletterMessage.textContent = "Please agree to receive email updates.";
        newsletterMessage.style.color = "#9d4d4d";
        return;
      }

      newsletterMessage.textContent = "Thanks for signing up — your subscription has been recorded in this demo form.";
      newsletterMessage.style.color = "#2f6d4d";
      newsletterForm.reset();
    });
  }

  // Assistant panel
  if (assistantLauncher && assistantPanel) {
    assistantLauncher.addEventListener("click", () => {
      const isHidden = assistantPanel.hasAttribute("hidden");
      assistantPanel.toggleAttribute("hidden", !isHidden);
      assistantLauncher.setAttribute("aria-expanded", String(isHidden));
    });
  }

  if (assistantClose) {
    assistantClose.addEventListener("click", () => {
      assistantPanel.hidden = true;
      assistantLauncher.setAttribute("aria-expanded", "false");
    });
  }
});
