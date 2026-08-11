"use client";

import { AnimatePresence, motion } from "framer-motion";

type FeedbackBannerProps = {
  message: string | null;
  tone?: "success" | "hint" | "error";
};

const TONE_STYLES: Record<
  NonNullable<FeedbackBannerProps["tone"]>,
  string
> = {
  success: "bg-emerald-500 text-white shadow-[0_6px_0_#047857]",
  hint: "bg-amber-300 text-amber-950 shadow-[0_6px_0_#D97706]",
  error: "bg-rose-400 text-white shadow-[0_6px_0_#E11D48]",
};

export function FeedbackBanner({
  message,
  tone = "success",
}: FeedbackBannerProps) {
  return (
    <div className="flex min-h-14 items-center justify-center">
      <AnimatePresence mode="wait">
        {message ? (
          <motion.p
            key={`${tone}-${message}`}
            role="status"
            initial={{ opacity: 0, y: 12, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 380, damping: 24 }}
            className={`rounded-2xl px-5 py-3 text-center text-lg font-extrabold sm:text-xl ${TONE_STYLES[tone]}`}
          >
            {message}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
