document.addEventListener("DOMContentLoaded", function () {
    const menuButtons = document.querySelectorAll(".menu-toggle");
    const menuSections = document.querySelectorAll(".menu-category");

    // Hide all sections initially
    menuSections.forEach(section => section.style.display = "none");

    menuButtons.forEach(button => {
        button.addEventListener("click", function () {
            const targetId = this.getAttribute("data-target");
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                // Hide all sections first
                menuSections.forEach(section => section.style.display = "none");

                // Show the clicked section
                targetSection.style.display = "block";
            }
        });
    });
});



function setupSidebar() {
    const sidebar = document.getElementById("menu-selection");
    const menu = document.getElementById("menu");
    const buttons = document.querySelectorAll(".menu-toggle");
    const sections = document.querySelectorAll(".menu-category");

    function showSection(targetId) {
        sections.forEach(section => {
            section.style.display = section.id === targetId ? "block" : "none";
        });
    }

    // Set minimized text on page load
    function initializeMinimizedText() {
        buttons.forEach(btn => btn.textContent = btn.getAttribute("data-short"));
    }

    sidebar.addEventListener("mouseenter", function () {
        buttons.forEach(btn => btn.textContent = btn.getAttribute("data-target"));
    });

    sidebar.addEventListener("mouseleave", function () {
        initializeMinimizedText(); // Apply minimized text immediately
        menu.style.marginLeft = "5%"; // Return content to original position
    });

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            buttons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");

            const targetId = this.getAttribute("data-target");
            showSection(targetId);
        });
    });

    // Ensure the first menu section is shown by default
    if (buttons.length > 0) {
        buttons[0].classList.add("active");
        showSection(buttons[0].getAttribute("data-target"));
    }

    // Run minimized text setup on page load
    initializeMinimizedText();
}




//Function calls
setupSidebar();
