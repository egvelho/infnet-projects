import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppBar } from "./components/AppBar";
import { Home } from "./routes/Home";
import { NotepadsPage } from "./routes/NotepadsPage";
import { CreateNotepad } from "./routes/CreateNotepad";
import { ViewNotepad } from "./routes/ViewNotepad";
import { EditNotepad } from "./routes/EditNotepad";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div>
        <AppBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/notepads/page/:page" element={<NotepadsPage />} />
          <Route path="/criar-notepad" element={<CreateNotepad />} />
          <Route path="/publicacoes/:id" element={<ViewNotepad />} />
          <Route path="/publicacoes/editar/:id" element={<EditNotepad />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
