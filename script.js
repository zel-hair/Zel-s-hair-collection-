/* =================================
   ZEL'S NEWSLETTER POPUP FUNCTION
================================= */

document.addEventListener('DOMContentLoaded', function () {

    const overlay = document.getElementById('newsletterOverlay');
    const closeButton = document.getElementById('newsletterClose');
    const form = document.getElementById('newsletterForm');
    const feedback = document.getElementById('newsletterFeedback');

    if (!overlay || !closeButton || !form) return;

    const dismissed = localStorage.getItem('zelsNewsletterDismissed');

    function closeNewsletter() {
        overlay.classList.remove('newsletter-visible');

        localStorage.setItem(
            'zelsNewsletterDismissed',
            'true'
        );
    }

    // Show popup after two seconds.

    if (!dismissed) {
        setTimeout(function () {
            overlay.classList.add('newsletter-visible');
        }, 2000);
    }

    // Close button.

    closeButton.addEventListener('click', closeNewsletter);

    // Close when clicking outside the popup.

    overlay.addEventListener('click', function (event) {
        if (event.target === overlay) {
            closeNewsletter();
        }
    });

    // Close with Escape key.

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            closeNewsletter();
        }
    });

    // Newsletter form.

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        feedback.textContent =
            "Thank you for your interest! Newsletter registration will be available soon.";
    });

});
