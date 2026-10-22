/**
 * Bharat Technology Capability Centre (BTCC)
 * Reference Theme Client Script
 */

document.addEventListener('DOMContentLoaded', () => {

  // -------------------------------------------------------------------------
  // 1. MOBILE DRAWER TOGGLE
  // -------------------------------------------------------------------------
  const menuHamburger = document.getElementById('menu-hamburger');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerClose = document.getElementById('drawer-close');
  const drawerLinks = document.querySelectorAll('.drawer-nav a');

  function openDrawer() {
    if (mobileDrawer) {
      mobileDrawer.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeDrawer() {
    if (mobileDrawer) {
      mobileDrawer.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (menuHamburger) menuHamburger.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // -------------------------------------------------------------------------
  // 2. BACK TO TOP BUTTON
  // -------------------------------------------------------------------------
  const backTopBtn = document.getElementById('back-top');
  if (backTopBtn) {
    backTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  // -------------------------------------------------------------------------
  // 3. ACTIVE NAVIGATION LINK ON SCROLL
  // -------------------------------------------------------------------------
  const navItems = document.querySelectorAll('.theme-nav-item');
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNav() {
    const scrollPos = window.scrollY + 100;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navItems.forEach(item => {
          const href = item.getAttribute('href');
          if (href === `#${id}`) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });

  // -------------------------------------------------------------------------
  // 4. CSS PAGE TRANSITIONS & CLIENT ENHANCEMENT
  // -------------------------------------------------------------------------
  // Handle Back/Forward cache (bfcache) so page is never left in exit state
  window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
      document.body.classList.remove('page-is-leaving');
    }
  });

  // Feature detection for native W3C cross-document View Transitions
  function supportsNativeCrossDocumentVT() {
    if (typeof CSSStyleSheet === 'undefined') return false;
    try {
      const sheet = new CSSStyleSheet();
      sheet.replaceSync('@view-transition { navigation: auto; }');
      return sheet.cssRules.length > 0 && sheet.cssRules[0].cssText.includes('navigation: auto');
    } catch (e) {
      return false;
    }
  }

  // If browser does NOT support native cross-document view transitions,
  // apply smooth progressive exit transition on internal page links
  if (!supportsNativeCrossDocumentVT()) {
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (!link) return;

      const href = link.getAttribute('href');
      // Ignore anchors, external links, mailto, tel, target="_blank", or modifier clicks
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) return;
      if (link.target === '_blank' || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;

      // Ensure it is an internal link (e.g. index.html, idea.html, etc.)
      const isInternal = (!href.startsWith('http://') && !href.startsWith('https://')) || href.startsWith(window.location.origin);
      if (!isInternal) return;

      // Don't re-animate if clicking link to the current active page
      const currentPath = window.location.pathname.split('/').pop() || 'index.html';
      const targetPath = href.split('/').pop().split('#')[0] || 'index.html';
      if (currentPath === targetPath) return;

      e.preventDefault();
      document.body.classList.add('page-is-leaving');
      setTimeout(() => {
        window.location.href = href;
      }, 160);
    });
  }

});

