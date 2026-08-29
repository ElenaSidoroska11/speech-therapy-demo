let audioCtx: AudioContext | null = null;

function getAudioContext() {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  return audioCtx;
}

function tone(
  freq: number,
  start: number,
  duration: number,
  type: OscillatorType = "sine",
  gain = 0.12,
) {
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  g.gain.setValueAtTime(gain, ctx.currentTime + start);
  g.gain.exponentialRampToValueAtTime(
    0.001,
    ctx.currentTime + start + duration,
  );
  osc.connect(g);
  g.connect(ctx.destination);
  osc.start(ctx.currentTime + start);
  osc.stop(ctx.currentTime + start + duration);
}

export function playSuccessChime() {
  tone(523.25, 0, 0.15, "triangle", 0.14);
  tone(659.25, 0.12, 0.18, "triangle", 0.14);
  tone(783.99, 0.24, 0.28, "triangle", 0.16);
}

export function playWrongBuzz() {
  tone(180, 0, 0.12, "sawtooth", 0.08);
  tone(140, 0.1, 0.18, "sawtooth", 0.06);
}

export function playDropSoft() {
  tone(420, 0, 0.08, "sine", 0.06);
}

export function playCelebration() {
  const notes = [523.25, 659.25, 783.99, 1046.5, 783.99, 1046.5];
  notes.forEach((freq, i) => {
    tone(freq, i * 0.1, 0.22, "triangle", 0.12);
  });
}

export function speakWord(word: string) {
  if (typeof window === "undefined" || !window.speechSynthesis) return;

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.rate = 0.85;
  utterance.pitch = 1.15;
  utterance.volume = 1;

  const voices = window.speechSynthesis.getVoices();
  const kidFriendly =
    voices.find((v) => /samantha|karen|google us english|female/i.test(v.name)) ??
    voices.find((v) => v.lang.startsWith("en"));

  if (kidFriendly) utterance.voice = kidFriendly;
  window.speechSynthesis.speak(utterance);
}
