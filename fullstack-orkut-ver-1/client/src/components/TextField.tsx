export type TextFieldProps = {
  value?: string;
  onChange?: (value: string) => void;
  placeholder: string;
  name?: string;
  className?: string;
  type?: string;
};

export function TextField({
  value,
  placeholder,
  onChange,
  name,
  className = "",
  type = "text",
}: TextFieldProps) {
  return (
    <input
      placeholder={placeholder}
      value={value}
      name={name}
      onChange={onChange ? (event) => onChange(event.target.value) : undefined}
      className={`bg-white dark:bg-slate-600 rounded border dark:border-slate-900 shadow-sm p-2 text-sm outline-none focus:border-blue-400 w-full ${className}`}
      type={type}
    />
  );
}
