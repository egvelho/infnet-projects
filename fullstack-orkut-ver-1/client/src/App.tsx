import {
  unstable_HistoryRouter as HistoryRouter,
  Routes,
  Route,
} from "react-router-dom";
import { AppBar } from "./components/AppBar";
import { AuthChecker } from "./components/AuthChecker";
import { browserHistory } from "./browserHistory";
import { Home } from "./routes/Home";
import { PostsPage } from "./routes/PostsPage";
import { CreatePost } from "./routes/CreatePost";
import { ViewPost } from "./routes/ViewPost";
import { EditPost } from "./routes/EditPost";
import { UserPage } from "./routes/UserPage";
import { SignIn } from "./routes/SignIn";
import { SignUp } from "./routes/SignUp";
import { ProfilePage } from "./routes/ProfilePage";

function App() {
  return (
    <HistoryRouter history={browserHistory}>
      <div className="bg-blue-100 dark:bg-slate-700 w-full min-h-screen absolute top-0 left-0">
        <AppBar />
        <AuthChecker />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/page/:page" element={<PostsPage />} />
          <Route path="/criar-post" element={<CreatePost />} />
          <Route path="/publicacoes/:id" element={<ViewPost />} />
          <Route path="/publicacoes/editar/:id" element={<EditPost />} />
          <Route path="/usuarios/:id" element={<UserPage />} />
          <Route path="/perfil" element={<ProfilePage />} />
          <Route path="/entrar" element={<SignIn />} />
          <Route path="/criar-conta" element={<SignUp />} />
        </Routes>
      </div>
    </HistoryRouter>
  );
}

export default App;
