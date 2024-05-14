import { useState, useEffect } from "react";
import useAxios from "axios-hooks";
import { Link } from "react-router-dom";
import { Card } from "./Card";

const initialFriends = [];

export function FriendsCard({ id }) {
  const [{ data: friends = initialFriends }] = useAxios(`/users/${id}/friends`);

  return (
    <Card>
      <h2 className="lowercase font-bold">Amigos</h2>
      <div className="flex flex-row flex-wrap">
        {friends.map((friend) => (
          <div className="w-1/3 p-1 box-border text-center" key={friend.id}>
            <Link to={`/u/${friend.id}`}>
              <img
                src={friend.avatar}
                alt={`Foto de ${friend.first_name}`}
                className="w-full"
              />
            </Link>
            <Link
              to={`/u/${friend.id}`}
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
