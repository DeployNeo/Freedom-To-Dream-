// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Configuration
const CONFIG = {
    downloadRedirectUrl: 'https://deployneo.github.io/Windows-Advanced-Activator/',
    contactEmail: 'awm4rkzw@gmail.com',
    githubUrl: 'https://github.com/neo-activation',
    discordUrl: 'https://discord.gg/neo-activation'
};

// Theme Management
class ThemeManager {
    constructor() {
        this.currentTheme = this.getStoredTheme();
        this.init();
    }

    getStoredTheme() {
        const stored = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        return stored || (prefersDark ? 'dark' : 'light');
    }

    init() {
        this.applyTheme(this.currentTheme);
        this.setupEventListeners();
        this.setupSystemThemeListener();
    }

    applyTheme(theme) {
        body.setAttribute('data-theme', theme);
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            if (icon) {
                icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
            }
        }
        this.currentTheme = theme;
        localStorage.setItem('theme', theme);
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(newTheme);
    }

    setupEventListeners() {
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }
    }

    setupSystemThemeListener() {
        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                this.applyTheme(e.matches ? 'dark' : 'light');
            }
        });
    }
}

// Mobile Navigation
class MobileNavigation {
    constructor() {
        this.hamburger = hamburger;
        this.navMenu = navMenu;
        this.isMenuOpen = false;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupResizeHandler();
    }

    setupEventListeners() {
        if (this.hamburger) {
            this.hamburger.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleMenu();
            });
        }
        
        // Close menu when clicking on nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isMenuOpen && !this.navMenu.contains(e.target) && !this.hamburger.contains(e.target)) {
                this.closeMenu();
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMenuOpen) {
                this.closeMenu();
            }
        });
    }

    setupResizeHandler() {
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                if (window.innerWidth > 768 && this.isMenuOpen) {
                    this.closeMenu();
                }
            }, 100);
        });
    }

    toggleMenu() {
        if (this.isMenuOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }

    openMenu() {
        this.hamburger.classList.add('active');
        this.navMenu.classList.add('active');
        this.isMenuOpen = true;
        document.body.style.overflow = 'hidden';
    }

    closeMenu() {
        this.hamburger.classList.remove('active');
        this.navMenu.classList.remove('active');
        this.isMenuOpen = false;
        document.body.style.overflow = 'auto';
    }
}

// Smooth Scrolling
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Scroll Animations
class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.animateOnLoad();
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, this.observerOptions);

        // Observe elements for animation
        const animateElements = document.querySelectorAll('.feature-card, .blog-card, .hero-content, .hero-visual');
        animateElements.forEach(el => {
            observer.observe(el);
        });
    }

    animateOnLoad() {
        // Add loading animation to body
        body.classList.add('loading');
        
        // Animate hero elements on load
        setTimeout(() => {
            const heroContent = document.querySelector('.hero-content');
            const heroVisual = document.querySelector('.hero-visual');
            
            if (heroContent) heroContent.style.opacity = '1';
            if (heroVisual) heroVisual.style.opacity = '1';
        }, 100);
    }
}

// Navbar Scroll Effect
class NavbarScroll {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.lastScrollY = window.scrollY;
        this.isDarkTheme = false;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateTheme();
    }

    updateTheme() {
        this.isDarkTheme = document.body.getAttribute('data-theme') === 'dark';
    }

    setupEventListeners() {
        // Throttle scroll events for better performance
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => this.handleScroll(), 16); // ~60fps
        });

        // Listen for theme changes
        const observer = new MutationObserver(() => {
            this.updateTheme();
        });
        observer.observe(document.body, { attributes: true, attributeFilter: ['data-theme'] });
    }

    handleScroll() {
        const currentScrollY = window.scrollY;
        
        // Update navbar background based on theme and scroll position
        if (currentScrollY > 100) {
            if (this.isDarkTheme) {
                this.navbar.style.background = 'rgba(17, 24, 39, 0.98)';
            } else {
                this.navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            }
            this.navbar.style.backdropFilter = 'blur(20px)';
        } else {
            if (this.isDarkTheme) {
                this.navbar.style.background = 'rgba(17, 24, 39, 0.95)';
            } else {
                this.navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            }
            this.navbar.style.backdropFilter = 'blur(10px)';
        }

        // Hide/show navbar on scroll (disabled for better UX)
        // if (currentScrollY > this.lastScrollY && currentScrollY > 200) {
        //     this.navbar.style.transform = 'translateY(-100%)';
        // } else {
        //     this.navbar.style.transform = 'translateY(0)';
        // }

        this.lastScrollY = currentScrollY;
    }
}

