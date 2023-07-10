export type TextAreaProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  rows?: number;
};

export function TextArea({
  value,
  placeholder,
  onChange,
  rows = 3,
}: TextAreaProps) {
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="bg-white rounded border shadow-sm p-2 text-sm outline-none focus:border-green-400 w-full resize-none"
      rows={rows}
    />
  );
}
