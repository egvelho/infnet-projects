import { Link } from "react-router-dom";
import { UserItem } from "./UserItem";
import type { NotepadItem } from "../types";

export type NotepadListProps = {
  notepads: NotepadItem[];
};

export function NotepadList({ notepads }: NotepadListProps) {
  return (
    <div className="bg-white p-4 w-full md:rounded-lg md:shadow-lg">
      {notepads.map((notepad, index) => {
        return (
          <div className={`py-4 ${index > 0 && "border-t"}`} key={notepad.id}>
            {notepad.user !== undefined && typeof notepad.user !== "number" && (
              <Link to={`/usuarios/${(notepad as any).user.id}`}>
                <UserItem user={notepad.user} />
              </Link>
            )}
            <Link to={`/publicacoes/${notepad.id}`}>
              <time
                dateTime={notepad.created_at}
                className="text-gray-500 text-sm"
              >
                {new Date(notepad.created_at).toLocaleDateString()}
              </time>
              <h2 className="font-bold text-lg">{notepad.title}</h2>
              <p>{notepad.subtitle}</p>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
