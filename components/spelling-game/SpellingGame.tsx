"use client";

import { useCallback, useMemo, useState } from "react";
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
import { AnimatePresence, motion } from "framer-motion";
import { PartyPopper, RotateCcw, Volume2 } from "lucide-react";
import { CelebrationBurst } from "@/components/animal-match/CelebrationBurst";
import {
  playCelebration,
  playDropSoft,
  playSuccessChime,
  playWrongBuzz,
  speakWord,
} from "@/components/animal-match/sounds";
import { LetterSlot } from "./LetterSlot";
import {
  LetterTile,
  LetterTileGhost,
  OverlayLetter,
} from "./LetterTile";
import { ProgressBar } from "./ProgressBar";
import {
  createLetterTiles,
  wordsForLevel,
  type LetterTile as LetterTileData,
  type SpellingLevel,
  type SpellingWord,
} from "./words";

type SlotStatus = "idle" | "correct" | "incorrect" | "complete";

function pickWord(
  level: SpellingLevel,
  index: number,
): { word: SpellingWord; tiles: LetterTileData[] } {
  const pool = wordsForLevel(level);
  const word = pool[index % pool.length];
  return { word, tiles: createLetterTiles(word.word) };
}

export function SpellingGame() {
  const [level, setLevel] = useState<SpellingLevel>(1);
  const [wordIndex, setWordIndex] = useState(0);
  const [round, setRound] = useState(() => pickWord(1, 0));
  const [slots, setSlots] = useState<(LetterTileData | null)[]>(() =>
    Array(round.word.word.length).fill(null),
  );
  const [status, setStatus] = useState<SlotStatus>("idle");
  const [stars, setStars] = useState(0);
  const [totalStars, setTotalStars] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [levelComplete, setLevelComplete] = useState(false);
  const [allDone, setAllDone] = useState(false);

  const wordsInLevel = wordsForLevel(level).length;
  const { word, tiles } = round;

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 6 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 120, tolerance: 8 },
    }),
  );

  const placedIds = useMemo(
    () => new Set(slots.filter(Boolean).map((t) => t!.id)),
    [slots],
  );

  const activeTile = tiles.find((t) => t.id === activeId) ?? null;

  const loadWord = useCallback(
    (nextLevel: SpellingLevel, nextIndex: number) => {
      const next = pickWord(nextLevel, nextIndex);
      setRound(next);
      setSlots(Array(next.word.word.length).fill(null));
      setStatus("idle");
      setStars(0);
      setAttempts(0);
      setActiveId(null);
      setLevelComplete(false);
    },
    [],
  );

  const checkAnswer = useCallback(
    (nextSlots: (LetterTileData | null)[]) => {
      if (nextSlots.some((s) => !s)) return;

      const spelled = nextSlots.map((s) => s!.letter).join("");
      const correct = spelled === word.word;

      if (correct) {
        const earned = Math.max(1, 3 - attempts);
        setStatus("complete");
        setStars(earned);
        setTotalStars((s) => s + earned);
        playSuccessChime();
        speakWord(word.word.toLowerCase());

        setTimeout(() => {
          const nextIndex = wordIndex + 1;
          if (nextIndex >= wordsInLevel) {
            setLevelComplete(true);
            playCelebration();
            if (level === 3) setAllDone(true);
          } else {
            setWordIndex(nextIndex);
            loadWord(level, nextIndex);
          }
        }, 1100);
      } else {
        setStatus("incorrect");
        setAttempts((a) => a + 1);
        setStars(0);
        playWrongBuzz();
        setTimeout(() => {
          setSlots(Array(word.word.length).fill(null));
          setStatus("idle");
        }, 700);
      }
    },
    [attempts, level, loadWord, word.word, wordIndex, wordsInLevel],
  );

  const placeTile = useCallback(
    (tile: LetterTileData, slotIndex: number) => {
      if (status === "complete" || slots[slotIndex]) return;

      const next = [...slots];
      // Remove from any previous slot if somehow present
      const existing = next.findIndex((s) => s?.id === tile.id);
      if (existing >= 0) next[existing] = null;
      next[slotIndex] = tile;
      setSlots(next);
      playDropSoft();
      checkAnswer(next);
    },
    [checkAnswer, slots, status],
  );

  const clearSlot = useCallback(
    (index: number) => {
      if (status === "complete") return;
      setSlots((prev) => {
        const next = [...prev];
        next[index] = null;
        return next;
      });
      setStatus("idle");
    },
    [status],
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(String(event.active.id));
    playDropSoft();
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    if (!over) return;

    const tile = tiles.find((t) => t.id === active.id);
    if (!tile || placedIds.has(tile.id)) return;

    const slotIndex = Number(String(over.id).replace("slot-", ""));
    if (Number.isNaN(slotIndex)) return;
    placeTile(tile, slotIndex);
  };

  const handleDragCancel = () => setActiveId(null);

  const goNextLevel = () => {
    if (level >= 3) {
      // Restart from level 1
      setLevel(1);
      setWordIndex(0);
      setTotalStars(0);
      setAllDone(false);
      loadWord(1, 0);
      return;
    }
    const nextLevel = (level + 1) as SpellingLevel;
    setLevel(nextLevel);
    setWordIndex(0);
    setAllDone(false);
    loadWord(nextLevel, 0);
  };

  const reshuffle = () => {
    loadWord(level, wordIndex);
  };

  const slotStatusFor = (index: number): SlotStatus => {
    if (status === "complete") return "complete";
    if (status === "incorrect") return "incorrect";
    if (status === "correct") return "correct";
    return slots[index] ? "idle" : "idle";
  };

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

          <div className="relative z-10 flex flex-col gap-7">
            <header className="flex flex-col items-center gap-4 text-center">
              <motion.p
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-full bg-teal-500/15 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-teal-700"
              >
                Speech play · spelling
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-(family-name:--font-display) text-4xl font-black tracking-tight text-teal-950 sm:text-5xl"
              >
                Spell the Word
              </motion.h1>
              <p className="max-w-md text-base font-medium text-teal-800/80 sm:text-lg">
                Look at the picture, then drag the letters into place. Great
                practice for dyslexia, spelling, and early literacy!
              </p>
              <ProgressBar
                level={level}
                wordIndex={wordIndex}
                wordsInLevel={wordsInLevel}
                stars={stars}
                totalStarsEarned={totalStars}
              />
            </header>

            <section className="flex flex-col items-center gap-5">
              <motion.button
                type="button"
                key={word.id}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => speakWord(word.word.toLowerCase())}
                className="flex flex-col items-center gap-2 rounded-4xl border-4 bg-white/70 px-10 py-6 shadow-lg"
                style={{ borderColor: word.borderColor }}
                aria-label={`Hear the word hint: ${word.hint}`}
              >
                <span className="text-7xl sm:text-8xl" role="img" aria-hidden>
                  {word.emoji}
                </span>
                <span className="inline-flex items-center gap-1.5 text-sm font-bold text-teal-600">
                  <Volume2 className="h-4 w-4" />
                  Tap to hear
                </span>
              </motion.button>
              <p className="text-sm font-semibold text-teal-700/70">
                {word.hint}
              </p>
            </section>

            <section className="flex flex-col items-center gap-3">
              <p className="text-sm font-bold uppercase tracking-widest text-teal-600/70">
                Build the word
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                {slots.map((placed, index) => (
                  <LetterSlot
                    key={`${word.id}-slot-${index}`}
                    index={index}
                    placed={placed}
                    softColor={word.softColor}
                    borderColor={word.borderColor}
                    status={slotStatusFor(index)}
                    onClear={() => clearSlot(index)}
                  />
                ))}
              </div>
              <AnimatePresence>
                {status === "complete" && (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-lg font-extrabold text-emerald-600"
                  >
                    Correct ✅ {word.word}
                  </motion.p>
                )}
              </AnimatePresence>
            </section>

            <section>
              <p className="mb-4 text-center text-sm font-bold uppercase tracking-widest text-teal-600/70">
                Letters
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {tiles.map((tile) => {
                  const used =
                    placedIds.has(tile.id) || activeId === tile.id;
                  if (used) {
                    return (
                      <LetterTileGhost key={tile.id} letter={tile.letter} />
                    );
                  }
                  return (
                    <LetterTile
                      key={tile.id}
                      tile={tile}
                      softColor={word.softColor}
                      borderColor={word.borderColor}
                      disabled={status === "complete"}
                    />
                  );
                })}
              </div>
            </section>

            <div className="flex flex-wrap justify-center gap-3">
              <motion.button
                type="button"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={reshuffle}
                disabled={status === "complete"}
                className="inline-flex items-center gap-2 rounded-full bg-white/90 px-5 py-2.5 text-sm font-bold text-teal-700 shadow-md ring-2 ring-teal-100 disabled:opacity-50"
              >
                <RotateCcw className="h-4 w-4" />
                Shuffle letters
              </motion.button>
            </div>
          </div>

          <AnimatePresence>
            {levelComplete && (
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
                    {allDone ? "Spelling champion!" : "Level complete!"}
                  </h2>
                  <p className="mt-2 text-teal-700">
                    You earned{" "}
                    <span className="font-extrabold text-amber-600">
                      {totalStars} stars
                    </span>
                    {allDone
                      ? " across every level!"
                      : ` on level ${level}. Ready for the next challenge?`}
                  </p>
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <button
                      type="button"
                      onClick={goNextLevel}
                      className="rounded-full bg-teal-500 px-6 py-3 text-base font-extrabold text-white shadow-[0_6px_0_#0F766E] transition hover:brightness-105"
                    >
                      {allDone
                        ? "Play again"
                        : `Start level ${level + 1}`}
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <DragOverlay dropAnimation={null}>
          {activeTile ? (
            <OverlayLetter
              letter={activeTile.letter}
              softColor={word.softColor}
              borderColor={word.borderColor}
            />
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
        ✏️
      </motion.span>
    </>
  );
}
