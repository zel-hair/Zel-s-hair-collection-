
// ZEL'S HAIR COLLECTION — HOMEPAGE INTERACTIONS

document.addEventListener('DOMContentLoaded', function () {

    // ACCESSIBLE MOBILE NAVIGATION

    const menuButton = document.querySelector('.menu-button');
    const mainNav = document.getElementById('mainNav');

    if (menuButton && mainNav) {
        menuButton.addEventListener('click', () => {
            const isOpen = mainNav.classList.toggle('is-open');

            menuButton.setAttribute('aria-expanded', String(isOpen));
            menuButton.setAttribute(
                'aria-label',
                isOpen ? 'Close menu' : 'Open menu'
            );
        });

        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('is-open');
                menuButton.setAttribute('aria-expanded', 'false');
                menuButton.setAttribute('aria-label', 'Open menu');
            });
        });

        document.addEventListener('keydown', event => {
            if (event.key === 'Escape') {
                mainNav.classList.remove('is-open');
                menuButton.setAttribute('aria-expanded', 'false');
                menuButton.setAttribute('aria-label', 'Open menu');
            }
        });
    }


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


    // WHAT'S YOUR VIBE

    const vibeOptions = document.querySelectorAll('.vibe-option');
    const vibeMessage = document.getElementById('vibeMessage');

    const vibeMessages = {
        waves: "Hi, Waves Girly! Zel's got you covered with some beautiful waves for your taste!",
        pixie: "Hi, Pixie Cut Babe! Zel's got you covered with hair options to complement your style!",
        straight: "Hi, Straight Doll! Sleek looks are always a statement. Zel's got something for your taste!",
        curly: "Hi, Curly Hair Lady! Let's get those curls talking. Zel's got you covered!",
        afro: "Hi, Afro Queen! Zel's got you covered with some beautiful hair options to complement your taste."
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
                    document.createTextNode('Click on '),
                    link,
                    document.createTextNode(' to explore hair!')
                );

                vibeMessage.classList.add('visible');
            });
        });
    }


    // CUSTOMER REVIEWS — CENTERED ONE-AT-A-TIME CAROUSEL

    const reviewTrack = document.querySelector('.reviews-track');

    const reviewCards = reviewTrack
        ? Array.from(reviewTrack.querySelectorAll('.review-card'))
        : [];

    const previousReview = document.getElementById('prevReview');
    const nextReview = document.getElementById('nextReview');

    let currentReview = 0;

    function showReview(index) {
        if (!reviewTrack || !reviewCards.length) return;

        currentReview = (index + reviewCards.length) % reviewCards.length;

        reviewTrack.style.transform =
            `translateX(-${currentReview * 20}%)`;

        reviewCards.forEach((card, cardIndex) => {
            card.setAttribute(
                'aria-hidden',
                cardIndex === currentReview ? 'false' : 'true'
            );

            card.toggleAttribute(
                'inert',
                cardIndex !== currentReview
            );
        });
    }

    if (reviewTrack && reviewCards.length) {
        previousReview?.addEventListener('click', () => {
            showReview(currentReview - 1);
        });

        nextReview?.addEventListener('click', () => {
            showReview(currentReview + 1);
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

            if (q.includes('wholesale')) {
                return 'Interested in wholesale? Visit our wholesale section for more information.';
            }

            if (
                q.includes('straight') ||
                q.includes('bouncy') ||
                q.includes('curl') ||
                q.includes('frontal')
            ) {
                return 'Explore our hair bundles and wigs collections to find the texture or style you have in mind.';
            }

            return "Thanks for your enquiry! For personalised product recommendations, please contact Zel's on WhatsApp while we connect the assistant to our product catalogue.";
        }


        // LIVE SUGGESTIONS WHILE THE CUSTOMER TYPES

        if (aiInput && aiPredictions) {
            aiInput.addEventListener('input', () => {
                const query = aiInput.value.toLowerCase().trim();

                aiPredictions.replaceChildren();

                if (!query) return;

                suggestions
                    .filter(item => item.toLowerCase().includes(query))
                    .slice(0, 4)
                    .forEach(item => {
                        const button = document.createElement('button');

                        button.type = 'button';
                        button.textContent = item;

                        button.addEventListener('click', () => {
                            aiInput.value = item;
                            aiPredictions.replaceChildren();

                            if (aiForm) {
                                aiForm.requestSubmit();
                            }
                        });

                        aiPredictions.appendChild(button);
                    });
            });
        }


        // CUSTOMER QUESTION SUBMISSION

        if (aiForm && aiInput) {
            aiForm.addEventListener('submit', event => {
                event.preventDefault();

                const question = aiInput.value.trim();

                if (!question) return;

                addAiMessage(question, 'user');

                aiInput.value = '';

                if (aiPredictions) {
                    aiPredictions.replaceChildren();
                }

                window.setTimeout(() => {
                    addAiMessage(answerQuestion(question), 'assistant');
                }, 400);
            });
        }


        // PRESET QUESTIONS IN THE CHAT WINDOW

        document.querySelectorAll('.zels-ai-suggestions button').forEach(button => {
            button.addEventListener('click', () => {
                const question = button.dataset.question;

                if (!question) return;

                addAiMessage(question, 'user');

                window.setTimeout(() => {
                    addAiMessage(answerQuestion(question), 'assistant');
                }, 400);
            });
        });
    }


    // PERMANENT NEWSLETTER SECTION — NO POPUP

    const newsletterForm = document.getElementById('newsletterForm');

    const newsletterFeedback = newsletterForm
        ? newsletterForm.parentElement.querySelector('.form-message')
        : null;

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', event => {
            event.preventDefault();

            if (!newsletterForm.checkValidity()) {
                newsletterForm.reportValidity();
                return;
            }

            if (newsletterFeedback) {
                newsletterFeedback.textContent =
                    'Thank you for your interest! Newsletter sign-up will be available soon.';
            }

            // No email service is connected yet.
        });
    }


    // AI GREETING

    const aiGreeting = document.getElementById('zelsAiGreeting');

    if (aiGreeting && aiButton) {
        window.setTimeout(() => {
            aiGreeting.classList.add('show-greeting');

            window.setTimeout(() => {
                aiGreeting.classList.remove('show-greeting');
            }, 3000);

        }, 1000);
    }

});
