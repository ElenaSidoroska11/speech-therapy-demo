import type { LetterDefinition, LetterId } from "./letters";
import { LetterPicker } from "./LetterPicker";

type TraceExerciseHeaderProps = {
  letter: LetterDefinition;
  letterId: LetterId;
  onSelectLetter: (id: LetterId) => void;
  showLetterPicker?: boolean;
};

export function TraceExerciseHeader({
  letter,
  letterId,
  onSelectLetter,
  showLetterPicker = true,
}: TraceExerciseHeaderProps) {
  return (
    <>
      <header className="shrink-0 text-center">
        <h1 className="mt-0.5 font-(family-name:--font-display) text-xl font-extrabold tracking-wide text-[#e52328] drop-shadow-[0_2px_0_rgba(15,118,110,0.25)] sm:text-3xl md:text-4xl">
          Write '{letter.letter}'
        </h1>
        <p className="mt-2 max-w-lg font-(family-name:--font-display) text-lg font-bold leading-tight tracking-tight text-white drop-shadow-[0_3px_0_rgba(15,118,110,0.25)] sm:mt-3 sm:max-w-2xl sm:text-2xl md:max-w-3xl md:text-3xl">
          Watch how the letter is written, then trace it with your finger, stylus or mouse.
        </p>
      </header>

      {showLetterPicker && (
        <LetterPicker letterId={letterId} onSelect={onSelectLetter} className="md:hidden" />
      )}
    </>
  );
}
