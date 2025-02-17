

        // Scroll event to show Apply button after scrolling
        window.addEventListener("scroll", function() {
            const applyBtn = document.getElementById("apply-btn_career");
            let scrollPos = window.scrollY;

            // Fade-in effect for button after scrolling past 200px

            //change this value if the text box gets bigger 
            if (scrollPos > 100) {
                applyBtn.style.opacity = 1;  // Make the button visible
                applyBtn.style.transform = "translateY(0)";  // Reset the translateY to 0
            } else {
                applyBtn.style.opacity = 0;  // Hide the button
                applyBtn.style.transform = "translateY(50px)";  // Keep it hidden below the screen
            }
        });
