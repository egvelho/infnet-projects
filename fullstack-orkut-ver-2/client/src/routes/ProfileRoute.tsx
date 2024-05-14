import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGlobalStore } from "../useGlobalStore";
import { api } from "../api";
import { AvatarCard } from "../components/AvatarCard";
import { FriendsCard } from "../components/FriendsCard";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import toast from "react-simple-toasts";

const initialUser = {
  id: 0,
  first_name: "",
  last_name: "",
  created_at: "",
  passwd: "",
  avatar: "",
};

export function ProfileRoute() {
  const params = useParams();
  const userId = params.id;
  const isAuthorized = useGlobalStore((state) => state.isAuthorized);
  const myself = useGlobalStore((state) => state.user);
  const [user, setUser] = useState({ ...initialUser, id: userId });
  const [isFriend, setIsFriend] = useState(null as null | boolean);

  async function loadUser() {
    const response = await api.get(`/users/${userId}`);
    const user = response.data;
    setUser(user);
  }

  async function checkIsFriend() {
    const response = await api.get(`/users/check-is-friend/${userId}`);
    setIsFriend(response.data.isFriend);
  }

  async function sendScrap() {
    const message = prompt("Digite a sua mensagem");
    const response = await api.post("/scraps", {
      message,
      ownerId: user.id,
    });
    alert("Scrap enviado com sucesso!");
  }

  async function addFriend() {
    const response = await api.post(`/users/add-friend/${user.id}`);
    if (response !== undefined) {
      toast("Amigo adicionado com sucesso!");
      setIsFriend(true);
    }
  }

  async function removeFriend() {
    const response = await api.post(`/users/remove-friend/${user.id}`);
    if (response !== undefined) {
      toast("Amigo removido com sucesso!");
      setIsFriend(false);
    }
  }

  useEffect(() => {
    loadUser();
  }, [userId]);

  useEffect(() => {
    if (isAuthorized) {
      checkIsFriend();
    }
  }, [isAuthorized, userId]);

  return (
    <div className="flex flex-col lg:flex-row gap-2 m-2 sm:mx-auto max-w-screen-sm lg:max-w-screen-lg lg:mx-auto">
      <div className="lg:max-w-[192px]">
        <AvatarCard {...user} />
      </div>
      <div className="flex-1 flex flex-col gap-2">
        <Card>
          {isFriend !== null && (
            <div className="flex gap-2 mb-2">
              {isFriend === false && (
                <Button
                  onClick={addFriend}
                  className="bg-pink-500 hover:bg-pink-600"
                >
                  Adicionar como amigo
                </Button>
              )}
              {isFriend === true && (
                <Button
                  onClick={removeFriend}
                  className="bg-gray-300 hover:bg-gray-400 text-black"
                >
                  Remover amigo
                </Button>
              )}
              {isFriend === true && (
                <Button
                  onClick={sendScrap}
                  className="bg-pink-500 hover:bg-pink-600"
                >
                  Enviar scrap
                </Button>
              )}
            </div>
          )}
          <h2 className="text-2xl font-bold">
            {user.first_name} {user.last_name}
          </h2>
        </Card>
      </div>
      <div className="lg:max-w-[256px]">
        <FriendsCard {...user} />
      </div>
    </div>
  );
}
