"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { LetterId } from "../letters";

export function useLetterDemo(letterId: LetterId) {
  const [demoProgress, setDemoProgress] = useState(0);
  const demoReadyRef = useRef(false);
  const replayTimeoutRef = useRef<number>(0);

  useEffect(() => {
    demoReadyRef.current = false;
    setDemoProgress(0);
    window.clearTimeout(replayTimeoutRef.current);
  }, [letterId]);

  useEffect(() => {
    return () => window.clearTimeout(replayTimeoutRef.current);
  }, []);

  const handleDemoMeasured = useCallback(() => {
    demoReadyRef.current = true;
    setDemoProgress(1);
  }, []);

  const replayDemo = useCallback(() => {
    if (!demoReadyRef.current) return;
    window.clearTimeout(replayTimeoutRef.current);
    setDemoProgress(0);
    replayTimeoutRef.current = window.setTimeout(() => {
      setDemoProgress(1);
    }, 50);
  }, []);

  return { demoProgress, handleDemoMeasured, replayDemo };
}
