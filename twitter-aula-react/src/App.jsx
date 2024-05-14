import "./App.css";
import {
  unstable_HistoryRouter as HistoryRouter,
  Routes,
  Route,
} from "react-router-dom";
import { configure } from "axios-hooks";
import { axios } from "./axios";
import { Layout } from "./layout/Layout";
import { HomePage } from "./pages/HomePage";
import { SignUpPage } from "./pages/SignUpPage";
import { SignInPage } from "./pages/SignInPage";
import { EditProfilePage } from "./pages/EditProfileRoute";
import { ProfilePage } from "./pages/ProfilePage";
import { ViewProfilePage } from "./pages/ViewProfilePage";
import { ViewUsersPage } from "./pages/ViewUsersPage";
import { ViewFollowsPage } from "./pages/ViewFollowsPage";

import { LoadSession } from "./LoadSession";
import { history } from "./history";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/pt-br";

dayjs.extend(relativeTime);
dayjs.locale("pt-br");

configure({ axios });

function App() {
  return (
    <HistoryRouter history={history}>
      <LoadSession />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/criar-conta" element={<SignUpPage />} />
          <Route path="/entrar" element={<SignInPage />} />
          <Route path="/editar-perfil" element={<EditProfilePage />} />
          <Route path="/u/:username" element={<ViewProfilePage />} />
          <Route path="/seguindo/:userId" element={<ViewFollowsPage />} />
          <Route path="/perfil" element={<ProfilePage />} />
          <Route path="/usuarios" element={<ViewUsersPage />} />
        </Routes>
      </Layout>
    </HistoryRouter>
  );
}

export default App;
