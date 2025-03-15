let addressCaptured = '';
let order = [];
let takeoutOrder = [];

// need google maps api key
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_ACTUAL_API_KEY&callback=initMap&libraries=places&v=weekly" async defer></script>

function toggleScreen(screen) {
    if (screen === 'delivery') {
        document.getElementById('delivery-screen').style.display = 'block';
        document.getElementById('takeout-screen').style.display = 'none';
    } else {
        document.getElementById('delivery-screen').style.display = 'none';
        document.getElementById('takeout-screen').style.display = 'block';
    }
}

function captureAddress() {
    const address = document.getElementById('address').value;
    addressCaptured = address;
    console.log(`Address captured: ${addressCaptured}`);
    calculateDeliveryTime();
}
    
function calculateDeliveryTime() {

    const timeElement = document.getElementById('estimated-time');
        timeElement.textContent = "Calculating...";
        
    const address = document.getElementById('address').value;
    if (!address) {
        alert("Please enter an address.");
        return;
    }

    // Restaurant coordinates (replace with your actual coordinates)
    const restaurantLocation = new google.maps.LatLng(47.5678, -122.2453);
    
    // Configure Distance Matrix request
    const service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix({
        origins: [restaurantLocation],
        destinations: [address],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.IMPERIAL,
    }, (response, status) => {
        if (status !== google.maps.DistanceMatrixStatus.OK) {
            alert('Error: ' + status);
            return;
        }

        const result = response.rows[0].elements[0];
        if (result.status === "ZERO_RESULTS") {
            alert("No driving route found to this address.");
            return;
        }

        // Display formatted duration text (e.g., "15 mins" or "1 hour 5 mins")
        const duration = result.duration.text;
        document.getElementById('estimated-time').textContent = duration;
    });
}

function addToOrder() {
    const foodItem = document.getElementById('food-items').value;
    const quantity = document.getElementById('quantity').value;
    const notes = document.getElementById('special-notes').value;

    const item = { foodItem, quantity, notes };
    order.push(item);
    updateOrderSummary();
}

function updateOrderSummary() {
    let totalCost = 0;
    let orderDetails = '';
    order.forEach(item => {
        orderDetails += `<p>${item.foodItem} x ${item.quantity}: ${item.notes}</p>`;
        totalCost += 10 * item.quantity; // Assuming each item costs $10
    });
    const deliveryTime = parseInt(document.getElementById('delivery-time').innerText.split(' ')[0]);
    totalCost += (deliveryTime * 0.33); // Additional 33 cents per minute

    document.getElementById('order-details').innerHTML = orderDetails;
    document.getElementById('order-cost').innerText = totalCost.toFixed(2);
}

function placeOrder(type) {
    const cardInfo = type === 'delivery' ? document.getElementById('credit-card').value : document.getElementById('takeout-credit-card').value;
    if (!cardInfo) {
        alert("Please enter your credit card details.");
        return;
    }
    alert(`Your ${type} order has been placed!`);
}

function addToTakeoutOrder() {
    const foodItem = document.getElementById('takeout-food-items').value;
    const quantity = document.getElementById('takeout-quantity').value;
    const notes = document.getElementById('takeout-special-notes').value;

    const item = { foodItem, quantity, notes };
    takeoutOrder.push(item);
    updateTakeoutOrderSummary();
}

function updateTakeoutOrderSummary() {
    let totalCost = 0;
    let orderDetails = '';
    takeoutOrder.forEach(item => {
        orderDetails += `<p>${item.foodItem} x ${item.quantity}: ${item.notes}</p>`;
        totalCost += 10 * item.quantity; // Assuming each item costs $10
    });

    document.getElementById('takeout-order-details').innerHTML = orderDetails;
    document.getElementById('takeout-order-cost').innerText = totalCost.toFixed(2);
}

// Initialize the Google Map for the address lookup
function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 47.582, lng: -122.236 }, // Coordinates for Mercer Island
        zoom: 13,
    });

    const input = document.getElementById("address");
    const autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.setFields(["address_component", "geometry"]);
    autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (place.geometry) {
            map.setCenter(place.geometry.location);
        }
    });
}

google.maps.event.addDomListener(window, 'load', initMap);
