import { useState, useEffect } from "react";
import toast from "react-simple-toasts";
import { useNavigate, useParams } from "react-router-dom";
import { TextField } from "../components/TextField";
import { TextArea } from "../components/TextArea";
import { getPost } from "../api/getPost";
import { updatePost } from "../api/updatePost";

const texts = {
  title: "Editar post",
  createPostSuccess: "O post foi editado com sucesso!",
  createPostFailure: "Houve um erro ao editar o seu post. :(",
  titlePlaceholder: "Digite o título",
  subtitlePlaceholder: "Digite o subtítulo",
  contentPlaceholder: "Digite o conteúdo",
  submitButtonLabel: "Enviar",
};

const initialEditPost = {
  message: "",
};

export function EditPost() {
  const params = useParams();
  const navigate = useNavigate();

  const postId = Number(params.id);
  const [form, setForm] = useState(initialEditPost);

  useEffect(() => {
    getPost(postId).then((post) => setForm(post));
  }, [postId]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await updatePost(postId, form);
    if (response.success) {
      toast(texts.createPostSuccess);
      navigate("/");
    } else {
      toast(texts.createPostFailure);
    }
  }

  return (
    <div>
      <h1 className="text-center text-2xl font-bold my-4">{texts.title}</h1>
      <form
        className="flex flex-col gap-2 mx-2 md:mx-auto md:max-w-screen-md"
        noValidate
        onSubmit={onSubmit}
      >
        <TextArea
          placeholder={texts.contentPlaceholder}
          value={form.message}
          onChange={(message) => setForm({ ...form, message })}
        />
        <button
          type="submit"
          className="bg-blue-400 hover:bg-blue-500 text-white py-2 px-3 rounded-md uppercase font-bold text-sm shadow-lg"
        >
          {texts.submitButtonLabel}
        </button>
      </form>
    </div>
  );
}
