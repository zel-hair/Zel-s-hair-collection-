// Zel's Hair Collection
// Header functionality will be added as we complete
// the menu, search and shopping cart sections.
// SHOP INTRODUCTION SCROLL ANIMATION

// SHOP INTRODUCTION SCROLL ANIMATION

function initializeShopAnimation() {

    const shopIntro = document.querySelector('.category-intro');

    if (!shopIntro) return;

    const observer = new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                shopIntro.classList.add('is-visible');

                observer.unobserve(shopIntro);
            }

        });

    }, {
        threshold: 0.1
    });

    observer.observe(shopIntro);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeShopAnimation);
} else {
    initializeShopAnimation();
}
