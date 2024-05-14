import styles from "./NotepadList.module.css";
import { NotepadCard } from "../NotepadCard/NotepadCard";
import type { Notepad } from "../../types";

export type NotepadListProps = {
  notepads: Notepad[];
  onClickItem: (notepad: Notepad) => void;
};

export function NotepadList({ notepads, onClickItem }: NotepadListProps) {
  const notepadsItems = notepads.map((notepad) => (
    <div
      key={notepad.id}
      className={styles["notepad-item"]}
      onClick={() => onClickItem(notepad)}
    >
      <NotepadCard {...notepad} />
    </div>
  ));

  return <div className={styles["notepad-list"]}>{notepadsItems}</div>;
}
