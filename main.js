import { properties, cities, faqs } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    initAuth();
    initHero();
    renderCities();
    renderProperties();
    initCalculator();
    renderFAQ();
    renderContact();    // New: Added specifically after FAQ
    renderNewsletter(); // New: Added specifically after Contact
});

// 1. Auth Simulation
function initAuth() {
    const container = document.getElementById('auth-container');
    const user = localStorage.getItem('vestra_user');

    if (user) {
        container.innerHTML = `
            <div class="dropdown">
                <button class="btn btn-outline-dark fw-bold dropdown-toggle" type="button" data-bs-toggle="dropdown">
                    Welcome, ${user}
                </button>
                <ul class="dropdown-menu dropdown-menu-end">
                    <li><a class="dropdown-item" href="#">Dashboard</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="#" id="logout-btn">Logout</a></li>
                </ul>
            </div>
        `;
        document.getElementById('logout-btn').addEventListener('click', () => {
            localStorage.removeItem('vestra_user');
            window.location.reload();
        });
    } else {
        container.innerHTML = `
            <button class="btn btn-primary-custom text-white fw-bold px-4 shadow-sm" onclick="loginDemo()">
                Get Started
            </button>
        `;
    }
}

// Global scope for onclick
window.loginDemo = () => {
    const email = prompt("Enter email to simulate login:");
    if (email) {
        localStorage.setItem('vestra_user', email.split('@')[0]);
        window.location.reload();
    }
};

// 2. Hero Section Logic
function initHero() {
    // Tabs
    const buttons = document.querySelectorAll('#hero-tabs button');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => {
                b.classList.remove('btn-primary', 'text-white', 'shadow-sm');
                b.classList.add('btn-light', 'text-muted');
            });
            btn.classList.remove('btn-light', 'text-muted');
            btn.classList.add('btn-primary', 'text-white', 'shadow-sm');
        });
    });

    // Typing Effect
    const texts = ["Your Daily Coffee", "Smart Algorithms", "The Gig Economy"];
    let count = 0;
    let index = 0;
    let currentText = "";
    let letter = "";
    
    (function type() {
        const el = document.getElementById('typing-text');
        if(!el) return;

        if (count === texts.length) count = 0;
        currentText = texts[count];
        letter = currentText.slice(0, ++index);
        
        el.textContent = letter;
        
        if (letter.length === currentText.length) {
            count++;
            index = 0;
            setTimeout(type, 2000); 
        } else {
            setTimeout(type, 100);
        }
    })();
}

// 3. Render Cities
function renderCities() {
    const container = document.getElementById('city-grid');
    if(!container) return;

    cities.forEach(city => {
        const div = document.createElement('div');
        div.className = 'col-6 col-md-3';
        div.innerHTML = `
            <div class="text-center cursor-pointer group">
                <div class="ratio ratio-1x1 mb-3 rounded-circle overflow-hidden shadow border border-4 border-white">
                    <img src="${city.img}" class="object-fit-cover hover-zoom transition" alt="${city.name}">
                </div>
                <h5 class="fw-bold mb-1">${city.name}</h5>
                <small class="text-muted">${city.count}</small>
            </div>
        `;
        container.appendChild(div);
    });
}

