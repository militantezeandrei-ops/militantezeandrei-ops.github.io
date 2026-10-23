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

// ── Panel Switching with Smooth Sliding ──
const panelOrder = ['home', 'about', 'projects', 'skills', 'certs', 'contact'];

function switchPanel(id, navEl) {
    const panelIndex = panelOrder.indexOf(id);
    const slider = document.getElementById('panels-slider');
    if (slider && panelIndex !== -1) {
        slider.style.transform = `translateX(-${panelIndex * (100 / panelOrder.length)}%)`;
    }

    // Hide all panels active state
    document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
    // Deactivate all nav items
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.querySelectorAll('.nav-item-mobile').forEach(n => n.classList.remove('active'));

    // Show target panel
    const target = document.getElementById('panel-' + id);
    if (target) target.classList.add('active');

    // Update status bar label
    const label = document.getElementById('active-panel-label');
    if (label) label.textContent = id.charAt(0).toUpperCase() + id.slice(1);

    // Activate nav item
    if (navEl) {
        navEl.classList.add('active');
    } else {
        const match = document.querySelector('[data-panel="' + id + '"]');
        if (match) match.classList.add('active');
    }

    // Sync other nav items
    document.querySelectorAll('[data-panel="' + id + '"]').forEach(el => el.classList.add('active'));

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

// ── Project Modal & Slide Flows ──
const projectModalOverlay = document.getElementById('project-modal-overlay');
const projectModalTitle = document.getElementById('project-modal-title');
const projectModalDescription = document.getElementById('project-modal-description');
const projectFlowWrap = document.getElementById('project-flow-wrap');
const projectFlowTrack = document.getElementById('project-flow-track');
const projectFlowDots = document.getElementById('project-flow-dots');
const projectFlowStatus = document.getElementById('project-flow-status');
const projectFlowPrev = document.getElementById('project-flow-prev');
const projectFlowNext = document.getElementById('project-flow-next');

const projectFlowGuides = {
    Edebt: [
        {
            tag: 'Mobile Input',
            title: 'Step 1: Scan handwritten debt slip in mobile app',
            text: 'The collector captures the handwritten order or debt note directly in the app so no one has to encode entries manually.',
            image: 'assets/projects/edebt_handwritten_slip.png'
        },
        {
            tag: 'Text Extraction',
            title: 'Step 2: Extract customer details and debt values',
            text: 'The system reads handwritten text, then maps the name, total amount, items, and due date into editable fields before submit.',
            image: 'assets/projects/edebt_admin.png'
        },
        {
            tag: 'Organize + Save',
            title: 'Step 3: Validate and save organized debt records',
            text: 'After review, the app stores each debt in a structured ledger grouped by customer and payment status for quick retrieval.',
            image: 'assets/projects/edebt_admin1.png'
        },
        {
            tag: 'Admin Monitoring',
            title: 'Step 4: Admin monitors user activity and repayments',
            text: 'Web admins track who created or updated records, monitor repayment progress, and identify overdue accounts in one dashboard.',
            image: 'assets/projects/edebt_admin1.png'
        }
    ],
    EcoDefill: [
        {
            tag: 'Mobile UI',
            title: 'Step 1: Use the mobile interface',
            text: 'This mobile screen shows the core user journey for scanning, points, and refill interactions in one flow.',
            image: 'assets/projects/EcoDefillMobile.jpg'
        },
        {
            tag: 'Dashboard',
            title: 'Step 2: View machine status and refill metrics',
            text: 'Admins can see station health, refill activity, and daily usage from the EcoDefill dashboard.',
            image: 'assets/projects/ecodefilldashboard.png'
        },
        {
            tag: 'Users',
            title: 'Step 3: Manage users and reward points',
            text: 'Track user accounts, monitor point balances, and validate reward eligibility in one place.',
            image: 'assets/projects/ecodefillusers.png'
        },
        {
            tag: 'Transactions',
            title: 'Step 4: Review refill and redemption logs',
            text: 'Every refill and point redemption is recorded so admins can audit activity and resolve disputes quickly.',
            image: 'assets/projects/ecodefillTransactionLog.png'
        },
        {
            tag: 'Reports',
            title: 'Step 5: Analyze recycling impact and trends',
            text: 'Generate performance reports to monitor waste converted, user engagement, and machine efficiency.',
            image: 'assets/projects/ecodefillReports.png'
        }
    ],
    Marmet: [
        {
            tag: 'Quick Guide',
            title: 'Order, stock, and sales workflow',
            text: 'Customers order live, staff fulfill transactions, and admins manage inventory plus sales insights from the web dashboard.',
            image: 'assets/projects/marmet_showcase.png'
        }
    ]
};

let projectSlides = [];
let projectSlideIndex = 0;

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function getProjectSlides(title, description) {
    const guide = projectFlowGuides[title];
    if (guide && guide.length) return guide;
    return [{
        tag: 'Overview',
        title: 'Project workflow snapshot',
        text: description || 'No description available.',
        image: ''
    }];
}

function renderProjectSlides(title, description) {
    if (!projectFlowTrack || !projectFlowDots) return;
    projectSlides = getProjectSlides(title, description);
    projectSlideIndex = 0;

    projectFlowTrack.innerHTML = projectSlides.map(slide => `
        <article class="project-flow-slide">
            ${slide.image ? `
                <div class="project-flow-media">
                    <img src="${escapeHtml(slide.image)}" alt="${escapeHtml(slide.title)}">
                </div>
            ` : '<div class="project-flow-empty">No preview image available.</div>'}
            <div class="project-flow-content">
                <span class="project-flow-tag">${escapeHtml(slide.tag || 'Step')}</span>
                <p class="project-flow-title">${escapeHtml(slide.title || 'Step')}</p>
                <p class="project-flow-text">${escapeHtml(slide.text || '')}</p>
            </div>
        </article>
    `).join('');

    projectFlowDots.innerHTML = projectSlides.map((_, index) => `
        <button class="project-flow-dot" type="button" data-slide-index="${index}" aria-label="Go to step ${index + 1}"></button>
    `).join('');

    updateProjectSlideUI();
    if (projectFlowWrap) projectFlowWrap.style.display = 'block';
}

function updateProjectSlideUI() {
    if (!projectFlowTrack) return;
    const count = projectSlides.length || 1;
    projectFlowTrack.style.transform = `translateX(-${projectSlideIndex * 100}%)`;
    if (projectFlowStatus) projectFlowStatus.textContent = `Step ${projectSlideIndex + 1}/${count}`;

    if (projectFlowDots) {
        projectFlowDots.querySelectorAll('.project-flow-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === projectSlideIndex);
        });
    }

    if (projectFlowPrev) projectFlowPrev.disabled = projectSlideIndex === 0;
    if (projectFlowNext) projectFlowNext.disabled = projectSlideIndex === count - 1;
}

