'use client';

// Hilarious Cartoon & Meme Web Audio Synthesizer
class SoundFXEngine {
  private ctx: AudioContext | null = null;
  public enabled: boolean = false;

  private initCtx(): AudioContext | null {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // 1. CARTOON SPRING BOING ("BOOOOING!")
  public playBoing() {
    if (!this.enabled) return;
    try {
      const ctx = this.initCtx();
      if (!ctx) return;
      const t = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      // Pitch sweeps up then oscillates with spring physics
      osc.frequency.setValueAtTime(140, t);
      osc.frequency.exponentialRampToValueAtTime(750, t + 0.12);
      osc.frequency.exponentialRampToValueAtTime(320, t + 0.25);
      osc.frequency.exponentialRampToValueAtTime(620, t + 0.38);
      osc.frequency.exponentialRampToValueAtTime(380, t + 0.5);

      gain.gain.setValueAtTime(0.18, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.55);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + 0.55);
    } catch {}
  }

  // 2. JUICY CARTOON CORK POP / BUBBLE ("PLOP! / POP!")
  public playPop() {
    if (!this.enabled) return;
    try {
      const ctx = this.initCtx();
      if (!ctx) return;
      const t = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      // Super fast cork pop frequency dive
      osc.frequency.setValueAtTime(1400, t);
      osc.frequency.exponentialRampToValueAtTime(180, t + 0.08);

      gain.gain.setValueAtTime(0.22, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.09);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + 0.09);
    } catch {}
  }

  // 3. RUBBER DUCK / TOY SQUEAK ("SQUEEEEK!")
  public playSqueak() {
    if (!this.enabled) return;
    try {
      const ctx = this.initCtx();
      if (!ctx) return;
      const t = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(700, t);
      osc.frequency.exponentialRampToValueAtTime(2600, t + 0.07);
      osc.frequency.exponentialRampToValueAtTime(1400, t + 0.16);

      gain.gain.setValueAtTime(0.12, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + 0.18);
    } catch {}
  }

  // 4. RETRO CARTOON LASER PEW ("PEW-PEW!")
  public playPew() {
    if (!this.enabled) return;
    try {
      const ctx = this.initCtx();
      if (!ctx) return;
      const t = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(2400, t);
      osc.frequency.exponentialRampToValueAtTime(90, t + 0.15);

      gain.gain.setValueAtTime(0.1, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.16);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + 0.16);
    } catch {}
  }

  // 5. WET STICKER SLAP ("THWAAAACK!")
  public playSlap() {
    if (!this.enabled) return;
    try {
      const ctx = this.initCtx();
      if (!ctx) return;
      const t = ctx.currentTime;

      // Noise buffer for the wet slap impact
      const bufferSize = ctx.sampleRate * 0.1;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1200, t);
      filter.frequency.exponentialRampToValueAtTime(300, t + 0.08);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.25, t);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.09);

      // Low sine punch
      const punch = ctx.createOscillator();
      const punchGain = ctx.createGain();
      punch.type = 'triangle';
      punch.frequency.setValueAtTime(260, t);
      punch.frequency.exponentialRampToValueAtTime(60, t + 0.09);

      punchGain.gain.setValueAtTime(0.3, t);
      punchGain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);

      punch.connect(punchGain);
      punchGain.connect(ctx.destination);

      noise.start(t);
      punch.start(t);
      noise.stop(t + 0.1);
      punch.stop(t + 0.1);
    } catch {}
  }

  // 6. CARTOON SLIDE WHISTLE ("WHOOOOOP!")
  public playSlide() {
    if (!this.enabled) return;
    try {
      const ctx = this.initCtx();
      if (!ctx) return;
      const t = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(250, t);
      osc.frequency.exponentialRampToValueAtTime(1800, t + 0.28);

      gain.gain.setValueAtTime(0.14, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.32);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + 0.32);
    } catch {}
  }

  // 7. FUNNY WHOOPEE CUSHION / BRAAAP ("TOOT!")
  public playToot() {
    if (!this.enabled) return;
    try {
      const ctx = this.initCtx();
      if (!ctx) return;
      const t = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(95, t);
      osc.frequency.linearRampToValueAtTime(65, t + 0.12);
      osc.frequency.linearRampToValueAtTime(45, t + 0.22);

      gain.gain.setValueAtTime(0.2, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.24);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + 0.24);
    } catch {}
  }

  // 8. HYPE AIRHORN ("BWAAA-BWAAA!")
  public playAirhorn() {
    if (!this.enabled) return;
    try {
      const ctx = this.initCtx();
      if (!ctx) return;
      const notes = [466.16, 466.16, 466.16, 622.25]; // Bb4, Bb4, Bb4, Eb5 fanfare
      notes.forEach((freq, idx) => {
        const start = ctx.currentTime + idx * 0.08;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.12, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.07);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(start);
        osc.stop(start + 0.075);
      });
    } catch {}
  }

  // 9. FUNNY RANDOM SOUND ON CLICKS & ACTIONS!
  public playRandomFunny() {
    if (!this.enabled) return;
    const sounds = [
      () => this.playBoing(),
      () => this.playPop(),
      () => this.playSqueak(),
      () => this.playSlap(),
      () => this.playSlide(),
      () => this.playPew(),
      () => this.playToot(),
    ];
    const picked = sounds[Math.floor(Math.random() * sounds.length)];
    picked();
  }

  // Backward compatibility alias for UI elements
  public playClick(freq = 420) {
    this.playRandomFunny();
  }

  public playHover() {
    if (!this.enabled) return;
    // Micro cartoon bubble pop on hover
    try {
      const ctx = this.initCtx();
      if (!ctx) return;
      const t = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800 + Math.random() * 400, t);
      osc.frequency.exponentialRampToValueAtTime(200, t + 0.04);

      gain.gain.setValueAtTime(0.03, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + 0.04);
    } catch {}
  }
}

export const soundFX = new SoundFXEngine();
