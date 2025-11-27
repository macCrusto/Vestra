import { properties, cities, faqs } from './data.js';
import { initAdvancedCalculator } from './calculator.js';
import { initScrollAnimations } from './observers.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Logic & Interactions
    initAuth();
    initTypingEffect();
    initAdvancedCalculator();
    initScrollAnimations();
    setupFilters();

    // 2. Render Dynamic Content Lists
    renderCities();
    renderProperties(properties); // Initial render with all properties
    renderFAQ();
});

/* --- DYNAMIC RENDERERS (Data Injection) --- */

function renderCities() {
    const container = document.getElementById('city-grid');
    if (!container) return;
    
    cities.forEach(city => {
        const div = document.createElement('div');
        div.className = 'col-6 col-md-3 animate-on-scroll';
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

function renderProperties(dataList) {
    const container = document.getElementById('property-grid');
    if (!container) return;
    
    container.innerHTML = ''; // Clear existing content

    if (dataList.length === 0) {
        container.innerHTML = `<div class="col-12 text-center py-5 text-muted"><h4>No properties found.</h4></div>`;
        return;
    }

    dataList.forEach(prop => {
        const percentFunded = (prop.availableShares / prop.totalShares) * 100;
        const col = document.createElement('div');
        col.className = 'col-md-6 col-lg-4 animate-on-scroll';
        
        col.innerHTML = `
            <div class="card h-100 border-0 shadow-sm rounded-4 overflow-hidden hover-shadow transition">
                <div class="position-relative" style="height: 220px;">
                    <img src="${prop.image}" class="w-100 h-100 object-fit-cover" alt="${prop.title}">
                    <div class="position-absolute top-0 end-0 m-3 badge bg-success text-white shadow-sm py-2 px-3">
                        ${prop.apy}% APY
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
    
    // Re-init observer for new items to ensure they animate
    initScrollAnimations();
}

function renderFAQ() {
    const container = document.getElementById('faqAccordion');
    if (!container) return;

    faqs.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'accordion-item border-0 mb-3 bg-white rounded-3 shadow-sm overflow-hidden animate-on-scroll';
        div.innerHTML = `
            <h2 class="accordion-header">
                <button class="accordion-button ${index !== 0 ? 'collapsed' : ''} fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faq-${index}">
                    ${item.q}
                </button>
            </h2>
            <div id="faq-${index}" class="accordion-collapse collapse ${index === 0 ? 'show' : ''}" data-bs-parent="#faqAccordion">
                <div class="accordion-body text-muted small">${item.a}</div>
            </div>
        `;
        container.appendChild(div);
    });
}

/* --- LOGIC & HELPERS --- */

function initAuth() {
    const container = document.getElementById('auth-container');
    if (!container) return;
    
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
        container.innerHTML = `<button class="btn btn-primary-custom text-white fw-bold px-4 shadow-sm" onclick="loginDemo()">Sign In</button>`;
    }
}

// Global functions for inline onclick events
window.loginDemo = () => {
    const email = prompt("Enter email for demo (no password needed):");
    if (email) { 
        localStorage.setItem('vestra_user', email.split('@')[0]); 
        window.location.reload(); 
    }
};

function initTypingEffect() {
    const el = document.getElementById('typing-text');
    if (!el) return;

    const texts = ["Your Daily Coffee", "Smart Algorithms", "The Gig Economy"];
    let count = 0, index = 0, currentText = "", letter = "";
    
    (function type() {
        if (count === texts.length) count = 0;
        currentText = texts[count];
        letter = currentText.slice(0, ++index);
        el.textContent = letter;
        if (letter.length === currentText.length) {
            count++; index = 0; setTimeout(type, 2000);
        } else { setTimeout(type, 100); }
    })();
}

function setupFilters() {
    const btn = document.getElementById('hero-search-btn');
    const input = document.getElementById('search-location');
    
    if (btn && input) {
        btn.addEventListener('click', () => {
            const loc = input.value.toLowerCase();
            const filtered = properties.filter(p => 
                p.location.toLowerCase().includes(loc) || 
                p.title.toLowerCase().includes(loc)
            );
            renderProperties(filtered);
            // Scroll to properties section for better UX
            document.getElementById('properties-section').scrollIntoView({ behavior: 'smooth' });
        });
    }
}