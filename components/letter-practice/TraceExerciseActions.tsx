import { motion } from "framer-motion";
import { ArrowRight, RotateCcw } from "lucide-react";
import { getLetter, type LetterId } from "./letters";

type TraceExerciseActionsProps = {
  complete: boolean;
  progress: number;
  nextLetter: LetterId | null;
  onClear: () => void;
  onNext: (id: LetterId) => void;
};

export function TraceExerciseActions({
  complete,
  progress,
  nextLetter,
  onClear,
  onNext,
}: TraceExerciseActionsProps) {
  return (
    <div className="flex min-h-0 shrink-0 flex-wrap items-center justify-center gap-3">
      {!complete && progress > 0 && (
        <motion.button
          type="button"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={onClear}
          className="inline-flex items-center gap-2 rounded-2xl bg-sky-500 px-4 py-3 font-extrabold text-white ring-2 ring-white/70">
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
          className="inline-flex items-center gap-2 rounded-2xl bg-[#FDA702] px-5 py-3 font-extrabold text-white  ring-2 ring-white/70">
          <span className="text-xl leading-none"> Next: {getLetter(nextLetter).letter}</span>
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
