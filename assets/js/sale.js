// Sale banner and pricing - uses config from sale-config.js
// Make sure sale-config.js is loaded before this script

function populatePrices() {
    // Populate prices from config
    document.querySelectorAll('.sale-price-container[data-product]').forEach(container => {
        const product = container.dataset.product;
        const originalPrice = SALE_CONFIG.prices[product];
        
        if (originalPrice) {
            const salePrice = getSalePrice(originalPrice);
            
            const originalPriceEl = container.querySelector('.original-price');
            const salePriceEl = container.querySelector('.sale-price');
            const saleBadgeEl = container.querySelector('.sale-badge');
            
            if (originalPriceEl) originalPriceEl.textContent = `$${originalPrice}`;
            if (salePriceEl) salePriceEl.textContent = `$${salePrice}`;
            if (saleBadgeEl) saleBadgeEl.textContent = `${SALE_CONFIG.discountPercent}% OFF`;
        }
    });
    
    // Update banner discount text
    document.querySelectorAll('.sale-banner-discount').forEach(el => {
        el.textContent = `${SALE_CONFIG.discountPercent}% OFF`;
    });
    
    // Update banner sale name
    document.querySelectorAll('.sale-banner-title').forEach(el => {
        el.textContent = SALE_CONFIG.saleName;
    });
}

function showSaleElements() {
    // Show banners (hidden by default in CSS)
    document.querySelectorAll('.sale-banner').forEach(banner => {
        banner.style.display = 'block';
    });
}

function updateCountdown() {
    const timeRemaining = getTimeRemaining();

    // If countdown is finished, hide sale elements
    if (!timeRemaining) {
        hideSaleElements();
        return;
    }

    const { days, hours, minutes, seconds } = timeRemaining;

    // Update main countdown elements (there may be multiple on the page)
    document.querySelectorAll('#countdown-days').forEach(el => el.textContent = String(days).padStart(2, '0'));
    document.querySelectorAll('#countdown-hours').forEach(el => el.textContent = String(hours).padStart(2, '0'));
    document.querySelectorAll('#countdown-minutes').forEach(el => el.textContent = String(minutes).padStart(2, '0'));
    document.querySelectorAll('#countdown-seconds').forEach(el => el.textContent = String(seconds).padStart(2, '0'));
    
    // Update mini countdowns in pricing sections
    const miniCountdownText = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    document.querySelectorAll('.sale-countdown-value').forEach(el => {
        el.textContent = miniCountdownText;
    });
}

function hideSaleElements() {
    // Hide banners
    document.querySelectorAll('.sale-banner').forEach(banner => {
        banner.style.display = 'none';
    });
    
    // Hide sale price containers and show only regular price
    document.querySelectorAll('.sale-price-container').forEach(container => {
        const originalPrice = container.querySelector('.original-price');
        const salePrice = container.querySelector('.sale-price');
        const saleBadge = container.querySelector('.sale-badge');
        
        // Hide sale elements
        if (salePrice) salePrice.style.display = 'none';
        if (saleBadge) saleBadge.style.display = 'none';
        
        // Show original price without strikethrough
        if (originalPrice) {
            originalPrice.classList.remove('original-price');
            originalPrice.style.color = '';
        }
    });
    
    // Hide mini countdowns
    document.querySelectorAll('.sale-countdown-mini').forEach(el => {
        el.style.display = 'none';
    });
}

// Initialize on page load (for statically loaded content)
// Note: For dynamically loaded content, call populatePrices() and updateCountdown() after fetch
document.addEventListener('DOMContentLoaded', function() {
    populatePrices();
    
    if (isSaleActive()) {
        showSaleElements();
        updateCountdown();
        setInterval(updateCountdown, 1000);
    } else {
        hideSaleElements();
    }
});

// Re-run when purchase card loads (pricing HTML is loaded dynamically)
document.addEventListener('purchaseCardLoaded', function() {
    populatePrices();
    
    if (isSaleActive()) {
        showSaleElements();
        updateCountdown();
    } else {
        hideSaleElements();
    }
});
