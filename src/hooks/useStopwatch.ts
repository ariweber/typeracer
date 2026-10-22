import { useCallback, useRef, useState } from "react";

function toSeconds(ms: number) {
  return Math.floor(ms / 1000);
}

export default function useStopwatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const startTimeRef = useRef(0);
  const accumulatedRef = useRef(0);
  const isRunningRef = useRef(false);

  const getElapsedMs = useCallback(() => {
    if (!isRunningRef.current) return accumulatedRef.current;
    return accumulatedRef.current + (Date.now() - startTimeRef.current);
  }, []);

  const getSeconds = useCallback(() => toSeconds(getElapsedMs()), [
    getElapsedMs,
  ]);

  const start = () => {
    startTimeRef.current = Date.now();
    isRunningRef.current = true;
    setIsRunning(true);
    setIsPaused(false);
  };

  const pause = () => {
    accumulatedRef.current = getElapsedMs();
    isRunningRef.current = false;
    setIsRunning(false);
    setIsPaused(true);
  };

  const stop = () => {
    accumulatedRef.current = getElapsedMs();
    isRunningRef.current = false;
    setIsRunning(false);
    return toSeconds(accumulatedRef.current);
  };

  const reset = useCallback(() => {
    accumulatedRef.current = 0;
    isRunningRef.current = false;
    setIsRunning(false);
    setIsPaused(false);
  }, []);

  return {
    isRunning,
    isPaused,
    start,
    pause,
    stop,
    reset,
    getSeconds
  };
}
