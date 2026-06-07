/* 
 * validation.js
 * Модуль валидации форм (БП-1, БП-2, БП-3, БП-4)
 * - БП-1: Валидация email
 * - БП-2: Валидация телефона РБ (+375(29|33|25|44)#######)
 * - БП-3: Валидация пароля (8-20 символов, заглавная, строчная, цифра, спецсимвол)
 * - БП-4: Валидация возраста (≥16 лет, формат дд-мм-гггг)
 * - Поддержка i18n, real-time проверки, интеграция с Auth
 */

const Validation = {
    // ===== РЕГУЛЯРНЫЕ ВЫРАЖЕНИЯ =====
    patterns: {
        // БП-1: Email (международный стандарт)
        email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        
        // БП-2: Телефон Республики Беларусь
        // Формат: +375(29|33|25|44)1234567 (7 цифр после кода оператора)
        phoneBY: /^\+375(29|33|25|44)\d{7}$/,
        
        // БП-3: Пароль (8-20 символов, заглавная, строчная, цифра, спецсимвол)
        password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,20}$/,
        
        // БП-4: Дата рождения (формат дд-мм-гггг)
        birthDate: /^\d{2}-\d{2}-\d{4}$/,
        
        // Имя/фамилия (кириллица/латиница, пробелы, дефис, апостроф)
        name: /^[A-Za-zА-Яа-яЁё\s\-']+$/,
        
        // Никнейм (латиница, цифры, подчёркивание, 3-20 символов)
        nickname: /^[a-zA-Z0-9_]{3,20}$/
    },
    
    // ===== ТОП-100 самых распространённых паролей (для БП-3) =====
    weakPasswords: [
        '123456', 'password', '123456789', '12345678', '12345',
        '111111', '1234567', 'sunshine', 'qwerty', 'iloveyou',
        'princess', 'admin', 'welcome', '666666', 'abc123',
        'football', '123123', 'monkey', '654321', '!@#$%^&*',
        'letmein', 'trustno1', 'dragon', 'baseball', 'iloveyou1',
        'master', 'sunshine1', 'ashley', 'bailey', 'passw0rd',
        'shadow', '123123123', '696969', 'superman', 'qazwsx',
        'michael', '1234567890', 'password1', 'qwerty123', '1q2w3e4r',
        'zaq12wsx', 'password123', 'qwertyuiop', '123321', '66666666',
        '1qaz2wsx', '987654', 'qwerty1', '123456789a', '12345678910',
        '1234567891', '12345678912', '123456789123', '1234567891234',
        '12345678912345', '123456789123456', '1234567891234567',
        '12345678912345678', '123456789123456789', '1234567891234567890',
        '12345678912345678901', '123456789123456789012', '1234567891234567890123',
        '12345678912345678901234', '123456789123456789012345', '1234567891234567890123456',
        '12345678912345678901234567', '123456789123456789012345678', '1234567891234567890123456789'
    ],
    
    // ===== МЕТОДЫ ВАЛИДАЦИИ (БП-1…БП-4) =====
    
    /**
     * БП-1: Валидация email
     * @param {string} email 
     * @returns {{valid: boolean, error: string|null}}
     */
    validateEmail(email) {
        const t = I18n?.t?.bind(I18n) || (k => k);
        
        if (!email || !email.trim()) {
            return { valid: false, error: t('error_required') };
        }
        
        const trimmed = email.trim();
        if (!this.patterns.email.test(trimmed)) {
            return { valid: false, error: t('error_email') };
        }
        
        return { valid: true, error: null };
    },
    
    /**
     * БП-2: Валидация телефона РБ
     * @param {string} phone 
     * @param {boolean} required - обязательно ли поле (по умолчанию false)
     * @returns {{valid: boolean, error: string|null}}
     */
    validatePhoneBY(phone, required = false) {
        const t = I18n?.t?.bind(I18n) || (k => k);
        
        if (!phone || !phone.trim()) {
            if (required) {
                return { valid: false, error: t('error_required') };
            }
            return { valid: true, error: null }; // необязательное поле
        }
        
        const trimmed = phone.trim();
        if (!this.patterns.phoneBY.test(trimmed)) {
            return { valid: false, error: t('error_phone') };
        }
        
        return { valid: true, error: null };
    },
    
    /**
     * БП-3: Валидация пароля
     * @param {string} password 
     * @returns {{valid: boolean, error: string|null}}
     */
    validatePassword(password) {
        const t = I18n?.t?.bind(I18n) || (k => k);
        
        if (!password) {
            return { valid: false, error: t('error_required') };
        }
        
        // Проверка длины
        if (password.length < 8 || password.length > 20) {
            return { valid: false, error: t('error_password_length') };
        }
        
        // Проверка сложности (регулярное выражение)
        if (!this.patterns.password.test(password)) {
            return { valid: false, error: t('error_password') };
        }
        
        // Проверка на слабые пароли (ТОП-100)
        if (this.weakPasswords.includes(password.toLowerCase())) {
            return { valid: false, error: t('error_password_weak') };
        }
        
        return { valid: true, error: null };
    },
    
    /**
     * БП-4: Валидация даты рождения (возраст ≥16 лет)
     * @param {string} birthDate - формат "дд-мм-гггг"
     * @returns {{valid: boolean, error: string|null}}
     */
    validateBirthDate(birthDate) {
        const t = I18n?.t?.bind(I18n) || (k => k);
        
        if (!birthDate || !birthDate.trim()) {
            return { valid: false, error: t('error_required') };
        }
        
        const trimmed = birthDate.trim();
        
        // Проверка формата
        if (!this.patterns.birthDate.test(trimmed)) {
            return { valid: false, error: t('error_birth_format') };
        }
        
        // Парсинг даты
        const [day, month, year] = trimmed.split('-').map(Number);
        
        // Проверка корректности даты
        if (!day || !month || !year || day < 1 || day > 31 || month < 1 || month > 12 || year < 1900 || year > new Date().getFullYear()) {
            return { valid: false, error: t('error_birth_invalid') };
        }
        
        // Расчёт возраста
        const birth = new Date(year, month - 1, day);
        const today = new Date();
        
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        const dayDiff = today.getDate() - birth.getDate();
        
        // Корректировка, если день рождения ещё не наступил в этом году
        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            age--;
        }
        
        // Проверка возраста ≥16 лет
        if (age < 16) {
            return { valid: false, error: t('error_birth_age') };
        }
        
        return { valid: true, error: null };
    },
    
    /**
     * Валидация имени/фамилии
     * @param {string} name 
     * @param {boolean} required 
     * @returns {{valid: boolean, error: string|null}}
     */
    validateName(name, required = true) {
        const t = I18n?.t?.bind(I18n) || (k => k);
        
        if (!name || !name.trim()) {
            if (required) {
                return { valid: false, error: t('error_required') };
            }
            return { valid: true, error: null };
        }
        
        const trimmed = name.trim();
        if (!this.patterns.name.test(trimmed)) {
            return { valid: false, error: t('error_name') };
        }
        
        return { valid: true, error: null };
    },
    
    /**
     * Валидация никнейма
     * @param {string} nickname 
     * @returns {{valid: boolean, error: string|null}}
     */
    validateNickname(nickname) {
        const t = I18n?.t?.bind(I18n) || (k => k);
        
        if (!nickname || !nickname.trim()) {
            return { valid: false, error: t('error_required') };
        }
        
        const trimmed = nickname.trim();
        if (!this.patterns.nickname.test(trimmed)) {
            return { valid: false, error: t('error_nickname') };
        }
        
        return { valid: true, error: null };
    },
    
    /**
     * Проверка совпадения паролей
     * @param {string} password 
     * @param {string} confirmPassword 
     * @returns {{valid: boolean, error: string|null}}
     */
    validatePasswordMatch(password, confirmPassword) {
        const t = I18n?.t?.bind(I18n) || (k => k);
        
        if (!confirmPassword) {
            return { valid: false, error: t('error_required') };
        }
        
        if (password !== confirmPassword) {
            return { valid: false, error: t('error_password_mismatch') };
        }
        
        return { valid: true, error: null };
    },
    
    /**
     * Проверка согласия с правилами
     * @param {boolean} agreed 
     * @returns {{valid: boolean, error: string|null}}
     */
    validateAgreement(agreed) {
        const t = I18n?.t?.bind(I18n) || (k => k);
        
        if (!agreed) {
            return { valid: false, error: t('error_agree_required') };
        }
        
        return { valid: true, error: null };
    },
    
    // ===== ИНТЕГРАЦИЯ С ФОРМАМИ =====
    
    /**
     * Привязать валидацию к полю ввода (реальное время)
     * @param {HTMLInputElement} input 
     * @param {string} type - 'email'|'phone'|'password'|'birthDate'|'name'|'nickname'
     * @param {Object} options - {required: boolean, onValid: Function, onInvalid: Function}
     */
    bindInput(input, type, options = {}) {
        if (!input) return;
        
        const { required = true, onValid, onInvalid } = options;
        const errorEl = document.getElementById(input.id + 'Error');
        
        // Функция валидации в зависимости от типа
        const validators = {
            email: (val) => this.validateEmail(val),
            phone: (val) => this.validatePhoneBY(val, required),
            password: (val) => this.validatePassword(val),
            birthDate: (val) => this.validateBirthDate(val),
            name: (val) => this.validateName(val, required),
            nickname: (val) => this.validateNickname(val)
        };
        
        const validator = validators[type];
        if (!validator) {
            console.warn(`[Validation] Неизвестный тип валидации: ${type}`);
            return;
        }
        
        // Обработчик blur (потеря фокуса)
        input.addEventListener('blur', () => {
            const result = validator(input.value);
            this._showFieldResult(input, errorEl, result, onValid, onInvalid);
        });
        
        // Обработчик input (реальное время, опционально)
        if (options.realtime) {
            input.addEventListener('input', () => {
                // Показываем ошибку только если поле уже было "тронуто"
                if (input.dataset.touched) {
                    const result = validator(input.value);
                    this._showFieldResult(input, errorEl, result);
                }
            });
        }
        
        // Помечаем поле как "тронутое" при первом вводе
        input.addEventListener('focus', () => {
            input.dataset.touched = 'true';
        });
    },
    
    /**
     * Показать результат валидации для поля
     * @private
     */
    _showFieldResult(input, errorEl, result, onValid, onInvalid) {
        // Обновляем классы поля
        input.classList.toggle('input-error', !result.valid);
        input.classList.toggle('input-success', result.valid && input.dataset.touched);
        
        // Обновляем текст ошибки
        if (errorEl) {
            if (result.valid) {
                errorEl.textContent = '';
                errorEl.classList.remove('show');
            } else {
                errorEl.textContent = result.error;
                errorEl.classList.add('show');
            }
        }
        
        // Вызываем колбэки
        if (result.valid && typeof onValid === 'function') {
            onValid(input);
        } else if (!result.valid && typeof onInvalid === 'function') {
            onInvalid(input, result.error);
        }
    },
    
    /**
     * Валидировать всю форму
     * @param {HTMLFormElement} form 
     * @param {Object} rules - { fieldName: {type: 'email', required: true}, ... }
     * @returns {{valid: boolean, errors: Object}}
     */
    validateForm(form, rules) {
        const result = { valid: true, errors: {} };
        const t = I18n?.t?.bind(I18n) || (k => k);
        
        // Валидаторы по типу
        const validators = {
            email: (val, req) => this.validateEmail(val),
            phone: (val, req) => this.validatePhoneBY(val, req),
            password: (val) => this.validatePassword(val),
            birthDate: (val) => this.validateBirthDate(val),
            name: (val, req) => this.validateName(val, req),
            nickname: (val) => this.validateNickname(val)
        };
        
        // Проходим по всем правилам
        for (const [fieldName, rule] of Object.entries(rules)) {
            const input = form.elements[fieldName];
            if (!input) continue;
            
            const validator = validators[rule.type];
            if (!validator) continue;
            
            const validation = validator(input.value, rule.required !== false);
            
            if (!validation.valid) {
                result.valid = false;
                result.errors[fieldName] = validation.error;
                
                // Показываем ошибку в UI
                const errorEl = document.getElementById(fieldName + 'Error');
                if (errorEl) {
                    errorEl.textContent = validation.error;
                    errorEl.classList.add('show');
                }
                input.classList.add('input-error');
            } else {
                // Очищаем ошибку если была
                const errorEl = document.getElementById(fieldName + 'Error');
                if (errorEl) {
                    errorEl.textContent = '';
                    errorEl.classList.remove('show');
                }
                input.classList.remove('input-error');
            }
        }
        
        // Проверка согласия (если есть правило agree)
        if (rules.agree) {
            const agreeInput = form.elements.agree;
            if (agreeInput && !agreeInput.checked) {
                result.valid = false;
                result.errors.agree = t('error_agree_required');
                
                const errorEl = document.getElementById('agreeError');
                if (errorEl) {
                    errorEl.textContent = result.errors.agree;
                    errorEl.classList.add('show');
                }
            }
        }
        
        // Проверка совпадения паролей (если есть passwordConfirm)
        if (rules.password && rules.passwordConfirm) {
            const pwd = form.elements.password?.value;
            const pwdConfirm = form.elements.passwordConfirm?.value;
            
            if (pwd && pwdConfirm) {
                const match = this.validatePasswordMatch(pwd, pwdConfirm);
                if (!match.valid) {
                    result.valid = false;
                    result.errors.passwordConfirm = match.error;
                    
                    const errorEl = document.getElementById('passwordConfirmError');
                    if (errorEl) {
                        errorEl.textContent = match.error;
                        errorEl.classList.add('show');
                    }
                }
            }
        }
        
        return result;
    },
    
    /**
     * Очистить ошибки валидации формы
     * @param {HTMLFormElement} form 
     */
    clearFormErrors(form) {
        // Очищаем все поля с классом input-error
        form.querySelectorAll('.input-error').forEach(input => {
            input.classList.remove('input-error', 'input-success');
        });
        
        // Скрываем все сообщения об ошибках
        form.querySelectorAll('.error-message.show').forEach(error => {
            error.textContent = '';
            error.classList.remove('show');
        });
    }
};

