import type { Score } from "../types";
import { observer } from "mobx-react-lite";

type LeaderboardProps = {
  scores: Score[];
  onNewGame: () => void;
  onReset: () => void;
};

function formatDate(isoDate: string) {
  return new Date(isoDate).toLocaleDateString("he-IL");
}

function Leaderboard({ scores, onNewGame, onReset }: LeaderboardProps) {
  return (
    <div className="leaderboard">
      <h2 className="leaderboard-title">טבלת השיאים</h2>

      {scores.length === 0 ? (
        <p className="leaderboard-empty"> אין עוד שיאים!. תהיה הראשון</p>
      ) : (
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>מקום</th>
              <th>מילים לדקה</th>
              <th>זמן</th>
              <th>תאריך</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((score, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{score.wpm}</td>
                <td>{score.seconds} שניות</td>
                <td>{formatDate(score.date)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="leaderboard-actions">
        <button className="button button-primary" onClick={onNewGame}>
          משחק חדש
        </button>
        <button className="button button-danger" onClick={onReset} disabled={scores.length === 0}>
          איפוס שיאים
        </button>
      </div>
    </div>
  );
}

export default observer(Leaderboard)