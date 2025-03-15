let addressCaptured = '';
let order = [];
let takeoutOrder = [];

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
    const deliveryTime = Math.floor(Math.random() * 30) + 15; // Random estimate between 15 to 45 minutes
    const totalTime = deliveryTime + 15; // Total time is estimated time + 15 minutes
    document.getElementById('delivery-time').innerText = `${totalTime} mins`;
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
