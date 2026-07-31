"use client";

import { motion } from "framer-motion";
import { Star, Sparkles } from "lucide-react";

type ScoreBoardProps = {
  score: number;
  matched: number;
  total: number;
  streak: number;
};

export function ScoreBoard({ score, matched, total, streak }: ScoreBoardProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
      <motion.div
        key={score}
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        className="flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 shadow-md ring-2 ring-amber-200 backdrop-blur"
      >
        <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
        <span className="text-lg font-extrabold text-amber-700">{score}</span>
        <span className="text-sm font-semibold text-amber-600/80">stars</span>
      </motion.div>

      <div className="flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 shadow-md ring-2 ring-teal-200 backdrop-blur">
        <Sparkles className="h-5 w-5 text-teal-500" />
        <span className="text-lg font-extrabold text-teal-700">
          {matched}/{total}
        </span>
        <span className="text-sm font-semibold text-teal-600/80">matched</span>
      </div>

      {streak > 1 && (
        <motion.div
          initial={{ scale: 0, y: 8 }}
          animate={{ scale: 1, y: 0 }}
          className="rounded-full bg-rose-400 px-4 py-2 text-sm font-extrabold text-white shadow-md"
        >
          {streak} in a row! 🔥
        </motion.div>
      )}
    </div>
  );
}
