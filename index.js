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
                addButton.style.display = 'block';
            }
            quantitySpan.textContent = quantity;

            // Відправляємо оновлені дані до бота
            window.Telegram.WebApp.sendData(JSON.stringify({
                product: product,
                quantity: quantity
            }));
        }
