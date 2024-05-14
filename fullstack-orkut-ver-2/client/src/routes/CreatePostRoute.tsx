import { useNavigate } from "react-router-dom";
import { useZorm } from "react-zorm";
import toast from "react-simple-toasts";
import { Helmet } from "react-helmet";
import { Button } from "../components/Button";
import { ErrorMessage } from "../components/ErrorMessage";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { Card } from "../components/Card";
import { api } from "../api";
import { PostSchema } from "../postSchema";

export function CreatePostRoute() {
  const navigate = useNavigate();
  const zo = useZorm("create-post", PostSchema, {
    async onValidSubmit(event) {
      event.preventDefault();
      const response = await api.post("/posts", event.data);
      if (response.data.id) {
        toast("Sua publicação foi criada com sucesso!");
        navigate("/");
      } else {
        toast("Houve um erro ao criar a sua publicação. :(");
      }
    },
  });

  return (
    <Card>
      <Helmet>
        <title>Criar publicação</title>
      </Helmet>
      <Breadcrumbs
        links={[
          { href: "/", label: "Home" },
          {
            href: "/criar-publicacao",
            label: "Criar publicação",
          },
        ]}
      />
      <form ref={zo.ref} className="flex flex-col gap-2">
        <h1 className="text-center font-bold text-2xl">Criar publicação</h1>
        <div className="flex flex-col">
          <textarea
            placeholder="Digite a sua publicação"
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
