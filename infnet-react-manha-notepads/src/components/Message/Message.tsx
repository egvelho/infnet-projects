import style from "./Message.module.css";

export type MessageProps = {
  children: React.ReactNode;
  error?: boolean;
};

export function Message({ children, error = false }: MessageProps) {
  const className = `${style["message"]} ${
    error ? style["message-error"] : ""
  }`;

  return <p className={className}>{children}</p>;
}
