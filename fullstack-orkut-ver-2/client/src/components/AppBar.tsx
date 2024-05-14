import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-simple-toasts";
import { FaSpinner } from "react-icons/fa";
import { globalNavigate } from "../globalNavigate";
import { LinkButton } from "./LinkButton";
import { Button } from "./Button";
import { useGlobalStore } from "../useGlobalStore";
import { TokenStorage } from "../tokenStorage";

export function AppBar() {
  const user = useGlobalStore((state) => state.user);
  const setUser = useGlobalStore((state) => state.setUser);
  const setIsAuthorized = useGlobalStore((state) => state.setIsAuthorized);
  const isAuthorized = useGlobalStore((state) => state.isAuthorized);
  const isLoading = useGlobalStore((state) => state.isLoading);

  const navigate = useNavigate();

  useEffect(() => {
    globalNavigate.navigate = navigate;
  }, [navigate]);

  function logout() {
    TokenStorage.removeToken();
    navigate("/entrar");
    toast(`Até mais, ${user.first_name}!`);
    setIsAuthorized(false);
    setUser({
      id: 0,
      first_name: "",
      last_name: "",
      email: "",
      avatar: "",
    });
  }

  return (
    <header className="bg-white p-3 shadow-md flex flex-row justify-between">
      <div className="flex flex-row items-center gap-8">
        <Logo />
        <Link
          to="/"
          className="text-blue-400 hover:text-blue-600 hover:underline font-bold hidden md:block"
        >
          Página inicial
        </Link>
        {isLoading && <FaSpinner className="animate-spin text-2xl" />}
      </div>
      {isAuthorized && (
        <div className="flex flex-row items-center gap-4">
          <LinkButton to="/criar-publicacao">Criar publicação</LinkButton>
          <LinkButton to="/atualizar-perfil">Atualizar perfil</LinkButton>
          <Button onClick={logout}>Sair</Button>
          <Link to="/usuario" className="flex flex-row items-center gap-2">
            {user.first_name} {user.last_name}
            <img src={user.avatar} className="w-12 h-12 rounded-full" />
          </Link>
        </div>
      )}
      {!isAuthorized && (
        <div className="flex flex-row items-center gap-4">
          <LinkButton to="/entrar">Entrar</LinkButton>
          <LinkButton to="/criar-conta">Criar conta</LinkButton>
        </div>
      )}
    </header>
  );
}

function Logo() {
  return (
    <Link to="/" className="flex flex-row items-center gap-2" title="Orkut">
      <img
        alt="Orkut"
        src="/orkut.png"
        style={{
          height: "22px",
        }}
      />
    </Link>
  );
}
