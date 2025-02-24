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

// JavaScript to toggle between typed resume and file upload
const typedResumeContainer = document.getElementById('typed-resume-container');
const fileResumeContainer = document.getElementById('file-resume-container');
const radioTyped = document.getElementById('typed');
const radioFile = document.getElementById('file');

// Default behavior: typed resume
radioTyped.addEventListener('change', function() {
    typedResumeContainer.style.display = 'block';
    fileResumeContainer.style.display = 'none';
});

// Show file upload when file option is selected
radioFile.addEventListener('change', function() {
    typedResumeContainer.style.display = 'none';
    fileResumeContainer.style.display = 'block';
});