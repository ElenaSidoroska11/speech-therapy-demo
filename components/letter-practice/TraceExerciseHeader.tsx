import type { LetterDefinition } from "./letters";
import { LetterGlyphPreview } from "./LetterGlyphPreview";

type TraceExerciseHeaderProps = {
  letter: LetterDefinition;
};

export function TraceExerciseHeader({ letter }: TraceExerciseHeaderProps) {
  return (
    <header className="shrink-0 text-center">
      <h1 className="mt-0.5 font-(family-name:--font-display) text-lg font-extrabold tracking-wide text-[#e52328] drop-shadow-[0_2px_0_rgba(15,118,110,0.25)] sm:text-3xl md:text-4xl">
        Write &apos;
        <span
          className="mx-[0.05em] inline-block size-[1cap] align-baseline"
          aria-label={letter.letter}>
          <LetterGlyphPreview
            letter={letter}
            stroke="currentColor"
            className="h-full w-full"
            anchor="baseline"
          />
        </span>
        &apos;
      </h1>
    <p className="mt-1.5 max-w-lg font-(family-name:--font-display) text-sm font-bold leading-snug tracking-tight text-[#E89500] drop-shadow-[0_2px_0_rgba(15,118,110,0.25)] sm:mt-3 sm:max-w-2xl sm:text-2xl sm:leading-tight md:max-w-3xl md:text-3xl">
  Watch how the letter is written, then trace it with your finger, stylus or
  mouse.
</p>
    </header>
  );
}
