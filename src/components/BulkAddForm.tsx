import { memo, useState } from "react";
import { splitSentences } from "../utils/textSets";

type BulkAddFormProps = {
  onAdd: (texts: string[]) => void;
  placeholder: string;
};

function BulkAddForm({ onAdd, placeholder }: BulkAddFormProps) {
  const [draft, setDraft] = useState("");
  const sentences = splitSentences(draft);

  return (
    <form
      className="bulk-add"
      onSubmit={(event) => {
        event.preventDefault();
        onAdd(sentences);
        setDraft("");
      }}
    >
      <textarea
        className="add-text-field bulk-add-field"
        dir="rtl"
        rows={6}
        placeholder={placeholder}
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
      />
      <button
        className="button"
        type="submit"
        disabled={sentences.length === 0}
      >
        הוסף {sentences.length} משפטים
      </button>
    </form>
  );
}

export default memo(BulkAddForm);
