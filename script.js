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
// WHAT'S YOUR VIBE INTERACTION

document.addEventListener('DOMContentLoaded', () => {

    const vibeOptions = document.querySelectorAll('.vibe-option');
    const vibeMessage = document.getElementById('vibeMessage');

    const vibeMessages = {
        waves: "Hi, Waves Girly! Zel's got you covered with some beautiful waves for your taste!",

        pixie: "Hi, Pixie Cut Babe! Zel's got you covered with hair options to complement your style!",

        straight: "Hi, Straight Doll! Sleek looks are always a statement. Zel's got something for your taste!",

        curly: "Hi, Curly Hair Lady! Let's get those curls talking. Zel's got you covered!",

        afro: "Hi, Afro Queen! Zel's got you covered with some beautiful hair options to complement your taste!"
    };

    vibeOptions.forEach(option => {

        option.addEventListener('click', () => {

            const selectedVibe = option.dataset.vibe;

            // Update selected option
            vibeOptions.forEach(item => {
                item.classList.remove('active');
                item.setAttribute('aria-pressed', 'false');
            });

            option.classList.add('active');
            option.setAttribute('aria-pressed', 'true');

            // Update message
            vibeMessage.innerHTML = `
                ${vibeMessages[selectedVibe]}
                <br><br>
                Click on <a href="#shop">SHOP</a> to explore hair!
            `;

            vibeMessage.classList.add('visible');

        });

    });

});
