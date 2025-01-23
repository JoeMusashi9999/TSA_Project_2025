document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.nav-link');
    const contentDiv = document.getElementById('content');

    // Function to initialize the Leaflet map
    const initializeMap = () => {
        const mapElement = document.getElementById('map');
        if (mapElement) {
            // Initialize the Leaflet map
            const map = L.map('map').setView([40.7128, -74.006], 13); // Example coordinates and zoom level

            // Add OpenStreetMap tiles
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            // Example marker
            L.marker([40.7128, -74.006]).addTo(map)
                .bindPopup('Welcome to New York!')
                .openPopup();
        }
    };


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
                    if (url.includes('locations.html')) { // Replace with your actual map page URL
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
            event.preventDefault(); // Prevent default link behavior
            const url = link.getAttribute('href');

            // Update the browser's URL without a full page reload
            history.pushState(null, '', url);

            // Load the new page content
            loadPage(url);
        });
    });

    // Handle back/forward navigation
    window.addEventListener('popstate', () => {
        loadPage(location.pathname);
    });

    // Load the current page's map if it's the map page on initial load
    if (location.pathname.includes('locations.html')) { 
        initializeMap();
    }
});
