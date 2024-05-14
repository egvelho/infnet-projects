import { Link } from "react-router-dom";
import { Card } from "../Card";
import type { User } from "../../../../shared/types";

type ProfileCardProps = {
  user: User;
};

export function ProfileCard({ user }: ProfileCardProps) {
  const fullName = `${user.first_name} ${user.last_name}`;
  const since = new Date(user.created_at).toLocaleDateString();

  return (
    <Card className="flex flex-col gap-1 items-center lg:items-start">
      <img
        className="w-[128px] lg:w-full rounded-full lg:rounded-none"
        src="https://fastly.picsum.photos/id/1027/200/200.jpg?hmac=fiXlkLLwYm7JmmU80uRIj9g21XD4q9v_lM_2Z57UhuA"
      />
      <Link
        className="text-blue-600 hover:text-blue-700 font-bold text-sm hover:underline"
        to={`/usuarios/${user.id}`}
      >
        {fullName}
      </Link>
      <span className="text-sm text-gray-500 break-words">
        {user.email}, no Orkut desde {since}
      </span>
    </Card>
  );
}
