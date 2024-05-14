import { Card } from "./Card";
import { Link } from "react-router-dom";

export function AvatarCard({ id, avatar, first_name, last_name }) {
  return (
    <Card>
      <img src={avatar} alt={`Foto de ${first_name}`} />
      <Link
        to={`/perfil/${id}`}
        className="text-blue-600 hover:text-blue-800 hover:underline font-bold"
      >
        {first_name} {last_name}
      </Link>
    </Card>
  );
}