// ===== ГЛОБАЛЬНЫЕ ФУНКЦИИ ДЛЯ ОБРАТНОЙ СОВМЕСТИМОСТИ =====

/**
 * Валидировать email (глобальная функция)
 * @deprecated Используйте Validation.validateEmail()
 */
function validateEmail(email) {
    return Validation.validateEmail(email);
}

/**
 * Валидировать телефон РБ
 * @deprecated Используйте Validation.validatePhoneBY()
 */
function validatePhoneBY(phone, required = false) {
    return Validation.validatePhoneBY(phone, required);
}

/**
 * Валидировать пароль
 * @deprecated Используйте Validation.validatePassword()
 */
function validatePassword(password) {
    return Validation.validatePassword(password);
}

/**
 * Валидировать дату рождения
 * @deprecated Используйте Validation.validateBirthDate()
 */
function validateBirthDate(birthDate) {
    return Validation.validateBirthDate(birthDate);
}

// ===== ЭКСПОРТ =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Validation;
}

// ===== АВТО-ИНИЦИАЛИЗАЦИЯ =====
document.addEventListener('DOMContentLoaded', () => {
    // Авто-привязка валидации к формам с data-validate атрибутом
    
    // Форма регистрации
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        Validation.bindInput(document.getElementById('email'), 'email', { required: true, realtime: true });
        Validation.bindInput(document.getElementById('password'), 'password', { required: true, realtime: true });
        Validation.bindInput(document.getElementById('passwordConfirm'), 'password', { required: true, realtime: true });
        Validation.bindInput(document.getElementById('name'), 'name', { required: true });
        Validation.bindInput(document.getElementById('surname'), 'name', { required: true });
        Validation.bindInput(document.getElementById('phone'), 'phone', { required: false });
        Validation.bindInput(document.getElementById('birthDate'), 'birthDate', { required: true });
        Validation.bindInput(document.getElementById('nickname'), 'nickname', { required: false });
        
        // Валидация всей формы при отправке
        registerForm.addEventListener('submit', (e) => {
            const rules = {
                email: { type: 'email', required: true },
                password: { type: 'password', required: true },
                passwordConfirm: { type: 'password', required: true },
                name: { type: 'name', required: true },
                surname: { type: 'name', required: true },
                phone: { type: 'phone', required: false },
                birthDate: { type: 'birthDate', required: true },
                nickname: { type: 'nickname', required: false },
                agree: { required: true }
            };
            
            const result = Validation.validateForm(registerForm, rules);
            if (!result.valid) {
                e.preventDefault();
                if (typeof showNotification === 'function') {
                    showNotification(I18n.t('error_form'), 'error');
                }
                // Фокус на первое ошибочное поле
                const firstError = Object.keys(result.errors)[0];
                if (firstError && registerForm.elements[firstError]) {
                    registerForm.elements[firstError].focus();
                }
            }
        });
    }
    
    // Форма входа
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        Validation.bindInput(document.getElementById('email'), 'email', { required: true });
        Validation.bindInput(document.getElementById('password'), 'password', { required: true });
        
        loginForm.addEventListener('submit', (e) => {
            const rules = {
                email: { type: 'email', required: true },
                password: { type: 'password', required: true }
            };
            
            const result = Validation.validateForm(loginForm, rules);
            if (!result.valid) {
                e.preventDefault();
                if (typeof showNotification === 'function') {
                    showNotification(I18n.t('error_form'), 'error');
                }
            }
        });
    }
    
    // Форма вакансии
    const vacancyForm = document.getElementById('vacancyForm');
    if (vacancyForm) {
        Validation.bindInput(document.getElementById('vName'), 'name', { required: true });
        Validation.bindInput(document.getElementById('vEmail'), 'email', { required: true });
        Validation.bindInput(document.getElementById('vPhone'), 'phone', { required: true });
        
        vacancyForm.addEventListener('submit', (e) => {
            const rules = {
                vName: { type: 'name', required: true },
                vEmail: { type: 'email', required: true },
                vPhone: { type: 'phone', required: true }
            };
            
            const result = Validation.validateForm(vacancyForm, rules);
            if (!result.valid) {
                e.preventDefault();
                if (typeof showNotification === 'function') {
                    showNotification(I18n.t('error_form'), 'error');
                }
            }
        });
    }
    
    // Форма кастомного заказа
    const customForm = document.getElementById('customOrderForm');
    if (customForm) {
        Validation.bindInput(document.getElementById('cName'), 'name', { required: true });
        Validation.bindInput(document.getElementById('cEmail'), 'email', { required: true });
        Validation.bindInput(document.getElementById('cPhone'), 'phone', { required: true });
        
        customForm.addEventListener('submit', (e) => {
            const rules = {
                cName: { type: 'name', required: true },
                cEmail: { type: 'email', required: true },
                cPhone: { type: 'phone', required: true }
            };
            
            const result = Validation.validateForm(customForm, rules);
            if (!result.valid) {
                e.preventDefault();
                if (typeof showNotification === 'function') {
                    showNotification(I18n.t('error_form'), 'error');
                }
            }
        });
    }
});