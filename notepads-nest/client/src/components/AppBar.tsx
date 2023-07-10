import { Link } from "react-router-dom";
import { LinkButton } from "./LinkButton";
import { logout } from "../api/logout";
import { useGlobalStore, initialUser } from "../useGlobalStore";
import { UserItem } from "./UserItem";
import { Button } from "./Button";

const texts = {
  appTitle: "Pastebin",
  homeLink: "Página inicial",
  createNotepadLink: "Criar notepad",
  loginLink: "Entrar",
  createAccountLink: "Criar conta",
  messengerLink: "Conversar",
  logoutButtonLabel: "Sair",
};

export function AppBar() {
  const user = useGlobalStore((state) => state.user);
  const setUser = useGlobalStore((state) => state.setUser);

  function onLogout() {
    setUser(initialUser);
    logout();
  }

  return (
    <header className="bg-white shadow-md flex flex-row items-center justify-between p-3 sticky top-0 left-0">
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
        {user.isAuthenticated === false && (
          <>
            <LinkButton to="/login" className="bg-blue-500 hover:bg-blue-600">
              {texts.loginLink}
            </LinkButton>
            <LinkButton
              to="/criar-conta"
              className="bg-blue-500 hover:bg-blue-600"
            >
              {texts.createAccountLink}
            </LinkButton>
          </>
        )}
        {user.isAuthenticated === true && (
          <>
            <LinkButton to="/criar-notepad">
              {texts.createNotepadLink}
            </LinkButton>
            <LinkButton to="/conversar">{texts.messengerLink}</LinkButton>
            <Button onClick={onLogout}>{texts.logoutButtonLabel}</Button>
            <Link to="/usuario">
              <UserItem user={user} />
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
