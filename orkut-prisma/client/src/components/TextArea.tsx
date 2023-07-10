export type TextAreaProps = {
  value?: string;
  onChange?: (value: string) => void;
  placeholder: string;
  rows?: number;
  name?: string;
  className?: string;
};

export function TextArea({
  value,
  placeholder,
  onChange,
  className = "",
  name,
  rows = 3,
}: TextAreaProps) {
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      name={name}
      onChange={onChange ? (event) => onChange(event.target.value) : undefined}
      className={`bg-white dark:bg-slate-600 rounded border dark:border-slate-900 shadow-sm p-2 text-sm outline-none focus:border-blue-400 w-full resize-none ${className}`}
      rows={rows}
    />
  );
}
