/* 
 * wheel.js — Упрощённая версия + небольшая защита
 */

const Wheel = {
    config: {
        canvasId: 'wheelCanvas',
        spinDuration: 4000,
        segments: [
            { label: '5%',  value: 5,  color: '#e4aa44' },
            { label: '10%', value: 10, color: '#000000' },
            { label: '15%', value: 15, color: '#e4aa44' },
            { label: '0%',  value: 0,  color: '#000000' },
            { label: '20%', value: 20, color: '#e4aa44' },
            { label: '5%',  value: 5,  color: '#000000' },
            { label: '10%', value: 10, color: '#e4aa44' },
            { label: '0%',  value: 0,  color: '#000000' }
        ]
    },

    state: {
        isSpinning: false,
        canvas: null,
        ctx: null
    },

    init(canvasId = 'wheelCanvas') {
        this.state.canvas = document.getElementById(canvasId);
        if (!this.state.canvas) {
            console.warn('[Wheel] Canvas not found');
            return;
        }

        this.state.ctx = this.state.canvas.getContext('2d');
        this._resize();
        this.draw();
    },

    _resize() {
        const size = 290;
        this.state.canvas.width = size;
        this.state.canvas.height = size;
    },

    draw() {
        const ctx = this.state.ctx;
        const c = this.state.canvas;
        const cx = c.width / 2;
        const cy = c.height / 2;
        const radius = c.width / 2 - 15;
        const angleStep = (2 * Math.PI) / this.config.segments.length;

        ctx.clearRect(0, 0, c.width, c.height);

        this.config.segments.forEach((seg, i) => {
            ctx.save();
            ctx.translate(cx, cy);
            ctx.rotate(i * angleStep);

            ctx.fillStyle = seg.color;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.arc(0, 0, radius, 0, angleStep);
            ctx.closePath();
            ctx.fill();

            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 19px Montserrat';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.rotate(angleStep / 2);
            ctx.fillText(seg.label, radius * 0.45, 0);
            ctx.restore();
        });

        // Центральный круг
        ctx.save();
        ctx.translate(cx, cy);
        ctx.fillStyle = '#111';
        ctx.beginPath();
        ctx.arc(0, 0, radius * 0.22, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    },

    spin() {
        if (this.state.isSpinning) return;
        this.state.isSpinning = true;

        const btn = document.getElementById('btnSpin');
        if (btn) btn.disabled = true;

        let rotation = 0;
        const totalRot = 360 * 8 + Math.random() * 360;
        const start = Date.now();

        const animate = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / this.config.spinDuration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);

            rotation = totalRot * ease;
            this.state.canvas.style.transform = `rotate(${rotation}deg)`;

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                this.finishSpin(rotation);
            }
        };

        animate();
    },

    finishSpin(finalRotation) {
        this.state.isSpinning = false;

        const normalized = finalRotation % 360;
        const segmentAngle = 360 / this.config.segments.length;
        let index = Math.floor((360 - normalized) / segmentAngle) % this.config.segments.length;

        const winner = this.config.segments[index];

        const resultEl = document.getElementById('wheelResult');
        if (resultEl) {
            if (winner.value > 0) {
                resultEl.innerHTML = I18n.t('wheel_result_win', {value: winner.label}) || `Вы выиграли ${winner.label}!`;
                resultEl.style.color = '#22c55e';
            } else {
                resultEl.innerHTML = I18n.t('wheel_result_lose') || 'Попробуйте в следующий раз!';
                resultEl.style.color = '#ef4444';
            }
        }

        const btn = document.getElementById('btnSpin');
        if (btn) btn.disabled = false;
    }
};

function spinWheel() {
    Wheel.spin();
}

// Автозапуск
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('wheelCanvas')) {
        Wheel.init();
    }
});

if (typeof module !== 'undefined' && module.exports) module.exports = Wheel;