import { useState } from "react";
import { texts } from "../data/texts";
import {
    getCurrentWordIndex,
    hasTypingError,
    isBlockedSpace,
    isLastText,
    isTextComplete,
    splitWords,
} from "../utils/typing";
import { calculateWpm, countWords } from "../utils/wpm";
import {
    clearLeaderboard,
    getLeaderboard,
    saveScore,
} from "../utils/leaderboard";
import useStopwatch from "../hooks/useStopwatch";
import TextDisplay from "../components/TextDisplay";
import TypingInput from "../components/TypingInput";
import Stopwatch from "../components/Stopwatch";
import Result from "../components/Result";
import Leaderboard from "../components/Leaderboard";

const totalWords = countWords(texts);

export default function GamePage() {
    const [input, setInput] = useState("");
    const [textIndex, setTextIndex] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [leaderboard, setLeaderboard] = useState(getLeaderboard);
    const {
        seconds,
        isRunning,
        isPaused,
        start,
        pause,
        stop,
        reset: resetStopwatch,
    } = useStopwatch();
    const text = texts[textIndex];
    const words = splitWords(text);
    const currentIndex = getCurrentWordIndex(input);
    const hasError = hasTypingError(text, input);

    const finishGame = () => {
        const finalSeconds = stop();
        const updated = saveScore({
            wpm: calculateWpm(totalWords, finalSeconds),
            seconds: finalSeconds,
            date: new Date().toISOString(),
        });
        setLeaderboard(updated);
        setIsFinished(true);
    };

    const startNewGame = () => {
        setInput("");
        setTextIndex(0);
        setIsFinished(false);
        resetStopwatch();
    };

    const resetLeaderboard = () => {
        if (!window.confirm("למחוק את כל השיאים?")) return;
        setLeaderboard(clearLeaderboard());
    };

    const handleInputChange = (value: string) => {
        if (isFinished || isPaused) return;
        if (isBlockedSpace(text, value)) return;
        if (!isRunning) start();

        if (!isTextComplete(text, value)) {
            setInput(value);
            return;
        }

        setInput("");

        if (isLastText(textIndex, texts.length)) {
            finishGame();
            return;
        }

        setTextIndex(textIndex + 1);
    };

    const leaderboardSection = (
        <Leaderboard
            scores={leaderboard}
            onNewGame={startNewGame}
            onReset={resetLeaderboard}
        />
    );

    if (isFinished) {
        return (
            <div className="game-page">
                <h1 className="game-title">TypeRacer</h1>
                <Result
                    seconds={seconds}
                    totalWords={totalWords}
                    wpm={calculateWpm(totalWords, seconds)}
                />
                {leaderboardSection}
            </div>
        );
    }

    return (
        <div className="game-page">
            <h1 className="game-title">TypeRacer</h1>
            <Stopwatch
                seconds={seconds}
                isRunning={isRunning}
                isPaused={isPaused}
                onPause={pause}
                onResume={start}
            />
            <p className="text-progress">
                משפט {textIndex + 1} מתוך {texts.length}
            </p>
            <TextDisplay
                words={words}
                currentIndex={currentIndex}
                isHidden={isPaused}
            />{" "}
            <TypingInput
                value={input}
                onChange={handleInputChange}
                hasError={hasError}
                disabled={isPaused}
            />
            {leaderboardSection}
        </div>
    );
}
