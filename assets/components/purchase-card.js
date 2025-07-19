// Purchase card component loader
class PurchaseCard {
    constructor(options = {}) {
        this.options = {
            containerId: 'purchase-container',
            productTitle: 'Product Name',
            authorImage: '../assets/images/jameshball.jpg',
            descriptionFile: '', // Path to HTML file for description
            pricingFile: '', // Path to HTML file for pricing options
            reviewsFile: '../assets/components/reviews.html', // Path to HTML file for reviews
            reviews: true,
            purchaseButtonText: 'Purchase',
            purchaseHandler: null,
            ...options
        };
    }

    async load() {
        const container = document.getElementById(this.options.containerId);
        if (!container) {
            console.error(`Container with id "${this.options.containerId}" not found`);
            return;
        }

        try {
            // Load the purchase card template
            const purchaseCardResponse = await fetch('../assets/components/purchase-card.html');
            const purchaseCardHtml = await purchaseCardResponse.text();
            
            container.innerHTML = purchaseCardHtml;

            // Set product title
            const titleElement = container.querySelector('[data-product-title]');
            if (titleElement) {
                titleElement.textContent = this.options.productTitle;
            }

            // Set author image path
            const authorImage = container.querySelector('[data-author-image]');
            if (authorImage) {
                authorImage.src = this.options.authorImage;
            }

            // Load product description from file
            if (this.options.descriptionFile) {
                await this.loadDescriptionFromFile(container);
            }

            // Load pricing options from file
            if (this.options.pricingFile) {
                await this.loadPricingFromFile(container);
            }

            // Set purchase button text
            const buttonTextElement = container.querySelector('[data-purchase-button-text]');
            if (buttonTextElement) {
                buttonTextElement.textContent = this.options.purchaseButtonText;
            }

            // Load reviews if enabled
            if (this.options.reviews) {
                await this.loadReviews(container);
            }

            // Set up purchase button handler
            if (this.options.purchaseHandler) {
                const purchaseButton = container.querySelector('.custom-js-btn');
                if (purchaseButton) {
                    purchaseButton.addEventListener('click', this.options.purchaseHandler);
                }
            }

        } catch (error) {
            console.error('Error loading purchase card:', error);
        }
    }

    async loadDescriptionFromFile(container) {
        try {
            const response = await fetch(this.options.descriptionFile);
            const html = await response.text();
            
            const descriptionElement = container.querySelector('[data-product-description]');
            if (descriptionElement) {
                descriptionElement.innerHTML = html;
            }
        } catch (error) {
            console.error('Error loading description:', error);
        }
    }

    async loadPricingFromFile(container) {
        try {
            const response = await fetch(this.options.pricingFile);
            const html = await response.text();
            
            const pricingElement = container.querySelector('[data-pricing-options]');
            if (pricingElement) {
                pricingElement.innerHTML = html;
            }
        } catch (error) {
            console.error('Error loading pricing options:', error);
        }
    }

    async loadReviews(container) {
        try {
            const reviewsResponse = await fetch(this.options.reviewsFile);
            const reviewsHtml = await reviewsResponse.text();
            
            const reviewsElement = container.querySelector('[data-reviews-section]');
            if (reviewsElement) {
                reviewsElement.innerHTML = reviewsHtml;
            }
        } catch (error) {
            console.error('Error loading reviews:', error);
        }
    }
}

// Export for use
window.PurchaseCard = PurchaseCard;
