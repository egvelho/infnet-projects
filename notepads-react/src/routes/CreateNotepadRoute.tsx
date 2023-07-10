import { useNavigate } from "react-router-dom";
import { useZorm } from "react-zorm";
import toast from "react-simple-toasts";
import { Helmet } from "react-helmet";
import { Button } from "../components/Button";
import { ErrorMessage } from "../components/ErrorMessage";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { Card } from "../components/Card";
import { api } from "../api";
import { NotepadSchema } from "../notepadSchema";

export function CreateNotepadRoute() {
  const navigate = useNavigate();
  const zo = useZorm("create-notepad", NotepadSchema, {
    async onValidSubmit(event) {
      event.preventDefault();
      const response = await api.post("/notepads", event.data);
      if (response.data.success) {
        toast("Seu notepad foi criado com sucesso!");
        navigate("/");
      } else {
        toast("Houve um erro ao criar o seu notepad. :(");
      }
    },
  });

  return (
    <Card>
      <Helmet>
        <title>Criar notepad</title>
      </Helmet>
      <Breadcrumbs
        links={[
          { href: "/", label: "Home" },
          {
            href: "/criar-notepad",
            label: "Criar notepad",
          },
        ]}
      />
      <form ref={zo.ref} className="flex flex-col gap-2">
        <h1 className="text-center font-bold text-2xl">Criar notepad</h1>
        <div className="flex flex-col">
          <input
            type="text"
            placeholder="Digite o título"
            className={`rounded-lg px-2 py-1 border focus:border-green-500 outline-none w-full ${zo.errors.title(
              "border-red-500 focus:border-red-600"
            )}`}
            name={zo.fields.title()}
          />
          {zo.errors.title((error) => (
            <ErrorMessage>{error.message}</ErrorMessage>
          ))}
        </div>
        <div className="flex flex-col">
          <input
            type="text"
            placeholder="Digite o subtítulo"
            name={zo.fields.subtitle()}
            className={`rounded-lg px-2 py-1 border focus:border-green-500 outline-none w-full ${zo.errors.subtitle(
              "border-red-500 focus:border-red-600"
            )}`}
          />
          {zo.errors.subtitle((error) => (
            <ErrorMessage>{error.message}</ErrorMessage>
          ))}
        </div>
        <div className="flex flex-col">
          <textarea
            placeholder="Digite o conteúdo"
            rows={3}
            name={zo.fields.content()}
            className={`rounded-lg px-2 py-1 border focus:border-green-500 outline-none resize-none w-full ${zo.errors.content(
              "border-red-500 focus:border-red-600"
            )}`}
          />
          {zo.errors.content((error) => (
            <ErrorMessage>{error.message}</ErrorMessage>
          ))}
        </div>
        <Button type="submit">Enviar</Button>
      </form>
    </Card>
  );
}
