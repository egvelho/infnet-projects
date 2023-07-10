import { useState, useEffect } from "react";
import { Button } from "../components/Button";
import { TextArea } from "../components/TextArea";
import { LinkButton } from "../components/LinkButton";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-simple-toasts";
import { getNotepad } from "../api/getNotepad";
import { deleteNotepad } from "../api/deleteNotepad";
import { getNotepadComments } from "../api/getNotepadComments";
import { postComment } from "../api/postComment";
import type { Comment } from "../../../shared/types";

const texts = {
  deleteSuccess: "O notepad foi deletado com sucesso!",
  deleteFailure: "Houve um erro ao deletar o seu notepad. :(",
  editButtonLabel: "Editar",
  deleteButtonLabel: "Deletar",
  commentsTitle: "Comentários",
  commentFormMessagePlaceholder: "Digite a mensagem do comentário",
  commentFormSubmitButton: "Enviar",
  commentFormCreateSuccess: "O comentário foi criado com sucesso!",
  commentFormCreateFailure: "Houve um erro ao criar o seu comentário. :(",
};

const emptyCommentForm = {
  message: "",
};

const emptyNotepad = {
  id: 0,
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

  const notepadId = Number(params.id);
  const [notepad, setNotepad] = useState(emptyNotepad);
  const [commentForm, setCommentForm] = useState(emptyCommentForm);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    getNotepad(notepadId).then((notepadData) => setNotepad(notepadData));
    getNotepadComments({ notepad_id: notepadId }).then((comments) =>
      setComments(comments)
    );
  }, [notepadId]);

  async function onClickDelete() {
    const response = await deleteNotepad(notepad.id);
    if (response.success) {
      toast(texts.deleteSuccess);
      navigate("/");
    } else {
      toast(texts.deleteFailure);
    }
  }

  async function onSubmitComment(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await postComment({
      notepad_id: notepadId,
      message: commentForm.message,
    });
    if (response.success) {
      toast(texts.commentFormCreateSuccess);
      const comments = await getNotepadComments({ notepad_id: notepadId });
      setComments(comments);
    } else {
      toast(texts.commentFormCreateFailure);
    }
  }

  return (
    <div className="md:max-w-screen-md md:mx-auto my-4 p-2 md:my-8 flex flex-col">
      <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col">
        <Breadcrumbs links={getBreadcrumbs(notepad.title, notepad.id)} />
        <span className="text-gray-500 my-2">#{notepad.id}</span>
        <time className="text-gray-500 text-sm" dateTime={notepad.created_at}>
          {new Date(notepad.created_at).toLocaleDateString()}
        </time>
        <h1 className="text-2xl font-bold">{notepad.title}</h1>
        <p className="mb-4">{notepad.subtitle}</p>
        <p>{notepad.content}</p>
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
      </div>
      <div className="mt-4">
        <h2 className="font-bold text-2xl my-2">{texts.commentsTitle}</h2>
        <form
          onSubmit={onSubmitComment}
          noValidate
          className="flex flex-col gap-2 my-4"
        >
          <TextArea
            value={commentForm.message}
            onChange={(message) => setCommentForm({ ...commentForm, message })}
            placeholder={texts.commentFormMessagePlaceholder}
          />
          <Button type="submit" onClick={() => {}} className="self-end">
            {texts.commentFormSubmitButton}
          </Button>
        </form>
        <div className="flex flex-col gap-4">
          {comments.map(({ id, message, created_at }) => (
            <div key={id} className="border border-gray-400 p-4 rounded-xl">
              <time
                className="text-gray-500 text-sm"
                dateTime={notepad.created_at}
              >
                {new Date(created_at).toLocaleDateString()}
              </time>
              <p>{message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
