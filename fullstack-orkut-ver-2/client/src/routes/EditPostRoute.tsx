import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-simple-toasts";
import { useZorm } from "react-zorm";
import { Helmet } from "react-helmet";
import { Title } from "../components/Title";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { ErrorMessage } from "../components/ErrorMessage";
import { PostSchema } from "../postSchema";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { api } from "../api";

const texts = {
  title: "Editar publicação",
  contentPlaceholder: "Digite a sua publicação",
  submit: "Enviar",
  submitSuccess: "Sua publicação foi editada com sucesso!",
  submitFailure: "Houve um erro ao editar a sua publicação. :(",
};

const initialPost = {
  id: 0,
  content: "",
  created_at: "",
};

export function EditPostRoute() {
  const params = useParams();
  const navigate = useNavigate();
  const [initialFormState, setInitialFormState] = useState(initialPost);
  const zo = useZorm("edit-post", PostSchema, {
    async onValidSubmit(event) {
      event.preventDefault();
      const response = await api.put(`/posts/${params.id}`, event.data);
      if (response.data.id) {
        toast(texts.submitSuccess);
        navigate(`/ver-publicacao/${params.id}`);
      } else {
        toast(texts.submitFailure);
      }
    },
  });

  async function loadPost() {
    const response = await api.get(`/posts/${params.id}`);
    setInitialFormState(response.data);
  }

  useEffect(() => {
    loadPost();
  }, [params.id]);

  return (
    <Card>
      <Helmet>
        <title>Editar publicação #{params.id}</title>
      </Helmet>
      <Breadcrumbs
        links={[
          { href: "/", label: "Home" },
          {
            href: `/ver-publicacao/${params.id}`,
            label: `Ver publicação #${params.id}`,
          },
          {
            href: `/editar-publicacao/${params.id}`,
            label: `Editar publicação #${params.id}`,
          },
        ]}
      />
      <Title className="mb-4 text-center">
        {texts.title} #{params.id}
      </Title>
      <form ref={zo.ref} className="flex flex-col gap-3">
        <div>
          <textarea
            className="rounded-lg px-2 py-1 border focus:border-green-500 outline-none w-full resize-none"
            placeholder={texts.contentPlaceholder}
            name={zo.fields.content()}
            defaultValue={initialFormState.content}
          />
          {zo.errors.content((error) => (
            <ErrorMessage>{error.message}</ErrorMessage>
          ))}
        </div>
        <Button type="submit">{texts.submit}</Button>
      </form>
    </Card>
  );
}
