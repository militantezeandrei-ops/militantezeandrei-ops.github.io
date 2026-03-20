// ════════════════════════════════════════
//   ZDM_ PORTFOLIO — script.js
// ════════════════════════════════════════

// ── Init Lucide Icons ──
if (typeof lucide !== 'undefined') {
    lucide.createIcons();
}

// ── Live Clock (top bar) ──
function updateClock() {
    const el = document.getElementById('clock');
    if (!el) return;
    const now = new Date();
    el.textContent = now.toLocaleTimeString('en-PH', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
}
updateClock();
setInterval(updateClock, 1000);

// ── Cursor Glow ──
const cursorGlow = document.getElementById('cursor-glow');
if (cursorGlow) {
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top  = e.clientY + 'px';
    });
}

// ── Typewriter Effect ──
const typeTarget = document.getElementById('typewriter');
const sideType   = document.getElementById('sidebar-type');
const words      = ['Developer', 'Designer', 'Builder', 'Freelancer'];
let wordIndex = 0, charIndex = 0, deleting = false;

function typeLoop() {
    const current = words[wordIndex];
    if (!deleting) {
        const txt = current.substring(0, charIndex + 1);
        if (typeTarget) typeTarget.textContent = txt;
        if (sideType)   sideType.textContent   = txt;
        charIndex++;
        if (charIndex === current.length) {
            deleting = true;
            setTimeout(typeLoop, 1800);
            return;
        }
    } else {
        const txt = current.substring(0, charIndex - 1);
        if (typeTarget) typeTarget.textContent = txt;
        if (sideType)   sideType.textContent   = txt;
        charIndex--;
        if (charIndex === 0) {
            deleting  = false;
            wordIndex = (wordIndex + 1) % words.length;
        }
    }
    setTimeout(typeLoop, deleting ? 55 : 95);
}
typeLoop();

// ── Panel Switching ──
function switchPanel(id, navEl) {
    // Hide all panels
    document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
    // Deactivate all nav items
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

    // Show target panel
    const target = document.getElementById('panel-' + id);
    if (target) target.classList.add('active');

    // Update status bar label
    const label = document.getElementById('active-panel-label');
    if (label) label.textContent = id;

    // Activate nav item
    if (navEl) {
        navEl.classList.add('active');
    } else {
        const match = document.querySelector('[data-panel="' + id + '"]');
        if (match) match.classList.add('active');
    }

    // Close mobile sidebar after navigation
    closeSidebar();
}

// ── Mobile Sidebar ──
const sidebar        = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebar-overlay');
const mobileMenuBtn  = document.getElementById('mobile-menu-btn');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        if (sidebar)        sidebar.classList.add('open');
        if (sidebarOverlay) sidebarOverlay.classList.add('open');
    });
}

function closeSidebar() {
    if (sidebar)        sidebar.classList.remove('open');
    if (sidebarOverlay) sidebarOverlay.classList.remove('open');
}

if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', closeSidebar);
}

// ── Contact Form ──
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const btn = contactForm.querySelector('button[type="submit"]');
        if (!btn) return;

        const originalHTML = btn.innerHTML;
        btn.innerHTML  = 'Sending...';
        btn.disabled   = true;

        try {
            const response = await fetch('https://formspree.io/f/xykdojdv', {
                method:  'POST',
                body:    new FormData(contactForm),
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                btn.innerHTML         = '✓ Message Sent!';
                btn.style.background  = 'var(--neon)';
                btn.style.color       = '#000';
                contactForm.reset();

                setTimeout(() => {
                    btn.innerHTML        = originalHTML;
                    btn.style.background = '';
                    btn.style.color      = '';
                    if (typeof lucide !== 'undefined') lucide.createIcons();
                }, 4000);
            } else {
                contactForm.submit();
            }
        } catch (err) {
            contactForm.submit();
        } finally {
            btn.disabled = false;
        }
    });
}