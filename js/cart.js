/* 
 * cart.js — Исправленная версия (полная)
 * Работает с JSON Server, без лишних проверок
 */

const Cart = {
    // Получаем текущего пользователя (синхронно из Auth)
    _getCurrentUser() {
        return Auth?.getCurrentUser?.() || null;
    },

    // Получаем ID пользователя для привязки корзины
    _getUserId() {
        const user = this._getCurrentUser();
        // Если нет id (например, при регистрации без БД), используем email
        return user?.id || user?.email || null;
    },

    // === ПОЛУЧЕНИЕ ТОВАРОВ ===
    async getItems() {
        const userId = this._getUserId();
        if (!userId) return [];

        try {
            // Запрашиваем корзину с сервера
            const res = await fetch(`${API_BASE}/cart?userId=${encodeURIComponent(userId)}`);
            
            // 404 — это нормально, значит корзина просто пуста
            if (res.status === 404) return [];
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            
            const data = await res.json();
            
            // json-server возвращает массив записей. Берём товары из первой записи.
            if (Array.isArray(data) && data.length > 0 && data[0].items) {
                return data[0].items;
            }
            return [];
        } catch (e) {
            console.warn('[Cart] Не удалось загрузить корзину:', e);
            return [];
        }
    },

    // === СОХРАНЕНИЕ ТОВАРОВ ===
    async _saveItems(items) {
        const userId = this._getUserId();
        if (!userId) return false;

        try {
            // 1. Проверяем, есть ли уже запись корзины для этого пользователя
            const checkRes = await fetch(`${API_BASE}/cart?userId=${encodeURIComponent(userId)}`);
            
            // Если запись есть (статус 200), удаляем её, чтобы создать новую (упрощённая логика)
            if (checkRes.ok) {
                const existing = await checkRes.json();
                if (Array.isArray(existing) && existing.length > 0 && existing[0].id) {
                    await fetch(`${API_BASE}/cart/${existing[0].id}`, { method: 'DELETE' });
                }
            }

            // 2. Создаём новую запись с актуальными товарами
            const res = await fetch(`${API_BASE}/cart`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: userId,
                    items: items,
                    updatedAt: new Date().toISOString()
                })
            });

            return res.ok;
        } catch (e) {
            console.error('[Cart] Ошибка сохранения:', e);
            return false;
        }
    },

    // === ДОБАВЛЕНИЕ ТОВАРА ===
    async addItem(productId, productName, productPrice, productImage, quantity = 1) {
        const user = this._getCurrentUser();
        if (!user) {
            showNotification?.('Для добавления в корзину нужно войти в аккаунт', 'error');
            return { success: false, message: 'Войдите в аккаунт' };
        }

        // Получаем текущие товары
        let items = await this.getItems();
        
        // Ищем, есть ли уже такой товар
        const existingIndex = items.findIndex(i => i.productId === productId);

        if (existingIndex >= 0) {
            // Если есть — увеличиваем количество
            items[existingIndex].quantity += quantity;
        } else {
            // Если нет — добавляем новый
            items.push({
                productId,
                productName,
                price: Number(productPrice),
                image: productImage,
                quantity: quantity,
                addedAt: new Date().toISOString()
            });
        }

        // Сохраняем на сервер
        const saved = await this._saveItems(items);
        
        // Обновляем интерфейс
        this.updateCount();
        if (typeof this.render === 'function') this.render();

        return { 
            success: saved, 
            message: saved ? 'Товар добавлен в корзину ✅' : 'Ошибка сохранения' 
        };
    },

    // === УДАЛЕНИЕ ТОВАРА ===
    async removeItem(productId) {
        let items = await this.getItems();
        items = items.filter(i => i.productId !== productId);
        await this._saveItems(items);
        this.updateCount();
        if (typeof this.render === 'function') this.render();
    },

    // === ИЗМЕНЕНИЕ КОЛИЧЕСТВА ===
    async updateQuantity(productId, newQty) {
        const qty = Math.max(1, parseInt(newQty) || 1);
        let items = await this.getItems();
        const item = items.find(i => i.productId === productId);
        
        if (item) {
            item.quantity = qty;
            await this._saveItems(items);
            this.updateCount();
            if (typeof this.render === 'function') this.render();
        }
    },

    // === ОЧИСТКА КОРЗИНЫ ===
    async clear() {
        const userId = this._getUserId();
        if (!userId) return false;

        try {
            const checkRes = await fetch(`${API_BASE}/cart?userId=${encodeURIComponent(userId)}`);
            if (checkRes.ok) {
                const existing = await checkRes.json();
                if (Array.isArray(existing) && existing.length > 0 && existing[0].id) {
                    await fetch(`${API_BASE}/cart/${existing[0].id}`, { method: 'DELETE' });
                }
            }
            this.updateCount();
            if (typeof this.render === 'function') this.render();
            return true;
        } catch (e) {
            return false;
        }
    },

    // === ПОДСЧЁТ СУММЫ ===
    async getTotal() {
        const items = await this.getItems();
        return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    },

    // === ПОДСЧЁТ КОЛИЧЕСТВА (для бейджика) ===
    async getCount() {
        const items = await this.getItems();
        return items.reduce((sum, item) => sum + (item.quantity || 0), 0);
    },

    // === ОБНОВЛЕНИЕ БЕЙДЖИКА ===
    async updateCount() {
        const count = await this.getCount();
        // Обновляем счётчик в шапке (и в мобильном меню, если есть)
        const badges = document.querySelectorAll('#cartCount, #mobileCartCount');
        badges.forEach(badge => {
            if (badge) {
                badge.textContent = count;
                badge.style.display = count > 0 ? 'flex' : 'none';
            }
        });
    },

    // === ОТРИСОВКА КОРЗИНЫ (ИСПРАВЛЕНО: ЭТОГО МЕТОДА НЕ ХВАТАЛО) ===
    async render() {
        const container = document.getElementById('cartItems');
        const emptyEl = document.getElementById('cartEmpty');
        const fullEl = document.getElementById('cartFull');
        
        // Если мы не на странице корзины, выходим
        if (!container || !emptyEl || !fullEl) return;

        const items = await this.getItems();

        if (items.length === 0) {
            // Если пусто — показываем блок "Корзина пуста"
            emptyEl.style.display = 'block';
            fullEl.style.display = 'none';
            return;
        }

        // Если есть товары — скрываем "пусто", показываем список
        emptyEl.style.display = 'none';
        fullEl.style.display = 'block';

        let html = '';
        items.forEach(item => {
            const total = item.price * item.quantity;
            // Формируем ссылку на товар
            const productUrl = `product-${item.productId}.html`;

            html += `
                <div class="cart-item">
                    <div class="cart-item__image">
                        <a href="${productUrl}"><img src="${item.image}" alt="${item.productName}"></a>
                    </div>
                    <div class="cart-item__info">
                        <a href="${productUrl}" class="cart-item__title">${item.productName}</a>
                        <p class="cart-item__price">${item.price} BYN</p>
                    </div>
                    <div class="cart-item__quantity">
                        <button class="qty-btn" onclick="Cart.updateQuantity('${item.productId}', ${item.quantity - 1})">–</button>
                        <input type="number" class="qty-input" value="${item.quantity}" min="1" onchange="Cart.updateQuantity('${item.productId}', this.value)">
                        <button class="qty-btn" onclick="Cart.updateQuantity('${item.productId}', ${item.quantity + 1})">+</button>
                    </div>
                    <div class="cart-item__subtotal"><strong>${total} BYN</strong></div>
                    <button class="cart-item__remove" onclick="Cart.removeItem('${item.productId}')">✕</button>
                </div>
            `;
        });

        container.innerHTML = html;

        // Обновляем итоговую сумму
        const subtotal = await this.getTotal();
        const subtotalEl = document.getElementById('summarySubtotal');
        const totalEl = document.getElementById('summaryTotal');
        if (subtotalEl) subtotalEl.textContent = `${subtotal} BYN`;
        if (totalEl) totalEl.textContent = `${subtotal} BYN`;
    },

    // === ИНИЦИАЛИЗАЦИЯ ===
    init() {
        this.updateCount();
        // Запускаем отрисовку, только если мы на странице корзины
        if (document.getElementById('cartItems')) {
            this.render();
        }
    }
};

// Глобальная функция для кнопок "Купить"
window.addToCart = async (id, name, price, img) => {
    const res = await Cart.addItem(id, name, price, img);
    showNotification?.(res.message, res.success ? 'success' : 'error');
};

// Автозапуск при загрузке страницы
document.addEventListener('DOMContentLoaded', () => Cart.init());