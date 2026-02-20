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

    // =========================================
    // FRAMER MOTION INTEGRATION
    // =========================================

    // Wait for the window module to load Motion
    window.addEventListener("load", () => {
        if (!window.framerMotion) return;

        const { animate, inView, stagger } = window.framerMotion;

        // 1. Hero Animations (Index page)
        const heroTitle = document.querySelector('.hero h1');
        const heroSub = document.querySelector('.hero-sub');
        const heroActions = document.querySelector('.hero-actions');
        const heroLabel = document.querySelector('.hero-label');

        if (heroTitle) {
            animate([
                [heroLabel, { opacity: [0, 1], y: [20, 0] }, { duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }],
                [heroTitle, { opacity: [0, 1], y: [30, 0] }, { duration: 0.9, at: "-0.5", ease: [0.34, 1.56, 0.64, 1] }],
                [heroSub, { opacity: [0, 1], y: [20, 0] }, { duration: 0.8, at: "-0.7", ease: [0.34, 1.56, 0.64, 1] }],
                [heroActions, { opacity: [0, 1], y: [20, 0] }, { duration: 0.8, at: "-0.6", ease: [0.34, 1.56, 0.64, 1] }]
            ]);
        }

        // 2. Page Header Animations (Inner pages)
        const pageHeader = document.querySelector('.page-header');
        if (pageHeader) {
            const label = pageHeader.querySelector('.section-label');
            const h1 = pageHeader.querySelector('h1');
            const p = pageHeader.querySelector('p');

            animate([
                [label, { opacity: [0, 1], y: [15, 0] }, { duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }],
                [h1, { opacity: [0, 1], y: [20, 0] }, { duration: 0.8, at: "-0.4", ease: [0.34, 1.56, 0.64, 1] }],
                [p, { opacity: [0, 1], y: [15, 0] }, { duration: 0.7, at: "-0.5", ease: [0.34, 1.56, 0.64, 1] }]
            ]);
        }

        // 3. Staggered Grid Animations (Services / Why Us)
        // Services Grid
        const servicesGrid = document.querySelector('.services-grid');
        if (servicesGrid) {
            inView('.services-grid', () => {
                animate('.service-card',
                    { opacity: [0, 1], y: [40, 0] },
                    { delay: stagger(0.12), duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }
                );
            }, { margin: "0px 0px -100px 0px" });
        }

        // Why Us List
        const whyList = document.querySelector('.why-list');
        if (whyList) {
            inView('.why-list', () => {
                animate('.why-item',
                    { opacity: [0, 1], x: [30, 0] },
                    { delay: stagger(0.12), duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }
                );
            }, { margin: "0px 0px -50px 0px" });
        }

        // 4. CTA Box Animation
        const ctaBox = document.querySelector('.cta-box');
        if (ctaBox) {
            inView('.cta-box', () => {
                animate(ctaBox,
                    { opacity: [0, 1], scale: [0.95, 1], y: [30, 0] },
                    { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }
                );
            }, { margin: "0px 0px -50px 0px" });
        }

        // 5. General Fade-ins (Trust Bar, Form, Details)
        const fadeElements = document.querySelectorAll('.trust-bar, .contact-layout, .about-layout, .service-detail-layout');
        fadeElements.forEach(el => {
            el.style.opacity = "0"; // Initial state
            inView(el, () => {
                animate(el,
                    { opacity: [0, 1], y: [30, 0] },
                    { duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }
                );
            }, { margin: "0px 0px -50px 0px" });
        });

    });

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

    // Estimate form validation and delivery
    const estimateForm = document.getElementById('estimateForm');
    const formSuccess = document.getElementById('formSuccess');
    const formContent = document.getElementById('estimateFormContent');
    const estimateFormStatus = document.getElementById('estimateFormStatus');
    const defaultSubmitEndpoint = 'https://formsubmit.co/ajax/info@deltastump.com';
    const modalTriggerSelector = '[data-modal-trigger="estimate"]';

    async function submitLead(endpoint, payload) {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                ...payload,
                _captcha: 'false',
            }),
        });

        const data = await response.json().catch(() => ({}));
        if (!response.ok || data.success === false) {
            throw new Error(data.message || 'Unable to submit request.');
        }

        // --- ZAPIER WEBHOOK INTEGRATION ---
        // Replace the URL below with your actual Zapier Webhook URL
        const zapierWebhookEndpoint = 'YOUR_ZAPIER_WEBHOOK_URL_HERE';
        if (zapierWebhookEndpoint && zapierWebhookEndpoint !== 'YOUR_ZAPIER_WEBHOOK_URL_HERE') {
            try {
                await fetch(zapierWebhookEndpoint, {
                    method: 'POST',
                    body: JSON.stringify(payload)
                });
            } catch (e) {
                console.error("Zapier webhook failed:", e);
                // We don't throw here so the user still sees a success message if the primary email sent
            }
        }
        // ----------------------------------
    }

    function openMailFallback(subject, body) {
        // Disabled per request
        // window.location.href = `mailto:info@deltastump.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }

    function setStatus(target, message, isError) {
        if (!target) return;
        target.textContent = message;
        target.classList.toggle('is-error', Boolean(isError));
    }

    if (estimateForm) {
        estimateForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            clearErrors();
            setStatus(estimateFormStatus, '', false);

            let isValid = true;

            const required = [
                { id: 'firstName', label: 'Name' },
                { id: 'phone', label: 'Phone' },
                { id: 'message', label: 'Details' },
            ];

            const formData = {};

            required.forEach(field => {
                const el = document.getElementById(field.id);
                if (el) {
                    if (!el.value.trim()) {
                        showError(el, `${field.label} is required.`);
                        isValid = false;
                    } else {
                        formData[field.id] = el.value.trim();
                    }
                }
            });

            const phone = document.getElementById('phone');
            if (phone && phone.value.trim() && !/^[\d\s\-\(\)\+]{7,}$/.test(phone.value.trim())) {
                showError(phone, 'Enter a valid phone number.');
                isValid = false;
            }

            if (!isValid) return;

            const submitBtn = document.getElementById('submitBtn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            const endpoint = estimateForm.dataset.submitEndpoint || defaultSubmitEndpoint;
            const body = `Name: ${formData.firstName}\nPhone: ${formData.phone}\n\nDetails:\n${formData.message}`;

            try {
                await submitLead(endpoint, {
                    name: formData.firstName,
                    phone: formData.phone,
                    message: formData.message,
                    source: 'website-contact-form',
                    _subject: subject,
                });

                formContent.style.display = 'none';
                formSuccess.style.display = 'block';
                if (window.lucide) lucide.createIcons();
                setStatus(estimateFormStatus, '', false);

                if (window.framerMotion) {
                    window.framerMotion.animate(formSuccess,
                        { opacity: [0, 1], scale: [0.95, 1] },
                        { duration: 0.4, type: "spring", bounce: 0.4 }
                    );
                }
            } catch (error) {
                // openMailFallback(subject, body);
                setStatus(
                    estimateFormStatus,
                    'Something went wrong sending your request. Please try again or call us.',
                    true
                );
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    function showError(input, message) {
        input.style.borderColor = '#c0392b';
        input.style.boxShadow = '0 0 0 3px rgba(192, 57, 43, 0.1)';
        input.setAttribute('aria-invalid', 'true');

        const el = document.createElement('span');
        const errorId = `${input.id}-error`;
        el.className = 'field-error';
        el.id = errorId;
        el.setAttribute('role', 'alert');
        el.style.cssText = 'color:#c0392b; font-size:0.78rem; margin-top:3px; display:block;';
        el.textContent = message;
        input.parentNode.appendChild(el);

        const describedBy = input.getAttribute('aria-describedby');
        input.setAttribute(
            'aria-describedby',
            describedBy ? `${describedBy} ${errorId}` : errorId
        );
    }

    function clearErrors() {
        document.querySelectorAll('.field-error').forEach(el => el.remove());
        document.querySelectorAll('#estimateForm input, #estimateForm textarea').forEach(el => {
            el.style.borderColor = '';
            el.style.boxShadow = '';
            el.removeAttribute('aria-invalid');
            el.removeAttribute('aria-describedby');
        });
        document.querySelectorAll('#modalEstimateForm input, #modalEstimateForm textarea').forEach(el => {
            el.style.borderColor = '';
            el.style.boxShadow = '';
            el.removeAttribute('aria-invalid');
            el.removeAttribute('aria-describedby');
        });
    }

    // =========================================
    // ESTIMATE MODAL GENERATION & LOGIC
    // =========================================
    const modalHTML = `
    <div id="estimateModal" class="estimate-modal" aria-hidden="true">
        <div class="estimate-modal-overlay"></div>
        <div class="estimate-modal-content" role="dialog" aria-modal="true" aria-labelledby="estimateModalTitle" aria-describedby="estimateModalDescription" tabindex="-1">
            <button type="button" class="estimate-modal-close" id="closeModalBtn" aria-label="Close modal">
                <i data-lucide="x"></i>
            </button>
            <div id="modalFormContentInner">
                <h2 id="estimateModalTitle">Get a Free Estimate</h2>
                <p id="estimateModalDescription" class="form-sub" style="margin-bottom: 12px;">Could you share a few details about your project?</p>
                <div id="modalFormStatus" class="form-status" aria-live="polite"></div>
                <form id="modalEstimateForm" novalidate class="intake-form intake-form--simple modal-form" data-submit-endpoint="${defaultSubmitEndpoint}">
                    <div class="form-group">
                        <label for="modalName">Your Name</label>
                        <input type="text" id="modalName" name="name" placeholder="First Name" required />
                    </div>
                    <div class="form-group">
                        <label for="modalPhone">Phone Number (Optional)</label>
                        <input type="tel" id="modalPhone" name="phone" placeholder="(662) 555-0000" />
                    </div>
                    <div class="form-group">
                        <label for="modalEmail">Email Address</label>
                        <input type="email" id="modalEmail" name="email" placeholder="you@email.com" required />
                    </div>
                    <div class="form-group">
                        <label for="modalLocation">Address or City</label>
                        <input type="text" id="modalLocation" name="location" placeholder="Oxford, MS" required />
                    </div>
                    <div class="form-group">
                        <label for="modalStumps">Details</label>
                        <textarea id="modalStumps" name="stumps" placeholder="Approximate size of stumps, location in yard, etc." required></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary form-submit" id="modalSubmitBtn">Send Request</button>
                </form>
            </div>
            <div class="form-success" id="modalFormSuccess" style="display:none; text-align:center; padding: 40px 0;">
                <div class="check" style="margin: 0 auto 20px; display:flex; justify-content:center;"><i data-lucide="check-circle" style="width:48px; height:48px; color:var(--mint);"></i></div>
                <h3 style="font-size: 1.5rem; margin-bottom:10px;">Got it.</h3>
                <p style="color:var(--text-mid);">We'll reach out within a few hours to schedule your estimate.</p>
            </div>
        </div>
    </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    if (window.lucide) {
        lucide.createIcons();
    }

    const estimateModal = document.getElementById('estimateModal');
    const estimateModalContent = estimateModal.querySelector('.estimate-modal-content');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const modalOverlay = estimateModal.querySelector('.estimate-modal-overlay');
    const modalFormStatus = document.getElementById('modalFormStatus');
    let lastFocusedElement = null;

    function handleModalFocusTrap(event) {
        if (event.key !== 'Tab' || !estimateModal.classList.contains('active')) return;

        const focusable = estimateModal.querySelectorAll(
            'button:not([disabled]), a[href], input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable.length) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    }

    function openEstimateModal(e) {
        if (e) e.preventDefault();
        lastFocusedElement = document.activeElement;
        estimateModal.classList.add('active');
        estimateModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        document.addEventListener('keydown', handleModalFocusTrap);
        window.setTimeout(() => {
            const firstField = document.getElementById('modalName');
            if (firstField) {
                firstField.focus();
            } else {
                estimateModalContent.focus();
            }
        }, 0);
    }

    function closeEstimateModal() {
        estimateModal.classList.remove('active');
        estimateModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        document.removeEventListener('keydown', handleModalFocusTrap);
        if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
            lastFocusedElement.focus();
        }
    }

    document.querySelectorAll(modalTriggerSelector).forEach(trigger => {
        trigger.addEventListener('click', openEstimateModal);
    });

    closeModalBtn.addEventListener('click', closeEstimateModal);
    modalOverlay.addEventListener('click', closeEstimateModal);

    // Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && estimateModal.classList.contains('active')) {
            closeEstimateModal();
        }
    });

    // Modal Form Submission
    const modalEstimateForm = document.getElementById('modalEstimateForm');
    if (modalEstimateForm) {
        modalEstimateForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            clearErrors();
            setStatus(modalFormStatus, '', false);

            let isValid = true;
            const required = ['modalName', 'modalEmail', 'modalLocation', 'modalStumps'];
            const formData = {};

            required.forEach(id => {
                const el = document.getElementById(id);
                if (el) {
                    if (!el.value.trim()) {
                        showError(el, 'Required');
                        isValid = false;
                    } else {
                        formData[id] = el.value.trim();
                    }
                }
            });

            const phoneEl = document.getElementById('modalPhone');
            if (phoneEl) {
                const phoneVal = phoneEl.value.trim();
                if (phoneVal) {
                    if (!/^[\d\s\-\(\)\+]{7,}$/.test(phoneVal)) {
                        showError(phoneEl, 'Enter a valid phone number.');
                        isValid = false;
                    }
                    formData['modalPhone'] = phoneVal;
                } else {
                    formData['modalPhone'] = 'Not provided';
                }
            }

            if (!isValid) return;

            const submitBtn = document.getElementById('modalSubmitBtn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            const endpoint = modalEstimateForm.dataset.submitEndpoint || defaultSubmitEndpoint;
            const subject = `New Estimate Request from ${formData.modalName}`;
            const body = (
                `Name: ${formData.modalName}\nPhone: ${formData.modalPhone}\nEmail: ${formData.modalEmail}\nLocation: ${formData.modalLocation}\n\nDetails:\n${formData.modalStumps}`
            );

            try {
                await submitLead(endpoint, {
                    name: formData.modalName,
                    phone: formData.modalPhone,
                    email: formData.modalEmail,
                    location: formData.modalLocation,
                    message: formData.modalStumps,
                    source: 'website-modal-form',
                    _subject: subject,
                });

                document.getElementById('modalFormContentInner').style.display = 'none';
                const successMsg = document.getElementById('modalFormSuccess');
                successMsg.style.display = 'block';
                if (window.lucide) lucide.createIcons();
                if (window.framerMotion) {
                    window.framerMotion.animate(successMsg,
                        { opacity: [0, 1], scale: [0.95, 1] },
                        { duration: 0.4, type: "spring", bounce: 0.4 }
                    );
                }

                setTimeout(() => {
                    closeEstimateModal();
                    setTimeout(() => {
                        modalEstimateForm.reset();
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                        document.getElementById('modalFormContentInner').style.display = 'block';
                        successMsg.style.display = 'none';
                    }, 400);
                }, 3000);
            } catch (error) {
                // openMailFallback(subject, body);
                setStatus(
                    modalFormStatus,
                    'Something went wrong sending your request. Please try again or call us.',
                    true
                );
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }

})();
