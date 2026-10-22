import { memo } from "react";
import type { TextSet } from "../types";

type SetPickerProps = {
  sets: TextSet[];
  selectedId: string;
  onSelect: (id: string) => void;
};

function SetPicker({ sets, selectedId, onSelect }: SetPickerProps) {
  return (
    <label className="set-picker">
      <span className="set-picker-label">בחר סט משפטים</span>
      <select
        className="set-picker-select"
        value={selectedId}
        onChange={(event) => onSelect(event.target.value)}
      >
        {sets.map((set) => (
          <option key={set.id} value={set.id}>
            {set.title} ({set.texts.length})
          </option>
        ))}
      </select>
    </label>
  );
}

export default memo(SetPicker);