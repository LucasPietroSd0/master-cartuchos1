// Master Cartuchos - Interactive JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // 1. Live Operating Status Badge
    updateOperatingStatus();
    setInterval(updateOperatingStatus, 60000);

    // 2. WhatsApp Quote Builder
    initQuoteCalculator();

    // 3. Model Search & Filter
    initModelFilter();

    // 4. FAQ Accordion
    initFaqAccordion();

    // 5. Mobile Menu
    initMobileMenu();

    // 6. Copy Address & Phone helpers
    initCopyButtons();
});

// Calculate Recife Business Hours (UTC-3)
function updateOperatingStatus() {
    const statusBadge = document.getElementById('status-badge');
    const statusText = document.getElementById('status-text');
    const statusDot = document.getElementById('status-dot');
    
    if (!statusBadge || !statusText || !statusDot) return;

    // Get current time in Brazil (Recife is UTC-3, no daylight saving)
    const now = new Date();
    const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
    const recifeTime = new Date(utcTime + (3600000 * -3));

    const day = recifeTime.getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat
    const hour = recifeTime.getHours();
    const minute = recifeTime.getMinutes();
    const timeInMinutes = hour * 60 + minute;

    let isOpen = false;
    let nextInfo = '';

    if (day >= 1 && day <= 5) { // Segunda a Sexta: 08:00 às 18:00
        if (timeInMinutes >= 8 * 60 && timeInMinutes < 18 * 60) {
            isOpen = true;
            nextInfo = 'Aberto agora • Fecha às 18:00';
        } else if (timeInMinutes < 8 * 60) {
            nextInfo = 'Fechado • Abre hoje às 08:00';
        } else {
            nextInfo = (day === 5) ? 'Fechado • Abre sábado às 08:00' : 'Fechado • Abre amanhã às 08:00';
        }
    } else if (day === 6) { // Sábado: fechado
        nextInfo = 'Fechado aos sábados • Abre segunda às 08:00';
    } else { // Domingo
        nextInfo = 'Fechado aos domingos • Abre seg. às 08:00';
    }

    if (isOpen) {
        statusDot.className = 'w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse';
        statusText.textContent = nextInfo;
        statusBadge.className = 'status-badge inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30';
    } else {
        statusDot.className = 'w-2.5 h-2.5 rounded-full bg-amber-400';
        statusText.textContent = nextInfo;
        statusBadge.className = 'status-badge inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30';
    }
}

// WhatsApp Quote Builder
function initQuoteCalculator() {
    const modelSelect = document.getElementById('calc-model');
    const customModelInput = document.getElementById('calc-custom-model');
    const serviceRadios = document.querySelectorAll('input[name="calc-service"]');
    const typeRadios = document.querySelectorAll('input[name="calc-type"]');
    const clientNote = document.getElementById('calc-notes');
    const btnSend = document.getElementById('calc-send-btn');
    const previewMessage = document.getElementById('calc-preview');

    if (!modelSelect || !btnSend) return;

    function buildMessage() {
        const selectedModel = modelSelect.value === 'outro' ? (customModelInput.value.trim() || 'Modelo sob consulta') : modelSelect.value;
        
        let serviceType = 'Recarga de Cartucho';
        serviceRadios.forEach(r => {
            if (r.checked) serviceType = r.value;
        });

        let cartridgeColor = 'Preto e Colorido';
        typeRadios.forEach(r => {
            if (r.checked) cartridgeColor = r.value;
        });

        const notes = clientNote && clientNote.value.trim() ? `\n📌 Observação: ${clientNote.value.trim()}` : '';

        const fullMsg = `Olá, Master Cartuchos! Vim pelo site e gostaria de um orçamento:\n\n` +
            `🖨️ *Modelo:* ${selectedModel}\n` +
            `⚙️ *Serviço:* ${serviceType}\n` +
            `🎨 *Opção:* ${cartridgeColor}${notes}\n\n` +
            `Qual o valor e o prazo para realização?`;

        if (previewMessage) {
            previewMessage.textContent = fullMsg;
        }

        const encodedMsg = encodeURIComponent(fullMsg);
        btnSend.href = `https://wa.me/5581982840782?text=${encodedMsg}`;
    }

    if (modelSelect) {
        modelSelect.addEventListener('change', () => {
            if (modelSelect.value === 'outro') {
                customModelInput.classList.remove('hidden');
                customModelInput.focus();
            } else {
                customModelInput.classList.add('hidden');
            }
            buildMessage();
        });
    }

    if (customModelInput) customModelInput.addEventListener('input', buildMessage);
    serviceRadios.forEach(r => r.addEventListener('change', buildMessage));
    typeRadios.forEach(r => r.addEventListener('change', buildMessage));
    if (clientNote) clientNote.addEventListener('input', buildMessage);

    // Initial build
    buildMessage();
}

// Model Search & Filter
function initModelFilter() {
    const searchInput = document.getElementById('model-search');
    const modelCards = document.querySelectorAll('.model-card');
    const filterButtons = document.querySelectorAll('.model-filter-btn');
    const noResults = document.getElementById('no-models-found');

    if (!searchInput && filterButtons.length === 0) return;

    let activeCategory = 'all';

    function filterModels() {
        const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
        let visibleCount = 0;

        modelCards.forEach(card => {
            const name = card.getAttribute('data-name')?.toLowerCase() || '';
            const printers = card.getAttribute('data-printers')?.toLowerCase() || '';
            const category = card.getAttribute('data-category') || '';

            const matchesQuery = !query || name.includes(query) || printers.includes(query);
            const matchesCategory = activeCategory === 'all' || category.includes(activeCategory);

            if (matchesQuery && matchesCategory) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        if (noResults) {
            noResults.classList.toggle('hidden', visibleCount > 0);
        }
    }

    if (searchInput) {
        searchInput.addEventListener('input', filterModels);
    }

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => {
                b.classList.remove('bg-sky-700', 'text-white', 'border-sky-700');
                b.classList.add('bg-slate-800/80', 'text-slate-300', 'border-slate-700');
            });
            btn.classList.add('bg-sky-700', 'text-white', 'border-sky-700');
            btn.classList.remove('bg-slate-800/80', 'text-slate-300', 'border-slate-700');
            
            activeCategory = btn.getAttribute('data-filter') || 'all';
            filterModels();
        });
    });
}

// FAQ Accordion
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const header = item.querySelector('.faq-header');
        if (!header) return;

        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            // Close all
            faqItems.forEach(i => i.classList.remove('active'));
            // If wasn't active, open it
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// Mobile Menu toggle
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    if (!menuBtn || !mobileMenu) return;

    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
}

// Copy to clipboard helper
function initCopyButtons() {
    const copyBtns = document.querySelectorAll('.copy-btn');
    copyBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const textToCopy = btn.getAttribute('data-copy');
            if (!textToCopy) return;

            navigator.clipboard.writeText(textToCopy).then(() => {
                const originalHtml = btn.innerHTML;
                btn.innerHTML = '✓ Copiado!';
                btn.classList.add('text-emerald-400', 'border-emerald-400');
                setTimeout(() => {
                    btn.innerHTML = originalHtml;
                    btn.classList.remove('text-emerald-400', 'border-emerald-400');
                }, 2000);
            });
        });
    });
}

// Global helper for direct WhatsApp quick button with custom message
window.openWhatsApp = function(customText) {
    const phone = "5581982840782";
    const msg = customText || "Olá, Master Cartuchos! Gostaria de tirar uma dúvida sobre recarga de cartucho.";
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
};