function goToProjectSlide(index) {
    if (!projectSlides.length) return;
    const max = projectSlides.length - 1;
    projectSlideIndex = Math.min(Math.max(index, 0), max);
    updateProjectSlideUI();
}

function openProjectModal(cardEl) {
    if (!projectModalOverlay || !projectModalTitle || !projectModalDescription) return;
    const title = cardEl.getAttribute('data-project-title') || 'Project';
    const description = cardEl.getAttribute('data-project-description') || 'No description available.';

    projectModalTitle.textContent = title;
    projectModalDescription.textContent = description;
    renderProjectSlides(title, description);
    projectModalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (typeof lucide !== 'undefined') lucide.createIcons();
}

function closeProjectModal(event) {
    if (!projectModalOverlay) return;
    if (event && event.target && event.target !== projectModalOverlay && !event.target.closest('.project-modal-close')) {
        return;
    }
    projectModalOverlay.classList.remove('open');
    document.body.style.overflow = '';
}

function onProjectCardKeydown(event, cardEl) {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openProjectModal(cardEl);
    }
}

if (projectFlowPrev) projectFlowPrev.addEventListener('click', () => goToProjectSlide(projectSlideIndex - 1));
if (projectFlowNext) projectFlowNext.addEventListener('click', () => goToProjectSlide(projectSlideIndex + 1));
if (projectFlowDots) {
    projectFlowDots.addEventListener('click', event => {
        const dot = event.target.closest('[data-slide-index]');
        if (!dot) return;
        goToProjectSlide(Number(dot.getAttribute('data-slide-index')));
    });
}

document.addEventListener('keydown', e => {
    if (!projectModalOverlay || !projectModalOverlay.classList.contains('open')) return;
    if (e.key === 'Escape') closeProjectModal();
    if (e.key === 'ArrowLeft') goToProjectSlide(projectSlideIndex - 1);
    if (e.key === 'ArrowRight') goToProjectSlide(projectSlideIndex + 1);
});