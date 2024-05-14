export function YouTubeLogo() {
  return (
    <span
      style={{
        display: "flex",
        gap: "6px",
        alignItems: "center",
      }}
    >
      <img
        src="youtube.png"
        style={{
          height: "24px",
          maxWidth: "initial",
        }}
      />
      <span
        style={{
          fontWeight: "bold",
        }}
      >
        YouTube
      </span>
    </span>
  );
}
