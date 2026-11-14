// Zel's Hair Collection
// Header functionality will be added as we complete
// the menu, search and shopping cart sections.
// SHOP INTRODUCTION SCROLL ANIMATION

const shopIntro = document.querySelector('.category-intro');

if (shopIntro) {
    const shopObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    shopIntro.classList.add('is-visible');
                    shopObserver.unobserve(shopIntro);
                }
            });
        },
        {
            threshold: 0.25
        }
    );

    shopObserver.observe(shopIntro);
}
