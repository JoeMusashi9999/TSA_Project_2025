let lastScrollY = 0; // Last known scroll position
const threshold = 50; // Sensitivity for detecting scroll direction
const header = document.querySelector('#navbar'); // Target navbar

// Monitor the entire document for scrolling
window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY; // Modern alternative to pageYOffset

    // If scrolling down and past the threshold
    if (currentScrollY - lastScrollY > threshold && currentScrollY > 0) {
        header.style.transform = 'translateY(-100%)'; // Hide navbar
    }
    // If scrolling up and past the threshold
    else if (lastScrollY - currentScrollY > threshold) {
        header.style.transform = 'translateY(0)'; // Show navbar
    }

    // Update the last known scroll position
    lastScrollY = currentScrollY;
});
