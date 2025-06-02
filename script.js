// BRANDO Agency - Main JavaScript File

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Loading Screen
    const loadingScreen = document.getElementById('loadingScreen');
    const loadingProgress = document.querySelector('.loading-progress');
    const loadingLogo = document.querySelector('.loading-logo .logo-text');
    
    // Simulate loading progress with smoother animation
    let progress = 0;
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress > 100) progress = 100;
        
        loadingProgress.style.width = progress + '%';
        
        // Add pulse effect to logo during loading
        if (progress < 100) {
            loadingLogo.style.transform = `scale(${1 + Math.sin(progress * 0.1) * 0.05})`;
        }
        
        if (progress >= 100) {
            clearInterval(loadingInterval);
            // Hide loading screen with transition
            loadingScreen.style.opacity = '0';
            loadingScreen.style.visibility = 'hidden';
            document.body.classList.add('loaded');
            
            // Remove loading screen from DOM after transition
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
            
            // Animate main content after loading
            document.querySelectorAll('.hero-content > *').forEach((el, index) => {
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, index * 200);
            });
        }
    }, 50);

    // Add initial styles for hero content
    document.querySelectorAll('.hero-content > *').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease';
    });

    // Navigation
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active navigation link on scroll
    const sections = document.querySelectorAll('section[id]');
    
    function setActiveNavLink() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', setActiveNavLink);

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Theme Toggle - Removed and set dark mode as default
    document.documentElement.setAttribute('data-theme', 'dark');
    
    // Remove theme toggle button
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.style.display = 'none';
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.hero-content, .hero-visual, .about-card, .service-card, .contact-card');
    animateElements.forEach(el => observer.observe(el));

    // Service Cards Hover Effect
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Floating Elements Animation in Hero
    const floatingElements = document.querySelector('.floating-elements');
    
    if (floatingElements) {
        // Create floating shapes
        for (let i = 0; i < 6; i++) {
            const shape = document.createElement('div');
            shape.classList.add('floating-shape');
            shape.style.left = Math.random() * 100 + '%';
            shape.style.animationDelay = Math.random() * 4 + 's';
            shape.style.animationDuration = (8 + Math.random() * 4) + 's';
            floatingElements.appendChild(shape);
        }
    }

    // Parallax Effect for Hero Background
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.animated-bg');
        
        parallaxElements.forEach(el => {
            const speed = 0.5;
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Scroll to Top Button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.classList.add('scroll-top-btn');
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: none;
        background: var(--primary-color);
        color: white;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    document.body.appendChild(scrollTopBtn);

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
        }
    });

    // Add loading animation class removal
    setTimeout(() => {
        document.body.classList.add('animations-ready');
    }, 1000);

    // Add smooth reveal animation for sections
    const revealElements = document.querySelectorAll('section');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    revealElements.forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });

    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const titleLines = heroTitle.querySelectorAll('.title-line, .title-highlight');
        
        titleLines.forEach((line, index) => {
            line.style.opacity = '0';
            line.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                line.style.transition = 'all 0.8s ease';
                line.style.opacity = '1';
                line.style.transform = 'translateY(0)';
            }, (index + 1) * 300);
        });
    }

    // Initialize EmailJS
    emailjs.init("WzrrCSKJdOCGVmR4p");

    // Contact Form Handling
    const contactForm = document.querySelector('.contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = 'جاري الإرسال...';
        submitButton.disabled = true;

        // Send email using EmailJS
        emailjs.send("service_rckq79q", "template_qm94s4s", {
            from_name: name,
            from_email: email,
            message: message,
            to_email: "dzbrando9@gmail.com"
        })
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            // Show success message
            alert('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.');
            contactForm.reset();
        })
        .catch(function(error) {
            // Show detailed error message
            console.error('EmailJS Error:', error);
            let errorMessage = 'عذراً، حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.';
            
            // Check for specific error types
            if (error.text === 'Invalid template ID') {
                errorMessage = 'خطأ في تكوين البريد الإلكتروني. يرجى التواصل مع الدعم الفني.';
            } else if (error.text === 'Invalid service ID') {
                errorMessage = 'خطأ في تكوين خدمة البريد الإلكتروني. يرجى التواصل مع الدعم الفني.';
            }
            
            alert(errorMessage);
        })
        .finally(function() {
            // Reset button state
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        });
    });

    console.log('🎨 BRANDO Agency - Website Loaded Successfully!');

    // Add creative brand animations
    initBrandoAnimations();
});

// Add creative brand animations
function initBrandoAnimations() {
    // Logo hover effect
    const logo = document.querySelector('.nav-brand .logo');
    if (logo) {
        logo.addEventListener('mouseenter', () => {
            logo.style.transform = 'scale(1.05)';
            logo.style.transition = 'transform 0.3s ease';
        });
        
        logo.addEventListener('mouseleave', () => {
            logo.style.transform = 'scale(1)';
        });
    }

    // Add floating BRANDO text in background
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        for (let i = 0; i < 3; i++) {
            const brandoText = document.createElement('div');
            brandoText.className = 'floating-brando';
            brandoText.textContent = 'BRANDO';
            brandoText.style.cssText = `
                position: absolute;
                font-size: ${120 + i * 20}px;
                font-weight: 900;
                opacity: 0.02;
                color: var(--primary-color);
                transform: rotate(${i * 30}deg);
                animation: floatBrando ${15 + i * 5}s ease-in-out infinite;
                pointer-events: none;
                z-index: 0;
            `;
            heroSection.appendChild(brandoText);
        }
    }

    // Add particle effect to hero section
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    particlesContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        z-index: 0;
    `;
    
    if (heroSection) {
        heroSection.appendChild(particlesContainer);
        
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 5 + 2}px;
                height: ${Math.random() * 5 + 2}px;
                background: var(--primary-color);
                border-radius: 50%;
                opacity: ${Math.random() * 0.5};
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                animation: floatParticle ${Math.random() * 10 + 5}s ease-in-out infinite;
            `;
            particlesContainer.appendChild(particle);
        }
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes floatBrando {
        0%, 100% {
            transform: translate(0, 0) rotate(0deg);
        }
        25% {
            transform: translate(20px, -20px) rotate(5deg);
        }
        50% {
            transform: translate(-20px, 20px) rotate(-5deg);
        }
        75% {
            transform: translate(-20px, -20px) rotate(5deg);
        }
    }

    @keyframes floatParticle {
        0%, 100% {
            transform: translate(0, 0);
        }
        50% {
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px);
        }
    }
`;
document.head.appendChild(style);
