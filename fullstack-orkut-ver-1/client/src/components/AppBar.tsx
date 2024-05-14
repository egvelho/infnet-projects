import { Link } from "react-router-dom";
import { LinkButton } from "./LinkButton";
import { Button } from "./Button";
import { FiLoader } from "react-icons/fi";
import { useGlobalStore } from "../useGlobalStore";
import { logout } from "../logout";

const texts = {
  appTitle: "Orkut",
  homeLink: "Início",
  createPostLink: "Criar post",
  signInLink: "Entrar",
  signUpLink: "Criar conta",
  logoutButtonLabel: "Sair",
};

export function AppBar() {
  const isLoading = useGlobalStore((state) => state.isLoading);
  const isAuthenticated = useGlobalStore((state) => state.isAuthenticated);

  return (
    <header className="bg-white dark:bg-slate-800 dark:text-white shadow-md flex flex-row items-center justify-between p-3 sticky top-0 left-0 z-30">
      <div className="flex flex-row items-center gap-8">
        <Link to="/" className="flex flex-row items-center gap-2">
          <img src="/logo.png" alt="Logo" className="h-[36px]" />
          <h1 className="font-bold uppercase text-lg">{texts.appTitle}</h1>
        </Link>
        <Link
          to="/"
          className="text-blue-400 hover:text-blue-500 font-bold text-md hidden md:block"
        >
          {texts.homeLink}
        </Link>
      </div>
      <div className="flex flex-row items-center gap-2">
        {isAuthenticated && (
          <LinkButton to="/criar-post">{texts.createPostLink}</LinkButton>
        )}
        {isAuthenticated && (
          <Button onClick={logout}>{texts.logoutButtonLabel}</Button>
        )}
        {isAuthenticated && <UserView />}
        {!isAuthenticated && (
          <LinkButton to="/criar-conta">{texts.signUpLink}</LinkButton>
        )}
        {!isAuthenticated && (
          <LinkButton to="/entrar">{texts.signInLink}</LinkButton>
        )}
        {isLoading && <FiLoader className="animate-spin" />}
      </div>
    </header>
  );
}

function UserView() {
  const user = useGlobalStore((state) => state.user);
  return (
    <Link to="/perfil" className="flex flex-row items-center gap-2">
      <img src="https://picsum.photos/200/200" className="rounded-full w-8" />
      <span className="text-lg font-bold hover:underline">
        {user.first_name} {user.last_name}
      </span>
    </Link>
  );
}
