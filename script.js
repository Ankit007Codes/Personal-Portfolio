// Initialize Locomotive Scroll with error handling and performance optimization
let scroll;

// Debounce function for performance
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

// Initialize scroll after DOM is ready
function initScroll() {
    try {
        if (typeof LocomotiveScroll !== 'undefined') {
            scroll = new LocomotiveScroll({
                el: document.querySelector('#main'),
                smooth: true,
                multiplier: 1,
                lerp: 0.1,
                smartphone: {
                    smooth: false // Disable smooth scroll on mobile for better performance
                },
                tablet: {
                    smooth: false
                }
            });
        } else {
            throw new Error('LocomotiveScroll not loaded');
        }
    } catch (error) {
        console.error('Failed to initialize Locomotive Scroll:', error);
        // Fallback to native smooth scroll
        document.documentElement.style.scrollBehavior = 'smooth';
    }
}

// Wait for libraries to load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScroll);
} else {
    initScroll();
}

// Cursor functionality (only for devices with mouse)
const cursor = document.querySelector("#cursor");
let timeout;
let lastX = 0, lastY = 0;
let cursorHoverScale = 1;

function updateCursor(x, y, xscale = 1, yscale = 1) {
    if (!cursor) return;
    const overall = cursorHoverScale || 1;
    cursor.style.transform = `translate(calc(${x}px - 80%), calc(${y}px - 80%)) scale(${overall * xscale}, ${overall * yscale})`;
}

function cursorSquisher() {
    if (!cursor) return;
    
    let xprev = 0;
    let yprev = 0;

    document.addEventListener("mousemove", function (e) {
        clearTimeout(timeout);

        const x = e.clientX;
        const y = e.clientY;

        const displaceX = Math.abs(x - xprev);
        const displaceY = Math.abs(y - yprev);

        xprev = x;
        yprev = y;
        lastX = x;
        lastY = y;

        const xSpeed = Math.min(displaceX, 15);
        const ySpeed = Math.min(displaceY, 15);

        const xScale = 1 - ySpeed * 0.04;
        const yScale = 1 - xSpeed * 0.04;

        updateCursor(x, y, xScale, yScale);

        timeout = setTimeout(() => {
            updateCursor(x, y, 1, 1);
        }, 50);
    });
}

// Initialize cursor only on devices with mouse
if (window.matchMedia("(pointer: fine)").matches) {
    cursorSquisher();
} else if (cursor) {
    cursor.style.display = 'none';
}

// Fix anchor links when using LocomotiveScroll
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');

        if (!href || href === '#') {
            e.preventDefault();
            if (scroll && scroll.scrollTo) {
                scroll.scrollTo(0);
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
            history.pushState(null, '', '#');
            return;
        }

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            if (scroll && scroll.scrollTo) {
                scroll.scrollTo(target);
            } else {
                target.scrollIntoView({ behavior: 'smooth' });
            }
            history.pushState(null, '', href);
        }
    });
});



// Menu toggle functionality with mobile enhancements
const menuToggle = document.querySelector('#menu');
const menuLinks = document.querySelector('.menu');
const body = document.body;

function onclickMenu() {
    if (menuToggle && menuLinks) {
        const isOpen = menuLinks.classList.toggle('is-open');
        menuToggle.textContent = isOpen ? 'CLOSE' : 'MENU+';
        
        // Prevent body scroll when menu is open on mobile
        if (window.innerWidth <= 768) {
            body.style.overflow = isOpen ? 'hidden' : '';
        }
    }
}

if (menuToggle && menuLinks) {
    menuToggle.addEventListener('click', onclickMenu);
    
    // Close menu when clicking a link
    menuLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menuLinks.classList.remove('is-open');
            menuToggle.textContent = 'MENU+';
            body.style.overflow = '';
        });
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menuLinks.classList.contains('is-open')) {
            menuLinks.classList.remove('is-open');
            menuToggle.textContent = 'MENU+';
            body.style.overflow = '';
        }
    });
    
    // Keyboard support for menu toggle
    menuToggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onclickMenu();
        }
    });
    
    // Close menu when clicking outside (mobile)
    document.addEventListener('click', (e) => {
        if (menuLinks.classList.contains('is-open') && 
            !menuLinks.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            menuLinks.classList.remove('is-open');
            menuToggle.textContent = 'MENU+';
            body.style.overflow = '';
        }
    });
}




