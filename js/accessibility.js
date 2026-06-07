/* 
 * accessibility.js — ФИНАЛЬНАЯ ВЕРСИЯ
 * Сохраняет настройки между страницами + защищает "STAY WILD"
 */

const Accessibility = {
    init() {
        console.log('%c[Accessibility] ✅ Запущен и сохраняет настройки', 'color:#c9a66b');
        this.loadSettings();
        this.bindButtons();
    },

    loadSettings() {
        // 1. Обычная тёмная/светлая тема
        if (localStorage.getItem('scala_theme') === 'dark') {
            document.body.classList.add('theme-dark');
        }

        // 2. Настройки слабовидящих
        const a11y = JSON.parse(localStorage.getItem('scala_a11y') || '{}');
        
        if (a11y.fontSize) {
            document.body.classList.add(`font-${a11y.fontSize}`);
        }
        if (a11y.contrast) {
            document.body.classList.add(`high-contrast-${a11y.contrast}`);
        }
        if (a11y.noImages) {
            document.body.classList.add('no-images');
        }
    },

    saveA11YSettings() {
        const settings = {
            fontSize: document.body.classList.contains('font-large') ? 'large' :
                      document.body.classList.contains('font-medium') ? 'medium' : 'small',
            contrast: document.body.classList.contains('high-contrast-1') ? 1 :
                      document.body.classList.contains('high-contrast-2') ? 2 :
                      document.body.classList.contains('high-contrast-3') ? 3 :
                      document.body.classList.contains('high-contrast-4') ? 4 :
                      document.body.classList.contains('high-contrast-5') ? 5 : null,
            noImages: document.body.classList.contains('no-images')
        };
        localStorage.setItem('scala_a11y', JSON.stringify(settings));
    },

    bindButtons() {
        // Кнопка обычной темы
        const themeBtn = document.getElementById('theme-toggle');
        if (themeBtn) {
            themeBtn.addEventListener('click', () => {
                const isDark = document.body.classList.toggle('theme-dark');
                localStorage.setItem('scala_theme', isDark ? 'dark' : 'light');
            });
        }

        // Кнопка слабовидящих
        const a11yBtn = document.getElementById('a11y-btn');
        if (a11yBtn) {
            a11yBtn.addEventListener('click', () => this.showPanel());
        }
    },

    showPanel() {
        if (document.getElementById('a11y-panel')) return;

        const panel = document.createElement('div');
        panel.id = 'a11y-panel';
        panel.innerHTML = `
            <div style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.85);z-index:99999;display:flex;align-items:center;justify-content:center;">
                <div style="background:#ffffff;padding:28px 40px;border-radius:18px;max-width:620px;width:92%;box-shadow:0 20px 50px rgba(0,0,0,0.5);">
                    <h3 style="text-align:center;margin-bottom:20px;color:#111;" data-i18n="a11y_title">Версия для слабовидящих</h3>
                    
                    <p style="margin:12px 0 8px;"><strong data-i18n="a11y_font_label">Размер шрифта</strong></p>
                    <div style="margin-bottom:22px;display:flex;gap:10px;justify-content:center;flex-wrap:wrap;">
                        <button onclick="Accessibility.setFontSize('small')" data-i18n="a11y_font_small">Обычный</button>
                        <button onclick="Accessibility.setFontSize('medium')" data-i18n="a11y_font_medium">Крупный</button>
                        <button onclick="Accessibility.setFontSize('large')" data-i18n="a11y_font_large">Очень крупный</button>
                    </div>

                    <p style="margin:15px 0 8px;"><strong data-i18n="a11y_scheme_label">Цветовая схема</strong></p>
                    <div style="margin-bottom:22px;display:flex;gap:8px;justify-content:center;flex-wrap:wrap;">
                        <button onclick="Accessibility.setContrast(1)" data-i18n="a11y_scheme_1">Чёрный + белый</button>
                        <button onclick="Accessibility.setContrast(2)" data-i18n="a11y_scheme_2">Чёрный + зелёный</button>
                        <button onclick="Accessibility.setContrast(3)" data-i18n="a11y_scheme_3">Белый + чёрный</button>
                        <button onclick="Accessibility.setContrast(4)" data-i18n="a11y_scheme_4">Бежевый + коричневый</button>
                        <button onclick="Accessibility.setContrast(5)" data-i18n="a11y_scheme_5">Голубой + тёмно-синий</button>
                    </div>

                    <label style="display:block;margin:20px 0 25px;text-align:center;font-size:15px;">
                        <input type="checkbox" id="noImagesCheck" onchange="Accessibility.toggleImages(this.checked)"> <span data-i18n="a11y_no_images">Отключить все изображения</span>
                    </label>

                    <div style="text-align:center;">
                        <button onclick="Accessibility.resetAll()" style="background:#c9a66b;color:white;padding:12px 28px;border:none;border-radius:8px;margin-right:12px;" data-i18n="a11y_reset">Сбросить всё</button>
                        <button onclick="Accessibility.hidePanel()" style="padding:12px 28px;border:2px solid #999;border-radius:8px;" data-i18n="a11y_close">Закрыть</button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(panel);
        
        // Применяем перевод после вставки панели
        if (typeof I18n !== 'undefined') I18n.setLanguage(I18n.currentLang);
    },

    hidePanel() {
        const panel = document.getElementById('a11y-panel');
        if (panel) panel.remove();
    },

    setFontSize(size) {
        document.body.classList.remove('font-small','font-medium','font-large');
        document.body.classList.add(`font-${size}`);
        this.saveA11YSettings();
    },

    setContrast(num) {
        document.body.classList.remove('high-contrast-1','high-contrast-2','high-contrast-3','high-contrast-4','high-contrast-5');
        document.body.classList.add(`high-contrast-${num}`);
        this.saveA11YSettings();
    },

    toggleImages(checked) {
        if (checked) document.body.classList.add('no-images');
        else document.body.classList.remove('no-images');
        this.saveA11YSettings();
    },

    resetAll() {
        document.body.classList.remove('font-small','font-medium','font-large','high-contrast-1','high-contrast-2','high-contrast-3','high-contrast-4','high-contrast-5','no-images');
        localStorage.removeItem('scala_a11y');
        this.hidePanel();
        alert(I18n?.t('a11y_reset_success') || '✅ Все настройки сброшены');
    }
};

document.addEventListener('DOMContentLoaded', () => Accessibility.init());