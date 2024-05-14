import style from "./TextField.module.css";
import { Message } from "../Message/Message";

export type TextFieldProps = {
  value: string;
  placeholder: string;
  message: string;
  error?: boolean;
  onChange: (value: string) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement, Element>) => void;
  type?: React.HTMLInputTypeAttribute;
};

export function TextField({
  value,
  onChange,
  onBlur,
  type = "text",
  placeholder,
  error = false,
  message,
}: TextFieldProps) {
  const className = `${style["text-field"]} ${
    error ? style["text-field-error"] : ""
  }`;
  const messageComponent = message ? (
    <Message error={error}>{message}</Message>
  ) : null;

  return (
    <>
      <input
        className={className}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        onBlur={onBlur}
      />
      {messageComponent}
    </>
  );
}
