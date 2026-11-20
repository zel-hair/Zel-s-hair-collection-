
/* ZEL'S HAIR COLLECTION — SHOP PAGE INTERACTIONS */

document.addEventListener('DOMContentLoaded', () => {

  // MOBILE MENU
  const menuButton = document.querySelector('.shop-site-header .menu-button');
  const mainNav = document.getElementById('shopMainNav');

  if (menuButton && mainNav) {
    menuButton.addEventListener('click', () => {
      const open = mainNav.classList.toggle('is-open');

      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute(
        'aria-label',
        open ? 'Close menu' : 'Open menu'
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


  // PRODUCT SEARCH
  const searchToggle = document.getElementById('shopSearchToggle');
  const searchPanel = document.getElementById('shopSearchPanel');
  const searchInput = document.getElementById('shopSearchInput');
  const searchClear = document.getElementById('shopSearchClear');
  const searchFeedback = document.getElementById('shopSearchFeedback');

  const cards = Array.from(
    document.querySelectorAll('.shop-product-card')
  );

  const sections = Array.from(
    document.querySelectorAll('.shop-product-section')
  );

  const noResults = document.getElementById('shopNoResults');

  function filterProducts() {
    const query = (searchInput?.value || '').trim().toLowerCase();
    let visibleCount = 0;

    cards.forEach(card => {
      const searchable =
        `${card.dataset.name || ''} ${card.dataset.category || ''}`
        .toLowerCase();

      const visible = !query || searchable.includes(query);

      card.hidden = !visible;

      if (visible) visibleCount++;
    });

    sections.forEach(section => {
      const hasVisibleCards =
        section.querySelector('.shop-product-card:not([hidden])');

      section.hidden = !hasVisibleCards;
    });

    if (noResults) {
      noResults.hidden = visibleCount !== 0;
    }

    if (searchFeedback) {
      searchFeedback.textContent = query
        ? `${visibleCount} product${visibleCount === 1 ? '' : 's'} found`
        : '';
    }
  }

  if (searchToggle && searchPanel) {
    searchToggle.addEventListener('click', () => {
      const opening = searchPanel.hidden;

      searchPanel.hidden = !opening;

      searchToggle.setAttribute(
        'aria-expanded',
        String(opening)
      );

      searchToggle.setAttribute(
        'aria-label',
        opening ? 'Close product search' : 'Open product search'
      );

      if (opening) {
        searchInput?.focus();
      } else {
        if (searchInput) searchInput.value = '';
        filterProducts();
      }
    });
  }

  searchInput?.addEventListener('input', filterProducts);

  searchClear?.addEventListener('click', () => {
    if (searchInput) {
      searchInput.value = '';
      filterProducts();
      searchInput.focus();
    }
  });


  // SHOPPING CART
  const cartCount = document.getElementById('shopCartCount');
  const toast = document.getElementById('shopToast');

  const CART_KEY = 'zelsHairCart';

  function readCart() {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
    } catch {
      return [];
    }
  }

  function updateCartCount() {
    const total = readCart().reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    if (cartCount) {
      cartCount.textContent = String(total);
    }
  }

  let toastTimer;

  function showToast(message) {
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add('show');

    window.clearTimeout(toastTimer);

    toastTimer = window.setTimeout(() => {
      toast.classList.remove('show');
    }, 2200);
  }


  // ADD TO CART BUTTONS
  document.querySelectorAll('.shop-add-button').forEach(button => {

    button.addEventListener('click', () => {

      const id = button.dataset.productId;
      const name = button.dataset.productName;
      const stock = Number(button.dataset.stock || 0);

      const cart = readCart();

      const existing = cart.find(item => item.id === id);

      if ((existing?.quantity || 0) >= stock) {
        showToast('That sample stock quantity is already in your cart.');
        return;
      }

      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({
          id,
          name,
          price: 150,
          quantity: 1
        });
      }

      try {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));

        updateCartCount();

        showToast(`${name} added to your cart.`);

      } catch {
        showToast('Your browser could not save the cart on this device.');
      }

    });

  });


  // INITIALISE CART COUNT
  updateCartCount();


  // OPEN THE CORRECT CATEGORY FROM HOMEPAGE LINKS
  if (window.location.hash) {

    const target = document.getElementById(
      decodeURIComponent(window.location.hash.slice(1))
    );

    if (target) {
      window.requestAnimationFrame(() => {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      });
    }

  }

});
