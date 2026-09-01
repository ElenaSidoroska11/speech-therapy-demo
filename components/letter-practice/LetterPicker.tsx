import { AVAILABLE_LETTERS, getLetter, type LetterId } from "./letters";

type LetterPickerProps = {
  letterId: LetterId;
  onSelect: (id: LetterId) => void;
  variant?: "compact" | "sidebar";
  className?: string;
};

export function LetterPicker({
  letterId,
  onSelect,
  variant = "compact",
  className = "",
}: LetterPickerProps) {
  if (AVAILABLE_LETTERS.length <= 1) return null;

  const sidebar = variant === "sidebar";

  return (
    <div
      className={`w-full shrink-0 ${
        sidebar ? "grid grid-cols-4 gap-2" : "flex flex-wrap justify-center gap-2"
      } ${className}`}>
      {AVAILABLE_LETTERS.map((id) => (
        <button
          key={id}
          type="button"
          onClick={() => onSelect(id)}
          className={`font-extrabold ring-2 transition ${
            sidebar
              ? "flex w-full items-center justify-center rounded-2xl py-2 text-2xl"
              : "rounded-xl px-3 py-1.5 text-sm"
          } ${
            id === letterId
              ? "bg-[#FDA702] text-white ring-white/70"
              : "bg-white/70 text-[#FDA702] ring-white/50 hover:bg-white"
          }`}>
          {getLetter(id).letter}
        </button>
      ))}
    </div>
  );
}
