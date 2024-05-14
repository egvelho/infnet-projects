import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { configure } from "axios-hooks";
import { axios } from "./axios";
import { Layout } from "./layout/Layout";
import { HomePage } from "./pages/HomePage";
import { CreateTaskPage } from "./pages/CreateTaskPage";
import { EditTaskPage } from "./pages/EditTaskPage";

configure({ axios });

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/criar-tarefa" element={<CreateTaskPage />} />
          <Route path="/editar-tarefa/:id" element={<EditTaskPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
