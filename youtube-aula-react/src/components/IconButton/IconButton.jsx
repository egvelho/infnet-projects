import styles from "./IconButton.module.css";

export function IconButton({ children, onClick, bgColor, className = "" }) {
  return (
    <button
      style={{
        "--bg-color": bgColor,
      }}
      className={`${styles["icon-button"]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
