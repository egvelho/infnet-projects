import { useState, useEffect } from "react";
import { Card } from "./Card";
import { Link } from "react-router-dom";
import { api } from "../api";

const initialFriends = [];

export function FriendsCard({ id }) {
  const [friends, setFriends] = useState(initialFriends);

  async function loadFriends() {
    const response = await api.get(`/users/${id}/friends`);
    const friends = response.data;
    setFriends(friends);
  }

  useEffect(() => {
    loadFriends();
  }, [id]);

  return (
    <Card>
      <h2 className="lowercase font-bold">Amigos</h2>
      <div className="flex flex-row flex-wrap">
        {friends.map((friend) => (
          <div className="w-1/3 p-1 box-border text-center" key={friend.id}>
            <Link to={`/perfil/${friend.id}`}>
              <img
                src={friend.avatar}
                alt={`Foto de ${friend.first_name}`}
                className="w-full"
              />
            </Link>
            <Link
              to={`/perfil/${friend.id}`}
              className="text-blue-600 hover:text-blue-700 font-bold text-sm hover:underline leading-tight"
            >
              {friend.first_name}
            </Link>
          </div>
        ))}
      </div>
    </Card>
  );
}
