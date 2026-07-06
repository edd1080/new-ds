"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** Drives a fixed-interval counter up to `total`, used to animate the agent's step-by-step progress. */
export function useStepRunner(total: number, intervalMs: number, onDone?: () => void) {
  const [count, setCount] = useState(0);
  const [running, setRunning] = useState(false);
  const ivRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const firedRef = useRef(false);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  const clear = () => {
    if (ivRef.current) {
      clearInterval(ivRef.current);
      ivRef.current = null;
    }
  };

  const start = useCallback(() => {
    if (running || firedRef.current) return;
    setRunning(true);
    clear();
    ivRef.current = setInterval(() => {
      setCount((c) => {
        const n = c + 1;
        if (n >= total) clear();
        return Math.min(n, total);
      });
    }, intervalMs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, total, intervalMs]);

  useEffect(() => {
    if (count >= total && total > 0 && !firedRef.current && running) {
      firedRef.current = true;
      clear();
      setRunning(false);
      doneRef.current?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, total, running]);

  useEffect(() => clear, []);

  const complete = useCallback(() => {
    clear();
    firedRef.current = true;
    setCount(total);
    setRunning(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total]);

  const restart = useCallback(() => {
    clear();
    firedRef.current = false;
    setCount(0);
    setRunning(false);
  }, []);

  return { count, running, start, complete, restart };
}
