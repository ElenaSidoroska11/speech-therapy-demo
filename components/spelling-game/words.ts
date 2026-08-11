export type SpellingLevel = 1 | 2 | 3;

export type SpellingWord = {
  id: string;
  word: string;
  emoji: string;
  hint: string;
  softColor: string;
  borderColor: string;
  level: SpellingLevel;
};

export const SPELLING_WORDS: SpellingWord[] = [
  // Level 1 — short words
  {
    id: "cat",
    word: "CAT",
    emoji: "🐱",
    hint: "A soft pet that says meow",
    softColor: "#FFE4C4",
    borderColor: "#F0B27A",
    level: 1,
  },
  {
    id: "dog",
    word: "DOG",
    emoji: "🐶",
    hint: "A friendly pet that barks",
    softColor: "#D6EAF8",
    borderColor: "#7FB3D5",
    level: 1,
  },
  {
    id: "sun",
    word: "SUN",
    emoji: "☀️",
    hint: "Bright light in the sky",
    softColor: "#FCF3CF",
    borderColor: "#F4D03F",
    level: 1,
  },
  {
    id: "bee",
    word: "BEE",
    emoji: "🐝",
    hint: "Makes honey and buzzes",
    softColor: "#F9E79F",
    borderColor: "#F5B041",
    level: 1,
  },
  {
    id: "hat",
    word: "HAT",
    emoji: "🎩",
    hint: "You wear it on your head",
    softColor: "#E8DAEF",
    borderColor: "#AF7AC5",
    level: 1,
  },
  // Level 2 — medium words
  {
    id: "apple",
    word: "APPLE",
    emoji: "🍎",
    hint: "A crunchy red fruit",
    softColor: "#FADBD8",
    borderColor: "#E74C3C",
    level: 2,
  },
  {
    id: "fish",
    word: "FISH",
    emoji: "🐠",
    hint: "Swims in the water",
    softColor: "#D5F5E3",
    borderColor: "#58D68D",
    level: 2,
  },
  {
    id: "star",
    word: "STAR",
    emoji: "⭐",
    hint: "Twinkles at night",
    softColor: "#FCF3CF",
    borderColor: "#F4D03F",
    level: 2,
  },
  {
    id: "tree",
    word: "TREE",
    emoji: "🌳",
    hint: "Tall and green outside",
    softColor: "#D5F5E3",
    borderColor: "#27AE60",
    level: 2,
  },
  {
    id: "book",
    word: "BOOK",
    emoji: "📚",
    hint: "Full of stories to read",
    softColor: "#D6EAF8",
    borderColor: "#5DADE2",
    level: 2,
  },
  // Level 3 — longer words
  {
    id: "flower",
    word: "FLOWER",
    emoji: "🌸",
    hint: "Pretty petals that bloom",
    softColor: "#F5B7B1",
    borderColor: "#EC7063",
    level: 3,
  },
  {
    id: "rabbit",
    word: "RABBIT",
    emoji: "🐰",
    hint: "Hops with long ears",
    softColor: "#F5EEF8",
    borderColor: "#BB8FCE",
    level: 3,
  },
  {
    id: "orange",
    word: "ORANGE",
    emoji: "🍊",
    hint: "A juicy citrus fruit",
    softColor: "#FDEBD0",
    borderColor: "#E67E22",
    level: 3,
  },
  {
    id: "banana",
    word: "BANANA",
    emoji: "🍌",
    hint: "Yellow and peelable",
    softColor: "#FCF3CF",
    borderColor: "#F1C40F",
    level: 3,
  },
  {
    id: "butterfly",
    word: "BUTTERFLY",
    emoji: "🦋",
    hint: "Flutters with colorful wings",
    softColor: "#D6EAF8",
    borderColor: "#5DADE2",
    level: 3,
  },
];

export const LEVEL_LABELS: Record<SpellingLevel, string> = {
  1: "Easy",
  2: "Medium",
  3: "Challenge",
};

export type LetterTile = {
  id: string;
  letter: string;
};

export function wordsForLevel(level: SpellingLevel): SpellingWord[] {
  return SPELLING_WORDS.filter((w) => w.level === level);
}

/** Fisher–Yates shuffle — returns a new array. */
export function shuffle<T>(items: T[]): T[] {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

export function createLetterTiles(word: string): LetterTile[] {
  const letters = word.toUpperCase().split("");
  return shuffle(
    letters.map((letter, index) => ({
      id: `${letter}-${index}-${Math.random().toString(36).slice(2, 7)}`,
      letter,
    })),
  );
}
