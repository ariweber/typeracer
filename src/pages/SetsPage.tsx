import { useCallback, useState } from "react";
import { Link } from "react-router";
import useTextSets from "../hooks/useTextSets";
import AddTextForm from "../components/AddTextForm";
import SetPicker from "../components/SetPicker";

export default function SetsPage() {
    const { sets, addText, addSet, removeText, removeSet } = useTextSets();
    const [selectedSetId, setSelectedSetId] = useState(sets[0].id);
    const selectedSet = sets.find((set) => set.id === selectedSetId) ?? sets[0];

    const addToSelectedSet = useCallback((text: string) => {
        addText(selectedSet.id, text);
    }, [addText, selectedSet.id]);

    const createSet = useCallback((title: string) => {
        const id = addSet(title);
        if (!id) return;
        setSelectedSetId(id);
    }, [addSet]);

    const deleteSelectedSet = () => {
        if (!window.confirm(`למחוק את הסט "${selectedSet.title}"?`)) return;
        removeSet(selectedSet.id);
    };

    return (
        <div className="game-page">
            <h1 className="game-title">עריכת סטים</h1>
            <Link className="page-link" to="/">חזרה למשחק</Link>
            <AddTextForm
                onAdd={createSet}
                placeholder="שם לסט חדש"
                buttonLabel="צור סט"
            />
            <SetPicker
                sets={sets}
                selectedId={selectedSet.id}
                onSelect={setSelectedSetId}
            />
            {selectedSet.texts.length === 0
                ? <p className="text-progress">אין משפטים בסט הזה</p>
                : (
                    <ul className="sentence-list">
                        {selectedSet.texts.map((text, index) => (
                            <li
                                className="sentence-item"
                                key={`${index}-${text}`}
                            >
                                <span className="sentence-text" dir="auto">
                                    {text}
                                </span>
                                <button
                                    className="button button-danger"
                                    type="button"
                                    onClick={() =>
                                        removeText(selectedSet.id, index)}
                                >
                                    מחק
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            <AddTextForm
                onAdd={addToSelectedSet}
                placeholder={`משפט חדש ל"${selectedSet.title}"`}
                buttonLabel="הוסף משפט"
            />
            <button
                className="button button-danger"
                type="button"
                onClick={deleteSelectedSet}
                disabled={sets.length <= 1}
            >
                מחק סט
            </button>
        </div>
    );
}
