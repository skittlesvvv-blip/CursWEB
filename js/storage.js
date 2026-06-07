/* 
 * storage.js — Исправленная версия (не отключается при 404)
 */

let isServerAvailable = true;

const Storage = {
   async request(url, options = {}) {
    try {
        const res = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            }
        });

        // ✅ 404 = эндпоинт пуст, но сервер РАБОТАЕТ (не отключаем!)
        if (res.status === 404) {
            return null;
        }
        
        if (!res.ok) {
            throw new Error(`HTTP ${res.status}`);
        }

        const contentType = res.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return await res.json();
        }
        return null;
    } catch (e) {
        // 🔴 Отключаем сервер ТОЛЬКО при реальной сетевой ошибке
        if (e.message.includes('Failed to fetch') || e.name === 'TypeError') {
            isServerAvailable = false;
            console.warn('[Storage] Сервер недоступен');
        }
        return null;
    }
},

   async get(endpoint) {
    // ✅ currentUser хранится в localStorage
    if (endpoint === Storage.keys.CURRENT_USER) {
        const user = localStorage.getItem('currentUser');
        return user ? JSON.parse(user) : null;
    }
    
    // Обычный запрос к серверу
    try {
        const res = await fetch(`${API_BASE}/${endpoint}`);
        if (res.status === 404) return [];
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        
        const data = await res.json();
        return Array.isArray(data) ? data : (data || []);
    } catch (e) {
        return [];
    }
},
    async getById(endpoint, id) {
        return await this.request(`${API_BASE}/${endpoint}/${id}`);
    },

    async create(endpoint, data) {
        return await this.request(`${API_BASE}/${endpoint}`, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    },

    async update(endpoint, id, data) {
        const result = await this.request(`${API_BASE}/${endpoint}/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(data)
        });
        return !!result;
    },

    async delete(endpoint, id) {
        try {
            const res = await fetch(`${API_BASE}/${endpoint}/${id}`, { 
                method: 'DELETE' 
            });
            return res.ok;
        } catch (e) {
            console.error(`[Storage.delete]`, e);
            return false;
        }
    },

    // ✅ Синхронное сохранение в localStorage
    set(key, value) {
        try {
            localStorage.setItem(`scala_${key}`, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error(`[Storage.set] Ошибка:`, e);
            return false;
        }
    },

    async getCurrentUser() {
        const user = localStorage.getItem('currentUser');
        return user ? JSON.parse(user) : null;
    },

    async setCurrentUser(user) {
        if (!user) return false;
        const { password: _, ...safeUser } = user;
        localStorage.setItem('currentUser', JSON.stringify(safeUser));
        return true;
    },

    async logout() {
        localStorage.removeItem('currentUser');
    },

    isAvailable() {
        return isServerAvailable;
    },

    keys: {
        USERS: 'users',
        CURRENT_USER: 'currentUser',
        PRODUCTS: 'products',
        CART: 'cart',
        ORDERS: 'orders',
        FAVORITES: 'favorites',
        REVIEWS: 'reviews',
        VACANCIES: 'vacancies',
        LOYALTY: 'loyalty',
        LANG: 'lang'
    }
};

window.Storage = Storage;
console.log('%c[Storage] ✅ Загружен с обработкой ошибок', 'color:#c9a66b; font-weight:bold');