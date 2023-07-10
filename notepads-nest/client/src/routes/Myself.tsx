import { useEffect, useState } from "react";
import toast from "react-simple-toasts";
import { getMyself, GetMyselfOutput } from "../api/getMyself";
import { Card } from "../components/Card";
import { loadUserPicture } from "../loadUserPicture";
import { uploadUserPicture } from "../api/uploadUserPicture";
import { NotepadList } from "../components/NotepadList";

const texts = {
  uploadUserPictureSuccess: "Sua imagem de perfil foi atualizada com sucesso!",
  uploadUserPictureFailure: "Houve um erro ao enviar sua imagem de perfil. :(",
};

const initialUser: GetMyselfOutput = {
  id: 0,
  surname: "",
  name: "",
  email: "",
  userPicture: null,
  notepads: [],
};

export function Myself() {
  const [user, setUser] = useState(initialUser);

  useEffect(() => {
    getMyself().then((user) => {
      setUser(user);
    });
  }, []);

  async function onPictureSelect(event: React.ChangeEvent<HTMLInputElement>) {
    const picture = event.target.files?.[0];
    if (picture !== undefined) {
      const response = await uploadUserPicture(picture);
      if (response.success) {
        toast(texts.uploadUserPictureSuccess);
        setUser({
          ...user,
          userPicture: `${response.pictureUrl}?${new Date().getTime()}`,
        });
      } else {
        toast(texts.uploadUserPictureFailure);
      }
    }
  }

  return (
    <div className="max-w-screen-md m-4 md:mx-auto gap-4 flex flex-col">
      <Card className="flex flex-col items-center gap-2">
        <input
          type="file"
          accept="image/jpeg"
          id="select-picture"
          className="hidden"
          onChange={onPictureSelect}
        />
        <label htmlFor="select-picture" className="cursor-pointer">
          <img
            src={loadUserPicture(user.userPicture)}
            className="w-24 h-24 rounded-full"
          />
        </label>
        <h2 className="font-bold text-xl">
          {user.name} {user.surname}
        </h2>
      </Card>
      <NotepadList notepads={user.notepads} />
    </div>
  );
}
