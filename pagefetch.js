document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.nav-link');
    const contentDiv = document.getElementById('content');

    // Function to load new page content
    const loadPage = (url) => {
        fetch(url) // Fetch the HTML file
            .then(response => response.text())
            .then(data => {
                // Create a temporary element to parse the content
                const tempElement = document.createElement('div');
                tempElement.innerHTML = data;

                // Extract only the content from the fetched file
                const newContent = tempElement.querySelector('#content').innerHTML;

                // Add smooth fade-out animation
                contentDiv.classList.add('fade-out');

                // Wait for fade-out animation to finish, then replace content
                setTimeout(() => {
                    contentDiv.innerHTML = newContent;

                    // Fade-in the new content
                    contentDiv.classList.remove('fade-out');
                    contentDiv.classList.add('fade-in');

                    // Remove the fade-in class after animation
                    setTimeout(() => contentDiv.classList.remove('fade-in'), 300);
                }, 300);
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
});
