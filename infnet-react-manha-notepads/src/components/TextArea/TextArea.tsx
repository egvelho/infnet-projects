import style from "./TextArea.module.css";
import { Message } from "../Message/Message";

export type TextAreaProps = {
  value: string;
  placeholder: string;
  message: string;
  error?: boolean;
  onChange: (value: string) => void;
  onBlur: (event: React.FocusEvent<HTMLTextAreaElement, Element>) => void;
};

export function TextArea({
  value,
  onChange,
  onBlur,
  placeholder,
  message,
  error = false,
}: TextAreaProps) {
  function onChangeEvent(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const nextValue = event.target.value;
    onChange(nextValue);
  }

  const className = `${style["text-area"]} ${
    error ? style["text-area-error"] : ""
  }`;
  const messageComponent = message ? (
    <Message error={error}>{message}</Message>
  ) : null;

  return (
    <>
      <textarea
        className={className}
        value={value}
        onChange={onChangeEvent}
        onBlur={onBlur}
        placeholder={placeholder}
      />
      {messageComponent}
    </>
  );
}
