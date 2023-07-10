export type TextFieldProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
};

export function TextField({ value, placeholder, onChange }: TextFieldProps) {
  return (
    <input
      placeholder={placeholder}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="bg-white rounded border shadow-sm p-2 text-sm outline-none focus:border-green-400 w-full"
      type="text"
    />
  );
}
