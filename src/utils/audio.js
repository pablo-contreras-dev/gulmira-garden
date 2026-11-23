/**
 * Web Audio API Music Box & Piano Synthesizer
 * Generates an enchanting, gentle, nostalgic melody reminiscent of Studio Ghibli.
 * Autoplays smoothly when user interacts with "Discover your surprise".
 */

class GardenAudio {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.timer = null;
    this.stepIndex = 0;
    this.listeners = new Set();

    // Notes in Hz (D Major / B Minor Pentatonic Warm Scale)
    this.notes = {
      D3: 146.83,
      G2: 98.00,
      A2: 110.00,
      B2: 123.47,
      D4: 293.66,
      E4: 329.63,
      Fs4: 369.99,
      A4: 440.00,
      B4: 493.88,
      D5: 587.33,
      E5: 659.25,
      Fs5: 739.99,
      A5: 880.00,
    };

    // A serene, tender 16-bar melodic phrase
    this.melody = [
      { bass: 'D3', melody: 'D5', delay: 0 },
      { melody: 'A4', delay: 0 },
      { melody: 'Fs4', delay: 0 },
      { melody: 'E4', delay: 0 },
      { bass: 'B2', melody: 'D4', delay: 0 },
      { melody: 'Fs4', delay: 0 },
      { melody: 'B4', delay: 0 },
      { melody: 'D5', delay: 0 },
      { bass: 'G2', melody: 'E5', delay: 0 },
      { melody: 'D5', delay: 0 },
      { melody: 'B4', delay: 0 },
      { melody: 'A4', delay: 0 },
      { bass: 'A2', melody: 'Fs4', delay: 0 },
      { melody: 'E4', delay: 0 },
      { melody: 'D4', delay: 0 },
      { melody: 'Fs4', delay: 0 },
    ];
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

  // Play a single soft bell / music-box note
  playChime(freq, duration = 1.8, isBass = false) {
    if (!this.ctx || !this.isPlaying) return;
    const now = this.ctx.currentTime;

    // Primary tone (warm body)
    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    osc1.type = isBass ? 'triangle' : 'sine';
    osc1.frequency.setValueAtTime(freq, now);

    // Harmonic sparkle overtone for music box shimmer
    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * (isBass ? 2 : 2.003), now);

    const masterVolume = isBass ? 0.08 : 0.045;

    // Soft attack, natural exponential chime decay
    gain1.gain.setValueAtTime(0.0001, now);
    gain1.gain.linearRampToValueAtTime(masterVolume, now + 0.025);
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    gain2.gain.setValueAtTime(0.0001, now);
    gain2.gain.linearRampToValueAtTime(masterVolume * 0.35, now + 0.015);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + (duration * 0.7));

    osc1.connect(gain1);
    osc2.connect(gain2);
    gain1.connect(this.ctx.destination);
    gain2.connect(this.ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + duration);
    osc2.stop(now + duration);
  }

  playNextNote() {
    if (!this.isPlaying) return;

    const current = this.melody[this.stepIndex];
    if (current.bass && this.notes[current.bass]) {
      this.playChime(this.notes[current.bass], 3.2, true);
    }
    if (current.melody && this.notes[current.melody]) {
      this.playChime(this.notes[current.melody], 2.2, false);
    }

    this.stepIndex = (this.stepIndex + 1) % this.melody.length;
    this.timer = setTimeout(() => this.playNextNote(), 440); // ~68 BPM gentle tempo
  }

  start() {
    this.init();
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.notify();
    this.playNextNote();
  }

  stop() {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    this.notify();
  }

  toggle() {
    if (this.isPlaying) {
      this.stop();
    } else {
      this.start();
    }
  }

  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  notify() {
    for (const listener of this.listeners) {
      listener(this.isPlaying);
    }
  }
}

export const gardenAudio = new GardenAudio();
export default gardenAudio;
