export function initializeSpaRouter(onPageLoaded) {
  let activeNavigation;

  const navigateTo = async (destination, updateHistory = true) => {
    activeNavigation?.abort();
    const controller = new AbortController();
    activeNavigation = controller;

    try {
      const response = await fetch(destination.href, { signal: controller.signal });
      if (!response.ok) throw new Error('Não foi possível carregar a página.');

      const pageDocument = new DOMParser().parseFromString(await response.text(), 'text/html');
      const nextMain = pageDocument.querySelector('main');
      const currentMain = document.querySelector('main');

      if (!nextMain || !currentMain) {
        window.location.assign(destination.href);
        return;
      }

      currentMain.replaceWith(nextMain);
      document.title = pageDocument.title;

      if (updateHistory) {
        window.history.pushState({}, '', destination.href);
      }

      onPageLoaded();

      const hashTarget = destination.hash
        ? document.getElementById(decodeURIComponent(destination.hash.slice(1)))
        : null;

      if (hashTarget) {
        hashTarget.scrollIntoView();
      } else {
        window.scrollTo(0, 0);
      }
    } catch (error) {
      if (!controller.signal.aborted) {
        window.location.assign(destination.href);
      }
    }
  };

  document.addEventListener('click', (event) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const link = event.target.closest('a[href]');
    if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;

    const destination = new URL(link.href, window.location.href);
    const currentDirectory = new URL('.', window.location.href).pathname;

    if (destination.origin !== window.location.origin
      || !destination.pathname.endsWith('.html')
      || !destination.pathname.startsWith(currentDirectory)) {
      return;
    }

    event.preventDefault();
    navigateTo(destination);
  });

  window.addEventListener('popstate', () => {
    navigateTo(new URL(window.location.href), false);
  });
}