import style from "./Button.module.css";

const warningColor = "#F7B267";
const errorColor = "#F25C54";

export type ButtonProps = {
  error?: boolean;
  warning?: boolean;
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export function Button({
  children,
  onClick,
  error = false,
  warning = false,
}: ButtonProps) {
  let color;
  if (warning) {
    color = warningColor;
  } else if (error) {
    color = errorColor;
  }

  const inlineStyle = {
    color,
    borderColor: color,
  };

  return (
    <button className={style.button} onClick={onClick} style={inlineStyle}>
      {children}
    </button>
  );
}
