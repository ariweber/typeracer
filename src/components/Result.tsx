type ResultProps = {
  seconds: number;
  totalWords: number;
  wpm: number;
};

export default function Result({ seconds, totalWords, wpm }: ResultProps) {
  return (
    <div className="result">
      <div className="result-trophy">🏆</div>
      <h2 className="result-title">כל הכבוד!</h2>
      <p className="result-subtitle">סיימת את כל המשפטים</p>

      <div className="result-stats">
        <div className="result-stat">
          <span className="result-stat-value">{wpm}</span>
          <span className="result-stat-label">מילים לדקה</span>
        </div>
        <div className="result-stat">
          <span className="result-stat-value">{seconds}</span>
          <span className="result-stat-label">שניות</span>
        </div>
        <div className="result-stat">
          <span className="result-stat-value">{totalWords}</span>
          <span className="result-stat-label">מילים</span>
        </div>
      </div>
    </div>
  );
}