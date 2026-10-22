import { useEffect, useState } from "react";

type StopwatchProps = {
  isRunning: boolean;
  isPaused: boolean;
  onPause: () => void;
  onResume: () => void;
  getSeconds: () => number;
};

export default function Stopwatch(
  { isRunning, isPaused, onPause, onResume, getSeconds }: StopwatchProps,
) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    setSeconds(getSeconds());
    if (!isRunning) return;
    const intervalId = setInterval(() => {
      setSeconds(getSeconds());
    }, 1000);
    return () => clearInterval(intervalId);
  }, [isRunning, isPaused, getSeconds]);

  return (
    <div className="stopwatch-wrapper">
      <p className={isPaused ? "stopwatch paused" : "stopwatch"}>
        זמן: {seconds} שניות
      </p>
      {isRunning && (
        <button className="button button-secondary" onClick={onPause}>
          עצירה
        </button>
      )}
      {isPaused && (
        <button className="button button-primary" onClick={onResume}>
          המשך
        </button>
      )}
    </div>
  );
}
