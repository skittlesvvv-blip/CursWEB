/* 
 * vacancies.js — Полный модуль вакансий (Ф-12) + обработка ошибок
 */

const Vacancies = {
    config: {
        API_ENDPOINT: 'vacancies'
    },

    // ==================== СПИСОК ВАКАНСИЙ ====================
    jobs: [
        {
            id: 1,
            title: "Стилист-консультант",
            department: "Розничные продажи",
            salary: "от 1800 BYN",
            location: "Минск, ТЦ Dana Mall",
            description: "Консультирование клиентов, помощь в подборе сумок и аксессуаров, создание стильных образов.",
            requirements: "Опыт работы в fashion-ритейле от 1 года, отличный вкус, коммуникабельность."
        },
        {
            id: 2,
            title: "Менеджер по продажам",
            department: "Розничные продажи",
            salary: "от 2200 BYN",
            location: "Минск",
            description: "Работа с VIP-клиентами, выполнение плана продаж, развитие клиентской базы.",
            requirements: "Опыт продаж от 2 лет, знание CRM, высокая мотивация."
        },
        {
            id: 3,
            title: "Дизайнер (графический / веб)",
            department: "Маркетинг",
            salary: "от 2000 BYN",
            location: "Минск (гибрид/удалённо)",
            description: "Создание визуального контента для Instagram, сайта и рекламных материалов.",
            requirements: "Уверенное владение Figma, Photoshop, Illustrator, наличие портфолио."
        },
        {
            id: 4,
            title: "Фотограф / Контент-мейкер",
            department: "Маркетинг",
            salary: "от 1500 BYN",
            location: "Минск",
            description: "Съёмка продукции, создание lifestyle-контента для социальных сетей.",
            requirements: "Опыт съёмки аксессуаров и одежды, наличие своего оборудования."
        }
    ],

    renderVacancies() {
        const container = document.getElementById('vacanciesList');
        if (!container) return;

        let html = '';

        this.jobs.forEach(job => {
            html += `
                <div class="vacancy-card">
                    <h3>${job.title}</h3>
                    <div class="department">${job.department}</div>
                    <div class="salary">${job.salary}</div>
                    <p><strong>${job.location}</strong></p>
                    <p>${job.description}</p>
                    <p><strong>Требования:</strong> ${job.requirements}</p>
                    <button class="btn-apply" onclick="applyForJob(${job.id})" data-i18n="btn_apply_vacancy">
                        Откликнуться на вакансию
                    </button>
                </div>
            `;
        });

        container.innerHTML = html;
    },

    state: {
        form: null,
        submitting: false
    },

    init() {
        if (!Storage.isAvailable()) {
            showNotification?.('Сервер вакансий недоступен. Заявки сохраняются локально.', 'warning');
        }

        this.renderVacancies();

        this.state.form = document.getElementById('vacancyForm');
        if (!this.state.form) return;

        this._bindValidation();
        this.state.form.addEventListener('submit', (e) => this._handleSubmit(e));
        this.state.form.addEventListener('reset', () => {
            Validation?.clearFormErrors?.(this.state.form);
        });
    },

    _bindValidation() {
        if (!Validation?.bindInput) return;

        Validation.bindInput(document.getElementById('vName'), 'name', { required: true, realtime: true });
        Validation.bindInput(document.getElementById('vEmail'), 'email', { required: true, realtime: true });
        Validation.bindInput(document.getElementById('vPhone'), 'phone', { required: true, realtime: true });

        const position = document.getElementById('vPosition');
        if (position) {
            position.addEventListener('change', () => {
                const error = document.getElementById('vPositionError');
                if (!position.value) {
                    if (error) error.textContent = 'Обязательное поле';
                    position.classList.add('input-error');
                } else {
                    if (error) error.textContent = '';
                    position.classList.remove('input-error');
                }
            });
        }
    },

    async _handleSubmit(e) {
        e.preventDefault();
        if (this.state.submitting) return;

        this.state.submitting = true;

        const rules = {
            vName: { type: 'name', required: true },
            vEmail: { type: 'email', required: true },
            vPhone: { type: 'phone', required: true },
            vPosition: { type: 'select', required: true }
        };

        const validation = Validation?.validateForm?.(this.state.form, rules) || { valid: true };

        if (!validation.valid) {
            this.state.submitting = false;
            showNotification?.(I18n.t('error_form'), 'error');
            return;
        }

        const data = {
            id: Date.now().toString(36),
            name: document.getElementById('vName').value.trim(),
            email: document.getElementById('vEmail').value.trim().toLowerCase(),
            phone: document.getElementById('vPhone').value.trim(),
            position: document.getElementById('vPosition').value,
            message: document.getElementById('vMessage')?.value.trim() || '',
            status: 'new',
            createdAt: new Date().toISOString()
        };

        try {
            await this._submitApplication(data);
            showNotification?.(I18n.t('vacancy_success'), 'success');
            this.state.form.reset();
            Validation?.clearFormErrors?.(this.state.form);
        } catch (err) {
            showNotification?.(I18n.t('error_submit'), 'error');
        } finally {
            this.state.submitting = false;
        }
    },

    async _submitApplication(data) {
        try {
            await Storage.create(this.config.API_ENDPOINT, data);
        } catch (e) {
            console.error('[Vacancies] _submitApplication error:', e);
            // Fallback в localStorage
            const key = `scala_${this.config.API_ENDPOINT}`;
            let list = JSON.parse(localStorage.getItem(key) || '[]');
            list.push(data);
            localStorage.setItem(key, JSON.stringify(list));
        }
    }
};

// ==================== ГЛОБАЛЬНАЯ ФУНКЦИЯ ====================
window.applyForJob = function(jobId) {
    const job = Vacancies.jobs.find(j => j.id === jobId);
    if (job) {
        const select = document.getElementById('vPosition');
        if (select) select.value = job.title;
        
        document.querySelector('.vacancy-form-section').scrollIntoView({ behavior: 'smooth' });
    }
};

// Автоинициализация
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('vacanciesList') || document.getElementById('vacancyForm')) {
        Vacancies.init();
    }
});

if (typeof module !== 'undefined' && module.exports) {
    module.exports = Vacancies;
}