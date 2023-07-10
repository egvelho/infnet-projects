import { useState, useEffect } from "react";
import toast from "react-simple-toasts";
import { useNavigate, useParams } from "react-router-dom";
import { TextField } from "../components/TextField";
import { TextArea } from "../components/TextArea";
import { getNotepad } from "../api/getNotepad";
import { putNotepad } from "../api/putNotepad";

const texts = {
  title: "Editar notepad",
  createNotepadSuccess: "O notepad foi editado com sucesso!",
  createNotepadFailure: "Houve um erro ao editar o seu notepad. :(",
  titlePlaceholder: "Digite o título",
  subtitlePlaceholder: "Digite o subtítulo",
  contentPlaceholder: "Digite o conteúdo",
  submitButtonLabel: "Enviar",
};

const initialEditNotepad = {
  title: "",
  subtitle: "",
  content: "",
};

export function EditNotepad() {
  const params = useParams();
  const navigate = useNavigate();

  const notepadId = Number(params.id);
  const [form, setForm] = useState(initialEditNotepad);

  useEffect(() => {
    getNotepad(notepadId).then((notepad) => setForm(notepad));
  }, [notepadId]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await putNotepad(notepadId, form);
    if (response.success) {
      toast(texts.createNotepadSuccess);
      navigate("/");
    } else {
      toast(texts.createNotepadFailure);
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
        <TextField
          placeholder={texts.titlePlaceholder}
          value={form.title}
          onChange={(title) => setForm({ ...form, title })}
        />
        <TextField
          placeholder={texts.subtitlePlaceholder}
          value={form.subtitle}
          onChange={(subtitle) => setForm({ ...form, subtitle })}
        />
        <TextArea
          placeholder={texts.contentPlaceholder}
          value={form.content}
          onChange={(content) => setForm({ ...form, content })}
        />
        <button
          type="submit"
          className="bg-green-400 hover:bg-green-500 text-white py-2 px-3 rounded-md uppercase font-bold text-sm shadow-lg"
        >
          {texts.submitButtonLabel}
        </button>
      </form>
    </div>
  );
}
