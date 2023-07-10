import { useState, useEffect } from "react";
import { Button } from "../components/Button";
import { LinkButton } from "../components/LinkButton";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-simple-toasts";
import { getNotepad } from "../api/getNotepad";
import { deleteNotepad } from "../api/deleteNotepad";
import { useGlobalStore } from "../useGlobalStore";

const texts = {
  deleteSuccess: "O notepad foi deletado com sucesso!",
  deleteFailure: "Houve um erro ao deletar o seu notepad. :(",
  editButtonLabel: "Editar",
  deleteButtonLabel: "Deletar",
};

const emptyNotepad = {
  id: 0,
  user: 0,
  title: "",
  subtitle: "",
  content: "",
  created_at: "",
};

function getBreadcrumbs(title: string, id: number) {
  return [
    { title: "Página inicial", link: "/" },
    { title, link: `/publicacoes/${id}` },
  ];
}

export function ViewNotepad() {
  const params = useParams();
  const navigate = useNavigate();
  const user = useGlobalStore((state) => state.user);

  const notepadId = Number(params.id);
  const [notepad, setNotepad] = useState(emptyNotepad);

  useEffect(() => {
    getNotepad(notepadId).then((notepadData) => setNotepad(notepadData));
  }, [notepadId]);

  async function onClickDelete() {
    const response = await deleteNotepad(notepad.id);
    if (response) {
      toast(texts.deleteSuccess);
      navigate("/");
    } else {
      toast(texts.deleteFailure);
    }
  }

  return (
    <div className="bg-white p-4 md:max-w-screen-md md:mx-auto m-4 md:m-8 rounded-lg shadow-lg flex flex-col">
      <Breadcrumbs links={getBreadcrumbs(notepad.title, notepad.id)} />
      <span className="text-gray-500 my-2">#{notepad.id}</span>
      <time className="text-gray-500 text-sm" dateTime={notepad.created_at}>
        {new Date(notepad.created_at).toLocaleDateString()}
      </time>
      <h1 className="text-2xl font-bold">{notepad.title}</h1>
      <p className="mb-4">{notepad.subtitle}</p>
      <p>{notepad.content}</p>
      {user.isAuthenticated && user.id === notepad.user && (
        <div className="mt-4 flex flex-row gap-2">
          <Button
            className="bg-red-500 hover:bg-red-600"
            onClick={onClickDelete}
          >
            {texts.deleteButtonLabel}
          </Button>
          <LinkButton to={`/publicacoes/editar/${params.id}`}>
            {texts.editButtonLabel}
          </LinkButton>
        </div>
      )}
    </div>
  );
}
