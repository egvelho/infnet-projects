import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "@fontsource/fira-code";
import "@fontsource/fira-sans";
import "./main.css";
import { toastConfig } from "react-simple-toasts";
import "react-simple-toasts/dist/theme/dark.css";

toastConfig({ theme: "dark" });

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
