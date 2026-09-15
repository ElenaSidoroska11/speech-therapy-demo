let audioCtx: AudioContext | null = null;

function getAudioContext() {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  return audioCtx;
}

function tone(freq: number, start: number, duration: number, type: OscillatorType = "sine", gain = 0.12) {
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  g.gain.setValueAtTime(gain, ctx.currentTime + start);
  g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + start + duration);
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

let yayyAudio: HTMLAudioElement | null = null;

export function playYayy() {
  if (typeof window === "undefined") return;

  if (yayyAudio) {
    yayyAudio.pause();
    yayyAudio.currentTime = 0;
  }

  const audio = new Audio("/kids-yayy.mp3");
  yayyAudio = audio;
  void audio.play().catch(() => {});
}

let introAudio: HTMLAudioElement | null = null;
let introCompleteHandler: (() => void) | null = null;

export function playIntro(onComplete?: () => void): () => void {
  if (typeof window === "undefined") return () => {};

  if (introAudio && introCompleteHandler) {
    introAudio.removeEventListener("ended", introCompleteHandler);
  }
  if (introAudio) {
    introAudio.pause();
    introAudio.currentTime = 0;
  }

  let finished = false;
  const finish = () => {
    if (finished) return;
    finished = true;
    introCompleteHandler = null;
    onComplete?.();
  };

  const audio = new Audio("/intro.wav");
  introAudio = audio;
  introCompleteHandler = finish;
  audio.addEventListener("ended", finish, { once: true });
  void audio.play().catch(() => {});

  return () => {
    finished = true;
    audio.removeEventListener("ended", finish);
    if (introCompleteHandler === finish) {
      introCompleteHandler = null;
    }
    audio.pause();
    audio.currentTime = 0;
    if (introAudio === audio) {
      introAudio = null;
    }
  };
}

export function playIntroThenPhoneme(phonemeSrc?: string): () => void {
  return playIntro(() => {
    if (phonemeSrc) playPhonemeSound(phonemeSrc);
  });
}

let watchHowAudio: HTMLAudioElement | null = null;
let watchHowCompleteHandler: (() => void) | null = null;

export function playWatchHow(onComplete?: () => void): () => void {
  if (typeof window === "undefined") return () => {};

  if (watchHowAudio && watchHowCompleteHandler) {
    watchHowAudio.removeEventListener("ended", watchHowCompleteHandler);
  }
  if (watchHowAudio) {
    watchHowAudio.pause();
    watchHowAudio.currentTime = 0;
  }

  let finished = false;
  const finish = () => {
    if (finished) return;
    finished = true;
    watchHowCompleteHandler = null;
    onComplete?.();
  };

  const audio = new Audio("/watch-how.wav");
  watchHowAudio = audio;
  watchHowCompleteHandler = finish;
  audio.addEventListener("ended", finish, { once: true });
  void audio.play().catch(() => {});

  return () => {
    finished = true;
    audio.removeEventListener("ended", finish);
    if (watchHowCompleteHandler === finish) {
      watchHowCompleteHandler = null;
    }
    audio.pause();
    audio.currentTime = 0;
    if (watchHowAudio === audio) {
      watchHowAudio = null;
    }
  };
}

let letterPracticeAudio: HTMLAudioElement | null = null;

export function playLetterPractice(): () => void {
  if (typeof window === "undefined") return () => {};

  if (letterPracticeAudio) {
    letterPracticeAudio.pause();
    letterPracticeAudio.currentTime = 0;
  }

  const audio = new Audio("/letter-practice.wav");
  letterPracticeAudio = audio;
  void audio.play().catch(() => {});

  return () => {
    audio.pause();
    audio.currentTime = 0;
    if (letterPracticeAudio === audio) {
      letterPracticeAudio = null;
    }
  };
}

let phonemeAudio: HTMLAudioElement | null = null;

export function playPhonemeSound(src: string) {
  if (typeof window === "undefined") return;

  if (phonemeAudio) {
    phonemeAudio.pause();
    phonemeAudio.currentTime = 0;
  }

  phonemeAudio = new Audio(src);
  void phonemeAudio.play().catch(() => {});
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
