/* 
 * auth.js — Адаптировано под JSON Server + обработка ошибок
 */

const Auth = {
    PATTERNS: {
        EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        PHONE_RU: /^\+375(29|33|25|44)\d{7}$/,
        PASSWORD: /^(?=.*\d).{6,}$/,
        NAME: /^[A-Za-zА-Яа-яЁё\s\-']+$/,
        BIRTH_DATE: /^\d{2}-\d{2}-\d{4}$/
    },

    async _getUsers() {
        if (!Storage.isAvailable()) return [];
        try {
            const res = await fetch(`${API_BASE}/users`);
            if (!res.ok) return [];
            return await res.json();
        } catch (e) {
            console.error('[Auth] _getUsers error:', e);
            return [];
        }
    },

    async _createUser(userData) {
        if (!Storage.isAvailable()) {
            showNotification?.('Сервер регистрации недоступен', 'error');
            return false;
        }
        try {
            const res = await fetch(`${API_BASE}/users`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });
            return res.ok;
        } catch (e) {
            console.error('[Auth] _createUser error:', e);
            return false;
        }
    },

    _generateNickname() {
        const adjectives = ['wild', 'bold', 'free', 'swift', 'grace', 'luxe', 'pure', 'vivid'];
        const nouns = ['soul', 'spirit', 'vibe', 'essence', 'aura', 'glow', 'pulse', 'flow'];
        const num = Math.floor(Math.random() * 999);
        return adjectives[Math.floor(Math.random() * adjectives.length)] +
               nouns[Math.floor(Math.random() * nouns.length)] + num;
    },

    _checkAge(birthDate) {
        if (!this.PATTERNS.BIRTH_DATE.test(birthDate)) return false;
        const [day, month, year] = birthDate.split('-').map(Number);
        const birth = new Date(year, month - 1, day);
        const today = new Date();
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) age--;
        return age >= 16;
    },

    // ==================== ВАЛИДАЦИЯ ====================
    validateEmail(email) {
        if (!email?.trim()) return { valid: false, error: I18n.t('error_required') };
        if (!this.PATTERNS.EMAIL.test(email.trim())) return { valid: false, error: I18n.t('error_email') };
        return { valid: true, error: null };
    },

    validatePassword(password) {
        if (!password) return { valid: false, error: I18n.t('error_required') };
        if (password.length < 6) return { valid: false, error: I18n.t('error_password_length') };
        if (!this.PATTERNS.PASSWORD.test(password)) return { valid: false, error: I18n.t('error_password') };
        return { valid: true, error: null };
    },

    validateName(name) {
        if (!name?.trim()) return { valid: false, error: I18n.t('error_required') };
        if (!this.PATTERNS.NAME.test(name.trim())) return { valid: false, error: I18n.t('error_name') };
        return { valid: true, error: null };
    },

    validatePhone(phone) {
        if (!phone) return { valid: true, error: null };
        if (!this.PATTERNS.PHONE_RU.test(phone.trim())) return { valid: false, error: I18n.t('error_phone') };
        return { valid: true, error: null };
    },

    validateBirthDate(birthDate) {
        if (!birthDate?.trim()) return { valid: false, error: I18n.t('error_required') };
        if (!this.PATTERNS.BIRTH_DATE.test(birthDate.trim())) return { valid: false, error: I18n.t('error_birth_format') };
        if (!this._checkAge(birthDate.trim())) return { valid: false, error: I18n.t('error_birth_age') };
        return { valid: true, error: null };
    },

    // ==================== РЕГИСТРАЦИЯ ====================
    async register(data) {
        const validations = [
            this.validateEmail(data.email),
            this.validatePassword(data.password),
            this.validateName(data.name),
            this.validateName(data.surname),
            this.validatePhone(data.phone),
            this.validateBirthDate(data.birthDate)
        ];

        const errors = validations.filter(v => !v.valid).map(v => v.error);
        if (errors.length > 0) return { success: false, error: errors[0] };

        if (!data.agree) return { success: false, error: I18n.t('error_agree') };

        const users = await this._getUsers();
        if (users.find(u => u.email.toLowerCase() === data.email.toLowerCase())) {
            return { success: false, error: I18n.t('error_email_exists') };
        }

        const newUser = {
            email: data.email.toLowerCase().trim(),
            password: data.password,
            name: data.name.trim(),
            surname: data.surname.trim(),
            phone: data.phone?.trim() || '',
            birthDate: data.birthDate.trim(),
            nickname: data.nickname?.trim() || this._generateNickname(),
            subscribe: !!data.subscribe,
            role: 'buyer',
            createdAt: new Date().toISOString(),
            loyaltyPoints: 0
        };

        const created = await this._createUser(newUser);
        if (!created) return { success: false, error: 'Ошибка создания пользователя' };

        await this.login(data.email, data.password);
        return { success: true, user: newUser };
    },

    // ==================== ВХОД / ВЫХОД ====================
    async login(email, password) {
        const users = await this._getUsers();
        const user = users.find(u =>
            u.email.toLowerCase() === email.toLowerCase().trim() &&
            u.password === password
        );

        if (!user) return { success: false, error: I18n.t('error_login') };

        const { password: _, ...safeUser } = user;
        localStorage.setItem('currentUser', JSON.stringify(safeUser));

        this.updateUI();
        showNotification?.(I18n.t('login_success'));
        return { success: true, user: safeUser };
    },

    async logout() {
        localStorage.removeItem('currentUser');
        this.updateUI();
        showNotification?.(I18n.t('notify_logged_out') || 'Вы вышли из аккаунта');
        return true;
    },

    getCurrentUser() {
        const user = localStorage.getItem('currentUser');
        return user ? JSON.parse(user) : null;
    },

    isAuthenticated() {
        return !!this.getCurrentUser();
    },

    hasRole(role) {
        const user = this.getCurrentUser();
        return user?.role === role;
    },

    updateUI() {
        const user = this.getCurrentUser();
        const loginLinks = document.querySelectorAll('.login-link');
        const accountLinks = document.querySelectorAll('.account-link');

        if (user) {
            loginLinks.forEach(el => el.style.display = 'none');
            accountLinks.forEach(el => {
                el.style.display = 'block';
                el.href = 'account.html';
            });
        } else {
            loginLinks.forEach(el => el.style.display = 'block');
            accountLinks.forEach(el => el.style.display = 'none');
        }

        document.querySelectorAll('.admin-only').forEach(el => {
            el.style.display = this.hasRole('admin') ? 'block' : 'none';
        });
    },

    init() {
        this.updateUI();

        const registerForm = document.getElementById('registerForm');
        if (registerForm) this._bindRegisterForm(registerForm);

        document.querySelectorAll('#loginForm, #modalLoginForm').forEach(form => {
            this._bindLoginForm(form);
        });

        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if (confirm(I18n.t('confirm_logout'))) {
                    this.logout();
                    setTimeout(() => window.location.href = 'index.html', 800);
                }
            });
        }
    },

    _bindRegisterForm(form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const data = {
                email: form.querySelector('#email')?.value,
                password: form.querySelector('#password')?.value,
                name: form.querySelector('#name')?.value,
                surname: form.querySelector('#surname')?.value,
                phone: form.querySelector('#phone')?.value,
                birthDate: form.querySelector('#birthDate')?.value,
                nickname: form.querySelector('#nickname')?.value,
                subscribe: form.querySelector('#subscribe')?.checked || false,
                agree: form.querySelector('#agree')?.checked || false
            };

            const result = await this.register(data);
            if (!result.success) {
                this._showFormError(form, result.error);
            } else {
                setTimeout(() => window.location.href = 'account.html', 800);
            }
        });
    },

    _bindLoginForm(form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = form.querySelector('#email, #modalEmail')?.value;
            const password = form.querySelector('#password, #modalPassword')?.value;

            const result = await this.login(email, password);
            if (result.success) {
                setTimeout(() => window.location.href = 'account.html', 600);
            } else {
                this._showFormError(form, result.error);
            }
        });
    },

    _showFormError(form, message) {
        const errorEl = form.querySelector('#formError');
        if (errorEl) {
            errorEl.textContent = message;
            errorEl.style.display = 'block';
        } else {
            showNotification?.(message, 'error');
        }
    }
};

// Автоинициализация
document.addEventListener('DOMContentLoaded', () => Auth.init());

if (typeof module !== 'undefined' && module.exports) module.exports = Auth;