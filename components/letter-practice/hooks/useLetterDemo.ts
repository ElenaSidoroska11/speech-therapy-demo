"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { playPhonemeSound, playWatchHow } from "@/components/shared/sounds";
import type { LetterId } from "../letters";

const INTRO_DELAY_MS = 3000;

export function useLetterDemo(letterId: LetterId, phonemeSound?: string) {
  const [demoProgress, setDemoProgress] = useState(0);
  const demoReadyRef = useRef(false);
  const introStartedRef = useRef(false);
  const replayTimeoutRef = useRef<number>(0);
  const cancelWatchHowRef = useRef<(() => void) | null>(null);

  const tryStartDemo = useCallback(() => {
    if (demoReadyRef.current && introStartedRef.current) {
      setDemoProgress(1);
    }
  }, []);

  useEffect(() => {
    demoReadyRef.current = false;
    introStartedRef.current = false;
    setDemoProgress(0);
    window.clearTimeout(replayTimeoutRef.current);
    cancelWatchHowRef.current?.();
    cancelWatchHowRef.current = null;

    const delayId = window.setTimeout(() => {
      cancelWatchHowRef.current = playWatchHow(() => {
        if (phonemeSound) playPhonemeSound(phonemeSound);
      });
      introStartedRef.current = true;
      tryStartDemo();
    }, INTRO_DELAY_MS);

    return () => {
      window.clearTimeout(delayId);
      cancelWatchHowRef.current?.();
      cancelWatchHowRef.current = null;
    };
  }, [letterId, phonemeSound, tryStartDemo]);

  useEffect(() => {
    return () => window.clearTimeout(replayTimeoutRef.current);
  }, []);

  const handleDemoMeasured = useCallback(() => {
    demoReadyRef.current = true;
    tryStartDemo();
  }, [tryStartDemo]);

  const replayDemo = useCallback(() => {
    if (!demoReadyRef.current) return;
    if (phonemeSound) playPhonemeSound(phonemeSound);
    window.clearTimeout(replayTimeoutRef.current);
    setDemoProgress(0);
    replayTimeoutRef.current = window.setTimeout(() => {
      setDemoProgress(1);
    }, 50);
  }, [phonemeSound]);

  return { demoProgress, handleDemoMeasured, replayDemo };
}
