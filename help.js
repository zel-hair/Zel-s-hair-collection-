
/* =====================================================
   ZEL'S HAIR COLLECTION — HELP PAGE JAVASCRIPT
   ===================================================== */


// MOBILE MENU

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close menu" : "Open menu"
    );
  });

  mainNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open menu");
    });
  });
}


// FAQ ACCORDION
// Keeps one question open at a time.

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {
  item.addEventListener("toggle", () => {
    if (item.open) {
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.open = false;
        }
      });
    }
  });
});


// AUTOMATIC FOOTER YEAR

const currentYear = document.getElementById("currentYear");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}
