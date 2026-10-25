import { memo, useState } from "react";

type AddTextFormProps = {
  onAdd: (text: string) => void;
  placeholder: string;
  buttonLabel: string;
};

function AddTextForm({ onAdd, placeholder, buttonLabel }: AddTextFormProps) {
  const [draft, setDraft] = useState("");

  return (
    <form
      className="add-text"
      onSubmit={(event) => {
        event.preventDefault();
        onAdd(draft);
        setDraft("");
      }}
    >
      <input
        className="add-text-field"
        type="text"
        dir="rtl"
        placeholder={placeholder}
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
      />
      <button className="button" type="submit" disabled={!draft.trim()}>
        {buttonLabel}
      </button>
    </form>
  );
}

export default memo(AddTextForm);
