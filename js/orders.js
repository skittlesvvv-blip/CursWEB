/* 
 * orders.js — Адаптировано под JSON Server + обработка ошибок
 */

const Orders = {
    config: {
        STATUSES: {
            PENDING: 'pending',
            CONFIRMED: 'confirmed',
            PROCESSING: 'processing',
            SHIPPED: 'shipped',
            DELIVERED: 'delivered',
            CANCELLED: 'cancelled'
        }
    },

    _getCurrentUser() {
        return Auth?.getCurrentUser?.() || Storage.getCurrentUser?.();
    },

    _getUserId() {
        const user = this._getCurrentUser();
        return user?.id || user?.email || null;
    },

    async _fetchOrders() {
        if (!Storage.isAvailable()) return [];

        const userId = this._getUserId();
        if (!userId) return [];

        try {
            const res = await fetch(`${API_BASE}/orders?userId=${encodeURIComponent(userId)}`);
            if (!res.ok) return [];
            const data = await res.json();
            return Array.isArray(data) ? data : [];
        } catch (e) {
            console.error('[Orders] _fetchOrders error:', e);
            return [];
        }
    },

    async _saveOrder(order) {
        if (!Storage.isAvailable()) {
            showNotification?.('Сервер недоступен. Заказ сохранён локально.', 'warning');
            return false;
        }

        try {
            await fetch(`${API_BASE}/orders`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(order)
            });
            return true;
        } catch (e) {
            console.error('[Orders] _saveOrder error:', e);
            return false;
        }
    },

    async _updateOrderStatus(orderId, newStatus) {
        if (!Storage.isAvailable()) return false;

        try {
            await fetch(`${API_BASE}/orders/${orderId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    status: newStatus,
                    updatedAt: new Date().toISOString()
                })
            });
            return true;
        } catch (e) {
            console.error('[Orders] _updateOrderStatus error:', e);
            return false;
        }
    },

    _getStatusInfo(status) {
        const map = {
            pending:    { label: I18n.t('order_status_pending'), color: '#f59e0b', canCancel: true },
            confirmed:  { label: I18n.t('order_status_confirmed'), color: '#3b82f6', canCancel: true },
            processing: { label: I18n.t('order_status_processing'), color: '#8b5cf6', canCancel: false },
            shipped:    { label: I18n.t('order_status_shipped'), color: '#06b6d4', canCancel: false },
            delivered:  { label: I18n.t('order_status_delivered'), color: '#22c55e', canCancel: false },
            cancelled:  { label: I18n.t('order_status_cancelled'), color: '#ef4444', canCancel: false }
        };
        return map[status] || map.pending;
    },

    _formatDate(isoDate) {
        if (!isoDate) return '—';
        try {
            return new Date(isoDate).toLocaleDateString('ru-RU', {
                day: '2-digit', month: '2-digit', year: 'numeric'
            });
        } catch {
            return isoDate;
        }
    },

    async createOrder(cartItems, total, deliveryData = {}) {
        const user = this._getCurrentUser();
        if (!user) return { success: false, message: I18n.t('product_login_required') };

        if (!cartItems?.length) return { success: false, message: I18n.t('cart_empty') };

        const newOrder = {
            userId: this._getUserId(),
            userName: `${user.name} ${user.surname || ''}`.trim(),
            items: cartItems.map(item => ({
                productId: item.productId,
                productName: item.productName,
                price: item.price,
                quantity: item.quantity || 1
            })),
            total: Number(total),
            status: this.config.STATUSES.PENDING,
            delivery: {
                address: deliveryData.address || '',
                payment: deliveryData.payment || 'online',
                comment: deliveryData.comment || ''
            },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        const saved = await this._saveOrder(newOrder);

        if (saved) {
            if (typeof Loyalty?.addPoints === 'function') {
                await Loyalty.addPoints(total, 'order');
            }
            if (typeof Cart?.clear === 'function') {
                await Cart.clear();
            }

            return { 
                success: true, 
                orderId: newOrder.id || 'new', 
                message: I18n.t('order_success') 
            };
        }

        return { success: false, message: I18n.t('error_submit') };
    },

    async cancelOrder(orderId) {
        const orders = await this._fetchOrders();
        const order = orders.find(o => o.id === orderId);

        if (!order) return { success: false, message: I18n.t('order_not_found') };

        if (![this.config.STATUSES.PENDING, this.config.STATUSES.CONFIRMED].includes(order.status)) {
            return { success: false, message: I18n.t('order_cannot_cancel') };
        }

        const updated = await this._updateOrderStatus(orderId, this.config.STATUSES.CANCELLED);
        return {
            success: updated,
            message: updated ? I18n.t('order_cancelled') : I18n.t('error_submit')
        };
    },

    async getOrders() {
        return await this._fetchOrders();
    },

    async render(containerId = 'ordersList') {
        const container = document.getElementById(containerId);
        if (!container) return;

        const orders = await this.getOrders();

        if (orders.length === 0) {
            container.innerHTML = `<p data-i18n="profile_no_orders">У вас пока нет заказов.</p>`;
            return;
        }

        container.innerHTML = orders.map(order => {
            const statusInfo = this._getStatusInfo(order.status);
            return `
                <article class="order-card" data-order-id="${order.id}">
                    <div class="order-card__header">
                        <div>
                            <h3 data-i18n="order_title">Заказ #${(order.id || '').toString().slice(-6).toUpperCase()}</h3>
                            <time>${this._formatDate(order.createdAt)}</time>
                        </div>
                        <span class="order-card__status" style="color: ${statusInfo.color}">
                            ${statusInfo.label}
                        </span>
                    </div>
                    <div class="order-card__body">
                        <p data-i18n="order_total">Итого: <strong>${order.total} BYN</strong></p>
                    </div>
                    <div class="order-card__actions">
                        <button class="btn btn--outline" onclick="Orders.showDetails('${order.id}')" data-i18n="btn_details">Подробнее</button>
                        ${statusInfo.canCancel ? `
                            <button class="btn btn--danger" onclick="Orders.confirmCancel('${order.id}')" data-i18n="btn_cancel">Отменить</button>
                        ` : ''}
                    </div>
                </article>
            `;
        }).join('');
    },

    showDetails(orderId) {
        alert(`Заказ #${orderId.slice(-6)}\nСтатус: ${I18n.t('order_status_' + (orderId.status || 'pending'))}`);
    },

    async confirmCancel(orderId) {
        if (!confirm(I18n.t('confirm_cancel_order'))) return;

        const result = await this.cancelOrder(orderId);
        showNotification?.(result.message, result.success ? 'success' : 'error');

        if (result.success) this.render();
    },

    async init() {
        if (!Storage.isAvailable()) {
            showNotification?.('Сервер недоступен. История заказов может быть неполной.', 'warning');
        }
        if (document.getElementById('ordersList')) {
            await this.render();
        }
    }
};

// Глобальные функции
async function placeOrder(cartItems, total, deliveryData) {
    return Orders.createOrder(cartItems, total, deliveryData);
}

function cancelOrderInline(orderId) {
    Orders.confirmCancel(orderId);
}

function showOrderDetails(orderId) {
    Orders.showDetails(orderId);
}

document.addEventListener('DOMContentLoaded', () => {
    if (Auth?.isAuthenticated?.()) Orders.init();
});