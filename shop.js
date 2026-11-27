
/* ZEL'S HAIR COLLECTION — SHOP PAGE NAVIGATION */

document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.querySelector('.shop-site-header .menu-button');
  const mainNav = document.getElementById('shopMainNav');

  if (menuButton && mainNav) {
    const closeMenu = () => {
      mainNav.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open menu');
    };

    menuButton.addEventListener('click', () => {
      const open = mainNav.classList.toggle('is-open');
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });

    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') closeMenu();
    });

    document.addEventListener('click', event => {
      if (
        mainNav.classList.contains('is-open') &&
        !mainNav.contains(event.target) &&
        !menuButton.contains(event.target)
      ) {
        closeMenu();
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 760) closeMenu();
    });
  }

  // OPEN A CATEGORY FROM A HOMEPAGE LINK
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
