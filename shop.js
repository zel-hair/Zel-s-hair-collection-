
/* ZEL'S HAIR COLLECTION — SHOP PAGE NAVIGATION */

document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.querySelector(
    '.shop-site-header .menu-button'
  );

  const mainNav = document.getElementById('shopMainNav');

  // MOBILE NAVIGATION
  if (menuButton && mainNav) {
    const closeMenu = () => {
      mainNav.classList.remove('is-open');

      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open menu');
    };

    menuButton.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('is-open');

      menuButton.setAttribute('aria-expanded', String(isOpen));
      menuButton.setAttribute(
        'aria-label',
        isOpen ? 'Close menu' : 'Open menu'
      );
    });

    // CLOSE MENU AFTER SELECTING A LINK
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // CLOSE MENU WITH ESCAPE
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    });

    // CLOSE MENU WHEN CLICKING OUTSIDE
    document.addEventListener('click', event => {
      if (
        mainNav.classList.contains('is-open') &&
        !mainNav.contains(event.target) &&
        !menuButton.contains(event.target)
      ) {
        closeMenu();
      }
    });

    // CLOSE MENU WHEN RETURNING TO DESKTOP
    window.addEventListener('resize', () => {
      if (window.innerWidth > 760) {
        closeMenu();
      }
    });
  }

  // OPEN A CATEGORY FROM A HOMEPAGE LINK
  if (window.location.hash) {
    let targetId = window.location.hash.slice(1);

    try {
      targetId = decodeURIComponent(targetId);
    } catch {
      // Keep the original hash if decoding fails.
    }

    const target = document.getElementById(targetId);

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
