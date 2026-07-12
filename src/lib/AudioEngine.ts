class AudioEngine {
  private ctx: AudioContext | null = null;
  private isInitialized = false;
  private masterGain: GainNode | null = null;
  private analyser: AnalyserNode | null = null;
  private dataArray: Uint8Array | null = null;
  private serverHum: OscillatorNode | null = null;
  private dataPulse: OscillatorNode | null = null;

  init() {
    if (this.isInitialized) return;
    
    // Create audio context
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    
    this.ctx = new AudioContextClass();
    
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = 0.5; // Master volume

    this.analyser = this.ctx.createAnalyser();
    this.analyser.fftSize = 64; 
    this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    
    this.masterGain.connect(this.analyser);
    this.analyser.connect(this.ctx.destination);

    this.startDataDrone();
    this.isInitialized = true;
  }

  getFrequencyData(): number {
    if (!this.analyser || !this.dataArray) return 0;
    this.analyser.getByteFrequencyData(this.dataArray as any);
    
    let sum = 0;
    for (let i = 0; i < 16; i++) {
      sum += this.dataArray[i];
    }
    const average = sum / 16;
    
    return average / 255.0;
  }

  resume() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private startDataDrone() {
    if (!this.ctx || !this.masterGain) return;

    // 1. Base Server Hum
    this.serverHum = this.ctx.createOscillator();
    this.serverHum.type = 'sine';
    this.serverHum.frequency.value = 60; // 60Hz hum

    const humGain = this.ctx.createGain();
    humGain.gain.value = 0.05; 
    
    this.serverHum.connect(humGain);
    humGain.connect(this.masterGain);
    this.serverHum.start();

    // 2. High-frequency Data Pulse (Digital network feel)
    this.dataPulse = this.ctx.createOscillator();
    this.dataPulse.type = 'square';
    this.dataPulse.frequency.value = 800; // higher pitch

    const pulseFilter = this.ctx.createBiquadFilter();
    pulseFilter.type = 'bandpass';
    pulseFilter.frequency.value = 1200;

    const pulseGain = this.ctx.createGain();
    pulseGain.gain.value = 0; // Starts silent

    // LFO to create a rhythmic telemetry pulsing (like a radar or server blinking)
    const lfo = this.ctx.createOscillator();
    lfo.type = 'square';
    lfo.frequency.value = 4; // 4 pulses per second
    
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.value = 0.015; // Subtle tick volume
    
    lfo.connect(lfoGain);
    lfoGain.connect(pulseGain.gain);

    this.dataPulse.connect(pulseFilter);
    pulseFilter.connect(pulseGain);
    pulseGain.connect(this.masterGain);

    this.dataPulse.start();
    lfo.start();
  }

  setDronePitch(multiplier: number) {
    if (!this.serverHum || !this.ctx || !this.dataPulse) return;
    
    // Pitch up slightly as we scroll/transition
    const targetHum = 60 + (multiplier * 20.0);
    this.serverHum.frequency.setTargetAtTime(targetHum, this.ctx.currentTime, 0.1);

    // Increase the pulse frequency based on intensity
    const targetPulse = 800 + (multiplier * 600.0);
    this.dataPulse.frequency.setTargetAtTime(targetPulse, this.ctx.currentTime, 0.1);
  }

  playTransitionSound(targetSceneIndex: number) {
    if (!this.ctx || !this.masterGain) return;
    this.resume();

    const now = this.ctx.currentTime;

    // A digital telemetry "lock on" chirp instead of an EDM swoosh
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    
    // Quick high-pitched pings
    const baseFreq = 2000 + (targetSceneIndex * 200);
    
    // Create a rapid two-tone chirp
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.setValueAtTime(baseFreq * 1.5, now + 0.05);
    osc.frequency.setValueAtTime(baseFreq * 2.0, now + 0.1);

    // Sharp, percussive volume envelope for digital UI feel
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.1, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2); // Fast fade out

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.25);
  }
}

// Export a singleton instance
export const audioEngine = new AudioEngine();
