"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type SpeechRecognitionResultLike = {
  readonly isFinal: boolean;
  readonly 0: { readonly transcript: string };
};

type SpeechRecognitionEventLike = {
  readonly results: ArrayLike<SpeechRecognitionResultLike>;
};

type SpeechRecognitionErrorEventLike = {
  readonly error: string;
};

type SpeechRecognitionLike = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEventLike) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
};

type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;

function getSpeechRecognitionCtor(): SpeechRecognitionConstructor | null {
  if (typeof window === "undefined") return null;
  const w = window as Window & {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

function normalizeTranscript(raw: string): string {
  return raw
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Match speech to practice targets.
 * Prefer exact / whole-word hits so single letters (e.g. "s") do not
 * false-match digraphs (e.g. "sh"), while still accepting example words
 * that start with a digraph ("what" → "wh").
 */
function transcriptMatches(normalized: string, acceptedList: string[]): boolean {
  if (!normalized) return false;

  return acceptedList.some((raw) => {
    const target = normalizeTranscript(raw);
    if (!target) return false;
    if (normalized === target) return true;

    const words = normalized.split(" ");
    if (words.includes(target)) return true;

    // Multi-word accepted phrase ("the letter s")
    if (target.includes(" ") && normalized.includes(target)) return true;

    // Digraph / grapheme: allow common example words ("chair", "ship", "the", "what")
    if (target.length >= 2 && words.some((w) => w.startsWith(target))) {
      return true;
    }

    // Held single phoneme: "sss", "shhhh" when target is "s" / "sh"
    if (
      target.length <= 2 &&
      normalized.length > target.length &&
      normalized.startsWith(target) &&
      [...normalized].every((ch) => target.includes(ch))
    ) {
      return true;
    }

    return false;
  });
}

function isSpeechSupported() {
  return getSpeechRecognitionCtor() !== null;
}

export type SpeechRecognitionStatus =
  | "idle"
  | "listening"
  | "unsupported"
  | "denied"
  | "error";

export type UseSpeechRecognitionOptions = {
  /** Accepted phrases (already lowercased / normalized preferred) */
  acceptTranscripts: string[];
  lang?: string;
  onMatch?: (transcript: string) => void;
  onMiss?: (transcript: string) => void;
};

export function useSpeechRecognition({
  acceptTranscripts,
  lang = "en-US",
  onMatch,
  onMiss,
}: UseSpeechRecognitionOptions) {
  const [status, setStatus] = useState<SpeechRecognitionStatus>(() =>
    typeof window === "undefined"
      ? "idle"
      : isSpeechSupported()
        ? "idle"
        : "unsupported",
  );
  const [lastHeard, setLastHeard] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const acceptRef = useRef(acceptTranscripts);
  const onMatchRef = useRef(onMatch);
  const onMissRef = useRef(onMiss);

  useEffect(() => {
    acceptRef.current = acceptTranscripts;
  }, [acceptTranscripts]);

  useEffect(() => {
    onMatchRef.current = onMatch;
  }, [onMatch]);

  useEffect(() => {
    onMissRef.current = onMiss;
  }, [onMiss]);

  useEffect(() => {
    const Ctor = getSpeechRecognitionCtor();
    if (!Ctor) return;

    const recognition = new Ctor();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = lang;
    recognition.maxAlternatives = 3;

    recognition.onresult = (event) => {
      let transcript = "";
      for (let i = 0; i < event.results.length; i++) {
        const result = event.results[i];
        if (result?.[0]?.transcript) {
          transcript = result[0].transcript;
          if (result.isFinal) break;
        }
      }

      const normalized = normalizeTranscript(transcript);
      if (!normalized) return;
      setLastHeard(normalized);

      const matched = transcriptMatches(normalized, acceptRef.current);

      const lastResult = event.results[event.results.length - 1];
      if (matched) {
        onMatchRef.current?.(normalized);
        recognition.stop();
        setStatus("idle");
        return;
      }

      if (lastResult?.isFinal) {
        onMissRef.current?.(normalized);
      }
    };

    recognition.onerror = (event) => {
      if (event.error === "not-allowed" || event.error === "service-not-allowed") {
        setStatus("denied");
        return;
      }
      if (event.error === "aborted" || event.error === "no-speech") {
        setStatus("idle");
        return;
      }
      setStatus("error");
    };

    recognition.onend = () => {
      setStatus((prev) => (prev === "listening" ? "idle" : prev));
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.onresult = null;
      recognition.onerror = null;
      recognition.onend = null;
      try {
        recognition.abort();
      } catch {
        /* ignore */
      }
      recognitionRef.current = null;
    };
  }, [lang]);

  const startListening = useCallback(() => {
    const recognition = recognitionRef.current;
    if (!recognition) {
      setStatus("unsupported");
      return;
    }
    setLastHeard(null);
    try {
      recognition.abort();
    } catch {
      /* ignore */
    }
    try {
      recognition.start();
      setStatus("listening");
    } catch {
      setStatus("error");
    }
  }, []);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    setStatus("idle");
  }, []);

  return {
    status,
    lastHeard,
    startListening,
    stopListening,
    isSupported: status !== "unsupported",
  };
}
