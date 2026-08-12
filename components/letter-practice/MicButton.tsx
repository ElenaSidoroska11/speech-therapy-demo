"use client";

import { motion } from "framer-motion";
import { Mic, MicOff } from "lucide-react";

type MicButtonProps = {
  listening: boolean;
  disabled?: boolean;
  unsupported?: boolean;
  onClick: () => void;
};

export function MicButton({
  listening,
  disabled,
  unsupported,
  onClick,
}: MicButtonProps) {
  return (
    <div className="relative flex flex-col items-center gap-3">
      {listening && (
        <>
          <motion.span
            aria-hidden
            className="absolute h-28 w-28 rounded-full bg-teal-400/30 sm:h-32 sm:w-32"
            animate={{ scale: [1, 1.35, 1], opacity: [0.55, 0.15, 0.55] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.span
            aria-hidden
            className="absolute h-28 w-28 rounded-full bg-teal-300/25 sm:h-32 sm:w-32"
            animate={{ scale: [1, 1.55, 1], opacity: [0.4, 0, 0.4] }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.2,
            }}
          />
        </>
      )}

      <motion.button
        type="button"
        whileHover={disabled ? undefined : { scale: 1.05 }}
        whileTap={disabled ? undefined : { scale: 0.94 }}
        onClick={onClick}
        disabled={disabled || unsupported}
        aria-pressed={listening}
        aria-label={
          unsupported
            ? "Speech recognition not supported"
            : listening
              ? "Listening — tap to stop"
              : "Press to speak the sound"
        }
        className={`relative z-10 flex h-24 w-24 items-center justify-center rounded-full text-white shadow-lg transition sm:h-28 sm:w-28 ${
          unsupported
            ? "cursor-not-allowed bg-slate-400 shadow-[0_6px_0_#64748B]"
            : listening
              ? "bg-rose-500 shadow-[0_6px_0_#BE123C]"
              : "bg-teal-600 shadow-[0_6px_0_#0F766E] hover:bg-teal-500"
        } disabled:opacity-60`}
      >
        {unsupported ? (
          <MicOff className="h-10 w-10 sm:h-12 sm:w-12" />
        ) : (
          <Mic className="h-10 w-10 sm:h-12 sm:w-12" />
        )}
      </motion.button>

      <p className="text-sm font-bold text-teal-900/70 sm:text-base">
        {unsupported
          ? "Mic not available in this browser"
          : listening
            ? "Listening… say the sound!"
            : "Tap the mic and say the sound"}
      </p>
    </div>
  );
}
