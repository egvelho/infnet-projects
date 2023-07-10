import { Link } from "react-router-dom";
import { LinkButton } from "./LinkButton";

const texts = {
  appTitle: "Pastebin",
  homeLink: "Página inicial",
  createNotepadLink: "Criar notepad",
};

export function AppBar() {
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
        <LinkButton to="/criar-notepad">{texts.createNotepadLink}</LinkButton>
      </div>
    </header>
  );
}
