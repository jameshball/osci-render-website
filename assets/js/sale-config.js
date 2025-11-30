// =====================================================
// SALE CONFIGURATION - Edit these values for future sales
// =====================================================

const SALE_CONFIG = {
    // Sale end date/time (in UTC/GMT)
    // Format: 'YYYY-MM-DDTHH:MM:SSZ'
    endDate: '2025-12-03T00:00:00Z',  // End of Dec 2nd, 2025 GMT
    
    // Discount percentage (just the number, e.g., 20 for 20%)
    discountPercent: 20,
    
    // Original prices (before discount)
    prices: {
        'osci-render': 40,
        'sosci': 20
    },
    
    // Sale name (displayed in banner)
    saleName: 'CYBER MONDAY SALE'
};

// =====================================================
// Helper functions - No need to edit below
// =====================================================

// Calculate sale price
function getSalePrice(originalPrice) {
    return Math.round(originalPrice * (1 - SALE_CONFIG.discountPercent / 100));
}

// Check if sale is currently active
function isSaleActive() {
    return new Date().getTime() < new Date(SALE_CONFIG.endDate).getTime();
}

// Get time remaining until sale ends
function getTimeRemaining() {
    const now = new Date().getTime();
    const end = new Date(SALE_CONFIG.endDate).getTime();
    const distance = end - now;
    
    if (distance < 0) return null;
    
    return {
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
    };
}

// Export for use in other scripts
window.SALE_CONFIG = SALE_CONFIG;
window.getSalePrice = getSalePrice;
window.isSaleActive = isSaleActive;
window.getTimeRemaining = getTimeRemaining;
