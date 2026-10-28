// Floating mobile navigation. The page supplies the button and its menu in the HTML.
(() => {
    const button = document.getElementById('mobile-nav-fab');
    const menu = document.getElementById('mobile-nav-list');
    const backdrop = document.getElementById('mobile-nav-backdrop');
    if (!button || !menu) return;

    const setOpen = (open) => {
        button.setAttribute('aria-expanded', String(open));
        button.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
        menu.classList.toggle('open', open);
        menu.setAttribute('aria-hidden', String(!open));
        menu.inert = !open;
        if (backdrop) {
            backdrop.classList.toggle('open', open);
            backdrop.setAttribute('aria-hidden', String(!open));
        }
    };

    const toggleOpen = () => setOpen(button.getAttribute('aria-expanded') !== 'true');
    button.addEventListener('click', (event) => {
        event.stopPropagation();
        toggleOpen();
    });

    if (backdrop) {
        backdrop.addEventListener('click', () => {
            setOpen(false);
            button.focus();
        });
    }

    menu.addEventListener('click', (event) => {
        const link = event.target.closest('a, button');
        if (!link || !menu.contains(link)) return;

        const hash = link.getAttribute('href');
        const sectionId = link.dataset.section || (hash && hash.startsWith('#') ? hash.slice(1) : '');
        const target = sectionId ? document.getElementById(sectionId) : null;
        if (target) {
            event.preventDefault();
            target.scrollIntoView({
                behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
                block: 'start'
            });
            if (hash && hash.startsWith('#')) {
                history.replaceState(null, '', `#${encodeURIComponent(sectionId)}`);
            }
        }
        setOpen(false);
    });

    document.addEventListener('click', (event) => {
        if (!menu.contains(event.target) && !button.contains(event.target)) setOpen(false);
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') {
            setOpen(false);
            button.focus();
        }
    });

    // Ensure the initial accessibility state matches the collapsed menu.
    setOpen(false);
})();
