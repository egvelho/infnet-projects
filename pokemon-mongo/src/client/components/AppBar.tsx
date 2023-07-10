import { Link, useNavigate } from "react-router-dom";
import { FiLoader } from "react-icons/fi";
import { LinkButton } from "./LinkButton";
import { useGlobalStore, initialTrainer } from "../utils/useGlobalStore";
import { AuthToken } from "../utils/authToken";
import { Button } from "./Button";

const texts = {
  appTitle: "Pokemon!",
  createNotepadLink: "Criar notepad",
  createAccountLink: "Criar conta",
  storeLink: "Acessar loja",
  logoutButtonLabel: "Sair",
};

export function AppBar() {
  const navigate = useNavigate();
  const isLoading = useGlobalStore((state) => state.isLoading);
  const trainer = useGlobalStore((state) => state.trainer);
  const setTrainer = useGlobalStore((state) => state.setTrainer);

  function onLogout() {
    setTrainer(initialTrainer);
    AuthToken.remove();
    navigate("/");
  }

  return (
    <header className="bg-white shadow-md flex flex-row items-center justify-between p-3 sticky top-0 left-0 z-30">
      <div className="flex flex-row items-center gap-8">
        <Link to="/" className="flex flex-row items-center gap-2">
          <img src="/logo.png" alt="Logo" className="h-[36px]" />
          <h1 className="font-bold uppercase text-2xl">{texts.appTitle}</h1>
        </Link>
      </div>
      <div className="flex flex-row items-center gap-2">
        {trainer.isAuthenticated === false && (
          <LinkButton
            to="/criar-conta"
            className="bg-blue-500 hover:bg-blue-600"
          >
            {texts.createAccountLink}
          </LinkButton>
        )}
        {trainer.isAuthenticated === true && (
          <>
            <span className="text-2xl font-bold font-[VT323]">
              <Link to="/treinador" className="hover:underline">
                {trainer.username}
              </Link>{" "}
              / {trainer.credit}c
            </span>
            <LinkButton to="/loja" className="bg-pink-600 hover:bg-pink-700">
              {texts.storeLink}
            </LinkButton>
            <Button onClick={onLogout}>{texts.logoutButtonLabel}</Button>
          </>
        )}
        {isLoading && <FiLoader className="animate-spin" />}
      </div>
    </header>
  );
}
