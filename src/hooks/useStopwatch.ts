import { useEffect, useRef, useState } from "react";

function toSeconds(ms: number) {
  return Math.floor(ms / 1000);
}

export default function useStopwatch() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const startTimeRef = useRef(0);
  const accumulatedRef = useRef(0);

  const getTotalMs = () => accumulatedRef.current + (Date.now() - startTimeRef.current);

  useEffect(() => {
    if (!isRunning) return;

    const intervalId = setInterval(() => {
      setSeconds(toSeconds(getTotalMs()));
    }, 200);

    return () => clearInterval(intervalId);
  }, [isRunning]);

  const start = () => {
    startTimeRef.current = Date.now();
    setIsRunning(true);
    setIsPaused(false);
  };

  const pause = () => {
    accumulatedRef.current = getTotalMs();
    setSeconds(toSeconds(accumulatedRef.current));
    setIsRunning(false);
    setIsPaused(true);
  };

  const stop = () => {
    const finalSeconds = toSeconds(isRunning ? getTotalMs() : accumulatedRef.current);
    setSeconds(finalSeconds);
    setIsRunning(false);
    return finalSeconds;
  };

  const reset = () => {
    accumulatedRef.current = 0;
    setSeconds(0);
    setIsRunning(false);
    setIsPaused(false);
  };

  return { seconds, isRunning, isPaused, start, pause, stop, reset };
}