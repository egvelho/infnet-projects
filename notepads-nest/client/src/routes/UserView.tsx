import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUser, GetUserOutput } from "../api/getUser";
import { Card } from "../components/Card";
import { loadUserPicture } from "../loadUserPicture";
import { NotepadList } from "../components/NotepadList";

const initialUser: GetUserOutput = {
  id: 0,
  surname: "",
  name: "",
  email: "",
  userPicture: null,
  notepads: [],
};

export function UserView() {
  const params = useParams();
  const userId = Number(params.id);
  const [user, setUser] = useState(initialUser);

  useEffect(() => {
    getUser(userId).then((user) => {
      setUser(user);
    });
  }, [userId]);

  return (
    <div className="max-w-screen-md m-4 md:mx-auto gap-4 flex flex-col">
      <Card className="flex flex-col items-center gap-2">
        <img
          src={loadUserPicture(user.userPicture)}
          className="w-24 h-24 rounded-full"
        />
        <h2 className="font-bold text-xl">
          {user.name} {user.surname}
        </h2>
      </Card>
      <NotepadList notepads={user.notepads} />
    </div>
  );
}
