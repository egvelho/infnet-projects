import {
  unstable_HistoryRouter as HistoryRouter,
  Routes,
  Route,
} from "react-router-dom";
import { browserHistory } from "./browserHistory";
import { AppBar } from "./components/AppBar";
import { LoadAuthUser } from "./LoadAuthUser";
import { Home } from "./routes/Home";
import { Login } from "./routes/Login";
import { Myself } from "./routes/Myself";
import { UserView } from "./routes/UserView";
import { CreateNotepad } from "./routes/CreateNotepad";
import { ViewNotepad } from "./routes/ViewNotepad";
import { EditNotepad } from "./routes/EditNotepad";
import { CreateAccount } from "./routes/CreateAccount";
import { Messenger } from "./routes/Messenger";
import { EmailVerificationModal } from "./EmailVerificationModal";
import "./App.css";

function App() {
  return (
    <HistoryRouter history={browserHistory}>
      <div>
        <AppBar />
        <LoadAuthUser />
        <EmailVerificationModal />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/criar-conta" element={<CreateAccount />} />
          <Route path="/usuario" element={<Myself />} />
          <Route path="/usuarios/:id" element={<UserView />} />
          <Route path="/criar-notepad" element={<CreateNotepad />} />
          <Route path="/publicacoes/:id" element={<ViewNotepad />} />
          <Route path="/publicacoes/editar/:id" element={<EditNotepad />} />
          <Route path="/conversar" element={<Messenger />} />
        </Routes>
      </div>
    </HistoryRouter>
  );
}

export default App;
