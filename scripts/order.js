let order = [];
let tipAmount = 0;

// Add to Order functionality
document.querySelectorAll('.add-to-order').forEach(button => {
    button.addEventListener('click', (e) => {
        const item = e.target.closest('.menu-item');
        const name = item.querySelector('h3').textContent;
        const price = parseFloat(item.querySelector('.size-select').value);
        const quantity = parseInt(item.querySelector('.quantity').value);

        order.push({ name, price, quantity });
        updateOrderSummary();
    });
});

// Tip Selection
document.querySelectorAll('.tip-buttons button').forEach(button => {
    button.addEventListener('click', (e) => {
        tipAmount = parseFloat(e.target.dataset.percent);
        updateOrderSummary();
    });
});

document.getElementById('custom-tip').addEventListener('input', (e) => {
    tipAmount = parseFloat(e.target.value) || 0;
    updateOrderSummary();
});

function updateOrderSummary() {
    const subtotal = order.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.10; // Washington 10% sales tax
    const tip = tipAmount >= 1 ? tipAmount : subtotal * (tipAmount/100);
    const total = subtotal + tax + tip;

    // Update display
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
    
    // Update order items list
    const itemsContainer = document.getElementById('order-items');
    itemsContainer.innerHTML = order.map(item => `
        <div class="order-item">
            ${item.quantity}x ${item.name} - $${(item.price * item.quantity).toFixed(2)}
        </div>
    `).join('');
}

// Place Order
document.getElementById('place-order').addEventListener('click', () => {
    const total = parseFloat(document.getElementById('total').textContent.replace('$', ''));
    if (total > 0) {
        alert(`Order placed! Total: $${total.toFixed(2)}`);
        order = [];
        updateOrderSummary();
    }
});