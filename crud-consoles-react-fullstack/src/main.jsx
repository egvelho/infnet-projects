import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { toastConfig } from "react-simple-toasts";
import "react-simple-toasts/dist/theme/dark.css";

toastConfig({ theme: "dark" });

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
