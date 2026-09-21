import { AVAILABLE_LETTERS, getLetter, type LetterId } from "./letters";
import { LetterGlyphPreview } from "./LetterGlyphPreview";

const SIDEBAR_BUTTON =
  "flex w-full items-center justify-center rounded-xl ring-2 transition";

type LetterPickerProps = {
  letterId?: LetterId;
  onSelect?: (id: LetterId) => void;
  variant?: "compact" | "sidebar" | "panel";
  className?: string;
  letters?: LetterId[];
  placeholderCount?: number;
  disabled?: boolean;
  display?: "text" | "glyph";
};

function LetterPickerContent({
  id,
  display,
  selected,
  dense,
}: {
  id: LetterId;
  display: "text" | "glyph";
  selected: boolean;
  dense?: boolean;
}) {
  const letter = getLetter(id);
  const glyphStroke = selected ? "#FFFFFF" : "#FDA702";

  if (display === "glyph") {
    return (
      <span
        className={`inline-flex items-center justify-center ${
          dense ? "h-7 w-7 sm:h-8 sm:w-8" : "h-6 w-6"
        }`}>
        <LetterGlyphPreview letter={letter} stroke={glyphStroke} className="h-full w-full" />
      </span>
    );
  }

  return (
    <span
      className={`font-extrabold leading-none ${
        dense ? "text-xl sm:text-2xl" : "text-xl"
      }`}>
      {letter.letter}
    </span>
  );
}

const GRID_BY_VARIANT = {
  sidebar: "grid grid-cols-5 gap-2",
  // Wider panel: more letters per row so the card stays shorter on screen
  panel: "grid grid-cols-6 gap-1.5 sm:grid-cols-7 sm:gap-2 md:grid-cols-9",
} as const;

export function LetterPicker({
  letterId,
  onSelect,
  variant = "compact",
  className = "",
  letters = AVAILABLE_LETTERS,
  placeholderCount = 0,
  disabled = false,
  display = "text",
}: LetterPickerProps) {
  const tiled = variant === "sidebar" || variant === "panel";
  const dense = variant === "panel";
  const hasLetters = letters.length > 0;
  const hasPlaceholders = placeholderCount > 0;

  if (!hasLetters && !hasPlaceholders) return null;
  if (!tiled && letters.length <= 1 && !hasPlaceholders) return null;

  return (
    <div
      className={`w-full shrink-0 ${
        tiled ? GRID_BY_VARIANT[variant] : "flex flex-wrap justify-center gap-2"
      } ${className}`}>
      {letters.map((id) =>
        disabled ? (
          <div
            key={id}
            aria-disabled="true"
            className={`${
              tiled
                ? `${SIDEBAR_BUTTON} aspect-square ${dense ? "p-1" : "p-1.5"}`
                : "rounded-xl px-3 py-1.5 text-sm font-extrabold ring-2"
            } cursor-default bg-white/70 text-[#FDA702] ring-white/50`}>
            <LetterPickerContent
              id={id}
              display={display}
              selected={false}
              dense={dense}
            />
          </div>
        ) : (
          <button
            key={id}
            type="button"
            onClick={() => onSelect?.(id)}
            className={`${
              tiled
                ? `${SIDEBAR_BUTTON} aspect-square ${dense ? "p-1" : "p-1.5"}`
                : "rounded-xl px-3 py-1.5 text-sm font-extrabold ring-2 transition"
            } ${
              id === letterId
                ? "bg-[#FDA702] text-white ring-white/70"
                : "bg-white/70 text-[#FDA702] ring-white/50 hover:bg-white"
            }`}>
            <LetterPickerContent
              id={id}
              display={display}
              selected={id === letterId}
              dense={dense}
            />
          </button>
        ),
      )}
      {Array.from({ length: placeholderCount }, (_, i) => (
        <div
          key={`placeholder-${i}`}
          aria-hidden
          className={`${SIDEBAR_BUTTON} aspect-square bg-white/30 text-transparent ring-white/30`}
        />
      ))}
    </div>
  );
}
