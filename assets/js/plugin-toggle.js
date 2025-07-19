// Global function to set active plugin (can be called from anywhere)
window.setActivePlugin = function(plugin) {
    if (plugin !== 'osci-render' && plugin !== 'sosci') {
        console.warn('Invalid plugin:', plugin, '. Must be "osci-render" or "sosci"');
        return;
    }
    
    const containers = document.querySelectorAll('.plugin-comparison');
    
    containers.forEach(container => {
        const option = container.querySelector(`.price-option[data-plugin="${plugin}"]`);
        
        if (option) {
            // Clear all active states
            container.querySelectorAll('.price-option').forEach(opt => {
                opt.classList.remove('active');
                const input = opt.querySelector('input');
                if (input) input.checked = false;
            });
            
            // Set active state
            option.classList.add('active');
            const input = option.querySelector('input');
            if (input) input.checked = true;
            
            // Update container data attribute
            container.dataset.activePlugin = plugin;
        }
    });
};

// Function to determine which plugin should be active based on current page
function getActivePlugin() {
    const path = window.location.pathname;
    
    // Check if we're on the sosci page
    if (path.includes('/sosci')) {
        return 'sosci';
    }
    // Default to osci-render for main page
    return 'osci-render';
}

// Function to initialize the toggle when content is loaded
function initializeToggle() {
    const container = document.querySelector('.plugin-comparison');
    if (!container) {
        return false;
    }
    
    // Determine and set the active plugin
    const activePlugin = getActivePlugin();
    
    // Set the active plugin
    window.setActivePlugin(activePlugin);
    
    // Add click handlers for manual toggle
    container.querySelectorAll('.price-option').forEach(option => {
        option.addEventListener('click', function(e) {
            // Don't prevent default - let the link navigate
            const plugin = this.dataset.plugin;
            window.setActivePlugin(plugin);
            // The page will navigate, so no need to do anything else
        });
    });
    
    return true;
}

// Initialize when FAQ content is loaded
document.addEventListener('faqLoaded', function() {
    setTimeout(() => {
        const success = initializeToggle();
        if (!success) {
            setTimeout(initializeToggle, 100);
        }
    }, 50);
});

// Fallback initialization attempts
let attempts = 0;
const maxAttempts = 10;

function tryInitialize() {
    attempts++;
    
    const success = initializeToggle();
    if (!success && attempts < maxAttempts) {
        setTimeout(tryInitialize, 200);
    }
}

setTimeout(tryInitialize, 200);
