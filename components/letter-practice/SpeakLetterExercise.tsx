"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, RotateCcw, Volume2 } from "lucide-react";
import { CelebrationBurst } from "@/components/animal-match/CelebrationBurst";
import {
  playCelebration,
  playSuccessChime,
  playWrongBuzz,
  speakWord,
} from "@/components/animal-match/sounds";
import { FeedbackBanner } from "./FeedbackBanner";
import { LetterStroke } from "./LetterStroke";
import { MicButton } from "./MicButton";
import { useSpeechRecognition } from "./hooks/useSpeechRecognition";
import {
  AVAILABLE_LETTERS,
  getLetter,
  getNextLetter,
  type LetterId,
} from "./letters";

type SpeakLetterExerciseProps = {
  /** Optional: jump into Trace from Speak after success */
  onContinueToTrace?: (letterId: LetterId) => void;
  initialLetter?: LetterId;
};

type RoundState = {
  letterId: LetterId;
  drawProgress: number;
  feedback: string | null;
  feedbackTone: "success" | "hint" | "error";
  succeeded: boolean;
  celebrate: boolean;
};

function createRound(letterId: LetterId): RoundState {
  return {
    letterId,
    drawProgress: 0,
    feedback: null,
    feedbackTone: "hint",
    succeeded: false,
    celebrate: false,
  };
}

export function SpeakLetterExercise({
  onContinueToTrace,
  initialLetter = "S",
}: SpeakLetterExerciseProps) {
  const [round, setRound] = useState<RoundState>(() => createRound(initialLetter));
  const letter = getLetter(round.letterId);

  const handleSuccess = useCallback(() => {
    setRound((prev) => {
      if (prev.succeeded) return prev;
      return {
        ...prev,
        succeeded: true,
        feedback: "Great job!",
        feedbackTone: "success",
        drawProgress: 1,
        celebrate: true,
      };
    });
    playSuccessChime();
    window.setTimeout(() => playCelebration(), 280);
  }, []);

  const { status, lastHeard, startListening, stopListening } =
    useSpeechRecognition({
      acceptTranscripts: letter.acceptTranscripts,
      onMatch: () => {
        handleSuccess();
      },
      onMiss: () => {
        setRound((prev) => {
          if (prev.succeeded) return prev;
          return {
            ...prev,
            feedback: "Almost — try saying the letter again!",
            feedbackTone: "hint",
          };
        });
        playWrongBuzz();
      },
    });

  const reset = () => {
    stopListening();
    setRound((prev) => createRound(prev.letterId));
  };

  const selectLetter = (id: LetterId) => {
    stopListening();
    setRound(createRound(id));
  };

  const demoSuccess = () => {
    if (round.succeeded) return;
    handleSuccess();
  };

  const nextLetter = getNextLetter(round.letterId);
  const listening = status === "listening";

  return (
    <section className="relative flex w-full max-w-3xl flex-col items-center gap-5 sm:gap-7">
      {round.celebrate && <CelebrationBurst />}

      <header className="text-center">
        <p className="font-(family-name:--font-display) text-sm font-semibold uppercase tracking-wide text-teal-800/70">
          Speak the letter
        </p>
        <h1 className="mt-1 font-(family-name:--font-display) text-3xl font-bold text-teal-950 sm:text-4xl">
          Say “{letter.letter}”
        </h1>
        <p className="mt-2 max-w-md text-base font-semibold text-teal-900/70 sm:text-lg">
          Press the microphone and pronounce the letter sound. Watch it draw
          itself when you get it right!
        </p>
      </header>

      {AVAILABLE_LETTERS.length > 1 && (
        <div className="flex flex-wrap justify-center gap-2">
          {AVAILABLE_LETTERS.map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => selectLetter(id)}
              className={`rounded-xl px-3 py-1.5 text-sm font-extrabold ring-2 transition ${
                id === round.letterId
                  ? "bg-teal-600 text-white ring-white/70"
                  : "bg-white/70 text-teal-800 ring-white/50 hover:bg-white"
              }`}
            >
              {id}
            </button>
          ))}
        </div>
      )}

      <div className="relative flex h-56 w-full max-w-xs items-center justify-center sm:h-72 sm:max-w-sm">
        <div className="absolute inset-0 rounded-4xl bg-white/55 shadow-[0_10px_0_rgba(15,118,110,0.12)] ring-2 ring-white/70 backdrop-blur-sm" />
        <div className="relative h-[85%] w-[70%]">
          <LetterStroke letter={letter} progress={round.drawProgress} showGuide />
        </div>
        <AnimatePresence>
          {round.succeeded && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="pointer-events-none absolute inset-x-0 bottom-3 text-center text-4xl"
            >
              ⭐
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <FeedbackBanner message={round.feedback} tone={round.feedbackTone} />

      {!round.succeeded ? (
        <div className="flex flex-col items-center gap-4">
          <MicButton
            listening={listening}
            unsupported={status === "unsupported"}
            disabled={status === "denied"}
            onClick={() => {
              if (listening) stopListening();
              else startListening();
            }}
          />

          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => speakWord(letter.spokenName)}
              className="inline-flex items-center gap-2 rounded-2xl bg-white/80 px-4 py-2.5 text-sm font-extrabold text-teal-800 shadow-md ring-2 ring-white/60"
            >
              <Volume2 className="h-4 w-4" />
              Hear it
            </button>

            {(status === "unsupported" || status === "denied") && (
              <button
                type="button"
                onClick={demoSuccess}
                className="inline-flex items-center gap-2 rounded-2xl bg-amber-300 px-4 py-2.5 text-sm font-extrabold text-amber-950 shadow-[0_4px_0_#D97706]"
              >
                Practice success
              </button>
            )}
          </div>

          {lastHeard && !round.succeeded && (
            <p className="text-sm font-semibold text-teal-900/55">
              Heard: “{lastHeard}”
            </p>
          )}
          {status === "denied" && (
            <p className="max-w-sm text-center text-sm font-semibold text-rose-700">
              Microphone permission is blocked. Allow the mic, or use Practice
              success to preview the animation.
            </p>
          )}
        </div>
      ) : (
        <div className="flex flex-wrap items-center justify-center gap-3">
          <motion.button
            type="button"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-2xl bg-white/85 px-4 py-3 text-sm font-extrabold text-teal-800 shadow-md ring-2 ring-white/70"
          >
            <RotateCcw className="h-4 w-4" />
            Try again
          </motion.button>

          {onContinueToTrace && (
            <motion.button
              type="button"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => onContinueToTrace(round.letterId)}
              className="inline-flex items-center gap-2 rounded-2xl bg-teal-600 px-5 py-3 text-sm font-extrabold text-white shadow-[0_6px_0_#0F766E]"
            >
              Trace the letter
              <ArrowRight className="h-4 w-4" />
            </motion.button>
          )}

          {nextLetter && (
            <motion.button
              type="button"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => selectLetter(nextLetter)}
              className="inline-flex items-center gap-2 rounded-2xl bg-sky-500 px-5 py-3 text-sm font-extrabold text-white shadow-[0_6px_0_#0284C7]"
            >
              Next letter
              <ArrowRight className="h-4 w-4" />
            </motion.button>
          )}
        </div>
      )}
    </section>
  );
}
