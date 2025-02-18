
    // Get all menu-toggle buttons and menu sections
const buttons = document.querySelectorAll('.menu-toggle');
const sections = document.querySelectorAll('.menu-category');

// Add event listeners to each button
buttons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons and sections
        buttons.forEach(b => b.classList.remove('active'));
        sections.forEach(s => s.classList.remove('active'));

        // Add active class to the clicked button and corresponding section
        button.classList.add('active');
        const targetId = button.getAttribute('data-target');
        document.getElementById(targetId).classList.add('active');
    });
});
