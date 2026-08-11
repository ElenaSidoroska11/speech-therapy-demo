"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Mic, PawPrint, PencilLine } from "lucide-react";
import { AnimalMatchGame } from "@/components/animal-match/AnimalMatchGame";
import { SpellingGame } from "@/components/spelling-game/SpellingGame";
import { SpeakLetterExercise } from "@/components/letter-practice/SpeakLetterExercise";
import { TraceLetterExercise } from "@/components/letter-practice/TraceLetterExercise";
import type { LetterId } from "@/components/letter-practice/letters";

type Activity = "match" | "spelling" | "speak" | "trace";

const NAV_ITEMS: {
  id: Activity;
  label: string;
  short: string;
  icon: typeof PawPrint;
}[] = [
  { id: "match", label: "Match Animals", short: "Match", icon: PawPrint },
  { id: "spelling", label: "Spelling Game", short: "Spell", icon: BookOpen },
  { id: "speak", label: "Speak Letter", short: "Speak", icon: Mic },
  { id: "trace", label: "Trace Letter", short: "Trace", icon: PencilLine },
];

const FOOTER: Record<Activity, string> = {
  match: "Built for speech therapy demos · tap, drag, listen & match",
  spelling: "Built for literacy demos · spell, earn stars & level up",
  speak: "Built for articulation practice · listen, speak & watch it draw",
  trace: "Built for motor planning · finger, stylus or mouse tracing",
};

export function DemoShell() {
  const [activity, setActivity] = useState<Activity>("match");
  const [traceLetter, setTraceLetter] = useState<LetterId>("S");

  return (
    <>
      <nav
        aria-label="Therapy activities"
        className="fixed left-3 top-3 z-40 flex flex-col gap-2 sm:left-5 sm:top-5"
      >
        {NAV_ITEMS.map((item) => {
          const active = activity === item.id;
          const Icon = item.icon;
          return (
            <motion.button
              key={item.id}
              type="button"
              whileHover={{ scale: 1.04, x: 2 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setActivity(item.id)}
              aria-current={active ? "page" : undefined}
              className={`inline-flex items-center gap-2 rounded-2xl px-3 py-2.5 text-left text-sm font-extrabold shadow-lg backdrop-blur-md transition sm:px-4 sm:text-base ${
                active
                  ? "bg-teal-600 text-white shadow-[0_6px_0_#0F766E] ring-2 ring-white/70"
                  : "bg-white/80 text-teal-800 ring-2 ring-white/60 hover:bg-white"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" />
              <span className="hidden sm:inline">{item.label}</span>
              <span className="sm:hidden">{item.short}</span>
            </motion.button>
          );
        })}
      </nav>

      <main className="relative z-10 flex flex-1 flex-col items-center px-4 py-8 pt-40 sm:px-6 sm:py-12 sm:pt-12 sm:pl-48">
        {activity === "match" && <AnimalMatchGame />}
        {activity === "spelling" && <SpellingGame />}
        {activity === "speak" && (
          <SpeakLetterExercise
            onContinueToTrace={(id) => {
              setTraceLetter(id);
              setActivity("trace");
            }}
          />
        )}
        {activity === "trace" && (
          <TraceLetterExercise key={traceLetter} initialLetter={traceLetter} />
        )}
      </main>

      <footer className="relative z-10 pb-6 text-center text-sm font-semibold text-teal-900/60">
        {FOOTER[activity]}
      </footer>
    </>
  );
}