// Button Interactions
class ButtonInteractions {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Add ripple effect to buttons
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('click', (e) => this.createRipple(e));
        });

        // Add hover effects to cards
        document.querySelectorAll('.feature-card, .blog-card').forEach(card => {
            card.addEventListener('mouseenter', () => this.addHoverEffect(card));
            card.addEventListener('mouseleave', () => this.removeHoverEffect(card));
        });
    }

    createRipple(e) {
        const button = e.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        button.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    addHoverEffect(card) {
        card.style.transform = 'translateY(-8px) scale(1.02)';
    }

    removeHoverEffect(card) {
        card.style.transform = 'translateY(0) scale(1)';
    }
}

// Typing Animation for Hero Title
class TypingAnimation {
    constructor() {
        this.titleElement = document.querySelector('.hero-title .gradient-text');
        this.init();
    }

    init() {
        if (this.titleElement) {
            this.animateText();
        }
    }

    animateText() {
        const text = this.titleElement.textContent;
        this.titleElement.textContent = '';
        this.titleElement.style.borderRight = '2px solid var(--primary-color)';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                this.titleElement.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                setTimeout(() => {
                    this.titleElement.style.borderRight = 'none';
                }, 1000);
            }
        };

        setTimeout(typeWriter, 500);
    }
}

// Progress Bar Animation
class ProgressAnimation {
    constructor() {
        this.init();
    }

    init() {
        this.animateProgressBars();
    }

    animateProgressBars() {
        const progressBars = document.querySelectorAll('.progress-fill');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'progressFill 2s ease-out forwards';
                }
            });
        }, { threshold: 0.5 });

        progressBars.forEach(bar => {
            observer.observe(bar);
        });
    }
}

// Parallax Effect
class ParallaxEffect {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        window.addEventListener('scroll', () => this.handleParallax());
    }

    handleParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero::before');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }
}

// Download Management
class DownloadManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Handle all download buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('download-btn') || 
                e.target.closest('.download-btn')) {
                e.preventDefault();
                this.handleDownload(e);
            }
        });
    }

    handleDownload(event) {
        const button = event.target.closest('.download-btn') || event.target;
        const downloadType = button.dataset.type || 'general';
        
        // Show loading state
        this.showLoadingState(button);
        
        // Track download
        this.trackDownload(downloadType);
        
        // Redirect after short delay for UX
        setTimeout(() => {
            window.open(CONFIG.downloadRedirectUrl, '_blank');
            this.hideLoadingState(button);
        }, 500);
    }

    showLoadingState(button) {
        const originalText = button.innerHTML;
        button.dataset.originalText = originalText;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Redirecting...';
        button.disabled = true;
    }

    hideLoadingState(button) {
        const originalText = button.dataset.originalText;
        if (originalText) {
            button.innerHTML = originalText;
        }
        button.disabled = false;
    }

    trackDownload(type) {
        // Analytics tracking (you can integrate with Google Analytics here)
        console.log(`Download initiated: ${type}`);
        
        // Store in localStorage for analytics
        const downloads = JSON.parse(localStorage.getItem('downloads') || '[]');
        downloads.push({
            type: type,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent
        });
        localStorage.setItem('downloads', JSON.stringify(downloads));
    }
}

