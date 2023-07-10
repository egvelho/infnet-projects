import { Link } from "react-router-dom";
import type { Notepad } from "../../../shared/types";

export type NotepadListProps = {
  notepads: Notepad[];
};

export function NotepadList({ notepads }: NotepadListProps) {
  return (
    <div className="bg-white p-4 w-full rounded-lg shadow-lg">
      {notepads.map((notepad, index) => {
        return (
          <Link to={`/publicacoes/${notepad.id}`} key={notepad.id}>
            <div className={`py-4 ${index > 0 && "border-t"}`}>
              <time
                dateTime={notepad.created_at}
                className="text-gray-500 text-sm"
              >
                {new Date(notepad.created_at).toLocaleDateString()}
              </time>
              <h2 className="font-bold text-lg">{notepad.title}</h2>
              <p>{notepad.subtitle}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
