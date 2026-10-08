export type LetterStyle = "victorian" | "unjoined";

export const LETTER_STYLES: { id: LetterStyle; label: string; selectable: boolean }[] = [
  { id: "victorian", label: "Cursive", selectable: true },
  { id: "unjoined", label: "Print", selectable: false },
];
