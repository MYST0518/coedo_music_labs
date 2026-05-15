document.addEventListener('DOMContentLoaded', () => {
    // Mark body so CSS fade-in can activate safely
    document.body.classList.add('js-loaded');

    initScrollAnimations();
    initTypingEffect();
    initSmoothScroll();
    initHamburgerMenu();
    initParticles();
    initNavbarScroll();
});

// ===== TYPING EFFECT =====
function initTypingEffect() {
    const titleElement = document.querySelector('.hero h1');
    if (!titleElement) return;

    const fullText = titleElement.textContent.trim();
    titleElement.innerHTML = '<span class="typed-text"></span><span class="typing-cursor"></span>';
    const typedTextSpan = titleElement.querySelector('.typed-text');

    let charIndex = 0;
    function type() {
        if (charIndex < fullText.length) {
            typedTextSpan.textContent += fullText.charAt(charIndex);
            charIndex++;
            setTimeout(type, 80);
        }
    }
    setTimeout(type, 600);
}

// ===== SCROLL REVEAL =====
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Stagger works grid cards
                if (entry.target.closest('.works-grid')) {
                    const idx = [...entry.target.parentElement.children].indexOf(entry.target);
                    entry.target.style.transitionDelay = `${idx * 0.1}s`;
                }
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    // Observe existing .fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // Also observe cards (add fade-in class first)
    document.querySelectorAll('.service-card, .case-card').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== HAMBURGER =====
function initHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (!hamburger || !navLinks) return;

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// ===== NAVBAR SCROLL EFFECT =====
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            navbar.style.background = 'rgba(5, 5, 8, 0.97)';
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.4)';
        } else {
            navbar.style.background = 'rgba(5, 5, 8, 0.85)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// ===== PARTICLES =====
function initParticles() {
    if (typeof particlesJS === 'undefined') return;
    particlesJS('particles-js', {
        particles: {
            number: { value: 55, density: { enable: true, value_area: 900 } },
            color: { value: '#00f2ff' },
            shape: { type: 'circle' },
            opacity: { value: 0.18, random: true },
            size: { value: 2, random: true },
            line_linked: { enable: true, distance: 140, color: '#00f2ff', opacity: 0.08, width: 1 },
            move: { enable: true, speed: 0.8, direction: 'none', out_mode: 'out' }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: { enable: true, mode: 'grab' },
                onclick: { enable: true, mode: 'push' },
                resize: true
            },
            modes: { grab: { distance: 140, line_linked: { opacity: 0.4 } } }
        },
        retina_detect: true
    });
}
