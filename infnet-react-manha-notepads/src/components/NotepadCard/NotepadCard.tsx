import styles from "./NotepadCard.module.css";
import { Card } from "../Card/Card";
import type { Notepad } from "../../types";

export type NotepadCardProps = Notepad;

export function NotepadCard({
  id,
  title,
  subtitle,
  content,
  createdAt,
}: NotepadCardProps) {
  const createdAtLabel = new Date(createdAt).toLocaleString();

  return (
    <Card>
      <div className={styles["notepad-card"]}>
        <span className={styles["notepad-id"]}>#{id}</span>
        <time className={styles["notepad-created-at"]} dateTime={createdAt}>
          {createdAtLabel}
        </time>
        <h2 className={styles["notepad-title"]}>{title}</h2>
        <p className={styles["notepad-subtitle"]}>{subtitle}</p>
        <p className={styles["notepad-content"]}>{content}</p>
      </div>
    </Card>
  );
}
