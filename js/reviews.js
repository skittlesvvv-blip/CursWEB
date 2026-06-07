/* 
 * reviews.js — Адаптировано под JSON Server
 */

const Reviews = {
    async getAllReviews(productId) {
        // ✅ Защита от undefined
        if (!productId) {
            console.warn('[Reviews.getAllReviews] productId не передан');
            return [];
        }
        if (!Storage.isAvailable()) return [];

        try {
            const res = await fetch(`${API_BASE}/reviews?productId=${encodeURIComponent(productId)}`);
            if (!res.ok) return [];
            const data = await res.json();
            return Array.isArray(data) && data.length > 0 ? (data[0].reviews || []) : [];
        } catch (e) {
            console.error('[Reviews] getAllReviews error:', e);
            return [];
        }
    },

    async _saveReviews(productId, reviews) {
        if (!Storage.isAvailable()) return false;

        try {
            const check = await fetch(`${API_BASE}/reviews?productId=${encodeURIComponent(productId)}`);
            const existing = await check.json();
            if (Array.isArray(existing) && existing.length > 0) {
                await fetch(`${API_BASE}/reviews/${existing[0].id}`, { method: 'DELETE' });
            }

            await fetch(`${API_BASE}/reviews`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    productId,
                    reviews: reviews,
                    updatedAt: new Date().toISOString()
                })
            });
            return true;
        } catch (e) {
            console.error('[Reviews] _saveReviews error:', e);
            return false;
        }
    },

    async addReview(productId, productName, rating, text) {
        const user = Auth?.getCurrentUser?.() || Storage.getCurrentUser?.();
        if (!user) {
            showNotification?.(I18n.t('product_login_required'), 'error');
            return { success: false };
        }

        let reviews = await this.getAllReviews(productId);

        const newReview = {
            id: Date.now().toString(36),
            userName: user.name || 'Клиент',
            rating: parseInt(rating),
            text: text.trim(),
            date: new Date().toISOString()
        };

        reviews.unshift(newReview);
        await this._saveReviews(productId, reviews);

        showNotification?.(I18n.t('review_success'), 'success');
        return { success: true };
    },

    async getAverageRating(productId) {
        const reviews = await this.getAllReviews(productId);
        if (reviews.length === 0) return 0;
        const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
        return (sum / reviews.length).toFixed(1);
    },

    async render(productId, containerId = 'reviews-list') {
        const container = document.getElementById(containerId);
        if (!container) return;

        const reviews = await this.getAllReviews(productId);
        const avg = await this.getAverageRating(productId);

        let html = `<div class="reviews-header">
            <h3 data-i18n="reviews_title">Отзывы</h3>
            ${avg > 0 ? `<div class="avg-rating">⭐ ${avg}</div>` : ''}
        </div>`;

        if (reviews.length === 0) {
            html += `<p class="no-reviews" data-i18n="reviews_empty">Пока нет отзывов. Будьте первым!</p>`;
        } else {
            html += reviews.map(r => `
                <div class="review-card">
                    <div class="review-top">
                        <span class="review-author">${r.userName}</span>
                        <span class="review-date">${new Date(r.date).toLocaleDateString('ru-RU')}</span>
                    </div>
                    <div class="review-stars">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</div>
                    <p class="review-text">${r.text}</p>
                </div>
            `).join('');
        }

        container.innerHTML = html;
        if (typeof I18n !== 'undefined') I18n.setLanguage(I18n.currentLang);
    },

    // ✅ Метод addDemoReviews с защитой
    async addDemoReviews(productId, demoReviews = []) {
        if (!productId) {
            console.warn('[Reviews.addDemoReviews] productId не передан');
            return;
        }
        const existing = await this.getAllReviews(productId);
        if (existing.length === 0 && demoReviews.length > 0) {
            await this._saveReviews(productId, demoReviews);
            console.log(`[Reviews] Демо-отзывы добавлены для ${productId}`);
        }
    }
};

// Глобальная функция для отправки отзыва
window.submitReview = async function(productId, productName) {
    const rating = document.getElementById('reviewRating').value;
    const text = document.getElementById('reviewText').value.trim();

    if (!rating || !text) {
        showNotification?.(I18n.t('review_form_error'), 'error');
        return;
    }

    const result = await Reviews.addReview(productId, productName, rating, text);
    if (result.success) {
        document.getElementById('reviewText').value = '';
        await Reviews.render(productId);
    }
};

// ✅ Инициализация демо-отзывов с правильным productId
document.addEventListener('DOMContentLoaded', () => {
    // Пример: раскомментируй и укажи реальный productId
    // Reviews.addDemoReviews('blue-dark', [
    //     {
    //         id: 'demo1',
    //         userName: 'SCÀLA',
    //         rating: 5,
    //         text: 'Этот отзыв добавлен автоматически.',
    //         date: new Date().toISOString()
    //     }
    // ]);
});