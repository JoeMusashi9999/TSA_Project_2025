document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.nav-link');
    const contentDiv = document.getElementById('content');

    

    // Function to load new page content
    const loadPage = (url) => {
        fetch(url) // Fetch the HTML file
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.text();
            })
            .then(data => {
                // Create a temporary element to parse the content
                const tempElement = document.createElement('div');
                tempElement.innerHTML = data;

                // Extract only the content from the fetched file
                const newContent = tempElement.querySelector('#content');
                if (!newContent) {
                    throw new Error(`Content with ID #content not found in ${url}`);
                }

                // Add smooth fade-out animation
                contentDiv.classList.add('fade-out');

                // Wait for fade-out animation to finish, then replace content
                setTimeout(() => {
                    contentDiv.innerHTML = newContent.innerHTML;

                    // Fade-in the new content
                    contentDiv.classList.remove('fade-out');
                    contentDiv.classList.add('fade-in');

                    // Remove the fade-in class after animation
                    setTimeout(() => contentDiv.classList.remove('fade-in'), 300);

                    // Check if the loaded page contains the map and initialize it
                    if (url.includes('locations.html')) {
                        initializeMap();
                    }
                }, 300);
            })
            .catch(error => {
                console.error('Error loading page:', error);

                // Display an error message in the content area
                contentDiv.innerHTML = `
                    <div class="error-message">
                        <h2>Error</h2>
                        <p>Sorry, we couldn’t load the page. Please try again later.</p>
                    </div>
                `;
            });
    };

    // Event listener for navigation links
    links.forEach(link => {
        link.addEventListener('click', (event) => {
            const url = link.getAttribute('href');

            // Skip dynamic loading for locations.html
            if (url.includes('locations.html')) {
                return; // Let the browser handle the navigation normally
            }

            event.preventDefault(); // Prevent default link behavior

            // Update the browser's URL without a full page reload
            history.pushState(null, '', url);

            // Load the new page content
            loadPage(url);
        });
    });

    // Handle back/forward navigation
    window.addEventListener('popstate', () => {
        if (location.pathname.includes('locations.html')) {
            window.location.reload(); // Reload the page normally for locations.html
        } else {
            loadPage(location.pathname);
        }
    });

    
});
