let tg = window.Telegram.WebApp;
tg.expand();
// Отримуємо всі кнопки "ADD" і додаємо їм обробник подій
document.querySelectorAll('.buy').forEach(button => {
    button.addEventListener('click', function() {
        const product = this.getAttribute('data-product');
        this.style.display = 'none'; // Ховаємо кнопку "ADD"
        const controls = document.querySelector(`.quantity-controls[data-product="${product}"]`);
        if (controls) {
            controls.style.display = 'flex'; // Показуємо контроли кількості продукту
            updateQuantity(product, 1); // Оновлюємо кількість продукту (додаємо 1)
        }
    });
});

// Отримуємо всі кнопки "+" і додаємо їм обробник подій
document.querySelectorAll('.plus').forEach(button => {
    button.addEventListener('click', function() {
        const product = this.getAttribute('data-product');
        updateQuantity(product, 1); // Оновлюємо кількість продукту (додаємо 1)
    });
});

// Отримуємо всі кнопки "-" і додаємо їм обробник подій
document.querySelectorAll('.minus').forEach(button => {
    button.addEventListener('click', function() {
        const product = this.getAttribute('data-product');
        updateQuantity(product, -1); // Оновлюємо кількість продукту (віднімаємо 1)
    });
});

// Функція для оновлення кількості продукту
function updateQuantity(product, change) {
    const quantitySpan = document.querySelector(`.quantity[data-product="${product}"]`);
    if (!quantitySpan) return; // Якщо елемент не знайдено, виходимо з функції

    let quantity = parseInt(quantitySpan.textContent);
    quantity += change; // Збільшуємо або зменшуємо кількість продукту

    // Якщо кількість менше або дорівнює 0, приховуємо контроли і показуємо кнопку "ADD"
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

    quantitySpan.textContent = quantity; // Оновлюємо відображення кількості продукту

    // Відправляємо оновлені дані до Telegram Web App, якщо вони доступні
    if (window.Telegram && window.Telegram.WebApp) {
        window.Telegram.WebApp.sendData(JSON.stringify({
            product: product,
            quantity: quantity
        }));
    }
}

// Отримуємо кнопку "Додати в кошик" і додаємо їй обробник подій
document.getElementById('addToCartBtn').addEventListener('click', function() {
    const selectedProducts = [];

    // Отримуємо всі обрані продукти
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

    // Відправляємо дані у Telegram Web App, якщо вони доступні
    tg.sendData(JSON.stringify(selectedProducts))
});
