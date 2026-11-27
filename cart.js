
/* ZEL'S HAIR COLLECTION — SHARED SEARCH & CART */

document.addEventListener('DOMContentLoaded', () => {
  const CART_KEY = 'zelsHairCart';
  const WHATSAPP_NUMBER = '233536115258';

  const cartDrawer = document.getElementById('shoppingCart');
  const cartBackdrop = document.querySelector('.cart-backdrop');
  const cartItems = document.getElementById('cartItems');
  const cartSubtotal = document.getElementById('cartSubtotal');
  const checkoutButton = document.getElementById('cartCheckout');

  let lastCartTrigger = null;
  let toastTimer;

  // CART STORAGE
  function readCart() {
    try {
      const saved = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  }

  function saveCart(cart) {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
      return true;
    } catch {
      showToast('Your browser could not save the cart.');
      return false;
    }
  }

  const money = amount => `GHC ${Number(amount || 0).toFixed(2)}`;

  // NOTIFICATIONS
  function showToast(message) {
    let toast = document.getElementById('shopToast');

    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'shopToast';
      toast.className = 'shop-toast';
      toast.setAttribute('role', 'status');
      document.body.append(toast);
    }

    toast.textContent = message;
    toast.classList.add('show');

    window.clearTimeout(toastTimer);

    toastTimer = window.setTimeout(() => {
      toast.classList.remove('show');
    }, 2200);
  }

  // UPDATE CART DISPLAY
  function updateCart() {
    const cart = readCart();

    const totalQuantity = cart.reduce(
      (sum, item) => sum + Number(item.quantity || 0),
      0
    );

    const subtotal = cart.reduce(
      (sum, item) =>
        sum + Number(item.price || 0) * Number(item.quantity || 0),
      0
    );

    document.querySelectorAll('[data-cart-count]').forEach(counter => {
      counter.textContent = totalQuantity;
      counter.setAttribute('aria-label', `${totalQuantity} items in cart`);
    });

    const headingCount = document.querySelector('[data-cart-heading-count]');

    if (headingCount) {
      headingCount.textContent = `(${totalQuantity})`;
    }

    if (cartSubtotal) {
      cartSubtotal.textContent = money(subtotal);
    }

    if (!cartItems) return;

    cartItems.replaceChildren();

    if (!cart.length) {
      const empty = document.createElement('p');
      empty.className = 'cart-empty';
      empty.textContent = 'Your cart is currently empty.';
      cartItems.append(empty);
      return;
    }

    cart.forEach(item => {
      const row = document.createElement('article');
      row.className = 'cart-item';

      const details = document.createElement('div');
      details.className = 'cart-item-details';

      const name = document.createElement('h3');
      name.textContent = item.name;

      const price = document.createElement('p');
      price.textContent = money(item.price);

      details.append(name, price);

      const controls = document.createElement('div');
      controls.className = 'cart-item-controls';

      const decrease = document.createElement('button');
      decrease.type = 'button';
      decrease.textContent = '−';
      decrease.setAttribute('aria-label', `Decrease ${item.name} quantity`);
      decrease.dataset.cartAction = 'decrease';
      decrease.dataset.productId = item.id;

      const quantity = document.createElement('span');
      quantity.textContent = item.quantity;

      const increase = document.createElement('button');
      increase.type = 'button';
      increase.textContent = '+';
      increase.setAttribute('aria-label', `Increase ${item.name} quantity`);
      increase.dataset.cartAction = 'increase';
      increase.dataset.productId = item.id;

      const remove = document.createElement('button');
      remove.type = 'button';
      remove.className = 'cart-remove';
      remove.textContent = 'Remove';
      remove.dataset.cartAction = 'remove';
      remove.dataset.productId = item.id;

      controls.append(decrease, quantity, increase);
      row.append(details, controls, remove);
      cartItems.append(row);
    });
  }

  // OPEN AND CLOSE CART
  function openCart(trigger) {
    if (!cartDrawer || !cartBackdrop) return;

    lastCartTrigger = trigger || document.activeElement;

    cartDrawer.classList.add('is-open');
    cartDrawer.setAttribute('aria-hidden', 'false');
    cartBackdrop.hidden = false;
    document.body.classList.add('cart-is-open');

    const closeButton = cartDrawer.querySelector('[data-cart-close]');
    closeButton?.focus();
  }

  function closeCart() {
    if (!cartDrawer || !cartBackdrop) return;

    cartDrawer.classList.remove('is-open');
    cartDrawer.setAttribute('aria-hidden', 'true');
    cartBackdrop.hidden = true;
    document.body.classList.remove('cart-is-open');

    if (lastCartTrigger && typeof lastCartTrigger.focus === 'function') {
      lastCartTrigger.focus();
    }
  }

  document.querySelectorAll('[data-cart-open]').forEach(button => {
    button.addEventListener('click', () => openCart(button));
  });

  document.querySelectorAll('[data-cart-close]').forEach(button => {
    button.addEventListener('click', closeCart);
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeCart();
    }
  });

  // ADD PRODUCTS
  document.querySelectorAll('.shop-add-button').forEach(button => {
    button.addEventListener('click', () => {
      const id = button.dataset.productId;
      const name = button.dataset.productName;
      const stock = Number(button.dataset.stock || 0);

      const card = button.closest('.shop-product-card');

      const priceText =
        card?.querySelector('.shop-product-price')?.textContent || '';

      const price = Number(priceText.replace(/[^0-9.]/g, ''));

      if (!id || !name || !Number.isFinite(price) || price <= 0) {
        showToast('This product could not be added.');
        return;
      }

      const cart = readCart();
      const existing = cart.find(item => item.id === id);

      if (existing && existing.quantity >= stock) {
        showToast('That sample stock quantity is already in your cart.');
        return;
      }

      if (existing) {
        existing.quantity += 1;
      } else {
        if (stock < 1) {
          showToast('This product is currently unavailable.');
          return;
        }

        cart.push({
          id,
          name,
          price,
          quantity: 1,
          stock
        });
      }

      if (saveCart(cart)) {
        updateCart();
        showToast(`${name} added to your cart.`);
      }
    });
  });

  // CART QUANTITY AND REMOVE CONTROLS
  cartItems?.addEventListener('click', event => {
    const button = event.target.closest('[data-cart-action]');

    if (!button) return;

    const id = button.dataset.productId;
    const action = button.dataset.cartAction;

    const cart = readCart();
    const item = cart.find(product => product.id === id);

    if (!item) return;

    if (action === 'increase') {
      if (item.quantity >= Number(item.stock || 99)) {
        showToast('That sample stock quantity is already in your cart.');
        return;
      }

      item.quantity += 1;
    }

    if (action === 'decrease') {
      item.quantity -= 1;

      if (item.quantity <= 0) {
        const index = cart.findIndex(product => product.id === id);
        cart.splice(index, 1);
      }
    }

    if (action === 'remove') {
      const index = cart.findIndex(product => product.id === id);
      cart.splice(index, 1);
    }

    if (saveCart(cart)) {
      updateCart();
    }
  });

  // CHECKOUT THROUGH WHATSAPP
  checkoutButton?.addEventListener('click', () => {
    const cart = readCart();

    if (!cart.length) {
      showToast('Your cart is empty.');
      return;
    }

    const lines = cart.map(item =>
      `${item.name} x ${item.quantity} — ${money(item.price * item.quantity)}`
    );

    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const message = [
      "Hello Zel's Hair Collection, I'd like to place an order:",
      '',
      ...lines,
      '',
      `Subtotal: ${money(total)}`,
      '',
      'Please let me know the next steps and delivery charges.'
    ].join('\n');

    const whatsappURL =
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, '_blank', 'noopener,noreferrer');
  });

  // SHOP PAGE SEARCH
  const searchToggle = document.getElementById('shopSearchToggle');
  const searchPanel = document.getElementById('shopSearchPanel');
  const searchInput = document.getElementById('shopSearchInput');
  const searchClear = document.getElementById('shopSearchClear');
  const searchFeedback = document.getElementById('shopSearchFeedback');
  const noResults = document.getElementById('shopNoResults');

  const productCards = Array.from(
    document.querySelectorAll('.shop-product-card')
  );

  const productSections = Array.from(
    document.querySelectorAll('.shop-product-section')
  );

  function filterProducts(query) {
    let visibleCount = 0;

    productCards.forEach(card => {
      const searchable =
        `${card.dataset.name || ''} ${card.dataset.category || ''}`.toLowerCase();

      const visible = !query || searchable.includes(query);

      card.hidden = !visible;

      if (visible) visibleCount++;
    });

    productSections.forEach(section => {
      const hasVisibleCards = section.querySelector(
        '.shop-product-card:not([hidden])'
      );

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
      searchToggle.setAttribute('aria-expanded', String(opening));
      searchToggle.setAttribute(
        'aria-label',
        opening ? 'Close product search' : 'Open product search'
      );

      if (opening) {
        searchInput?.focus();
      } else {
        if (searchInput) searchInput.value = '';
        filterProducts('');
      }
    });
  }

  searchInput?.addEventListener('input', () => {
    filterProducts(searchInput.value.trim().toLowerCase());
  });

  searchClear?.addEventListener('click', () => {
    if (!searchInput) return;

    searchInput.value = '';
    filterProducts('');
    searchInput.focus();
  });

  // HOMEPAGE SEARCH
  const homeSearchToggle = document.getElementById('homeSearchToggle');
  const homeSearchPanel = document.getElementById('homeSearchPanel');
  const homeSearchInput = document.getElementById('homeSearchInput');
  const homeSearchForm = document.getElementById('homeSearchForm');
  const homeSearchSubmit = document.getElementById('homeSearchSubmit');

  function submitHomeSearch() {
    const query = homeSearchInput?.value.trim();

    if (!query) {
      homeSearchInput?.focus();
      return;
    }

    window.location.href = `shop.html?search=${encodeURIComponent(query)}`;
  }

  homeSearchToggle?.addEventListener('click', () => {
    if (!homeSearchPanel) return;

    const opening = homeSearchPanel.hidden;

    homeSearchPanel.hidden = !opening;
    homeSearchToggle.setAttribute('aria-expanded', String(opening));

    if (opening) {
      homeSearchInput?.focus();
    }
  });

  homeSearchForm?.addEventListener('submit', event => {
    event.preventDefault();
    submitHomeSearch();
  });

  // Fallback for a standalone submit button
  if (!homeSearchForm) {
    homeSearchSubmit?.addEventListener('click', submitHomeSearch);

    homeSearchInput?.addEventListener('keydown', event => {
      if (event.key === 'Enter') {
        event.preventDefault();
        submitHomeSearch();
      }
    });
  }

  // OPEN SHOP SEARCH WHEN ARRIVING FROM HOMEPAGE
  const params = new URLSearchParams(window.location.search);
  const initialSearch = params.get('search');

  if (initialSearch && searchPanel && searchInput) {
    searchPanel.hidden = false;
    searchInput.value = initialSearch;

    searchToggle?.setAttribute('aria-expanded', 'true');
    searchToggle?.setAttribute('aria-label', 'Close product search');

    filterProducts(initialSearch.trim().toLowerCase());

    window.requestAnimationFrame(() => {
      searchPanel.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });

      searchInput.focus();
    });
  }

  // INITIAL CART DISPLAY
  updateCart();
});
