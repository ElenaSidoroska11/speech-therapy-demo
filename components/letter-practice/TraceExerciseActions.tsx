import { motion } from "framer-motion";
import { ArrowRight, RotateCcw } from "lucide-react";
import { getLetter, type LetterDefinition, type LetterId } from "./letters";

type TraceExerciseActionsProps = {
  complete: boolean;
  progress: number;
  nextLetter: LetterId | null;
  onClear: () => void;
  onNext: (id: LetterId) => void;
  resolveLetter?: (id: LetterId) => LetterDefinition;
};

export function TraceExerciseActions({
  complete,
  progress,
  nextLetter,
  onClear,
  onNext,
  resolveLetter = getLetter,
}: TraceExerciseActionsProps) {
  return (
    <div className="flex min-h-0 shrink-0 flex-wrap items-center justify-center gap-3">
      {!complete && progress > 0 && (
        <motion.button
          type="button"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={onClear}
          className="mt-2 inline-flex items-center gap-2 rounded-2xl bg-sky-500 px-4 py-3 font-extrabold text-white ring-2 ring-white/70 md:mt-0">
          <RotateCcw className="h-7 w-7 text-white" strokeWidth={3} />
          <span className="text-xl leading-none">Clear</span>
        </motion.button>
      )}

      {complete && nextLetter && (
        <motion.button
          type="button"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => onNext(nextLetter)}
          className="mt-2 inline-flex items-center gap-2 rounded-2xl bg-[#FDA702] px-5 py-3 font-extrabold text-white ring-2 ring-white/70 md:mt-0">
          <span className="text-xl leading-none"> Next: {resolveLetter(nextLetter).letter}</span>
          <ArrowRight className="h-7 w-7 text-white" strokeWidth={3} />
        </motion.button>
      )}

      {complete && !nextLetter && (
        <motion.button
          type="button"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={onClear}
          className="inline-flex items-center gap-2 rounded-2xl bg-[#FDA702] px-5 py-3 font-extrabold text-white  ring-2 ring-white/70">
          <span className="text-xl leading-none">Repeat</span>
          <RotateCcw className="h-7 w-7 text-white" strokeWidth={3} />
        </motion.button>
      )}
    </div>
  );
}
