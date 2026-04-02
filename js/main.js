// MCV4U Derivatives Website - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initScrollEffects();
    initAnimations();
});

function initNavigation() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const dropdown = document.querySelector('.dropdown');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Mobile dropdown toggle
    if (dropdown) {
        const dropdownLink = dropdown.querySelector('.nav-link');
        dropdownLink.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

function initScrollEffects() {
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.topic-card, .katc-card, .resource-card, .quiz-card').forEach(el => {
        observer.observe(el);
    });
}

function initAnimations() {
    const cards = document.querySelectorAll('.topic-card, .katc-card, .resource-card');

    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';

        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

function smoothScrollTo(targetId) {
    const target = document.getElementById(targetId);
    if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

window.addEventListener('load', function() {
    document.body.style.opacity = '1';
});

const words = ['Calculus', 'Derivatives', 'Mathematics', 'Learning'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function typewriter() {
    const currentWord = words[wordIndex];
    const heroTitle = document.querySelector('.hero-title');

    if (!heroTitle) return;

    if (isDeleting) {
        heroTitle.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
    } else {
        heroTitle.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500;
    }

    setTimeout(typewriter, typeSpeed);
}

const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    setTimeout(typewriter, 1000);
}

document.addEventListener('mousemove', function(e) {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;

    const heroIllustration = document.querySelector('.hero-illustration');
    if (heroIllustration) {
        heroIllustration.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
});

const statNumbers = document.querySelectorAll('.stat-number');
statNumbers.forEach(stat => {
    const target = stat.textContent;
    const numericTarget = parseFloat(target.replace(/[^0-9.]/g, ''));

    if (!isNaN(numericTarget)) {
        let current = 0;
        const increment = numericTarget / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= numericTarget) {
                stat.textContent = target;
                clearInterval(timer);
            } else {
                if (target.includes('%')) {
                    stat.textContent = Math.floor(current) + '%';
                } else if (target.includes('+')) {
                    stat.textContent = Math.floor(current) + '+';
                } else {
                    stat.textContent = Math.floor(current);
                }
            }
        }, 30);
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href && href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');

    progressBars.forEach(bar => {
        const width = bar.getAttribute('data-width') || '0';
        bar.style.width = width + '%';
    });
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        if (navMenu) navMenu.classList.remove('active');
        if (mobileMenuBtn) mobileMenuBtn.classList.remove('active');
    }
});

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 16px 24px;
        background: var(--dark-2);
        border-left: 4px solid ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6366f1'};
        border-radius: 8px;
        color: white;
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const handleResize = debounce(() => {
    const navMenu = document.querySelector('.nav-menu');
    if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
    }
}, 250);

window.addEventListener('resize', handleResize);

window.toggleSolution = function(id) {
    const sol = document.getElementById(id);
    if (sol) {
        if (sol.style.display === 'none' || sol.style.display === '') {
            sol.style.display = 'block';
        } else {
            sol.style.display = 'none';
        }
    }
};

console.log('%cMCV4U Derivatives Website', 'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%cWelcome to the Interactive Calculus Learning Platform', 'color: #a855f7; font-size: 14px;');