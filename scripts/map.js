document.addEventListener("DOMContentLoaded", function () {
    var map = L.map('map', {
        zoomControl: false  // Disable default zoom control
    }).setView([39.8283, -98.5795], 5);
    
    // Add zoom controls manually at bottom left
    L.control.zoom({
        position: 'bottomleft'
    }).addTo(map);

    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Restaurant locations
    var locations = {
        "Seattle Downtown": { coords: [47.6097, -122.3331], address: "1501 4th Ave, Seattle, WA 98101", id: "seattle-bubble" },
        "San Antonio Outskirts": { coords: [29.4383, -98.7112], address: "9822 Potranco Rd, San Antonio, TX 78251", id: "sanantonio-bubble" },
        "Queens, NY": { coords: [40.7549, -73.8457], address: "37-10 114th St, Queens, NY 11368", id: "queens-bubble" }
    };

    var markers = {};

    // Add markers to the map
    Object.keys(locations).forEach(function (key) {
        var location = locations[key];
        var marker = L.marker(location.coords).addTo(map)
            .bindPopup("<b>" + key + "</b><br>" + location.address);

        markers[key] = marker;

        // Add click event to highlight corresponding sidebar bubble
        marker.on("click", function () {
            // Remove highlight from all bubbles
            document.querySelectorAll(".location-bubble").forEach(bubble => {
                bubble.classList.remove("highlighted");
            });

            // Highlight the clicked location's sidebar bubble
            var bubble = document.getElementById(location.id);
            if (bubble) {
                bubble.classList.add("highlighted");
            }
        });
    });

    function zoomToLocation(lat, lng) {
        map.setView([lat, lng], 15); // Adjust zoom level as needed
    }

    // Attach event listeners to sidebar location links
    document.querySelectorAll(".hidden-link").forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault(); // Prevents the page from jumping

            // Retrieve latitude and longitude from data attributes
            const lat = parseFloat(this.dataset.lat);
            const lng = parseFloat(this.dataset.lng);

            if (!isNaN(lat) && !isNaN(lng)) {
                zoomToLocation(lat, lng);
            } else {
                console.error("Invalid coordinates for", this);
            }
        });
    });

    // Function to zoom and open popup when clicking sidebar links
    window.zoomToLocation = function (key) {
        if (markers[key]) {
            map.setView(markers[key].getLatLng(), 14); // Zoom to location
            markers[key].openPopup(); // Show popup

            // Remove highlight from all bubbles
            document.querySelectorAll(".location-bubble").forEach(bubble => {
                bubble.classList.remove("highlighted");
            });

            // Highlight the corresponding sidebar bubble
            var bubble = document.getElementById(locations[key].id);
            if (bubble) {
                bubble.classList.add("highlighted");
            }
        }
    };
});

