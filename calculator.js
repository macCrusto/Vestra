// calculator.js
export function initAdvancedCalculator() {
    // Only proceed if the elements exist in the DOM
    if (!document.getElementById('calc-form')) return;

    bindEvents();
    updateCalculator(); // Run once on load
}

function bindEvents() {
    // Bind listeners to existing HTML inputs
    const ids = ['initial-deposit', 'monthly-contrib', 'monthly-slider', 'years-slider', 'apy-slider'];
    
    ids.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('input', updateCalculator);
    });

    // Sync Slider/Input pairs
    const slider = document.getElementById('monthly-slider');
    const input = document.getElementById('monthly-contrib');
    
    if (slider && input) {
        slider.addEventListener('input', e => input.value = e.target.value);
        input.addEventListener('input', e => slider.value = e.target.value);
    }
}

function updateCalculator() {
    // 1. Get Values from DOM
    const P = parseFloat(document.getElementById('initial-deposit').value) || 0;
    const PMT = parseFloat(document.getElementById('monthly-contrib').value) || 0;
    const years = parseInt(document.getElementById('years-slider').value);
    const rate = parseFloat(document.getElementById('apy-slider').value) / 100;

    // 2. Update Text Displays
    document.getElementById('years-display').innerText = `${years} Yr`;
    document.getElementById('chart-end-year').innerText = `${years} Years`;
    document.getElementById('apy-display').innerText = `${(rate * 100).toFixed(1)}%`;

    // 3. Perform Math (Future Value of Annuity)
    const n = 12; // Monthly compounding
    const totalMonths = years * n;
    const r = rate / n;

    const fvPrincipal = P * Math.pow(1 + r, totalMonths);
    const fvSeries = PMT * ((Math.pow(1 + r, totalMonths) - 1) / r);
    const totalFV = fvPrincipal + fvSeries;
    const totalInvested = P + (PMT * totalMonths);
    const totalInterest = totalFV - totalInvested;

    // 4. Update Results
    document.getElementById('total-value').innerText = formatCurrency(totalFV);
    document.getElementById('total-invested').innerText = formatCurrency(totalInvested);
    document.getElementById('total-interest').innerText = `+${formatCurrency(totalInterest)}`;

    // 5. Render Chart
    renderChart(P, PMT, rate, years);
}

function renderChart(P, PMT, annualRate, years) {
    const container = document.getElementById('chart-bars');
    if (!container) return;
    
    container.innerHTML = ''; // Clear old bars
    
    const step = Math.max(1, Math.floor(years / 10));
    const n = 12;
    const r = annualRate / n;
    
    // Calculate max value for y-axis scaling
    const totalMonths = years * n;
    const maxVal = (P * Math.pow(1 + r, totalMonths)) + (PMT * ((Math.pow(1 + r, totalMonths) - 1) / r));

    for (let i = 1; i <= years; i += step) {
        const months = i * n;
        const val = (P * Math.pow(1 + r, months)) + (PMT * ((Math.pow(1 + r, months) - 1) / r));
        const height = (val / maxVal) * 100;

        const bar = document.createElement('div');
        bar.className = 'bg-success rounded-top opacity-75 transition';
        bar.style.width = '8%';
        bar.style.height = `${height}%`;
        bar.title = `Year ${i}: ${formatCurrency(val)}`;
        
        // Add simple hover interactions via JS
        bar.onmouseover = () => { bar.style.opacity = '1'; };
        bar.onmouseout = () => { bar.style.opacity = '0.75'; };

        container.appendChild(bar);
    }
}

function formatCurrency(num) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(num);
}