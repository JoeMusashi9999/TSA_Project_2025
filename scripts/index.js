document.addEventListener("DOMContentLoaded", () => {
    const steps = document.querySelectorAll(".timeline-step");
    const timelineContainer = document.querySelector(".timeline-container");
    const cards = document.querySelectorAll(".card");

    let visitedSteps = 0; // Keeps track of visited steps

    steps.forEach((step, index) => {
        step.addEventListener("click", () => {
            const targetCard = document.getElementById(step.dataset.card);

            // Hide all cards first
            cards.forEach(card => {
                card.classList.remove("active");
            });

            // Show the selected card
            targetCard.classList.add("active");

            // Mark step as visited
            step.classList.add("visited");

            // Expand the timeline progress bar
            visitedSteps = Math.max(visitedSteps, index + 1);
            const progressWidth = (visitedSteps / steps.length) * 80; // Adjusts progress dynamically
            timelineContainer.style.setProperty("--progress-width", `${progressWidth}%`);
        });
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        card.addEventListener("click", () => {
            // Remove 'flipped' from all cards first
            cards.forEach(c => c.classList.remove("flipped"));

            // Apply 'flipped' to the clicked card
            card.classList.add("flipped");
        });
    });
});