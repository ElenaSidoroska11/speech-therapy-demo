export type AnimalId = "dog" | "cat" | "mouse" | "bird" | "fish" | "frog";

export type Animal = {
  id: AnimalId;
  word: string;
  emoji: string;
  color: string;
  softColor: string;
  borderColor: string;
};

export const ANIMALS: Animal[] = [
  {
    id: "dog",
    word: "dog",
    emoji: "🐶",
    color: "#F59E0B",
    softColor: "#FEF3C7",
    borderColor: "#FBBF24",
  },
  {
    id: "cat",
    word: "cat",
    emoji: "🐱",
    color: "#F97316",
    softColor: "#FFEDD5",
    borderColor: "#FB923C",
  },
  {
    id: "mouse",
    word: "mouse",
    emoji: "🐭",
    color: "#14B8A6",
    softColor: "#CCFBF1",
    borderColor: "#2DD4BF",
  },
  {
    id: "bird",
    word: "bird",
    emoji: "🐦",
    color: "#0EA5E9",
    softColor: "#E0F2FE",
    borderColor: "#38BDF8",
  },
  {
    id: "fish",
    word: "fish",
    emoji: "🐟",
    color: "#06B6D4",
    softColor: "#CFFAFE",
    borderColor: "#22D3EE",
  },
  {
    id: "frog",
    word: "frog",
    emoji: "🐸",
    color: "#22C55E",
    softColor: "#DCFCE7",
    borderColor: "#4ADE80",
  },
];

export function pickRoundAnimals(count = 3): Animal[] {
  const shuffled = [...ANIMALS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function shuffleWords(animals: Animal[]): Animal[] {
  return [...animals].sort(() => Math.random() - 0.5);
}

/** Stable first round for SSR / hydration (matches the classic demo). */
export function createInitialRound() {
  const targets = ANIMALS.filter((a) =>
    (["dog", "cat", "mouse"] as AnimalId[]).includes(a.id),
  );
  return {
    targets,
    words: [...targets].reverse(),
  };
}

export function createRandomRound(count = 3) {
  const targets = pickRoundAnimals(count);
  return {
    targets,
    words: shuffleWords(targets),
  };
}
