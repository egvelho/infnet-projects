import { GiBirdTwitter } from "react-icons/gi";
import { Link } from "react-router-dom";
import { LinkButton } from "../components/LinkButton";

export function AppBar() {
  return (
    <header className="flex border-b p-4 items-center justify-between bg-white">
      <div>
        <Link
          to="/"
          className="flex items-center gap-1 text-purple-900 hover:text-orange-500"
        >
          <GiBirdTwitter size="36px" />
          <span className="text-2xl font-bold">Paçaro Tarefas</span>
        </Link>
      </div>
      <div className="flex gap-2">
        <LinkButton to="/criar-tarefa">Criar tarefa</LinkButton>
      </div>
    </header>
  );
}
