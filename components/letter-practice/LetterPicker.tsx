import {
  AVAILABLE_LETTERS,
  getLetter,
  isSelectableLetter,
  type LetterDefinition,
  type LetterId,
} from "./letters";
import { LetterGlyphPreview } from "./LetterGlyphPreview";

const SIDEBAR_BUTTON =
  "flex items-center justify-center rounded-xl ring-2 transition";

type LetterPickerProps = {
  letterId?: LetterId;
  onSelect?: (id: LetterId) => void;
  variant?: "compact" | "sidebar" | "panel";
  className?: string;
  letters?: LetterId[];
  placeholderCount?: number;
  disabled?: boolean;
  display?: "text" | "glyph";
  /** Resolve a letter definition (defaults to cursive `getLetter`). */
  resolveLetter?: (id: LetterId) => LetterDefinition;
  /** Whether an id is selectable (defaults to cursive registry check). */
  isLetterSelectable?: (id: LetterId) => boolean;
};

function LetterPickerContent({
  id,
  display,
  selected,
  size,
  resolveLetter,
}: {
  id: LetterId;
  display: "text" | "glyph";
  selected: boolean;
  size: "compact" | "sidebar" | "panel";
  resolveLetter: (id: LetterId) => LetterDefinition;
}) {
  const letter = resolveLetter(id);
  const glyphStroke = selected ? "#FFFFFF" : "#FDA702";

  if (display === "glyph") {
    const glyphBox =
      size === "panel"
        ? "h-9 w-9 sm:h-11 sm:w-11"
        : size === "sidebar"
          ? "absolute inset-1"
          : "h-6 w-6";

    return (
      <span className={`inline-flex items-center justify-center ${glyphBox}`}>
        <LetterGlyphPreview letter={letter} stroke={glyphStroke} className="h-full w-full" />
      </span>
    );
  }

  return (
    <span
      className={`font-extrabold leading-none ${
        size === "panel" ? "text-2xl sm:text-3xl" : size === "sidebar" ? "text-2xl" : "text-xl"
      }`}>
      {letter.letter}
    </span>
  );
}

const GRID_BY_VARIANT = {
  sidebar: "grid grid-cols-5 justify-items-center gap-2",
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
  resolveLetter = getLetter,
  isLetterSelectable = isSelectableLetter,
}: LetterPickerProps) {
  const tiled = variant === "sidebar" || variant === "panel";
  const hasLetters = letters.length > 0;
  const hasPlaceholders = placeholderCount > 0;

  if (!hasLetters && !hasPlaceholders) return null;
  if (!tiled && letters.length <= 1 && !hasPlaceholders) return null;

  return (
    <div
      className={`w-full shrink-0 ${
        tiled ? GRID_BY_VARIANT[variant] : "flex flex-wrap justify-center gap-2"
      } ${className}`}>
      {letters.map((id) => {
        const enabled = !disabled && isLetterSelectable(id);
        const selected = enabled && id === letterId;
        const tilePad = variant === "sidebar" ? "relative w-[92%]" : "w-full p-1";
        const shape = tiled
          ? `${SIDEBAR_BUTTON} aspect-square ${tilePad}`
          : "rounded-xl px-2.5 py-1 text-sm font-extrabold ring-2";
        const content = (
          <LetterPickerContent
            id={id}
            display={display}
            selected={selected}
            size={variant}
            resolveLetter={resolveLetter}
          />
        );

        if (!enabled) {
          return (
            <div
              key={id}
              aria-disabled="true"
              className={`${shape} cursor-default bg-[#B9E3F2] text-[#FDA702] ring-[#78C4E3]`}>
              {content}
            </div>
          );
        }

        return (
          <button
            key={id}
            type="button"
            onClick={() => onSelect?.(id)}
            className={`${shape} ${
              selected
                ? "bg-[#FDA702] text-white ring-white/70"
                : "bg-[#B9E3F2] text-[#FDA702] ring-[#78C4E3] hover:bg-[#A5DAEE]"
            }`}>
            {content}
          </button>
        );
      })}
      {Array.from({ length: placeholderCount }, (_, i) => (
        <div
          key={`placeholder-${i}`}
          aria-hidden
          className={`${SIDEBAR_BUTTON} aspect-square bg-white/30 text-transparent ring-white/30 ${
            variant === "sidebar" ? "w-[92%]" : "w-full"
          }`}
        />
      ))}
    </div>
  );
}
