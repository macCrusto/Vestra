// observers.js
export function initScrollAnimations() {
    // 1. Define the Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Trigger once
            }
        });
    }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

    // 2. Target elements
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach((el, index) => {
        // Set initial JS styles to avoid CSS override issues
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.1s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s`; // Staggered
        
        observer.observe(el);
    });

    // 3. Inject the "visible" class style dynamically
    const style = document.createElement('style');
    style.innerHTML = `
        .is-visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}