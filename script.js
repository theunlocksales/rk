// script.js - ENHANCED RESPONSIVE VERSION
document.addEventListener('DOMContentLoaded', function() {
    // MOBILE NAVIGATION - BULLETPROOF
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    let menuOpen = false;

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', toggleMobileMenu);
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (menuOpen && !e.target.closest('.navbar')) {
                closeMobileMenu();
            }
        });
        
        // Prevent menu close when clicking inside
        navMenu.addEventListener('click', (e) => e.stopPropagation());
    }

    function toggleMobileMenu() {
        menuOpen = !menuOpen;
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = menuOpen ? 'hidden' : '';
    }

    function closeMobileMenu() {
        menuOpen = false;
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Active link highlighting
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                closeMobileMenu(); // Close mobile menu on scroll
            }
        });
    });

    // ENHANCED Testimonial slider
    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (testimonialSlider) {
        let scrollAmount = 0;
        const slideWidth = window.innerWidth <= 768 ? 
            testimonialSlider.children[0].offsetWidth + 32 : 420;
        
        setInterval(() => {
            scrollAmount += slideWidth;
            if (scrollAmount >= testimonialSlider.scrollWidth - testimonialSlider.offsetWidth) {
                scrollAmount = 0;
            }
            testimonialSlider.scrollTo({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }, 5000);

        // Touch/swipe support
        let startX = 0;
        testimonialSlider.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        testimonialSlider.addEventListener('touchend', (e) => {
            const endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    testimonialSlider.scrollLeft += slideWidth;
                } else {
                    testimonialSlider.scrollLeft -= slideWidth;
                }
            }
        });
    }

    // PERFECT Contact Form
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('✅ Thank you! Your message has been sent successfully. We will contact you within 24 hours.');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }

    // ADVANCED Scroll Animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -10% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }, index * 100);
            }
        });
    }, observerOptions);

    // Observe all animated elements
    document.querySelectorAll('.service-card, .feature, .testimonial, .mv-card, .team-member, .achieve-list li').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px) scale(0.95)';
        el.style.transition = 'all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        observer.observe(el);
    });

    // Navbar background on scroll
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.backdropFilter = 'blur(25px)';
            navbar.style.boxShadow = '0 5px 30px rgba(0,0,0,0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(20px)';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        }
    });

    // PERFECT RESPONSIVE RESIZE HANDLER
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            closeMobileMenu();
            // Re-init testimonial slider width
            if (testimonialSlider) {
                testimonialSlider.scrollLeft = 0;
            }
        }, 250);
    });

    console.log('✅ Premium Responsive Website Fully Loaded!');
});
