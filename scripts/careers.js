// Handle apply button visibility on scroll
window.addEventListener('scroll', function () {
    const applyBtn = document.getElementById('apply-btn_career');
    const scrollPosition = window.scrollY;
    const pageHeight = document.body.scrollHeight;
    const viewportHeight = window.innerHeight;

    // Show the button when the user scrolls to the bottom of the page
    if (scrollPosition > pageHeight - viewportHeight - 100) {
        applyBtn.classList.add('visible');
    } else {
        applyBtn.classList.remove('visible');
    }
});
