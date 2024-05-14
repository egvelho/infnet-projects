import { GiBirdTwitter } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import { LinkButton } from "../components/LinkButton";
import { Button } from "../components/Button";
import { useGlobalStore } from "../useGlobalStore";
import toast from "react-simple-toasts";
import { AuthService } from "../auth.service";
import { FiLoader } from "react-icons/fi";

export function AppBar() {
  const isLoading = useGlobalStore((state) => state.isLoading);
  const isAuthenticated = useGlobalStore((state) => state.isAuthenticated);
  const currentArea = isAuthenticated ? <UserArea /> : <AnonArea />;

  const loader = isLoading ? (
    <FiLoader className="animate-spin w-[24px] h-[24px] text-purple-600" />
  ) : null;

  return (
    <header className="flex border-b p-4 items-center justify-between bg-white">
      <div>
        <Link
          to="/"
          className="flex items-center gap-1 text-purple-900 hover:text-orange-500"
        >
          <GiBirdTwitter size="36px" />
          <span className="text-2xl font-bold">Paçaro</span>
        </Link>
      </div>
      <div className="flex items-center gap-4">
        {currentArea}
        {loader}
      </div>
    </header>
  );
}

function UserArea() {
  const navigate = useNavigate();
  const user = useGlobalStore((state) => state.user);
  const setIsAuthenticated = useGlobalStore(
    (state) => state.setIsAuthenticated
  );
  const cleanUser = useGlobalStore((state) => state.cleanUser);

  function onClickLogout() {
    AuthService.removeToken();
    setIsAuthenticated(false);
    cleanUser();
    toast("Você saiu da sua conta");
    navigate("/");
  }

  return (
    <div className="flex gap-2 items-center">
      <Link
        to="/perfil"
        title="Ir para a tela de perfil"
        className="flex gap-2 items-center"
      >
        <img
          src={user.avatar ?? "/anon.png"}
          alt=""
          className="w-[36px] h-[36px] rounded-full bg-slate-100"
        />
        <span className="font-bold">
          {user.name} {user.surname}
        </span>
      </Link>
      <LinkButton to="/usuarios">Usuários</LinkButton>
      <Button onClick={onClickLogout}>Sair</Button>
    </div>
  );
}

function AnonArea() {
  return (
    <div className="flex gap-2">
      <LinkButton to="/entrar">Entrar</LinkButton>
      <LinkButton to="/criar-conta">Criar conta</LinkButton>
    </div>
  );
}
