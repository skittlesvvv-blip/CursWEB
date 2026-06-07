/* 
 * favorites.js — Избранное под JSON Server + обработка ошибок
 */

const Favorites = {
    productUrls: {
        'black-1': 'product-black-1.html',
        'blue-dark': 'product-blue-dark.html',
        'blue-orange': 'product-blue-orange.html',
        'greta-medium': 'product-greta-medium.html',
        'monica-big': 'product-monica-big.html',
        'monica-small': 'product-monica-small.html',
        'snake-1': 'product-snake-1.html',
        'snake-2': 'product-snake-2.html',
        'snake-3': 'product-snake-3.html',
        'leopard-1': 'product-leopard-1.html'
    },

    _getCurrentUser() {
        return Auth?.getCurrentUser?.() || Storage.getCurrentUser?.();
    },

    _getUserId() {
        const user = this._getCurrentUser();
        return user?.id || user?.email || null;
    },

    async getItems() {
        if (!Storage.isAvailable()) return [];
        
        const userId = this._getUserId();
        if (!userId) return [];

        try {
            const res = await fetch(`${API_BASE}/favorites?userId=${encodeURIComponent(userId)}`);
            if (!res.ok) return [];
            const data = await res.json();
            return Array.isArray(data) && data.length > 0 ? (data[0].items || []) : [];
        } catch (e) {
            console.error('[Favorites] getItems error:', e);
            return [];
        }
    },

    async _saveItems(items) {
        if (!Storage.isAvailable()) return false;

        const userId = this._getUserId();
        if (!userId) return false;

        try {
            const checkRes = await fetch(`${API_BASE}/favorites?userId=${encodeURIComponent(userId)}`);
            const existing = await checkRes.json();
            if (Array.isArray(existing) && existing.length > 0) {
                await fetch(`${API_BASE}/favorites/${existing[0].id}`, { method: 'DELETE' });
            }

            await fetch(`${API_BASE}/favorites`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: userId,
                    items: items,
                    updatedAt: new Date().toISOString()
                })
            });
            return true;
        } catch (e) {
            console.error('[Favorites] _saveItems error:', e);
            return false;
        }
    },

    async toggle(productId, productName, productPrice, productImage) {
        const user = this._getCurrentUser();
        if (!user) {
            showNotification?.(I18n.t('product_login_required'), 'error');
            return { success: false };
        }

        let items = await this.getItems();
        const index = items.findIndex(i => i.productId === productId);

        if (index >= 0) {
            items.splice(index, 1);
            showNotification?.(I18n.t('notify_unfavorited'), 'success');
        } else {
            items.push({ 
                productId, 
                productName, 
                price: productPrice, 
                image: productImage 
            });
            showNotification?.(I18n.t('notify_favorited'), 'success');
        }

        await this._saveItems(items);
        this.updateCount();
        this.render();
        return { success: true };
    },

    async removeItem(productId) {
        let items = await this.getItems();
        items = items.filter(i => i.productId !== productId);
        await this._saveItems(items);
        this.updateCount();
        this.render();
    },

    async getCount() {
        const items = await this.getItems();
        return items.length;
    },

    async updateCount() {
        const count = await this.getCount();
        const badge = document.querySelector('.header-icon i.far.fa-heart')?.parentElement?.querySelector('.badge');
        if (badge) badge.textContent = count;
    },

    async render() {
        const container = document.getElementById('favoritesItems');
        const emptyEl = document.getElementById('favoritesEmpty');
        const fullEl = document.getElementById('favoritesFull');

        if (!container) return;

        const items = await this.getItems();

        if (items.length === 0) {
            emptyEl.style.display = 'block';
            fullEl.style.display = 'none';
            return;
        }

        emptyEl.style.display = 'none';
        fullEl.style.display = 'block';

        let html = '';
        items.forEach(item => {
            const url = this.productUrls[item.productId] || '#';
            html += `
                <a href="${url}" class="favorite-item">
                    <div class="favorite-item__image">
                        <img src="${item.image}" alt="${item.productName}">
                    </div>
                    <div class="favorite-item__info">
                        <h3>${item.productName}</h3>
                        <p>${item.price} BYN</p>
                    </div>
                    <button class="favorite-item__remove" onclick="event.preventDefault(); Favorites.removeItem('${item.productId}');">✕</button>
                </a>
            `;
        });

        container.innerHTML = html;
    },

    init() {
        if (!Storage.isAvailable()) {
            showNotification?.('Сервер недоступен. Избранное работает ограниченно.', 'warning');
        }
        this.updateCount();
        if (document.getElementById('favoritesItems')) this.render();
    }
};

window.toggleFavorite = function(productId, name, price, image) {
    Favorites.toggle(productId, name, price, image);
};

document.addEventListener('DOMContentLoaded', () => Favorites.init());