// 4. Render Properties
function renderProperties() {
    const container = document.getElementById('property-grid');
    if(!container) return;

    properties.forEach(prop => {
        const percentFunded = (prop.availableShares / prop.totalShares) * 100;
        
        const col = document.createElement('div');
        col.className = 'col-md-6 col-lg-4';
        
        col.innerHTML = `
            <div class="card h-100 border-0 shadow-sm rounded-4 overflow-hidden hover-shadow transition">
                <div class="position-relative" style="height: 220px;">
                    <img src="${prop.image}" class="w-100 h-100 object-fit-cover" alt="${prop.title}">
                    <div class="position-absolute top-0 end-0 m-3 badge bg-success text-white shadow-sm py-2 px-3">
                        <i class="bi bi-graph-up-arrow me-1"></i> ${prop.apy}% APY
                    </div>
                    ${prop.isTrending ? `<div class="position-absolute top-0 start-0 m-3 badge bg-warning text-white shadow-sm py-2 px-3">Top Performer</div>` : ''}
                </div>
                <div class="card-body p-4 d-flex flex-column">
                    <h5 class="card-title fw-bold mb-1">${prop.title}</h5>
                    <p class="text-muted small mb-3"><i class="bi bi-geo-alt me-1"></i> ${prop.location}</p>
                    
                    ${prop.specs.sqft ? `
                    <div class="d-flex gap-3 border-bottom pb-3 mb-3 small text-muted">
                        ${prop.specs.beds ? `<span><i class="bi bi-layout-sidebar me-1"></i> ${prop.specs.beds} Beds</span>` : ''}
                        ${prop.specs.baths ? `<span><i class="bi bi-droplet me-1"></i> ${prop.specs.baths} Bath</span>` : ''}
                        <span>${prop.specs.sqft} sqft</span>
                    </div>` : ''}

                    <div class="mt-auto">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <small class="text-muted">Share Price</small>
                            <span class="fw-bold">$${prop.sharePrice}</span>
                        </div>
                        <div class="progress mb-3" style="height: 6px;">
                            <div class="progress-bar bg-warning" style="width: ${percentFunded}%"></div>
                        </div>
                        <button class="btn btn-primary-custom w-100 text-white fw-bold py-2 rounded-3">Invest Now</button>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(col);
    });
}

// 5. Render FAQ
function renderFAQ() {
    const container = document.getElementById('faqAccordion');
    if(!container) return;

    faqs.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'accordion-item border-0 mb-3 bg-white rounded-3 shadow-sm overflow-hidden';
        div.innerHTML = `
            <h2 class="accordion-header">
                <button class="accordion-button ${index !== 0 ? 'collapsed' : ''} fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faq-${index}">
                    ${item.q}
                </button>
            </h2>
            <div id="faq-${index}" class="accordion-collapse collapse ${index === 0 ? 'show' : ''}" data-bs-parent="#faqAccordion">
                <div class="accordion-body text-muted small">
                    ${item.a}
                </div>
            </div>
        `;
        container.appendChild(div);
    });
}

// 6. Investment Calculator
function initCalculator() {
    const slider = document.getElementById('investment-slider');
    const display = document.getElementById('calc-display');
    const resTotal = document.getElementById('result-total');
    const resInitial = document.getElementById('result-initial');
    const resGain = document.getElementById('result-gain');
    
    if(!slider) return;

    const calculate = (val) => {
        const amount = parseInt(val);
        const apy = 0.082;
        const years = 5;
        const total = Math.round(amount * Math.pow(1 + apy, years));
        const gain = total - amount;

        display.innerText = `$${amount.toLocaleString()}`;
        resInitial.innerText = `$${amount.toLocaleString()}`;
        resTotal.innerText = `$${total.toLocaleString()}`;
        resGain.innerText = `+$${gain.toLocaleString()}`;
    };

    slider.addEventListener('input', (e) => calculate(e.target.value));
}

// 7. Render Contact Section
function renderContact() {
    const container = document.getElementById('contact-container');
    if(!container) return;

    container.innerHTML = `
        <section class="py-5 bg-light pb-5 mb-5">
            <div class="container max-w-800">
                <div class="bg-white rounded-4 p-5 text-center shadow-lg border">
                    <div class="d-flex justify-content-center mb-4">
                        <div class="d-flex ms-3">
                            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" class="avatar-stack object-fit-cover">
                            <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80" class="avatar-stack ms-n2 object-fit-cover">
                            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" class="avatar-stack ms-n2 object-fit-cover">
                        </div>
                    </div>
                    <h3 class="fw-bold mb-2">Still have questions?</h3>
                    <p class="text-muted mb-4">Can't find the answer you're looking for? Our team is here to help.</p>
                    <button class="btn btn-primary-custom text-white fw-bold px-4 py-2 rounded-3">Get in Touch</button>
                </div>
            </div>
        </section>
    `;
}

// 8. Render Newsletter Section
function renderNewsletter() {
    const container = document.getElementById('newsletter-container');
    if (!container) return;

    container.innerHTML = `
        <section class="position-relative py-5 bg-dark overflow-hidden">
            <div class="position-absolute top-0 start-0 w-100 h-100 opacity-25">
                 <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=80" class="w-100 h-100 object-fit-cover" alt="Modern Architecture">
            </div>
            
            <div class="position-absolute top-0 start-0 w-100 h-100" style="background: linear-gradient(90deg, #212529 0%, rgba(33,37,41,0.95) 40%, rgba(33,37,41,0.7) 100%);"></div>
            
            <div class="container position-relative py-5">
                <div class="row align-items-center">
                    <div class="col-lg-7">
                        <h2 class="display-5 fw-bold text-white mb-3">Stay Updated on Latest Property</h2>
                        <p class="text-white-50 mb-4 lead fs-6">Get exclusive access to new investment opportunities, market insights, and platform updates delivered to your inbox.</p>
                        
                        <form id="newsletter-form" class="d-flex flex-column flex-md-row gap-3 mb-3 max-w-600">
                            <input type="email" 
                                class="form-control form-control-lg bg-white bg-opacity-10 border-secondary text-white placeholder-light" 
                                style="backdrop-filter: blur(5px);"
                                placeholder="Enter your email address" 
                                required>
                            <button type="submit" class="btn btn-primary-custom btn-lg fw-bold px-4 text-nowrap shadow-lg">
                                <i class="bi bi-envelope me-2"></i> Subscribe
                            </button>
                        </form>
                        
                        <small class="text-white-50 opacity-75">By subscribing, you agree to receive marketing emails from VESTRA. Unsubscribe anytime.</small>
                    </div>
                </div>
            </div>
        </section>
    `;

    // Fake Submission Logic
    const form = document.getElementById('newsletter-form');
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span> Subscribing...`;
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = `<i class="bi bi-check-circle me-2"></i> Subscribed!`;
                btn.classList.remove('btn-primary-custom');
                btn.classList.add('btn-success');
                form.reset();
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.classList.add('btn-primary-custom');
                    btn.classList.remove('btn-success');
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }
}