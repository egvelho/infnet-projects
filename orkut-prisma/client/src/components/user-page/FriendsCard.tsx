import { Link } from "react-router-dom";
import { Card } from "../Card";
import type { Friend } from "../../../../shared/types";

type FriendsCardProps = {
  friends: Friend[];
  count: number;
};

export function FriendsCard({ friends, count }: FriendsCardProps) {
  return (
    <Card>
      <h3 className="font-bold ml-1">Amigos ({count})</h3>
      <div className="flex flex-row flex-wrap">
        {friends.map((friend) => (
          <div key={friend.id} className="w-1/3 p-1 box-border text-center">
            <Link to={`/usuarios/${friend.id}`}>
              <img src={`https://picsum.photos/200/200?${friend.id}`} />
            </Link>
            <Link
              to={`/usuarios/${friend.id}`}
              className="text-blue-600 hover:text-blue-700 font-bold text-sm hover:underline leading-tight"
            >
              <span>
                {friend.first_name} ({friend.friends_count})
              </span>
            </Link>
          </div>
        ))}
      </div>
    </Card>
  );
}
