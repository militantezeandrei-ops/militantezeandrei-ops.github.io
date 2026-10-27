(() => {
    const button = document.getElementById('theme-toggle');
    if (!button) return;

    const storageKey = 'zeandrei-portfolio-theme';
    let savedTheme = null;
    try {
        savedTheme = localStorage.getItem(storageKey);
    } catch (error) {
        // Theme switching still works when browser storage is unavailable.
    }

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    let isDark = savedTheme ? savedTheme === 'dark' : prefersDark;

    const applyTheme = () => {
        document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
        button.setAttribute('aria-pressed', String(isDark));
        button.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} mode`);
        button.innerHTML = `
            <i data-lucide="${isDark ? 'sun' : 'moon'}" aria-hidden="true"></i>
            <span class="theme-toggle-label">${isDark ? 'Light mode' : 'Dark mode'}</span>
        `;
        if (window.lucide) window.lucide.createIcons();
    };

    button.addEventListener('click', () => {
        isDark = !isDark;
        try {
            localStorage.setItem(storageKey, isDark ? 'dark' : 'light');
        } catch (error) {
            // Keep the selected theme for this page even without storage.
        }
        applyTheme();
    });

    applyTheme();
})();
