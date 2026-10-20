type StopwatchProps = {
  seconds: number;
  isRunning: boolean;
  isPaused: boolean;
  onPause: () => void;
  onResume: () => void;
};

export default function Stopwatch({ seconds, isRunning, isPaused, onPause, onResume }: StopwatchProps) {
  return (
    <div className="stopwatch-wrapper">
      <p className={isPaused ? "stopwatch paused" : "stopwatch"}>זמן: {seconds} שניות</p>
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