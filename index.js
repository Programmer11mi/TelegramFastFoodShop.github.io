function addItem(button) {
    const productDiv = button.closest('.product');
    const controls = productDiv.querySelector('.quantity-controls');
    button.style.display = 'none';
    controls.style.display = 'flex';
    updateQuantity(controls.querySelector('button:last-child'), 1);
}

function updateQuantity(button, change) {
    const productDiv = button.closest('.product');
    const quantitySpan = productDiv.querySelector('.quantity');
    let quantity = parseInt(quantitySpan.textContent);
    quantity += change;
    if (quantity <= 0) {
        quantity = 0;
        productDiv.querySelector('.buy').style.display = 'block';
        productDiv.querySelector('.quantity-controls').style.display = 'none';
    }
    quantitySpan.textContent = quantity;

    const product = productDiv.getAttribute('data-product');
    const data = {
        product: product,
        quantity: quantity
    };

    Telegram.WebApp.sendData(JSON.stringify(data));
}