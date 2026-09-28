/**
 * RADO Switzerland - Sound of Precision Audio Engine
 * Subtle luxury acoustic experience using Web Audio API
 */

class LuxuryAudioEngine {
    constructor() {
        this.ctx = null;
        this.isEnabled = false;
        this.isTicking = false;
        this.tickInterval = null;
    }

    init() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                this.ctx = new AudioContext();
            }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    toggleSound() {
        this.init();
        this.isEnabled = !this.isEnabled;
        
        const soundBtn = document.getElementById('sound-toggle-btn');
        const soundIcon = document.getElementById('sound-icon');
        const soundLabel = document.getElementById('sound-label');

        if (this.isEnabled) {
            if (soundBtn) soundBtn.classList.add('active');
            if (soundLabel) soundLabel.textContent = 'Horology Audio: Active';
            this.startEscapementAmbience();
            this.playCrystalChime();
        } else {
            if (soundBtn) soundBtn.classList.remove('active');
            if (soundLabel) soundLabel.textContent = 'Horology Audio: Muted';
            this.stopEscapementAmbience();
        }
        return this.isEnabled;
    }

    // High frequency ceramic / crystal chime for button clicks
    playCrystalChime(freq = 880) {
        if (!this.isEnabled || !this.ctx) return;
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(freq * 1.5, this.ctx.currentTime + 0.15);

            gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.6);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start();
            osc.stop(this.ctx.currentTime + 0.6);
        } catch (e) {
            console.log('Audio chime error:', e);
        }
    }

    // Swiss escapement beat (mechanical watch tick-tock)
    startEscapementAmbience() {
        if (!this.isEnabled || !this.ctx) return;
        if (this.isTicking) return;
        this.isTicking = true;

        let highTick = true;
        this.tickInterval = setInterval(() => {
            if (!this.isEnabled || !this.ctx) return;
            try {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                const filter = this.ctx.createBiquadFilter();

                filter.type = 'bandpass';
                filter.frequency.value = highTick ? 3400 : 2800;
                filter.Q.value = 12;

                osc.type = 'triangle';
                osc.frequency.setValueAtTime(highTick ? 420 : 380, this.ctx.currentTime);

                gain.gain.setValueAtTime(0.02, this.ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.00001, this.ctx.currentTime + 0.045);

                osc.connect(filter);
                filter.connect(gain);
                gain.connect(this.ctx.destination);

                osc.start();
                osc.stop(this.ctx.currentTime + 0.05);
                highTick = !highTick;
            } catch (e) {}
        }, 350); // ~2.85 Hz Swiss escapement rhythm
    }

    stopEscapementAmbience() {
        this.isTicking = false;
        if (this.tickInterval) {
            clearInterval(this.tickInterval);
            this.tickInterval = null;
        }
    }
}

window.luxuryAudio = new LuxuryAudioEngine();
