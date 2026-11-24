
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
      const answer = question.nextElementSibling;
      const isOpen =
        question.getAttribute("aria-expanded") === "true";

      faqQuestions.forEach((otherQuestion) => {
        otherQuestion.setAttribute("aria-expanded", "false");

        const otherAnswer = otherQuestion.nextElementSibling;
        if (otherAnswer) {
          otherAnswer.hidden = true;
        }
      });

      if (!isOpen) {
        question.setAttribute("aria-expanded", "true");
        answer.hidden = false;
      }
    });
  });


  // DELIVERY QUESTIONS GAME
  const gameQuestions = document.querySelectorAll(".game-question");
  const progressText = document.getElementById("progressText");
  const progressFill = document.getElementById("progressFill");
  const gameComplete = document.getElementById("gameComplete");

  const answers = {};

  function updateProgress() {
    const answeredCount = Object.keys(answers).length;
    const totalQuestions = gameQuestions.length;

    if (progressText) {
      progressText.textContent =
        `${answeredCount} OF ${totalQuestions} ANSWERED`;
    }

    if (progressFill) {
      progressFill.style.width =
        `${(answeredCount / totalQuestions) * 100}%`;
    }

    if (gameComplete) {
      gameComplete.hidden = answeredCount !== totalQuestions;
    }
  }

  gameQuestions.forEach((question) => {
    const questionNumber = question.dataset.question;
    const options = question.querySelectorAll(".answer-option");

    options.forEach((option) => {
      option.addEventListener("click", () => {

        // Remove previous selection for this question
        options.forEach((otherOption) => {
          otherOption.classList.remove("selected");
          otherOption.setAttribute("aria-pressed", "false");
        });

        // Highlight selected answer
        option.classList.add("selected");
        option.setAttribute("aria-pressed", "true");

        // Save answer
        answers[questionNumber] = option.dataset.answer;

        updateProgress();
      });
    });
  });


  // INITIAL PROGRESS
  updateProgress();


  // FOOTER YEAR
  const currentYear = document.getElementById("currentYear");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

});
