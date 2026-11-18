// ZEL'S HAIR COLLECTION — HOMEPAGE INTERACTIONS

document.addEventListener('DOMContentLoaded', function () {

    // SHOP INTRODUCTION SCROLL ANIMATION

    const shopIntro = document.querySelector('.category-intro');

    if (shopIntro && 'IntersectionObserver' in window) {
        const shopObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    shopIntro.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        shopObserver.observe(shopIntro);
    }


    // SHOP BLUR-TO-CLEAR EFFECT

    const hero = document.querySelector('.hero');

    if (hero && shopIntro && 'IntersectionObserver' in window) {
        const heroObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                shopIntro.classList.toggle(
                    'shop-is-clear',
                    !entry.isIntersecting
                );
            });
        }, { threshold: 0 });

        heroObserver.observe(hero);
    }


    // WHAT'S YOUR VIBE

    const vibeOptions = document.querySelectorAll('.vibe-option');
    const vibeMessage = document.getElementById('vibeMessage');

    const vibeMessages = {
        waves: "Hi, Waves Girly! Zel's has beautiful options to help you find a look you'll love.",

        pixie: "Hi, Pixie Cut Babe! Explore styles that complement your look and personal taste.",

        straight: "Hi, Straight Doll! Sleek and timeless looks? You're in the right place.",

        curly: "Hi, Curly Hair Lady! Let's find a texture that brings your look together.",

        afro: "Hi, Afro Queen! Explore hair options to complement your style."
    };

    if (vibeOptions.length && vibeMessage) {

        vibeOptions.forEach(option => {

            option.setAttribute('aria-pressed', 'false');

            option.addEventListener('click', function () {

                const message = vibeMessages[this.dataset.vibe];

                if (!message) return;

                vibeOptions.forEach(item => {
                    item.classList.remove('active');
                    item.setAttribute('aria-pressed', 'false');
                });

                this.classList.add('active');
                this.setAttribute('aria-pressed', 'true');

                vibeMessage.replaceChildren();

                const text = document.createElement('span');
                text.textContent = message;

                const link = document.createElement('a');
                link.href = '#shop';
                link.textContent = 'SHOP';

                vibeMessage.append(
                    text,
                    document.createElement('br'),
                    document.createElement('br'),
                    document.createTextNode('Ready to explore? '),
                    link
                );

                vibeMessage.classList.add('visible');

            });

        });

    }


    // CUSTOMER REVIEWS — FIVE ROTATING REVIEWS

    const reviews = [

        {
            title: 'I love the textures of the hair',
            message: 'I love the textures of the hair so much.',
            author: 'Abena Acheampong'
        },

        {
            title: 'Exactly what I was looking for',
            message: "The hair was exactly what I was looking for. I'm so happy with my purchase.",
            author: 'Nana Ama'
        },

        {
            title: 'Beautiful hair quality',
            message: 'Beautiful quality and the hair feels so soft.',
            author: 'Esi Mensah'
        },

        {
            title: 'Absolutely love my hair',
            message: 'I absolutely love my hair. Definitely ordering again!',
            author: 'Akosua'
        },

        {
            title: 'Exceeded my expectations',
            message: 'The quality exceeded my expectations. Really lovely hair.',
            author: 'Mabel Owusu'
        }

    ];

    const reviewCard = document.getElementById('reviewCard');
    const reviewTitle = document.getElementById('reviewTitle');
    const reviewMessage = document.getElementById('reviewMessage');
    const reviewAuthor = document.getElementById('reviewAuthor');

    const nextReview = document.getElementById('nextReview');
    const prevReview = document.getElementById('prevReview');

    if (
        reviewCard &&
        reviewTitle &&
        reviewMessage &&
        reviewAuthor &&
        nextReview &&
        prevReview
    ) {

        let currentReview = 0;
        let transitionTimer;

        function showReview(index) {

            currentReview = (index + reviews.length) % reviews.length;

            reviewCard.style.opacity = '0';

            window.clearTimeout(transitionTimer);

            transitionTimer = window.setTimeout(() => {

                reviewTitle.textContent = reviews[currentReview].title;
                reviewMessage.textContent = reviews[currentReview].message;
                reviewAuthor.textContent = reviews[currentReview].author;

                reviewCard.style.opacity = '1';

            }, 180);

        }

        nextReview.addEventListener('click', () => {
            showReview(currentReview + 1);
        });

        prevReview.addEventListener('click', () => {
            showReview(currentReview - 1);
        });

        showReview(0);

    }


    // ZEL'S AI ASSISTANT

    const aiButton = document.getElementById('zelsAiButton');
    const aiPanel = document.getElementById('zelsAiPanel');
    const aiClose = document.getElementById('zelsAiClose');

    const aiForm = document.getElementById('zelsAiForm');
    const aiInput = document.getElementById('zelsAiInput');
    const aiChat = document.getElementById('zelsAiChat');
    const aiPredictions = document.getElementById('zelsAiPredictions');

    if (aiButton && aiPanel) {

        aiButton.addEventListener('click', () => {

            aiPanel.classList.toggle('active');

            aiButton.setAttribute(
                'aria-expanded',
                aiPanel.classList.contains('active')
            );

        });

        if (aiClose) {

            aiClose.addEventListener('click', () => {

                aiPanel.classList.remove('active');

                aiButton.setAttribute('aria-expanded', 'false');

            });

        }

        const suggestions = [
            'Wigs',
            'Bundles',
            'Braiding hair',
            'Straight hair',
            'Bouncy curls',
            'Frontal',
            'Wholesale',
            'Delivery information',
            'Appointments'
        ];

        function addAiMessage(message, type) {

            if (!aiChat) return;

            const bubble = document.createElement('div');

            bubble.className = 'zels-ai-message ' + type;

            bubble.textContent = message;

            aiChat.appendChild(bubble);

            aiChat.scrollTop = aiChat.scrollHeight;

        }

        function answerQuestion(question) {

            const q = question.toLowerCase();

            if (q.includes('wig')) {
                return "You're looking for wigs! Explore our wigs collection to see the available styles.";
            }

            if (q.includes('bundle')) {
                return 'Our bundles collection is a great place to explore different textures and styles.';
            }

            if (q.includes('braid')) {
                return 'You can explore our braiding extensions collection for your next hairstyle.';
            }

            if (q.includes('delivery')) {
                return "Zel's Hair Collection offers nationwide delivery. Contact us on WhatsApp for delivery enquiries.";
            }

            if (q.includes('appointment')) {
                return 'You can explore our appointments section for more information.';
            }

            if (q.includes
