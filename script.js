document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('js-loaded');
    initScrollAnimations();
    initTypingEffect();
    initSmoothScroll();
    initHamburgerMenu();
    initParticles();
    initNavbarScroll();
});

function initTypingEffect() {
    var el = document.getElementById('hero-title');
    if (!el) return;
    var seq = [
        { main: "Coedo", sub: "Connecting" },
        { main: "Music", sub: "Media" },
        { main: "Labo", sub: "Layers" }
    ];
    el.innerHTML = seq.map(function(s) {
        return '<span class="word"><span class="initial">' + s.main[0] + '</span><span class="suffix">' + s.main.slice(1) + '</span></span>';
    }).join(' ');

    function wait(ms) { return new Promise(function(r) { setTimeout(r, ms); }); }

    (async function() {
        await wait(2000);
        var suf = el.querySelectorAll('.suffix');
        for (var i = 0; i < suf.length; i++) {
            var s = suf[i];
            s.style.opacity = '0';
            s.style.transform = 'translateX(10px) scaleX(0.8)';
            s.style.filter = 'blur(10px)';
            await wait(400);
            s.textContent = seq[i].sub.slice(1);
            s.style.opacity = '1';
            s.style.transform = 'translateX(0) scaleX(1)';
            s.style.filter = 'blur(0)';
            await wait(150);
        }
    })();
}

function initScrollAnimations() {
    var obs = new IntersectionObserver(function(entries) {
        entries.forEach(function(e) {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                if (e.target.closest('.works-grid')) {
                    var idx = Array.from(e.target.parentElement.children).indexOf(e.target);
                    e.target.style.transitionDelay = (idx * 0.1) + 's';
                }
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.fade-in').forEach(function(el) { obs.observe(el); });
    document.querySelectorAll('.service-card, .case-card').forEach(function(el) {
        el.classList.add('fade-in');
        obs.observe(el);
    });
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function(a) {
        a.addEventListener('click', function(e) {
            e.preventDefault();
            var t = document.querySelector(this.getAttribute('href'));
            if (t) window.scrollTo({ top: t.offsetTop - 80, behavior: 'smooth' });
        });
    });
}

function initHamburgerMenu() {
    var h = document.querySelector('.hamburger');
    var n = document.querySelector('.nav-links');
    if (!h || !n) return;
    h.addEventListener('click', function() {
        h.classList.toggle('active');
        n.classList.toggle('active');
    });
    n.querySelectorAll('a').forEach(function(a) {
        a.addEventListener('click', function() {
            h.classList.remove('active');
            n.classList.remove('active');
        });
    });
}

function initNavbarScroll() {
    var nav = document.querySelector('.navbar');
    if (!nav) return;
    window.addEventListener('scroll', function() {
        if (window.scrollY > 80) {
            nav.style.background = 'rgba(5, 5, 8, 0.97)';
            nav.style.boxShadow = '0 4px 30px rgba(0,0,0,0.4)';
        } else {
            nav.style.background = 'rgba(5, 5, 8, 0.85)';
            nav.style.boxShadow = 'none';
        }
    });
}

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
