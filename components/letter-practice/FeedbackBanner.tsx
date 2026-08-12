"use client";

import { AnimatePresence, motion } from "framer-motion";

type FeedbackBannerProps = {
  message: string | null;
  tone?: "success" | "hint" | "error";
};

const TONE_STYLES: Record<NonNullable<FeedbackBannerProps["tone"]>, string> = {
  success: "text-teal-950",
  hint: "text-teal-950",
  error: "text-rose-900",
};

export function FeedbackBanner({ message, tone = "success" }: FeedbackBannerProps) {
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
            className={`text-center text-2xl font-black sm:text-3xl tracking-tight ${TONE_STYLES[tone]}`}
            style={{ fontFamily: "'Baloo 2', 'Nunito', system-ui, sans-serif" }}>
            {message}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}