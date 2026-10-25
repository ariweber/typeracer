type TypingInputProps = {
  value: string;
  onChange: (value: string) => void;
  hasError: boolean;
  disabled: boolean;
};

export default function TypingInput({ value, onChange, hasError, disabled }: TypingInputProps) {
  return (
    <div className="typing-input">
      <input
        className={hasError ? "typing-input-field error" : "typing-input-field"}
        type="text"
        dir="rtl"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        disabled={disabled}
        autoFocus
      />
      {hasError && <p className="typing-input-error">המילה שגויה, תקן אותה כדי להמשיך</p>}
    </div>
  );
}