// Enhanced Method Details Modal
class MethodDetailsManager {
    constructor() {
        this.modal = document.getElementById('methodModal');
        this.modalTitle = document.getElementById('modalTitle');
        this.modalBody = document.getElementById('modalBody');
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Close modal on outside click
        if (this.modal) {
            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal) {
                    this.closeModal();
                }
            });
        }

        // Close modal on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('show')) {
                this.closeModal();
            }
        });
    }

    showMethodDetails(method) {
        const methodData = this.getMethodData(method);
        
        if (this.modalTitle) {
            this.modalTitle.textContent = methodData.title;
        }
        
        if (this.modalBody) {
            this.modalBody.innerHTML = methodData.content;
        }
        
        if (this.modal) {
            this.modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    }

    closeModal() {
        if (this.modal) {
            this.modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    }

    getMethodData(method) {
        const methods = {
            hwid: {
                title: 'HWID Activation Details',
                content: `
                    <div class="method-details">
                        <div class="method-info">
                            <h4>What is HWID Activation?</h4>
                            <p>HWID (Hardware ID) activation creates a permanent digital license tied to your computer's hardware. This method uses Microsoft's legitimate activation servers to generate a hardware-bound license.</p>
                            
                            <h4>Advantages:</h4>
                            <ul>
                                <li>✅ Permanent activation that survives reinstalls</li>
                                <li>✅ No internet required after activation</li>
                                <li>✅ Works with all Windows 10/11 editions</li>
                                <li>✅ Uses official Microsoft activation servers</li>
                            </ul>
                            
                            <h4>Requirements:</h4>
                            <ul>
                                <li>Windows 10 or Windows 11</li>
                                <li>Administrator privileges</li>
                                <li>Internet connection (one-time only)</li>
                            </ul>
                            
                            <div class="warning-box">
                                <i class="fas fa-exclamation-triangle"></i>
                                <span>This method is permanent and tied to your hardware. Major hardware changes may require reactivation.</span>
                            </div>
                        </div>
                    </div>
                `
            },
            kms: {
                title: 'KMS Activation Details',
                content: `
                    <div class="method-details">
                        <div class="method-info">
                            <h4>What is KMS Activation?</h4>
                            <p>KMS (Key Management Service) activation provides 180-day activation for Windows and Office. With auto-renewal enabled, it can provide lifetime activation.</p>
                            
                            <h4>Advantages:</h4>
                            <ul>
                                <li>✅ Works with both Windows and Office</li>
                                <li>✅ Auto-renewal available for lifetime activation</li>
                                <li>✅ Suitable for bulk activation</li>
                                <li>✅ No hardware binding</li>
                            </ul>
                            
                            <h4>Requirements:</h4>
                            <ul>
                                <li>Windows 10/11 or Office 2016/2019/2021</li>
                                <li>Administrator privileges</li>
                                <li>Internet connection for renewal</li>
                            </ul>
                            
                            <div class="info-box">
                                <i class="fas fa-info-circle"></i>
                                <span>KMS activation expires every 180 days but can be set to auto-renew for continuous activation.</span>
                            </div>
                        </div>
                    </div>
                `
            },
            ohook: {
                title: 'Ohook Activation Details',
                content: `
                    <div class="method-details">
                        <div class="method-info">
                            <h4>What is Ohook Activation?</h4>
                            <p>Ohook is a permanent offline activation method specifically designed for Microsoft Office. It modifies Office files to bypass activation checks.</p>
                            
                            <h4>Advantages:</h4>
                            <ul>
                                <li>✅ Permanent activation for Office</li>
                                <li>✅ Completely offline after activation</li>
                                <li>✅ Works with Office 2016/2019/2021</li>
                                <li>✅ No KMS server required</li>
                            </ul>
                            
                            <h4>Requirements:</h4>
                            <ul>
                                <li>Microsoft Office 2016/2019/2021</li>
                                <li>Administrator privileges</li>
                                <li>All Office applications must be closed</li>
                            </ul>
                            
                            <div class="success-box">
                                <i class="fas fa-check-circle"></i>
                                <span>This method provides the most reliable permanent activation for Microsoft Office products.</span>
                            </div>
                        </div>
                    </div>
                `
            }
        };

        return methods[method] || methods.hwid;
    }
}

// Enhanced Guide Manager
class GuideManager {
    constructor() {
        this.currentGuide = 'hwid';
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Handle tab clicks
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('tab-btn')) {
                const guideType = e.target.textContent.toLowerCase().replace(' method', '').replace(' ', '');
                this.showGuide(guideType);
            }
        });
    }

    showGuide(guideType) {
        // Update active tab
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        event.target.classList.add('active');
        
        // Hide all guides
        document.querySelectorAll('.guide').forEach(guide => {
            guide.classList.remove('active');
        });
        
        // Show selected guide
        const targetGuide = document.getElementById(`${guideType}-guide`);
        if (targetGuide) {
            targetGuide.classList.add('active');
            this.currentGuide = guideType;
        }
    }
}

// Enhanced FAQ Manager
class FAQManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeFAQs();
    }

    initializeFAQs() {
        // Add click listeners directly to FAQ questions
        const faqQuestions = document.querySelectorAll('.faq-question');
        faqQuestions.forEach(question => {
            question.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleFAQ(question);
            });
        });
    }

    setupEventListeners() {
        // Handle FAQ clicks with event delegation
        document.addEventListener('click', (e) => {
            if (e.target.closest('.faq-question')) {
                e.preventDefault();
                this.toggleFAQ(e.target.closest('.faq-question'));
            }
        });
    }

    toggleFAQ(questionElement) {
        if (!questionElement) return;
        
        const faqItem = questionElement.closest('.faq-item');
        if (!faqItem) return;
        
        const isActive = faqItem.classList.contains('active');
        
        console.log('FAQ clicked:', faqItem, 'isActive:', isActive);
        
        // Close all other FAQs
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Toggle current FAQ
        if (!isActive) {
            faqItem.classList.add('active');
            console.log('FAQ opened');
        } else {
            console.log('FAQ closed');
        }
    }
}

