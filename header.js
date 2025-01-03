let lastScrollY = window.scrollY;
let threshold = 50; // Adjust this value for more/less sensitivity

window.addEventListener('scroll', () => {
    if (window.scrollY - lastScrollY > threshold) {
        header.style.transform = 'translateY(-100%)';
    } else if (lastScrollY - window.scrollY > threshold) {
        header.style.transform = 'translateY(0)';
    }
    lastScrollY = window.scrollY;
});
