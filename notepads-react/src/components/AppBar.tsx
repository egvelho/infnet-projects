import { Link } from "react-router-dom";
import { LinkButton } from "./LinkButton";
import { MdStickyNote2 as LogoIcon } from "react-icons/md";

export function AppBar() {
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
      </div>
      <div className="flex flex-row items-center gap-8">
        <LinkButton to="/criar-notepad">Criar notepad</LinkButton>
      </div>
    </header>
  );
}

function Logo() {
  return (
    <Link to="/" className="flex flex-row items-center gap-2">
      <LogoIcon className="text-green-400 text-4xl" />
      <h1 className="text-lg uppercase font-bold">Notepads</h1>
    </Link>
  );
}
