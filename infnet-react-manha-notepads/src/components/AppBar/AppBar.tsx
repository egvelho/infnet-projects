import style from "./AppBar.module.css";
import { Title } from "../Title/Title";
import { Button, ButtonProps } from "../Button/Button";

const logoSrc =
  "https://upload.wikimedia.org/wikipedia/commons/f/f0/Icon-notepad.svg";

export type AppBarProps = {
  onClickCreateNotepad: ButtonProps["onClick"];
};

export function AppBar({ onClickCreateNotepad }: AppBarProps) {
  return (
    <header className={style["app-bar"]}>
      <a href="/" className={style["app-bar-link"]}>
        <img className={style["app-bar-logo"]} src={logoSrc} />
        <Title>Notepads</Title>
      </a>
      <Button onClick={onClickCreateNotepad}>Criar notepad</Button>
    </header>
  );
}
