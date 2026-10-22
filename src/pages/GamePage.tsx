import { useCallback, useMemo, useState } from "react";
import { Link } from "react-router";
import { observer } from "mobx-react-lite";
import { setsStore } from "../stores/setsStore";
import { leaderboardStore } from "../stores/leaderboardStore";
import {
    hasTypingError,
    isBlockedSpace,
    isLastIndex,
    isWordDone,
    splitWords,
} from "../utils/typing";
import { calculateWpm, countWords } from "../utils/wpm";
import useStopwatch from "../hooks/useStopwatch";
import TextDisplay from "../components/TextDisplay";
import TypingInput from "../components/TypingInput";
import Stopwatch from "../components/Stopwatch";
import Result from "../components/Result";
import Leaderboard from "../components/Leaderboard";
import SetPicker from "../components/SetPicker";

function GamePage() {
    console.log(leaderboardStore.scores);
    const { sets } = setsStore;
    const [selectedSetId, setSelectedSetId] = useState(sets[0].id);
    const selectedSet = sets.find((set) => set.id === selectedSetId) ?? sets[0];
    const texts = selectedSet.texts;
    const totalWords = useMemo(() => countWords(texts), [texts]);

    const [input, setInput] = useState("");
    const [textIndex, setTextIndex] = useState(0);
    const [wordIndex, setWordIndex] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [finalSeconds, setFinalSeconds] = useState(0);
    const { scores, addScore, clearScores } = leaderboardStore;
    const {
        isRunning,
        isPaused,
        start,
        pause,
        stop,
        reset: resetStopwatch,
        getSeconds,
    } = useStopwatch();

    const text = texts[textIndex] ?? "";
    const words = splitWords(text)
    const currentWord = words[wordIndex];
    const hasError = hasTypingError(currentWord, input);

    const finishGame = () => {
        const seconds = stop();
        addScore({
            wpm: calculateWpm(totalWords, seconds),
            seconds,
            date: new Date().toISOString(),
        });
        setFinalSeconds(seconds);
        setIsFinished(true);
    };

    const startNewGame = useCallback(() => {
        setInput("");
        setTextIndex(0);
        setWordIndex(0);
        setIsFinished(false);
        resetStopwatch();
    }, [resetStopwatch]);

    const selectSet = useCallback((id: string) => {
        setSelectedSetId(id);
        startNewGame();
    }, [startNewGame]);

    const resetLeaderboard = useCallback(() => {
        if (!window.confirm("למחוק את כל השיאים?")) return;
        clearScores();
    }, [clearScores]);

    const handleInputChange = (value: string) => {
        if (isFinished || isPaused) return;
        if (isBlockedSpace(currentWord, value)) return;
        if (!isRunning) start();

        const isLastWord = isLastIndex(wordIndex, words.length);

        if (!isWordDone(currentWord, value, isLastWord)) {
            setInput(value);
            return;
        }

        setInput("");

        if (!isLastWord) {
            setWordIndex(wordIndex + 1);
            return;
        }

        setWordIndex(0);

        if (isLastIndex(textIndex, texts.length)) {
            finishGame();
            return;
        }

        setTextIndex(textIndex + 1);
    };

    const leaderboardSection = (
        <Leaderboard
            scores={scores}
            onNewGame={startNewGame}
            onReset={resetLeaderboard}
        />
    );

    if (texts.length === 0) {
        return (
            <div className="game-page">
                <h1 className="game-title">TypeRacer</h1>
                <SetPicker sets={sets} selectedId={selectedSetId} onSelect={selectSet} />
                <p className="text-progress">אין משפטים בסט הזה</p>
                <Link className="page-link" to="/sets">עריכת סטים</Link>
                {leaderboardSection}
            </div>
        );
    }

    if (isFinished) {
        return (
            <div className="game-page">
                <h1 className="game-title">TypeRacer</h1>
                <Result
                    seconds={finalSeconds}
                    totalWords={totalWords}
                    wpm={calculateWpm(totalWords, finalSeconds)}
                />
                {leaderboardSection}
            </div>
        );
    }

    return (
        <div className="game-page">
            <h1 className="game-title">TypeRacer</h1>
            <SetPicker sets={sets} selectedId={selectedSetId} onSelect={selectSet} />
            <Link className="page-link" to="/sets">עריכת סטים</Link>
            <Stopwatch
                isRunning={isRunning}
                isPaused={isPaused}
                getSeconds={getSeconds}
                onPause={pause}
                onResume={start}
            />
            <p className="text-progress">
                משפט {textIndex + 1} מתוך {texts.length} · מילה {wordIndex + 1} מתוך {words.length}
            </p>
            <TextDisplay
                words={words}
                currentIndex={wordIndex}
                input={input}
                isHidden={isPaused}
            />
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


export default observer(GamePage);