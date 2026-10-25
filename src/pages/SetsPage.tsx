import { useCallback, useState } from "react";
import { Link } from "react-router";
import { observer } from "mobx-react-lite";
import { setsStore } from "../stores/setsStore";
import AddTextForm from "../components/AddTextForm";
import BulkAddForm from "../components/BulkAddForm";
import SetPicker from "../components/SetPicker";

function SetsPage() {
    const { sets, addText, addTexts, addSet, renameSet, removeText, removeSet } = setsStore;
    const [selectedSetId, setSelectedSetId] = useState(sets[0].id);
    const selectedSet = sets.find((set) => set.id === selectedSetId) ?? sets[0];
    const [isRenaming, setIsRenaming] = useState(false);

    const selectSet = useCallback((id: string) => {
        setSelectedSetId(id);
        setIsRenaming(false);
    }, []);

    const addToSelectedSet = useCallback((text: string) => {
        addText(selectedSet.id, text);
    }, [addText, selectedSet.id]);

    const addManyToSelectedSet = useCallback((texts: string[]) => {
        addTexts(selectedSet.id, texts);
    }, [addTexts, selectedSet.id]);

    const renameSelectedSet = useCallback((title: string) => {
        renameSet(selectedSet.id, title);
        setIsRenaming(false);
    }, [renameSet, selectedSet.id]);

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
                onSelect={selectSet}
            />
            {isRenaming
                ? (
                    <div className="rename-set">
                        <AddTextForm
                            onAdd={renameSelectedSet}
                            placeholder={`שם חדש ל"${selectedSet.title}"`}
                            buttonLabel="שמור"
                        />
                        <button
                            className="button"
                            type="button"
                            onClick={() => setIsRenaming(false)}
                        >
                            ביטול
                        </button>
                    </div>
                )
                : (
                    <button
                        className="button rename-set-toggle"
                        type="button"
                        onClick={() => setIsRenaming(true)}
                    >
                        שנה שם
                    </button>
                )}
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
                placeholder={`משפט חדש לסט "${selectedSet.title}"`}
                buttonLabel="הוסף משפט"
            />
            <BulkAddForm
                onAdd={addManyToSelectedSet}
                placeholder="הדבק טקסט ארוך – כל משפט (שמסתיים ב-. ! ? או בשורה חדשה) יתווסף בנפרד"
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


export default observer(SetsPage);