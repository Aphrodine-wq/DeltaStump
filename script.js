/* =========================================
   DELTA STUMP — JavaScript
   ========================================= */

(function () {
    'use strict';

    // Initialize Lucide icons
    if (window.lucide) {
        lucide.createIcons();
    }

    // Navbar scroll effect (only on home page with hero)
    const navbar = document.getElementById('navbar');
    const hero = document.getElementById('hero');

    if (hero) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }, { passive: true });
    }

    // Mobile hamburger menu
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('open');
            hamburger.setAttribute('aria-expanded', isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';

            const spans = hamburger.querySelectorAll('span');
            if (isOpen) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            }
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
                const spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            });
        });
    }

    // Scroll-triggered fade-up animations
    const fadeEls = document.querySelectorAll('.fade-up');
    if (fadeEls.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

        fadeEls.forEach(el => observer.observe(el));
    }

    // Estimate form validation
    const estimateForm = document.getElementById('estimateForm');
    const formSuccess = document.getElementById('formSuccess');
    const formContent = document.getElementById('estimateFormContent');

    if (estimateForm) {
        estimateForm.addEventListener('submit', function (e) {
            e.preventDefault();
            clearErrors();

            let isValid = true;

            const required = [
                { id: 'firstName', label: 'Name' },
                { id: 'phone', label: 'Phone' },
                { id: 'message', label: 'What do you need?' },
            ];

            required.forEach(field => {
                const el = document.getElementById(field.id);
                if (el && !el.value.trim()) {
                    showError(el, `${field.label} is required.`);
                    isValid = false;
                }
            });

            const phone = document.getElementById('phone');
            if (phone && phone.value.trim() && !/^[\d\s\-\(\)\+]{7,}$/.test(phone.value.trim())) {
                showError(phone, 'Enter a valid phone number.');
                isValid = false;
            }

            if (!isValid) return;

            const submitBtn = document.getElementById('submitBtn');
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                formContent.style.display = 'none';
                formSuccess.style.display = 'block';
                if (window.lucide) lucide.createIcons();
            }, 1000);
        });
    }

    function showError(input, message) {
        input.style.borderColor = '#c0392b';
        input.style.boxShadow = '0 0 0 3px rgba(192, 57, 43, 0.1)';

        const el = document.createElement('span');
        el.className = 'field-error';
        el.style.cssText = 'color:#c0392b; font-size:0.78rem; margin-top:3px; display:block;';
        el.textContent = message;
        input.parentNode.appendChild(el);
    }

    function clearErrors() {
        document.querySelectorAll('.field-error').forEach(el => el.remove());
        document.querySelectorAll('#estimateForm input, #estimateForm textarea').forEach(el => {
            el.style.borderColor = '';
            el.style.boxShadow = '';
        });
    }

})();
