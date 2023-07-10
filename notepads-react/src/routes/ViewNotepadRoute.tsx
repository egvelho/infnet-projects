import { useEffect, useState } from "react";
import toast from "react-simple-toasts";
import { Helmet } from "react-helmet";
import { api } from "../api";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "../components/Card";
import { Title } from "../components/Title";
import { Button } from "../components/Button";
import { LinkButton } from "../components/LinkButton";
import { Breadcrumbs } from "../components/Breadcrumbs";

const initialNotepad = {
  id: 0,
  title: "",
  subtitle: "",
  content: "",
  created_at: "",
};

export function ViewNotepadRoute() {
  const params = useParams();
  const navigate = useNavigate();
  const [notepad, setNotepad] = useState(initialNotepad);

  async function loadNotepad() {
    const response = await api.get(`/notepads/${params.id}`);
    const nextNotepad = response.data;
    setNotepad(nextNotepad);
  }

  async function deleteNotepad() {
    const response = await api.delete(`/notepads/${params.id}`);
    if (response.data.success === true) {
      toast(`O notepad #${notepad.id} foi deletado com sucesso!`);
      navigate("/");
    } else {
      toast("Houve um erro ao deletar o notepad");
    }
  }

  useEffect(() => {
    loadNotepad();
  }, [params.id]);

  return (
    <Card>
      <Helmet>
        <title>{notepad.title}</title>
      </Helmet>
      <Breadcrumbs
        links={[
          { href: "/", label: "Home" },
          {
            href: `/ver-notepad/${params.id}`,
            label: `Ver notepad #${params.id}`,
          },
        ]}
      />
      <div className="flex gap-2">
        <Button className="bg-red-500 hover:bg-red-700" onClick={deleteNotepad}>
          Deletar
        </Button>
        <LinkButton
          className="bg-amber-500 hover:bg-amber-700"
          to={`/editar-notepad/${params.id}`}
        >
          Editar
        </LinkButton>
      </div>
      <div className="text-gray-500 mb-2">#{notepad.id}</div>
      <div className="text-gray-500">
        {new Date(notepad.created_at).toLocaleDateString()}
      </div>
      <Title>{notepad.title}</Title>
      <p className="mb-4 text-gray-500">{notepad.subtitle}</p>
      <p>{notepad.content}</p>
    </Card>
  );
}
