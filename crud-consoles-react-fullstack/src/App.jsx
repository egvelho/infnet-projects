import { useState, useEffect } from "react";
import { Button } from "./Button/Button";
import { FaTrashAlt } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";
import toast from "react-simple-toasts";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import "./App.css";
import { ConsoleForm } from "./ConsoleForm";

const initialConsoleForm = {
  consoleList: "",
  nomeDoConsole: "",
  desenvolvedora: "",
  tituloMaisFamoso: "",
};

function App() {
  const [createConsoleForm, setCreateConsoleForm] =
    useState(initialConsoleForm);
  const [consoleList, setConsoleList] = useState([]);
  const [open, setOpen] = useState(false);
  const [editConsoleForm, setEditConsoleForm] = useState(initialConsoleForm);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  async function onSubmit(event) {
    event.preventDefault();

    const response = await fetch("http://localhost:8080/console", {
      method: "post",
      body: JSON.stringify(createConsoleForm),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseJson = await response.json();

    if (responseJson.success) {
      toast("O console foi adicionado com sucesso!");
      setCreateConsoleForm(initialConsoleForm);
      await loadConsoles();
    } else {
      toast("Houve um erro ao adicionar o console. :(");
    }
  }

  async function loadConsoles() {
    const response = await fetch("http://localhost:8080/console");
    const consoles = await response.json();
    setConsoleList(consoles);
  }

  async function onDeleteConsole(console_) {
    const response = await fetch(
      `http://localhost:8080/console/${console_.fileName}`,
      {
        method: "delete",
      }
    );
    await loadConsoles();
    toast(`O ${console_.nomeDoConsole} foi deletado com sucesso!`);
  }

  async function onEditConsole(console_) {
    setEditConsoleForm(console_);
    setOpen(true);
  }

  async function onSubmitEditForm(event) {
    event.preventDefault();

    const response = await fetch(
      `http://localhost:8080/console/${editConsoleForm.fileName}`,
      {
        method: "put",
        body: JSON.stringify(editConsoleForm),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    toast("O console foi editado com sucesso!");
    setEditConsoleForm(initialConsoleForm);
    await loadConsoles();
    setOpen(false);
  }

  useEffect(() => {
    loadConsoles();
  }, []);

  return (
    <div>
      <Modal open={open} onClose={onCloseModal} center>
        <ConsoleForm
          form={editConsoleForm}
          setForm={setEditConsoleForm}
          onSubmit={onSubmitEditForm}
          titleText="Editar console"
        />
      </Modal>
      <ConsoleForm
        form={createConsoleForm}
        setForm={setCreateConsoleForm}
        onSubmit={onSubmit}
        titleText="Criar console"
      />
      <ul className="console-list">
        {consoleList.map((console_) => (
          <li key={console_.nomeDoConsole} className="item">
            <div className="item-content">
              <span className="ano">{console_.anoDeLancamento}</span>
              <span className="nome">{console_.nomeDoConsole}</span>
              <span className="dev">{console_.desenvolvedora}</span>
              <span className="titulo">{console_.tituloMaisFamoso}</span>
            </div>
            <div className="button-container">
              <Button
                className="bg-red rounded"
                title="Deletar console"
                onClick={() => onDeleteConsole(console_)}
              >
                <FaTrashAlt />
              </Button>
              <Button
                className="rounded"
                title="Editar console"
                onClick={() => onEditConsole(console_)}
              >
                <MdEditSquare />
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
