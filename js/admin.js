/* 
 * admin.js
 * Модуль админ-панели
 */

const Admin = {
    config: {
        requiredRole: 'admin',
        endpoints: {
            users: 'users',
            orders: 'orders',
            products: 'products'
        }
    },

    state: {
        isAdmin: false,
        currentUser: null,
        data: { users: [], orders: [], products: [] }
    },

    // ===== ПРОВЕРКА ДОСТУПА =====
    checkAccess() {
        const user = Auth?.getCurrentUser?.() || Storage.get(Storage.keys.CURRENT_USER);
        this.state.currentUser = user;
        this.state.isAdmin = user?.role === 'admin';
        return this.state.isAdmin;
    },

    showAccessDenied() {
        const container = document.getElementById('adminContent');
        if (container) {
            container.innerHTML = `
                <div class="admin-access-denied">
                    <h2 data-i18n="admin_access_denied">Доступ запрещён</h2>
                    <p data-i18n="admin_access_desc">Только администратор может управлять данными.</p>
                    <a href="index.html" class="btn" data-i18n="btn_home">← На главную</a>
                </div>
            `;
        }
        if (typeof I18n !== 'undefined') I18n.setLanguage(I18n.currentLang);
    },

    // ===== ЗАГРУЗКА ДАННЫХ =====
    async _fetchData(endpoint) {
        try {
            const data = await Storage.fetch?.(endpoint);
            return Array.isArray(data) ? data : [];
        } catch {
            return Storage.get(`scala_admin_${endpoint}`) || [];
        }
    },

    async loadData() {
        if (!this.state.isAdmin) return;

        const [users, orders, products] = await Promise.all([
            this._fetchData(this.config.endpoints.users),
            this._fetchData(this.config.endpoints.orders),
            this._fetchData(this.config.endpoints.products)
        ]);

        this.state.data = { users, orders, products };
    },

    // ===== ПОЛЬЗОВАТЕЛИ =====
    async getUsers() {
        return this.state.data.users;
    },

    async updateUser(userId, updates) {
        if (!this.state.isAdmin) return false;

        try {
            await Storage.update?.(`${this.config.endpoints.users}/${userId}`, updates);
            const user = this.state.data.users.find(u => u.id === userId);
            if (user) Object.assign(user, updates);
            showNotification?.(I18n.t('admin_user_updated'), 'success');
            return true;
        } catch {
            showNotification?.(I18n.t('error_submit'), 'error');
            return false;
        }
    },

    async deleteUser(userId) {
        if (!this.state.isAdmin) return false;
        if (userId === this.state.currentUser?.id) {
            showNotification?.(I18n.t('admin_cannot_delete_self'), 'error');
            return false;
        }

        try {
            await Storage.delete?.(`${this.config.endpoints.users}/${userId}`);
            this.state.data.users = this.state.data.users.filter(u => u.id !== userId);
            showNotification?.(I18n.t('admin_user_deleted'), 'success');
            return true;
        } catch {
            showNotification?.(I18n.t('error_submit'), 'error');
            return false;
        }
    },

    // ===== ЗАКАЗЫ =====
    async getOrders() {
        return this.state.data.orders;
    },

    async updateOrderStatus(orderId, newStatus) {
        if (!this.state.isAdmin) return false;

        try {
            await Storage.update?.(`${this.config.endpoints.orders}/${orderId}`, { status: newStatus });
            const order = this.state.data.orders.find(o => o.id === orderId);
            if (order) order.status = newStatus;
            showNotification?.(I18n.t('admin_order_updated'), 'success');
            return true;
        } catch {
            showNotification?.(I18n.t('error_submit'), 'error');
            return false;
        }
    },

    // ===== ТОВАРЫ =====
    async getProducts() {
        return this.state.data.products;
    },

    async addProduct(productData) {
        if (!this.state.isAdmin) return null;

        const newProduct = {
            id: Date.now().toString(36),
            ...productData,
            createdAt: new Date().toISOString()
        };

        try {
            await Storage.create?.(this.config.endpoints.products, newProduct);
            this.state.data.products.push(newProduct);
            showNotification?.(I18n.t('admin_product_added'), 'success');
            return newProduct;
        } catch {
            showNotification?.(I18n.t('error_submit'), 'error');
            return null;
        }
    },

    async updateProduct(productId, updates) {
        if (!this.state.isAdmin) return false;

        try {
            await Storage.update?.(`${this.config.endpoints.products}/${productId}`, updates);
            const product = this.state.data.products.find(p => p.id === productId);
            if (product) Object.assign(product, updates);
            showNotification?.(I18n.t('admin_product_updated'), 'success');
            return true;
        } catch {
            showNotification?.(I18n.t('error_submit'), 'error');
            return false;
        }
    },

    async deleteProduct(productId) {
        if (!this.state.isAdmin) return false;

        try {
            await Storage.delete?.(`${this.config.endpoints.products}/${productId}`);
            this.state.data.products = this.state.data.products.filter(p => p.id !== productId);
            showNotification?.(I18n.t('admin_product_deleted'), 'success');
            return true;
        } catch {
            showNotification?.(I18n.t('error_submit'), 'error');
            return false;
        }
    },

    // ===== СБРОС ДАННЫХ =====
    async resetAllData() {
        if (!this.state.isAdmin) return false;
        if (!confirm(I18n.t('admin_reset_desc'))) return false;

        try {
            Object.keys(localStorage).forEach(key => {
                if (key.startsWith('scala_')) localStorage.removeItem(key);
            });
            showNotification?.(I18n.t('admin_data_reset'), 'success');
            setTimeout(() => location.reload(), 1200);
            return true;
        } catch {
            showNotification?.(I18n.t('error_submit'), 'error');
            return false;
        }
    },

    // ===== ИНИЦИАЛИЗАЦИЯ =====
    async init() {
        if (!this.checkAccess()) {
            this.showAccessDenied();
            return;
        }

        await this.loadData();

        const resetBtn = document.getElementById('btnResetStorage');
        if (resetBtn) resetBtn.onclick = () => this.resetAllData();

        console.log('%c[Admin] Админ-панель инициализирована', 'color:#c9a66b');
    }
};

// Автоинициализация
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('adminContent') || document.getElementById('adminStats')) {
        Admin.init();
    }
});

if (typeof module !== 'undefined' && module.exports) {
    module.exports = Admin;
}