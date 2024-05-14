import styles from "./Button.module.css";

export function Button({ onClick, children, className = "", ...props }) {
  return (
    <button
      className={styles.button.concat(" ", className)}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
