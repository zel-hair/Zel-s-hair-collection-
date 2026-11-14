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
// SHOP BLUR-TO-CLEAR EFFECT

document.addEventListener('DOMContentLoaded', () => {

    const hero = document.querySelector('.hero');
    const shopIntro = document.querySelector('.category-intro');

    if (!hero || !shopIntro) return;

    const heroObserver = new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {
                shopIntro.classList.remove('shop-is-clear');
            } else {
                shopIntro.classList.add('shop-is-clear');
            }

        });

    }, {
        threshold: 0
    });

    heroObserver.observe(hero);

});
