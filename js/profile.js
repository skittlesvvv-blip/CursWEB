/* 
 * profile.js — Адаптировано под account.html + обработка ошибок
 */

const Profile = {
    async getCurrentUser() {
        return Auth?.getCurrentUser?.() || JSON.parse(localStorage.getItem('currentUser') || 'null');
    },

    async loadUserInfo() {
        const user = await this.getCurrentUser();
        if (!user) {
            window.location.href = 'login.html';
            return;
        }

        document.getElementById('userName').textContent = user.name || '—';
        document.getElementById('userSurname').textContent = user.surname || '—';
        document.getElementById('userEmail').textContent = user.email || '—';
        document.getElementById('userPhone').textContent = user.phone || '—';
        document.getElementById('accountGreeting').textContent = `Добро пожаловать, ${user.name || 'Пользователь'}!`;

        if (user.createdAt) {
            document.getElementById('userRegistered').textContent = 
                new Date(user.createdAt).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' });
        }
    },

    async updateProfile() {
        const user = await this.getCurrentUser();
        if (!user) return;

        const newName = prompt('Новое имя:', user.name) || user.name;
        const newSurname = prompt('Новая фамилия:', user.surname) || user.surname;
        const newPhone = prompt('Новый телефон:', user.phone) || user.phone;

        try {
            const res = await fetch(`${API_BASE}/users?email=${encodeURIComponent(user.email)}`);
            const users = await res.json();
            const userRecord = users[0];

            if (userRecord) {
                const updated = { ...userRecord, name: newName, surname: newSurname, phone: newPhone, updatedAt: new Date().toISOString() };

                await fetch(`${API_BASE}/users/${userRecord.id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updated)
                });

                const { password: _, ...safeUser } = updated;
                localStorage.setItem('currentUser', JSON.stringify(safeUser));

                showNotification?.('Профиль обновлён!', 'success');
                this.loadUserInfo();
            }
        } catch (e) {
            showNotification?.('Ошибка обновления профиля', 'error');
        }
    },

    async renderOrders() {
        if (typeof Orders?.render === 'function') {
            await Orders.render('ordersList');
        }
    },

    async renderLoyalty() {
        if (typeof Loyalty?.renderProgress === 'function') {
            await Loyalty.renderProgress();
        }
    },

    async init() {
        if (!Storage.isAvailable()) {
            showNotification?.('Сервер недоступен. Некоторые функции работают ограниченно.', 'warning');
        }

        const user = await this.getCurrentUser();
        if (!user) {
            window.location.href = 'login.html';
            return;
        }

        await this.loadUserInfo();
        await this.renderOrders();
        await this.renderLoyalty();

        const editBtn = document.getElementById('btnEditProfile');
        if (editBtn) editBtn.addEventListener('click', () => this.updateProfile());

        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', async () => {
                if (confirm('Вы действительно хотите выйти?')) {
                    await Auth.logout();
                    window.location.href = 'index.html';
                }
            });
        }
    }
};

document.addEventListener('DOMContentLoaded', () => Profile.init());
window.Profile = Profile;