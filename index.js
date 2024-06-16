document.querySelectorAll('.buy').forEach(button => {
    button.addEventListener('click', function() {
        const product = this.getAttribute('data-product');
        this.style.display = 'none';
        const controls = document.querySelector(`.quantity-controls[data-product="${product}"]`);
        if (controls) {
            controls.style.display = 'flex';
            updateQuantity(product, 1);
        }
    });
});

document.querySelectorAll('.plus').forEach(button => {
    button.addEventListener('click', function() {
        const product = this.getAttribute('data-product');
        updateQuantity(product, 1);
    });
});

document.querySelectorAll('.minus').forEach(button => {
    button.addEventListener('click', function() {
        const product = this.getAttribute('data-product');
        updateQuantity(product, -1);
    });
});

function updateQuantity(product, change) {
    const quantitySpan = document.querySelector(`.quantity[data-product="${product}"]`);
    if (!quantitySpan) return;

    let quantity = parseInt(quantitySpan.textContent);
    quantity += change;
    if (quantity <= 0) {
        quantity = 0;
        const controls = document.querySelector(`.quantity-controls[data-product="${product}"]`);
        if (controls) {
            controls.style.display = 'none';
            const addButton = document.querySelector(`.buy[data-product="${product}"]`);
            if (addButton) {
                addButton.style.display = 'block';
            }
        }
    }
    quantitySpan.textContent = quantity;

    // Відправляємо оновлені дані до бота, якщо Telegram і Telegram.WebApp доступні
    if (window.Telegram && window.Telegram.WebApp) {
        window.Telegram.WebApp.sendData(JSON.stringify({
            product: product,
            quantity: quantity
        }));
    }
}
document.getElementById('addToCartBtn').addEventListener('click', function() {
    // Отримуємо всі обрані продукти
    const selectedProducts = [];
    console.log(selectedProducts)
    document.querySelectorAll('.quantity').forEach(quantitySpan => {
        const product = quantitySpan.getAttribute('data-product');
        const quantity = parseInt(quantitySpan.textContent);
        if (quantity > 0) {
            selectedProducts.push({
                product: product,
                quantity: quantity
            });
        }
    });

    // Відправляємо дані у телеграм
    if (window.Telegram && window.Telegram.WebApp) {
        window.Telegram.WebApp.sendData(JSON.stringify(selectedProducts));
    } else {
        console.error('Telegram or Telegram.WebApp is not available.');
    }
});
