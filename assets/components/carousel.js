class SmoothCarousel {
    constructor(element, images, interval = 4000) {
        this.carousel = element;
        this.images = images;
        this.interval = interval;
        this.currentIndex = 0;
        this.autoplayTimer = null;
        this.isTransitioning = false;

        this.init();
        this.setupEventListeners();
        this.startAutoplay();
    }

    init() {
        // Create and append images
        const carouselInner = this.carousel.querySelector('.smooth-carousel-inner');
        this.images.forEach(image => {
            const img = document.createElement('img');
            img.src = image;
            img.alt = 'Carousel image';
            carouselInner.appendChild(img);
        });

        // Create indicators
        const indicators = this.carousel.querySelector('.smooth-carousel-indicators');
        this.images.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.className = `indicator${index === 0 ? ' active' : ''}`;
            indicator.addEventListener('click', () => this.goToSlide(index));
            indicators.appendChild(indicator);
        });

        this.updateCarousel();
    }

    setupEventListeners() {
        const prevButton = this.carousel.querySelector('.smooth-carousel-control.prev');
        const nextButton = this.carousel.querySelector('.smooth-carousel-control.next');

        prevButton.addEventListener('click', () => this.prev());
        nextButton.addEventListener('click', () => this.next());

        this.carousel.addEventListener('mouseenter', () => this.stopAutoplay());
        this.carousel.addEventListener('mouseleave', () => this.startAutoplay());
    }

    updateCarousel() {
        if (this.isTransitioning) return;

        const carouselInner = this.carousel.querySelector('.smooth-carousel-inner');
        carouselInner.style.transform = `translateX(-${this.currentIndex * 100}%)`;

        // Update indicators
        const indicators = this.carousel.querySelectorAll('.indicator');
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentIndex);
        });
    }

    resetAutoplayTimer() {
        if (this.autoplayTimer) {
            clearInterval(this.autoplayTimer);
            this.startAutoplay();
        }
    }

    next() {
        if (this.isTransitioning) return;
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.updateCarousel();
        this.resetAutoplayTimer();
    }

    prev() {
        if (this.isTransitioning) return;
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.updateCarousel();
        this.resetAutoplayTimer();
    }

    goToSlide(index) {
        if (this.isTransitioning || index === this.currentIndex) return;
        this.currentIndex = index;
        this.updateCarousel();
        this.resetAutoplayTimer();
    }

    startAutoplay() {
        this.autoplayTimer = setInterval(() => this.next(), this.interval);
    }

    stopAutoplay() {
        if (this.autoplayTimer) {
            clearInterval(this.autoplayTimer);
            this.autoplayTimer = null;
        }
    }

    resetAutoplay() {
        this.stopAutoplay();
        this.startAutoplay();
    }
}

// Function to initialize carousels
function initializeCarousels() {
    const carouselContainers = document.querySelectorAll('[data-carousel-images]');
    carouselContainers.forEach(container => {
        const images = JSON.parse(container.dataset.carouselImages);
        const interval = parseInt(container.dataset.carouselInterval) || 4000;
        
        // Load the carousel component
        fetch('/assets/components/carousel.html')
            .then(response => response.text())
            .then(html => {
                container.innerHTML = html;
                new SmoothCarousel(container, images, interval);
            });
    });
}

// Initialize carousels when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeCarousels);