// Image hover effect (only if GSAP is available and on desktop)
function initProjectHoverEffects() {
    if (typeof gsap === 'undefined') return;
    if (!window.matchMedia("(pointer: fine)").matches) return; // Skip on touch devices
    
    document.querySelectorAll('.projekts').forEach(projekts => {
        const img = projekts.querySelector('img');
        if (!img) return;
        
        let prevMouseX = 0;
        let isHovering = false;

        gsap.set(img, { xPercent: -50, yPercent: -50, scale: 1 });

        projekts.addEventListener('mouseenter', () => {
            isHovering = true;
            cursorHoverScale = 2;
            updateCursor(lastX, lastY);
        });

        projekts.addEventListener('mouseleave', () => {
            isHovering = false;
            cursorHoverScale = 1;
            updateCursor(lastX, lastY);
            
            gsap.to(img, {
                opacity: 0,
                scale: 1,
                rotate: 0,
                duration: 0.6,
                ease: 'power3.out',
            });
        });

        // Throttle mousemove for better performance
        let rafId = null;
        projekts.addEventListener('mousemove', (e) => {
            if (!isHovering) return;
            
            if (rafId) return; // Skip if animation frame already requested
            
            rafId = requestAnimationFrame(() => {
                const rect = projekts.getBoundingClientRect();
                const xRel = e.clientX - rect.left;
                const yRel = e.clientY - rect.top;

                const rot_diff = e.clientX - prevMouseX;
                prevMouseX = e.clientX;

                gsap.to(img, {
                    opacity: 1,
                    x: xRel,
                    y: yRel,
                    scale: 1.03,
                    rotate: gsap.utils.clamp(-8, 8, rot_diff * 0.2),
                    duration: 0.55,
                    ease: 'power3.out',
                    overwrite: true,
                });
                
                rafId = null;
            });
        });
    });
}

// Initialize after GSAP loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProjectHoverEffects);
} else {
    initProjectHoverEffects();
}

// Mobile-specific optimizations
function initMobileOptimizations() {
    // Detect if mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        // Add mobile class to body
        document.body.classList.add('mobile-device');
        
        // Optimize viewport height for mobile browsers
        const setVH = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };
        
        setVH();
        window.addEventListener('resize', debounce(setVH, 100));
        window.addEventListener('orientationchange', setVH);
    }
    
    // Handle orientation changes
    window.addEventListener('orientationchange', () => {
        // Close menu on orientation change
        if (menuLinks && menuLinks.classList.contains('is-open')) {
            menuLinks.classList.remove('is-open');
            if (menuToggle) menuToggle.textContent = 'MENU+';
            body.style.overflow = '';
        }
    });
    
    // Improve touch scrolling
    if ('scrollBehavior' in document.documentElement.style) {
        document.documentElement.style.scrollBehavior = 'smooth';
    }
}

// On load, clear any fragment and ensure the page starts at top
window.addEventListener('DOMContentLoaded', () => {
  // Initialize mobile optimizations
  initMobileOptimizations();
  
  if (location.hash) {
    // remove the fragment without adding a history entry
    history.replaceState(null, '', location.pathname + location.search);
    // ensure viewport at top
    if (typeof scroll !== 'undefined' && scroll.scrollTo) {
      try { scroll.scrollTo(0); } catch (err) { /* ignore */ }
    } else {
      window.scrollTo(0, 0);
    }
  }
});

// Register Service Worker for offline support (optional - uncomment to enable)
/*
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then((registration) => {
                console.log('ServiceWorker registered:', registration.scope);
            })
            .catch((error) => {
                console.log('ServiceWorker registration failed:', error);
            });
    });
}
*/

// Performance monitoring (optional - for development)
if (window.performance && window.performance.timing) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            const connectTime = perfData.responseEnd - perfData.requestStart;
            const renderTime = perfData.domComplete - perfData.domLoading;
            
            console.log('Performance Metrics:');
            console.log(`Page Load Time: ${pageLoadTime}ms`);
            console.log(`Server Response Time: ${connectTime}ms`);
            console.log(`DOM Render Time: ${renderTime}ms`);
        }, 0);
    });
}



// Lazy load images on mobile for better performance
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.01
    });
    
    // Observe all images with data-src attribute
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Prevent zoom on double tap for better UX
let lastTouchEnd = 0;
document.addEventListener('touchend', (e) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        e.preventDefault();
    }
    lastTouchEnd = now;
}, { passive: false });

// Add visual feedback for touch interactions
document.querySelectorAll('a, button').forEach(element => {
    element.addEventListener('touchstart', function() {
        this.style.opacity = '0.7';
    }, { passive: true });
    
    element.addEventListener('touchend', function() {
        setTimeout(() => {
            this.style.opacity = '1';
        }, 100);
    }, { passive: true });
});

// Optimize scroll performance on mobile
let ticking = false;
let lastScrollY = 0;

function updateScrollDirection() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollY > lastScrollY && scrollY > 100) {
        // Scrolling down
        document.body.classList.add('scroll-down');
        document.body.classList.remove('scroll-up');
    } else if (scrollY < lastScrollY) {
        // Scrolling up
        document.body.classList.add('scroll-up');
        document.body.classList.remove('scroll-down');
    }
    
    lastScrollY = scrollY;
    ticking = false;
}

if (window.innerWidth <= 768) {
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateScrollDirection);
            ticking = true;
        }
    }, { passive: true });
}
