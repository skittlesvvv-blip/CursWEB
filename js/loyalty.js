/* 
 * loyalty.js — Адаптировано под JSON Server + обработка ошибок
 */

const Loyalty = {
    config: {
        THRESHOLD: 10000,
        POINTS_RATIO: 1
    },

    _getUserId() {
        const user = Auth?.getCurrentUser?.() || JSON.parse(localStorage.getItem('currentUser') || 'null');
        return user?.id || user?.email || null;
    },

    async getData() {
        if (!Storage.isAvailable()) {
            // Возвращаем данные из localStorage как fallback
            const userId = this._getUserId();
            if (!userId) return null;
            const saved = localStorage.getItem(`loyalty_${userId}`);
            return saved ? JSON.parse(saved) : null;
        }

        const userId = this._getUserId();
        if (!userId) return null;

        try {
            const res = await fetch(`${API_BASE}/loyalty?userId=${encodeURIComponent(userId)}`);
            if (!res.ok) throw new Error();
            const data = await res.json();
            return Array.isArray(data) && data.length > 0 ? data[0] : null;
        } catch (e) {
            console.error('[Loyalty] getData error:', e);
            return null;
        }
    },

    async _saveData(data) {
        const userId = this._getUserId();
        if (!userId) return false;

        // Сохраняем в localStorage как fallback
        localStorage.setItem(`loyalty_${userId}`, JSON.stringify(data));

        if (!Storage.isAvailable()) return true;

        try {
            const check = await fetch(`${API_BASE}/loyalty?userId=${encodeURIComponent(userId)}`);
            const existing = await check.json();
            if (Array.isArray(existing) && existing.length > 0) {
                await fetch(`${API_BASE}/loyalty/${existing[0].id}`, { method: 'DELETE' });
            }

            await fetch(`${API_BASE}/loyalty`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            return true;
        } catch (e) {
            console.error('[Loyalty] _saveData error:', e);
            return true; // хотя бы в localStorage сохранили
        }
    },

    async addPoints(amount, reason = 'purchase') {
        const userId = this._getUserId();
        if (!userId || amount <= 0) return { success: false };

        let data = await this.getData() || { userId, spent: 0, rewardClaimed: false, history: [] };

        data.spent = (data.spent || 0) + Number(amount);
        data.history.unshift({
            amount: Number(amount),
            reason,
            date: new Date().toISOString()
        });

        if (data.history.length > 20) data.history = data.history.slice(0, 20);
        data.updatedAt = new Date().toISOString();

        await this._saveData(data);

        if (data.spent >= this.config.THRESHOLD && !data.rewardClaimed) {
            data.rewardClaimed = true;
            await this._saveData(data);
            showNotification?.(I18n.t('loyalty_reward_earned'), 'success');
        }

        if (document.getElementById('loyalty-progress')) this.renderProgress();
        return { success: true };
    },

    async claimReward() {
        const data = await this.getData();
        if (!data || data.spent < this.config.THRESHOLD || data.rewardClaimed) {
            showNotification?.(I18n.t('loyalty_reward_error'), 'error');
            return false;
        }

        data.rewardClaimed = true;
        await this._saveData(data);
        showNotification?.(I18n.t('loyalty_reward_claimed'), 'success');
        this.renderProgress();
        return true;
    },

    async getProgress() {
        const data = await this.getData();
        if (!data) return { spent: 0, percentage: 0, remaining: this.config.THRESHOLD, isComplete: false };

        const percentage = Math.min(100, (data.spent / this.config.THRESHOLD) * 100);
        const remaining = Math.max(0, this.config.THRESHOLD - data.spent);

        return {
            spent: data.spent,
            percentage,
            remaining,
            isComplete: data.spent >= this.config.THRESHOLD,
            rewardClaimed: !!data.rewardClaimed
        };
    },

    async renderProgress() {
        const progress = await this.getProgress();
        const bar = document.getElementById('loyalty-progress');
        const text = document.getElementById('loyalty-text');
        const badge = document.getElementById('loyalty-badge');
        const claimBtn = document.getElementById('claimRewardBtn');

        if (bar) bar.style.width = `${progress.percentage}%`;
        if (text) text.innerHTML = `${progress.spent} / ${this.config.THRESHOLD} BYN`;

        if (badge) {
            if (progress.isComplete) {
                badge.textContent = I18n.t('loyalty_reward_available');
                badge.style.background = '#22c55e';
            } else {
                badge.textContent = `${I18n.t('loyalty_remaining')} ${progress.remaining} BYN`;
            }
        }

        if (claimBtn) {
            claimBtn.style.display = (progress.isComplete && !progress.rewardClaimed) ? 'block' : 'none';
        }
    },

    init() {
        if (!Storage.isAvailable()) {
            showNotification?.('Сервер лояльности недоступен. Данные хранятся локально.', 'warning');
        }
        if (document.getElementById('loyalty-progress')) {
            this.renderProgress();
        }
    }
};

// Глобальные функции
async function addLoyaltyPoints(amount, reason) {
    return Loyalty.addPoints(amount, reason);
}

function claimLoyaltyReward() {
    Loyalty.claimReward();
}

document.addEventListener('DOMContentLoaded', () => {
    if (Auth?.isAuthenticated?.()) Loyalty.init();
});