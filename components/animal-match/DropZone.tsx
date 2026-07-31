"use client";

import { useDroppable } from "@dnd-kit/core";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, Check, X } from "lucide-react";
import type { Animal } from "./animals";

type Feedback = "correct" | "incorrect" | null;

type DropZoneProps = {
  animal: Animal;
  matchedWord: string | null;
  feedback: Feedback;
  onSpeak: () => void;
};

export function DropZone({
  animal,
  matchedWord,
  feedback,
  onSpeak,
}: DropZoneProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: `drop-${animal.id}`,
    data: { animalId: animal.id },
    disabled: Boolean(matchedWord),
  });

  const isCorrect = feedback === "correct" || Boolean(matchedWord);
  const isIncorrect = feedback === "incorrect";

  return (
    <motion.div
      layout
      animate={
        isIncorrect
          ? { x: [0, -10, 10, -8, 8, -4, 4, 0] }
          : isCorrect
            ? { scale: [1, 1.06, 1] }
            : { scale: 1, x: 0 }
      }
      transition={{ duration: isIncorrect ? 0.45 : 0.4 }}
      className="flex w-full max-w-50 flex-col items-center gap-3"
    >
      <div className="relative">
        <motion.button
          type="button"
          onClick={onSpeak}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group relative flex h-28 w-28 items-center justify-center rounded-4xl border-4 shadow-[0_10px_0_rgba(0,0,0,0.08)] sm:h-32 sm:w-32"
          style={{
            backgroundColor: animal.softColor,
            borderColor: animal.borderColor,
          }}
          aria-label={`Hear ${animal.word}`}
        >
          <motion.span
            className="text-6xl sm:text-7xl"
            animate={{ y: [0, -6, 0] }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: animal.word.length * 0.1,
            }}
          >
            {animal.emoji}
          </motion.span>
          <span className="absolute -right-1 -top-1 flex h-9 w-9 items-center justify-center rounded-full bg-white text-teal-600 shadow-md ring-2 ring-teal-100 transition group-hover:bg-teal-50">
            <Volume2 className="h-4 w-4" />
          </span>
        </motion.button>

        <AnimatePresence>
          {isCorrect && (
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0 }}
              className="absolute -left-2 -top-2 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-400 text-white shadow-lg"
            >
              <Check className="h-5 w-5 stroke-3" />
            </motion.div>
          )}
          {isIncorrect && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -left-2 -top-2 flex h-10 w-10 items-center justify-center rounded-full bg-rose-400 text-white shadow-lg"
            >
              <X className="h-5 w-5 stroke-3" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div
        ref={setNodeRef}
        className={`flex min-h-16 w-full items-center justify-center rounded-2xl border-4 border-dashed px-3 py-3 text-center transition-all ${
          isOver && !matchedWord
            ? "scale-105 border-teal-400 bg-teal-100/80 shadow-[0_0_0_6px_rgba(45,212,191,0.25)]"
            : matchedWord
              ? "border-solid bg-white shadow-inner"
              : "border-teal-300/70 bg-white/50"
        }`}
        style={
          matchedWord
            ? {
                borderColor: animal.borderColor,
                backgroundColor: animal.softColor,
              }
            : undefined
        }
      >
        {matchedWord ? (
          <motion.span
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-xl font-extrabold capitalize tracking-wide text-teal-900 sm:text-2xl"
          >
            {matchedWord}
          </motion.span>
        ) : (
          <span className="text-sm font-bold uppercase tracking-widest text-teal-400/80">
            drop here
          </span>
        )}
      </div>
    </motion.div>
  );
}
