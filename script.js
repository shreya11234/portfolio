document.addEventListener('DOMContentLoaded', () => {
    const mainHeader = document.getElementById('main-header');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const navUl = document.querySelector('nav ul');
    const navLinks = document.querySelectorAll('.nav-link');
    const currentYearSpan = document.getElementById('currentYear');
    const customCursor = document.querySelector('.custom-cursor');
    const interactiveElements = document.querySelectorAll('a, button, .lightbox-trigger, .menu-toggle, input, textarea');

    // --- Update Current Year in Footer ---
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Header Scroll Effect ---
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            mainHeader.classList.add('scrolled');
        } else {
            mainHeader.classList.remove('scrolled');
        }
    });

    // --- Mobile Menu Toggle ---
    mobileMenuButton.addEventListener('click', () => {
        navUl.classList.toggle('active');
        mobileMenuButton.classList.toggle('active');
        // Optional: Prevent body scroll when menu is open
        document.body.style.overflow = navUl.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navUl.classList.contains('active')) {
                navUl.classList.remove('active');
                mobileMenuButton.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // --- Active Navigation Link Highlighting on Scroll ---
    const sections = document.querySelectorAll('main section[id]');
    function updateActiveNavLink() {
        let currentSectionId = 'hero'; // Default to hero
        const scrollPosition = window.pageYOffset + window.innerHeight / 2; // Mid-screen

        sections.forEach(section => {
            if (scrollPosition >= section.offsetTop) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active-link');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active-link');
            }
        });
    }
    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink(); // Initial call

    // --- Custom Cursor ---
    if (customCursor && !('ontouchstart' in window)) { // Check if not a touch device
        window.addEventListener('mousemove', e => {
            customCursor.style.left = e.clientX + 'px';
            customCursor.style.top = e.clientY + 'px';
        });

        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => customCursor.classList.add('hovered'));
            el.addEventListener('mouseleave', () => customCursor.classList.remove('hovered'));
            // For specific elements that should make the cursor smaller (like a pointer)
            if (el.classList.contains('lightbox-trigger') || el.classList.contains('scroll-down-prompt')) {
                 el.addEventListener('mouseenter', () => customCursor.classList.add('pointer'));
                 el.addEventListener('mouseleave', () => customCursor.classList.remove('pointer'));
            }
        });
         // Hide cursor when mouse leaves window
        document.addEventListener('mouseleave', () => {
            customCursor.style.opacity = '0';
        });
        document.addEventListener('mouseenter', () => {
            customCursor.style.opacity = '0.8';
        });
    } else if (customCursor) {
        customCursor.style.display = 'none'; // Hide on touch devices
    }


    // --- Reveal Animations on Scroll (Intersection Observer) ---
    const revealElements = document.querySelectorAll('.reveal-item, .reveal-text');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || '0s';
                entry.target.style.transitionDelay = delay;
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Optional: Animate only once
            }
        });
    }, { threshold: 0.1 }); // Trigger when 10% of the element is visible

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });


    // --- Lightbox Functionality ---
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxTriggers = document.querySelectorAll('.lightbox-trigger');
    const lightboxClose = document.querySelector('.lightbox-close');

    lightboxTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            lightboxModal.style.display = 'block';
            lightboxImage.src = trigger.src;
            lightboxCaption.textContent = trigger.alt; // Or use a data-attribute for caption
            document.body.style.overflow = 'hidden'; // Prevent scrolling background
        });
    });

    function closeLightbox() {
        lightboxModal.style.display = 'none';
        document.body.style.overflow = ''; // Restore scrolling
    }

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxModal) {
        lightboxModal.addEventListener('click', (e) => { // Close if clicking outside image
            if (e.target === lightboxModal) {
                closeLightbox();
            }
        });
    }
    // Close with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightboxModal.style.display === 'block') {
            closeLightbox();
        }
    });


    // --- Contact Form (Placeholder) ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // In a real app, you'd use Fetch API or XMLHttpRequest to send data
            alert('Thank you for your inquiry, Shreya will get back to you soon! (This is a demo)');
            contactForm.reset();
        });
    }
});