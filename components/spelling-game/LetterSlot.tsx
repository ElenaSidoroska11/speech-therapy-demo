"use client";

import { useDroppable } from "@dnd-kit/core";
import { motion } from "framer-motion";
import type { LetterTile } from "./words";

type LetterSlotProps = {
  index: number;
  placed: LetterTile | null;
  softColor: string;
  borderColor: string;
  status: "idle" | "correct" | "incorrect" | "complete";
  onClear?: () => void;
};

export function LetterSlot({
  index,
  placed,
  softColor,
  borderColor,
  status,
  onClear,
}: LetterSlotProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: `slot-${index}`,
    disabled: status === "complete" || !!placed,
  });

  const ring =
    status === "correct" || status === "complete"
      ? "ring-4 ring-emerald-400"
      : status === "incorrect"
        ? "ring-4 ring-rose-400"
        : isOver
          ? "ring-4 ring-teal-400"
          : "ring-2 ring-teal-100";

  return (
    <motion.div
      ref={setNodeRef}
      animate={
        status === "incorrect"
          ? { x: [0, -8, 8, -6, 6, 0] }
          : status === "correct" || status === "complete"
            ? { scale: [1, 1.08, 1] }
            : { scale: isOver ? 1.06 : 1 }
      }
      transition={{ duration: status === "incorrect" ? 0.4 : 0.25 }}
      className={`flex h-14 w-14 items-center justify-center rounded-2xl border-4 border-dashed sm:h-16 sm:w-16 ${ring} ${
        placed ? "border-solid bg-white/90" : "border-teal-300/70 bg-white/45"
      }`}
      style={
        placed
          ? { backgroundColor: softColor, borderColor, borderStyle: "solid" }
          : undefined
      }
    >
      {placed ? (
        <button
          type="button"
          onClick={onClear}
          disabled={status === "complete"}
          className="text-2xl font-extrabold text-teal-900 sm:text-3xl disabled:cursor-default"
          aria-label={`Remove letter ${placed.letter} from slot ${index + 1}`}
        >
          {placed.letter}
        </button>
      ) : (
        <span className="text-2xl font-bold text-teal-300/80 sm:text-3xl">
          _
        </span>
      )}
    </motion.div>
  );
}
