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
// CUSTOMER REVIEWS CAROUSEL

document.addEventListener('DOMContentLoaded', function () {

    const reviews = [
        {
            name: "Abena Acheampong",
            text: "I love the textures of the hair so much."
        },
        {
            name: "Nana Ama",
            text: "The hair was exactly what I was looking for. I'm so happy with my purchase."
        },
        {
            name: "Esi Mensah",
            text: "Beautiful quality and the hair feels so soft."
        },
        {
            name: "Akosua",
            text: "I absolutely love my hair. Definitely ordering again!"
        },
        {
            name: "Mabel Owusu",
            text: "The quality exceeded my expectations. Really lovely hair."
        }
    ];

    let currentReview = 0;

    const reviewDisplay = document.getElementById('reviewDisplay');
    const reviewName = document.getElementById('reviewName');
    const reviewText = document.getElementById('reviewText');
    const reviewCounter = document.getElementById('reviewCounter');

    const nextButton = document.getElementById('nextReview');
    const prevButton = document.getElementById('prevReview');

    if (!reviewDisplay || !nextButton || !prevButton) return;

    function showReview(index) {

        reviewDisplay.style.opacity = '0';

        setTimeout(function () {

            reviewName.textContent = reviews[index].name;
            reviewText.textContent = reviews[index].text;

            reviewCounter.textContent =
                String(index + 1).padStart(2, '0') +
                ' / ' +
                String(reviews.length).padStart(2, '0');

            reviewDisplay.style.opacity = '1';

        }, 200);
    }

    nextButton.addEventListener('click', function () {

        currentReview = (currentReview + 1) % reviews.length;
        showReview(currentReview);

    });

    prevButton.addEventListener('click', function () {

        currentReview = (currentReview - 1 + reviews.length) % reviews.length;
        showReview(currentReview);

    });

});
// CUSTOMER REVIEWS CAROUSEL

document.addEventListener('DOMContentLoaded', function () {

    const reviews = [

        {
            title: "I love the textures of the hair",
            message: "I love the textures of the hair so much.",
            author: "Abena Acheampong"
        },

        {
            title: "Exactly what I was looking for",
            message: "The hair was exactly what I was looking for. I'm so happy with my purchase.",
            author: "Nana Ama"
        },

        {
            title: "Beautiful hair quality",
            message: "Beautiful quality and the hair feels so soft.",
            author: "Esi Mensah"
        },

        {
            title: "Absolutely love my hair",
            message: "I absolutely love my hair. Definitely ordering again!",
            author: "Akosua"
        },

        {
            title: "Exceeded my expectations",
            message: "The quality exceeded my expectations. Really lovely hair.",
            author: "Mabel Owusu"
        }

    ];

    let currentReview = 0;

    const card = document.getElementById('reviewCard');
    const title = document.getElementById('reviewTitle');
    const message = document.getElementById('reviewMessage');
    const author = document.getElementById('reviewAuthor');

    const next = document.getElementById('nextReview');
    const prev = document.getElementById('prevReview');

    if (!card || !next || !prev) return;

    function displayReview(index) {

        card.style.opacity = '0';

        setTimeout(function () {

            title.textContent = reviews[index].title;
            message.textContent = reviews[index].message;
            author.textContent = reviews[index].author;

            card.style.opacity = '1';

        }, 200);

    }

    next.addEventListener('click', function () {

        currentReview = (currentReview + 1) % reviews.length;

        displayReview(currentReview);

    });

    prev.addEventListener('click', function () {

        currentReview =
            (currentReview - 1 + reviews.length) % reviews.length;

        displayReview(currentReview);

    });

});
/* ZEL'S AI ASSISTANT */

const aiButton = document.getElementById("zelsAiButton");
const aiPanel = document.getElementById("zelsAiPanel");
const aiClose = document.getElementById("zelsAiClose");
const aiForm = document.getElementById("zelsAiForm");
const aiInput = document.getElementById("zelsAiInput");
const aiChat = document.getElementById("zelsAiChat");
const aiPredictions = document.getElementById("zelsAiPredictions");

if (aiButton && aiPanel) {

    aiButton.addEventListener("click", () => {
        aiPanel.classList.toggle("active");

        const isOpen = aiPanel.classList.contains("active");

        aiButton.setAttribute("aria-expanded", isOpen);
    });

    aiClose.addEventListener("click", () => {
        aiPanel.classList.remove("active");
        aiButton.setAttribute("aria-expanded", "false");
    });

    const searchSuggestions = [
        "Wigs",
        "Bundles",
        "Braiding hair",
        "Straight hair",
        "Bouncy curls",
        "Frontal",
        "Wholesale",
        "Delivery information",
        "Appointments"
    ];

    aiInput.addEventListener("input", () => {

        const query = aiInput.value.toLowerCase().trim();

        aiPredictions.innerHTML = "";

        if (!query) return;

        const matches = searchSuggestions.filter(item =>
            item.toLowerCase().includes(query)
        );

        matches.slice(0, 4).forEach(item => {

            const suggestion = document.createElement("button");

            suggestion.textContent = item;

            suggestion.addEventListener("click", () => {
                aiInput.value = item;
                aiPredictions.innerHTML = "";
                aiForm.requestSubmit();
            });

            aiPredictions.appendChild(suggestion);

        });

    });

    function addAiMessage(message, type) {
        const bubble = document.createElement("div");

        bubble.className = "zels-ai-message " + type;
        bubble.textContent = message;

        aiChat.appendChild(bubble);
        aiChat.scrollTop = aiChat.scrollHeight;
    }

    function answerQuestion(question) {

        const q = question.toLowerCase();

        if (q.includes("wig")) {
            return "You're looking for wigs! Explore our wigs collection to see the available styles.";
        }

        if (q.includes("bundle")) {
            return "Our bundles collection is a great place to explore different textures and styles.";
        }

        if (q.includes("braid")) {
            return "You can explore our braiding extensions collection for your next hairstyle.";
        }

        if (q.includes("delivery")) {
            return "Zel's Hair Collection offers nationwide delivery. Contact us on WhatsApp for delivery enquiries.";
        }

        if (q.includes("appointment")) {
            return "You can explore our appointments section for more information.";
        }

        if (q.includes("wholesale")) {
            return "Interested in wholesale? Visit our wholesale section for more information.";
        }

        return "Thanks for your enquiry! For personalised product recommendations, please contact Zel's on WhatsApp while we connect the AI assistant to our product catalogue.";
    }

    aiForm.addEventListener("submit", (event) => {

        event.preventDefault();

        const question = aiInput.value.trim();

        if (!question) return;

        addAiMessage(question, "user");

        aiInput.value = "";
        aiPredictions.innerHTML = "";

        setTimeout(() => {
            addAiMessage(answerQuestion(question), "assistant");
        }, 400);

    });

    document.querySelectorAll(".zels-ai-suggestions button")
        .forEach(button => {

            button.addEventListener("click", () => {

                const question = button.dataset.question;

                addAiMessage(question, "user");

                setTimeout(() => {
                    addAiMessage(answerQuestion(question), "assistant");
                }, 400);

            });

        });

}
