import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import { toastConfig } from "react-simple-toasts";

import "react-simple-toasts/dist/theme/dark.css";
import "@fontsource/vt323";
import "./tailwind.css";
import "./style.css";

toastConfig({
  theme: "dark",
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <App />
);
