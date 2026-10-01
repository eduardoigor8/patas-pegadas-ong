export function initializeNavigation() {
  const navToggle = document.querySelector('.nav-toggle');
  const primaryNavigation = document.getElementById('primary-navigation');

  if (!navToggle || !primaryNavigation) return;

  const closeNavigation = () => {
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Abrir menu de navegação');
    primaryNavigation.classList.remove('is-open');
    primaryNavigation.querySelectorAll('.nav-dropdown[open]').forEach((dropdown) => {
      dropdown.open = false;
    });
  };

  navToggle.addEventListener('click', () => {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!isExpanded));
    navToggle.setAttribute('aria-label', isExpanded ? 'Abrir menu de navegação' : 'Fechar menu de navegação');
    primaryNavigation.classList.toggle('is-open', !isExpanded);
  });

  primaryNavigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeNavigation);
  });

  document.addEventListener('click', (event) => {
    const clickedOutside = !navToggle.contains(event.target) && !primaryNavigation.contains(event.target);
    if (clickedOutside && navToggle.getAttribute('aria-expanded') === 'true') {
      closeNavigation();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;

    const openDropdown = primaryNavigation.querySelector('.nav-dropdown[open]');
    if (openDropdown) {
      openDropdown.open = false;
      openDropdown.querySelector('summary').focus();
      return;
    }

    if (navToggle.getAttribute('aria-expanded') === 'true') {
      closeNavigation();
      navToggle.focus();
    }
  });

  window.matchMedia('(min-width: 768px)').addEventListener('change', (event) => {
    if (event.matches) closeNavigation();
  });
}