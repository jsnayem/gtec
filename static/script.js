// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.remove('transparent');
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
        header.classList.add('transparent');
    }
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Carousel functionality
const carouselImages = document.querySelectorAll('.carousel-image');
const backgroundSlides = document.querySelectorAll('.background-slide');
const indicators = document.querySelectorAll('.indicator');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

// Image data for 5 images
const imageData = [
    {
        image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
        background: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
        alt: "Living Room Design"
    },
    {
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
        background: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
        alt: "Kitchen Design"
    },
    {
        image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
        background: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
        alt: "Bedroom Design"
    },
    {
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
        background: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
        alt: "Dining Room Design"
    },
    {
        image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
        background: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
        alt: "Bathroom Design"
    }
];

let currentIndex = 2; // Start with the center image
let isAnimating = false;
let autoPlayInterval;

// Function to update image classes based on position
function updateImageClasses() {
    carouselImages.forEach(img => {
        // Remove all size classes
        img.classList.remove('image-outer', 'image-middle', 'image-center');
        
        // Get position class
        const posClass = Array.from(img.classList).find(c => c.startsWith('pos-'));
        if (posClass) {
            const posNum = parseInt(posClass.replace('pos-', ''));
            
            // Add appropriate size class based on position
            if (posNum === 3) {
                img.classList.add('image-center');
            } else if (posNum === 2 || posNum === 4) {
                img.classList.add('image-middle');
            } else {
                img.classList.add('image-outer');
            }
        }
    });
}

// Function to update carousel display
function updateCarousel(direction) {
    if (isAnimating) return;
    isAnimating = true;
    
    // Update background
    backgroundSlides.forEach(slide => slide.classList.remove('active'));
    document.querySelector(`.background-slide:nth-child(${currentIndex + 1})`).classList.add('active');
    
    // Update indicators
    indicators.forEach(indicator => indicator.classList.remove('active'));
    indicators[currentIndex].classList.add('active');
    
    // Update image classes for proper sizing
    updateImageClasses();
    
    // Reset animation flag after transition
    setTimeout(() => {
        isAnimating = false;
    }, 600);
}

// Function to shift images to the left
function shiftLeft() {
    // Update image positions
    carouselImages.forEach(img => {
        const posClass = Array.from(img.classList).find(c => c.startsWith('pos-'));
        if (posClass) {
            const posNum = parseInt(posClass.replace('pos-', ''));
            img.classList.remove(posClass);
            
            if (posNum === 1) {
                img.classList.add('pos-5');
            } else {
                img.classList.add(`pos-${posNum - 1}`);
            }
        }
    });
    
    // Update image data if needed
    currentIndex = (currentIndex + 1) % imageData.length;
}

// Function to shift images to the right
function shiftRight() {
    // Update image positions
    carouselImages.forEach(img => {
        const posClass = Array.from(img.classList).find(c => c.startsWith('pos-'));
        if (posClass) {
            const posNum = parseInt(posClass.replace('pos-', ''));
            img.classList.remove(posClass);
            
            if (posNum === 5) {
                img.classList.add('pos-1');
            } else {
                img.classList.add(`pos-${posNum + 1}`);
            }
        }
    });
    
    // Update image data if needed
    currentIndex = (currentIndex - 1 + imageData.length) % imageData.length;
}

// Navigation event listeners
prevButton.addEventListener('click', () => {
    shiftRight();
    updateCarousel('prev');
    resetAutoPlay();
});

nextButton.addEventListener('click', () => {
    shiftLeft();
    updateCarousel('next');
    resetAutoPlay();
});

// Indicator click event
indicators.forEach(indicator => {
    indicator.addEventListener('click', () => {
        if (isAnimating) return;
        
        const newIndex = parseInt(indicator.getAttribute('data-index'));
        // Determine direction based on index difference
        const diff = newIndex - currentIndex;
        
        if (diff > 0) {
            for (let i = 0; i < diff; i++) {
                setTimeout(() => {
                    shiftLeft();
                    updateCarousel('next');
                }, i * 650);
            }
        } else if (diff < 0) {
            for (let i = 0; i < Math.abs(diff); i++) {
                setTimeout(() => {
                    shiftRight();
                    updateCarousel('prev');
                }, i * 650);
            }
        }
        
        resetAutoPlay();
    });
});

// Auto-play functionality
function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
        shiftLeft();
        updateCarousel('next');
    }, 5000);
}

function resetAutoPlay() {
    clearInterval(autoPlayInterval);
    startAutoPlay();
}

// Start auto-play initially
startAutoPlay();

// Touch swipe functionality
let touchStartX = 0;
let touchEndX = 0;
const carousel = document.querySelector('.carousel-images');

carousel.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
    clearInterval(autoPlayInterval);
});

carousel.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
    startAutoPlay();
});

function handleSwipe() {
    if (isAnimating) return;
    
    const swipeThreshold = 50;
    
    if (touchEndX < touchStartX - swipeThreshold) {
        // Swipe left - go to next
        shiftLeft();
        updateCarousel('next');
    }
    
    if (touchEndX > touchStartX + swipeThreshold) {
        // Swipe right - go to previous
        shiftRight();
        updateCarousel('prev');
    }
}

// Initialize carousel
updateCarousel();
