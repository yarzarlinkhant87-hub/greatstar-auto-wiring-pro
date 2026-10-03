// Web Audio API chime sound generator for traditional resonance
let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioCtxClass) {
      audioCtx = new AudioCtxClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Plays a resonant Burmese brass gong / singing bell chime
 */
export function playChime(frequency = 528, duration = 2.2): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    
    // Fundamental tone
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    // Harmonic overtone for metallic brass warmth
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(frequency, now);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(frequency * 2.76, now); // Bell harmonic ratio

    // Envelope
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.35, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    gain2.gain.setValueAtTime(0, now);
    gain2.gain.linearRampToValueAtTime(0.12, now + 0.02);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + duration * 0.7);

    osc.connect(gain);
    osc2.connect(gain2);

    gain.connect(ctx.destination);
    gain2.connect(ctx.destination);

    osc.start(now);
    osc2.start(now);

    osc.stop(now + duration);
    osc2.stop(now + duration);
  } catch {
    // Audio context may be restricted before user gesture
  }
}

/**
 * Text-to-speech fallback
 */
export function speakText(text: string): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    
    // Check if Burmese or generic voice is available
    const voices = window.speechSynthesis.getVoices();
    const myVoice = voices.find(v => v.lang.startsWith('my') || v.lang.includes('burmese'));
    if (myVoice) {
      utterance.voice = myVoice;
    }
    
    window.speechSynthesis.speak(utterance);
  } catch {
    // Graceful fallback
  }
}
