document.querySelectorAll('.buy').forEach(button => {
    button.addEventListener('click', function() {
        const product = this.getAttribute('data-product');
        this.style.display = 'none';
        const controls = document.querySelector(`.quantity-controls[data-product="${product}"]`);
        controls.style.display = 'flex';
        updateQuantity(product, 1);
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
    let quantity = parseInt(quantitySpan.textContent);
    quantity += change;
    if (quantity <= 0) {
        quantity = 0;
        const controls = document.querySelector(`.quantity-controls[data-product="${product}"]`);
        controls.style.display = 'none';
        const addButton = document.querySelector(`.buy[data-product="${product}"]`);
        addButton.style.display = 'inline-block';
    }
    quantitySpan.textContent = quantity;

    // Відправляємо оновлені дані до бота Telegram
    sendDataToTelegram(product, quantity);
}

function sendDataToTelegram(product, quantity) {
    // Ось приклад відправлення даних до Telegram
    // Вам потрібно буде замінити цей код на реальний виклик до API Telegram

    // Приклад виклику API
    fetch('https://api.telegram.org/bot<YOUR_BOT_TOKEN>/sendMessage', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chat_id: '<YOUR_CHAT_ID>',
            text: `Користувач збільшив кількість товару ${product} на ${quantity}`,
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Дані успішно відправлені до Telegram', data);
    })
    .catch(error => {
        console.error('Сталася помилка при відправці даних до Telegram', error);
    });
}
