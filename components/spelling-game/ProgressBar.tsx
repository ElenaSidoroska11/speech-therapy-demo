"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { LEVEL_LABELS, type SpellingLevel } from "./words";

type ProgressBarProps = {
  level: SpellingLevel;
  wordIndex: number;
  wordsInLevel: number;
  stars: number;
  totalStarsEarned: number;
};

export function ProgressBar({
  level,
  wordIndex,
  wordsInLevel,
  stars,
  totalStarsEarned,
}: ProgressBarProps) {
  const filled = (wordIndex / wordsInLevel) * 100;

  return (
    <div className="flex w-full max-w-lg flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm font-bold text-teal-800">
        <span className="rounded-full bg-teal-500/15 px-3 py-1 text-teal-700">
          Level {level} · {LEVEL_LABELS[level]}
        </span>
        <span className="flex items-center gap-1.5 text-amber-700">
          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
          {totalStarsEarned} stars
        </span>
        <span className="text-teal-600/80">
          Word {Math.min(wordIndex + 1, wordsInLevel)}/{wordsInLevel}
        </span>
      </div>

      <div
        className="h-4 overflow-hidden rounded-full bg-white/60 shadow-inner ring-2 ring-teal-100"
        role="progressbar"
        aria-valuenow={Math.round(filled)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Level progress"
      >
        <motion.div
          className="h-full rounded-full bg-linear-to-r from-teal-400 via-emerald-400 to-amber-300"
          initial={{ width: 0 }}
          animate={{ width: `${filled}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        />
      </div>

      <div className="flex justify-center gap-1.5">
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.span
            key={i}
            animate={{ scale: i < stars ? [1, 1.25, 1] : 1 }}
            transition={{ duration: 0.35 }}
          >
            <Star
              className={`h-6 w-6 ${
                i < stars
                  ? "fill-amber-400 text-amber-400"
                  : "fill-white/50 text-teal-200"
              }`}
            />
          </motion.span>
        ))}
      </div>
    </div>
  );
}
