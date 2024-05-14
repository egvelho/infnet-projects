import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppBar } from "./components/AppBar";
import { UserAccountRoute } from "./routes/UserAccountRoute";
import { HomeRoute } from "./routes/HomeRoute";
import { CreatePostRoute } from "./routes/CreatePostRoute";
import { ViewPostRoute } from "./routes/ViewPostRoute";
import { EditPostRoute } from "./routes/EditPostRoute";
import { PostPageRoute } from "./routes/PostPageRoute";
import { ProfileRoute } from "./routes/ProfileRoute";
import { SignInRoute } from "./routes/SignInRoute";
import { SignUpRoute } from "./routes/SignUpRoute";
import { UpdateProfileRoute } from "./routes/UploadProfileRoute";
import { LoadUser } from "./components/LoadUser";

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <LoadUser />
        <AppBar />
        <Routes>
          <Route path="/" element={<HomeRoute />} />
          <Route path="/usuario" element={<UserAccountRoute />} />
          <Route path="/criar-publicacao" element={<CreatePostRoute />} />
          <Route path="/ver-publicacao/:id" element={<ViewPostRoute />} />
          <Route path="/editar-publicacao/:id" element={<EditPostRoute />} />
          <Route path="/publicacoes/:page" element={<PostPageRoute />} />
          <Route path="/perfil/:id" element={<ProfileRoute />} />
          <Route path="/atualizar-perfil" element={<UpdateProfileRoute />} />
          <Route path="/entrar" element={<SignInRoute />} />
          <Route path="/criar-conta" element={<SignUpRoute />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
