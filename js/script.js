// ── Start Lucide Icons ──
if (typeof lucide !== 'undefined') {
    lucide.createIcons();
}

// ── Cursor Glow Effect ──
const cursorGlow = document.getElementById('cursor-glow');
if (cursorGlow) {
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });
}

// ── Navbar: Add background when user scrolls down ──
const navbar = document.getElementById('navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('glass');
            navbar.classList.remove('border-transparent');
            navbar.classList.add('border-dark-border');
        } else {
            navbar.classList.remove('glass');
            navbar.classList.add('border-transparent');
            navbar.classList.remove('border-dark-border');
        }
    });
}

// ── Mobile Menu Open/Close ──
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Close menu when a link is clicked
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
}

// ── Scroll Reveal: Show elements as user scrolls down ──
const revealElements = document.querySelectorAll('.reveal');

if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');

                // Fill skill bars when they come into view
                const skillBars = entry.target.querySelectorAll('.skill-bar');
                skillBars.forEach(bar => {
                    setTimeout(() => {
                        bar.style.width = bar.getAttribute('data-width');
                    }, 200);
                });
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
}

// ── Contact Form: Send message and show feedback ──
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const btn = contactForm.querySelector('button[type="submit"]');
        if (!btn) return;

        const originalText = btn.innerHTML;
        const formData = new FormData(contactForm);

        // Show loading state
        btn.innerHTML = '<i data-lucide="loader-2" class="w-5 h-5 animate-spin"></i> Sending...';
        btn.disabled = true;
        if (typeof lucide !== 'undefined') lucide.createIcons();

        try {
            const response = await fetch('https://formspree.io/f/xykdojdv', {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                // Success state
                btn.innerHTML = '<i data-lucide="check" class="w-5 h-5"></i> Message Sent!';
                btn.classList.add('!bg-primary', '!text-black');
                if (typeof lucide !== 'undefined') lucide.createIcons();
                contactForm.reset();

                // Reset button after 4 seconds
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.classList.remove('!bg-primary', '!text-black');
                    if (typeof lucide !== 'undefined') lucide.createIcons();
                }, 4000);
            } else {
                // Fallback: submit the form the normal way
                contactForm.submit();
            }
        } catch (error) {
            // Fallback on network error
            contactForm.submit();
        } finally {
            btn.disabled = false;
        }
    });
}

// ── Smooth Scroll: Glide to section when nav links are clicked ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetAttr = this.getAttribute('href');
        if (targetAttr === '#') return;

        const target = document.querySelector(targetAttr);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ── Typewriter Effect on Hero Title ──
const typeTarget = document.getElementById('typewriter');
if (typeTarget) {
    const words = ['Developer', 'Designer', 'Builder', 'Freelancer'];
    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function type() {
        const current = words[wordIndex];
        if (!deleting) {
            typeTarget.textContent = current.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex === current.length) {
                deleting = true;
                setTimeout(type, 1800);
                return;
            }
        } else {
            typeTarget.textContent = current.substring(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                deleting = false;
                wordIndex = (wordIndex + 1) % words.length;
            }
        }
        setTimeout(type, deleting ? 60 : 100);
    }

    type();
}