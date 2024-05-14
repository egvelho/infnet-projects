import "./App.css";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { Pictures } from "./components/Pictures";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="window-container">
      <Header />
      <Sidebar />
      <Pictures />
      <Footer />
    </div>
  );
}
