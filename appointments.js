document.addEventListener("DOMContentLoaded", () => {
  // MOBILE NAVIGATION
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("is-open");

      menuToggle.setAttribute("aria-expanded", isOpen);
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close menu" : "Open menu"
      );
    });

    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open menu");
      });
    });
  }

  // FAQ ACCORDION
  const faqQuestions = document.querySelectorAll(".faq-question");

  faqQuestions.forEach((question) => {
    question.addEventListener("click", () => {
      const currentAnswer = question.nextElementSibling;
      const isExpanded =
        question.getAttribute("aria-expanded") === "true";

      faqQuestions.forEach((otherQuestion) => {
        otherQuestion.setAttribute("aria-expanded", "false");

        const otherAnswer = otherQuestion.nextElementSibling;
        if (otherAnswer) {
          otherAnswer.hidden = true;
        }
      });

      if (!isExpanded) {
        question.setAttribute("aria-expanded", "true");
        currentAnswer.hidden = false;
      }
    });
  });

  // BOOKING SERVICE SELECTION
  const serviceOptions = document.querySelectorAll(".service-option");
  const messageArea = document.getElementById("messageArea");
  const bookingMessage = document.getElementById("bookingMessage");

  const bookingMessages = {
    "Sew-in":
      "Hi Zel's Hair Collection, I'd love to book an appointment for a sew-in. Please let me know your available dates so I can confirm. Thank you!",

    "Ponytail":
      "Hi Zel's Hair Collection, I'd love to book an appointment for a ponytail. Please let me know your available dates so I can confirm. Thank you!",

    "Braids":
      "Hi Zel's Hair Collection, I'd love to book an appointment for braids. Please let me know your available dates so I can confirm. Thank you!"
  };

  serviceOptions.forEach((option) => {
    option.addEventListener("click", () => {
      const selectedService = option.dataset.service;

      serviceOptions.forEach((otherOption) => {
        otherOption.setAttribute("aria-pressed", "false");
      });

      option.setAttribute("aria-pressed", "true");

      bookingMessage.value = bookingMessages[selectedService] || "";

      messageArea.hidden = false;
    });
  });

  // OPEN WHATSAPP
  const sendBooking = document.getElementById("sendBooking");

  if (sendBooking) {
    sendBooking.addEventListener("click", () => {
      const message = bookingMessage.value.trim();

      if (!message) {
        bookingMessage.focus();
        return;
      }

      const whatsappURL =
        "https://wa.me/233536115258?text=" +
        encodeURIComponent(message);

      window.open(whatsappURL, "_blank", "noopener,noreferrer");
    });
  }

  // FOOTER YEAR
  const currentYear = document.getElementById("currentYear");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }
});
