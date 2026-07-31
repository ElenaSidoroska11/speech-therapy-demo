"use client";

import { useCallback, useState } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  closestCenter,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, PartyPopper } from "lucide-react";
import {
  createInitialRound,
  createRandomRound,
  type Animal,
  type AnimalId,
} from "./animals";
import { DropZone } from "./DropZone";
import { WordCard, WordSlotGhost } from "./WordCard";
import { ScoreBoard } from "./ScoreBoard";
import { CelebrationBurst } from "./CelebrationBurst";
import {
  playCelebration,
  playDropSoft,
  playSuccessChime,
  playWrongBuzz,
  speakWord,
} from "./sounds";

type FeedbackMap = Partial<Record<AnimalId, "correct" | "incorrect">>;
type MatchMap = Partial<Record<AnimalId, string>>;

export function AnimalMatchGame() {
  const [round, setRound] = useState(createInitialRound);
  const [matches, setMatches] = useState<MatchMap>({});
  const [feedback, setFeedback] = useState<FeedbackMap>({});
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [activeId, setActiveId] = useState<AnimalId | null>(null);
  const [won, setWon] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 6 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 120, tolerance: 8 },
    }),
  );

  const matchedCount = Object.keys(matches).length;
  const activeAnimal = round.words.find((w) => w.id === activeId) ?? null;

  const resetRound = useCallback(() => {
    setRound(createRandomRound(3));
    setMatches({});
    setFeedback({});
    setActiveId(null);
    setWon(false);
    setStreak(0);
  }, []);

  const playAgain = useCallback(() => {
    setScore(0);
    resetRound();
  }, [resetRound]);

  const handleSpeak = useCallback((animal: Animal) => {
    speakWord(animal.word);
  }, []);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as AnimalId);
    playDropSoft();
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const wordId = active.id as AnimalId;
    const dropId = String(over.id).replace("drop-", "") as AnimalId;
    const word = round.words.find((w) => w.id === wordId);
    if (!word || matches[dropId]) return;

    if (wordId === dropId) {
      const nextMatches = { ...matches, [dropId]: word.word };
      setMatches(nextMatches);
      setFeedback((prev) => ({ ...prev, [dropId]: "correct" }));
      setScore((s) => s + 10 + streak * 2);
      setStreak((s) => s + 1);
      playSuccessChime();
      speakWord(word.word);

      if (Object.keys(nextMatches).length === round.targets.length) {
        setTimeout(() => {
          setWon(true);
          playCelebration();
        }, 450);
      }
    } else {
      setFeedback((prev) => ({ ...prev, [dropId]: "incorrect" }));
      setStreak(0);
      playWrongBuzz();
      setTimeout(() => {
        setFeedback((prev) => {
          const next = { ...prev };
          delete next[dropId];
          return next;
        });
      }, 600);
    }
  };

  const handleDragCancel = () => setActiveId(null);

  return (
    <div className="relative mx-auto w-full max-w-4xl">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <div className="relative overflow-hidden rounded-[2.5rem] border-4 border-white/70 bg-white/35 p-5 shadow-[0_25px_60px_rgba(13,148,136,0.18)] backdrop-blur-md sm:p-8">
          <FloatingDecor />

          <div className="relative z-10 flex flex-col gap-8">
            <header className="flex flex-col items-center gap-4 text-center">
              <motion.p
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-full bg-teal-500/15 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-teal-700"
              >
                Speech play · vocabulary
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-(family-name:--font-display) text-4xl font-black tracking-tight text-teal-950 sm:text-5xl"
              >
                Match the Animal
              </motion.h1>
              <p className="max-w-md text-base font-medium text-teal-800/80 sm:text-lg">
                Drag each word under the right picture. Tap an animal to hear
                its name!
              </p>
              <ScoreBoard
                score={score}
                matched={matchedCount}
                total={round.targets.length}
                streak={streak}
              />
            </header>

            <section className="relative z-10 flex flex-wrap items-start justify-center gap-6 sm:gap-10">
              {round.targets.map((animal, index) => (
                <motion.div
                  key={`${animal.id}-${index}`}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <DropZone
                    animal={animal}
                    matchedWord={matches[animal.id] ?? null}
                    feedback={feedback[animal.id] ?? null}
                    onSpeak={() => handleSpeak(animal)}
                  />
                </motion.div>
              ))}
            </section>

            <section className="relative z-10">
              <p className="mb-4 text-center text-sm font-bold uppercase tracking-widest text-teal-600/70">
                Word bank
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                {round.words.map((animal) => {
                  const used = Object.values(matches).includes(animal.word);
                  if (used || activeId === animal.id) {
                    return <WordSlotGhost key={animal.id} animal={animal} />;
                  }
                  return <WordCard key={animal.id} animal={animal} />;
                })}
              </div>
            </section>

            <div className="flex justify-center">
              <motion.button
                type="button"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={resetRound}
                className="inline-flex items-center gap-2 rounded-full bg-white/90 px-5 py-2.5 text-sm font-bold text-teal-700 shadow-md ring-2 ring-teal-100"
              >
                <RotateCcw className="h-4 w-4" />
                New animals
              </motion.button>
            </div>
          </div>

          <AnimatePresence>
            {won && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-20 flex items-center justify-center bg-teal-950/35 p-6 backdrop-blur-sm"
              >
                <CelebrationBurst />
                <motion.div
                  initial={{ scale: 0.7, y: 30 }}
                  animate={{ scale: 1, y: 0 }}
                  className="relative z-10 max-w-sm rounded-4xl bg-white p-8 text-center shadow-2xl"
                >
                  <motion.div
                    animate={{ rotate: [0, -8, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 1.6 }}
                    className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-amber-500"
                  >
                    <PartyPopper className="h-8 w-8" />
                  </motion.div>
                  <h2 className="font-(family-name:--font-display) text-3xl font-black text-teal-950">
                    You did it!
                  </h2>
                  <p className="mt-2 text-teal-700">
                    All animals matched. You earned{" "}
                    <span className="font-extrabold text-amber-600">
                      {score} stars
                    </span>
                    !
                  </p>
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <button
                      type="button"
                      onClick={resetRound}
                      className="rounded-full bg-teal-500 px-6 py-3 text-base font-extrabold text-white shadow-[0_6px_0_#0F766E] transition hover:brightness-105"
                    >
                      Next round
                    </button>
                    <button
                      type="button"
                      onClick={playAgain}
                      className="rounded-full bg-white px-6 py-3 text-base font-extrabold text-teal-700 ring-2 ring-teal-200"
                    >
                      Reset score
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <DragOverlay dropAnimation={null}>
          {activeAnimal ? (
            <div
              className="cursor-grabbing rounded-2xl border-4 px-6 py-3 text-2xl font-extrabold capitalize tracking-wide text-teal-900 shadow-2xl sm:text-3xl"
              style={{
                backgroundColor: activeAnimal.softColor,
                borderColor: activeAnimal.borderColor,
              }}
            >
              {activeAnimal.word}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

function FloatingDecor() {
  return (
    <>
      <motion.div
        aria-hidden
        className="absolute -left-8 top-10 h-28 w-28 rounded-full bg-amber-200/50 blur-2xl"
        animate={{ x: [0, 18, 0], y: [0, -12, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute -right-6 bottom-16 h-36 w-36 rounded-full bg-sky-300/40 blur-2xl"
        animate={{ x: [0, -14, 0], y: [0, 16, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.span
        aria-hidden
        className="absolute right-8 top-6 text-3xl opacity-70"
        animate={{ y: [0, -10, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        ☁️
      </motion.span>
      <motion.span
        aria-hidden
        className="absolute bottom-8 left-10 text-2xl opacity-60"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 3.5, repeat: Infinity }}
      >
        🌿
      </motion.span>
    </>
  );
}