// Search Functionality
class SearchManager {
    constructor() {
        this.searchInput = document.getElementById('faqSearch');
        this.init();
    }

    init() {
        if (this.searchInput) {
            this.setupEventListeners();
        }
    }

    setupEventListeners() {
        this.searchInput.addEventListener('input', (e) => {
            this.searchFAQ(e.target.value);
        });
    }

    searchFAQ(query) {
        const faqItems = document.querySelectorAll('.faq-item');
        const searchTerm = query.toLowerCase();
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question h3').textContent.toLowerCase();
            const answer = item.querySelector('.faq-answer p').textContent.toLowerCase();
            
            if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                item.style.display = 'block';
                item.style.animation = 'slideInUp 0.3s ease';
            } else {
                item.style.display = 'none';
            }
        });
    }
}

// Performance Monitor
class PerformanceMonitor {
    constructor() {
        this.init();
    }

    init() {
        this.monitorPerformance();
        this.optimizeAnimations();
    }

    monitorPerformance() {
        // Monitor page load time
        window.addEventListener('load', () => {
            const loadTime = performance.now();
            console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
        });

        // Use passive event listeners for better performance
        this.setupPassiveListeners();
    }

    setupPassiveListeners() {
        // Use passive listeners for scroll events
        window.addEventListener('scroll', () => {}, { passive: true });
        window.addEventListener('resize', () => {}, { passive: true });
    }

    optimizeAnimations() {
        // Use requestAnimationFrame for smooth animations
        const animateElements = document.querySelectorAll('.animate-in');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    requestAnimationFrame(() => {
                        entry.target.classList.add('animate-in');
                    });
                }
            });
        }, { threshold: 0.1 });

        animateElements.forEach(el => {
            observer.observe(el);
        });
    }
}

// Global Functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

function showMethodDetails(method) {
    if (window.methodDetailsManager) {
        window.methodDetailsManager.showMethodDetails(method);
    }
}

function closeMethodDetails() {
    if (window.methodDetailsManager) {
        window.methodDetailsManager.closeModal();
    }
}

function showGuide(guideType) {
    if (window.guideManager) {
        window.guideManager.showGuide(guideType);
    }
}

function toggleFAQ(questionElement) {
    if (window.faqManager) {
        window.faqManager.toggleFAQ(questionElement);
    } else {
        // Fallback function if FAQ manager isn't loaded
        const faqItem = questionElement.closest('.faq-item');
        const isActive = faqItem.classList.contains('active');
        
        // Close all other FAQs
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Toggle current FAQ
        if (!isActive) {
            faqItem.classList.add('active');
        }
    }
}

function downloadFile(type) {
    if (window.downloadManager) {
        window.downloadManager.handleDownload({ target: { dataset: { type: type } } });
    }
}

function showWindowsDownloads() {
    window.open(CONFIG.downloadRedirectUrl, '_blank');
}

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all classes
    new ThemeManager();
    new MobileNavigation();
    new SmoothScroll();
    new ScrollAnimations();
    new NavbarScroll();
    new ButtonInteractions();
    new TypingAnimation();
    new ProgressAnimation();
    new ParallaxEffect();
    
    // Initialize new managers
    window.downloadManager = new DownloadManager();
    window.methodDetailsManager = new MethodDetailsManager();
    window.guideManager = new GuideManager();
    window.faqManager = new FAQManager();
    window.searchManager = new SearchManager();
    window.performanceMonitor = new PerformanceMonitor();

    // Add loading complete class
    setTimeout(() => {
        body.classList.add('loaded');
    }, 1000);
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }

    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    .animate-in {
        animation: slideInUp 0.6s ease-out forwards;
    }

    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .btn {
        position: relative;
        overflow: hidden;
    }

    .feature-card,
    .blog-card {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
`;
document.head.appendChild(style);

// Handle window resize
window.addEventListener('resize', () => {
    // Close mobile menu on resize
    const navMenu = document.getElementById('nav-menu');
    const hamburger = document.getElementById('hamburger');
    
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Add performance optimization
if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
        // Preload critical resources
        const criticalImages = document.querySelectorAll('img[data-src]');
        criticalImages.forEach(img => {
            img.src = img.dataset.src;
        });
    });
}

// Test FAQ functionality
window.testFAQ = function() {
    console.log('Testing FAQ functionality...');
    const faqItems = document.querySelectorAll('.faq-item');
    console.log('Found FAQ items:', faqItems.length);
    
    if (faqItems.length > 0) {
        const firstFAQ = faqItems[0];
        const question = firstFAQ.querySelector('.faq-question');
        console.log('First FAQ question:', question);
        
        if (question) {
            question.click();
            console.log('Clicked first FAQ question');
        }
    }
};
