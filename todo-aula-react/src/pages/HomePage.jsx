import { Link } from "react-router-dom";
import useAxios from "axios-hooks";
import { useEffect } from "react";
import { axios } from "../axios";
import { Card } from "../components/Card";
import { LinkButton } from "../components/LinkButton";
import { Button } from "../components/Button";
import toast from "react-simple-toasts";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

const initialTasks = [];

export function HomePage() {
  const [{ data: tasks = initialTasks }, fetchTasks] = useAxios("/tasks", {
    manual: true,
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const todo = tasks.filter((task) => task.step === "Para fazer");
  const doing = tasks.filter((task) => task.step === "Em andamento");
  const done = tasks.filter((task) => task.step === "Pronto");

  async function moveTask(task, moveTo) {
    const steps = ["Para fazer", "Em andamento", "Pronto"];
    const stepIndex = steps.indexOf(task.step);
    const stepsCount = steps.length - 1;
    const nextStepIndex = moveTo === "forward" ? stepIndex + 1 : stepIndex - 1;
    const step = steps[nextStepIndex];
    if (step) {
      await axios.patch(`/tasks/${task.id}/update-step`, { step });
      await fetchTasks();
      toast(`Tarefa #${task.id} movida para "${step}"`);
    }
  }

  function mapTaskToView(task) {
    return (
      <Card key={task.id}>
        <span className="text-slate-700 text-sm leading-tight">#{task.id}</span>
        <h3 className="font-bold leading-tight">{task.title}</h3>
        <p className="leading-loose">{task.description}</p>
        <div className="flex gap-1">
          <Button
            disabled={task.step === "Para fazer"}
            className="py-1 px-3 text-sm bg-gray-300 text-slate-700"
            onClick={() => moveTask(task, "back")}
          >
            <MdArrowBack />
          </Button>
          <Button
            disabled={task.step === "Pronto"}
            className="py-1 px-3 text-sm bg-gray-300 text-slate-700"
            onClick={() => moveTask(task, "forward")}
          >
            <MdArrowForward />
          </Button>
          <LinkButton
            to={`/editar-tarefa/${task.id}`}
            className="py-1 px-3 text-sm"
          >
            Editar
          </LinkButton>
          <Button
            className="py-1 px-3 text-sm bg-red-600 hover:bg-red-700"
            onClick={async () => {
              await axios.delete(`/tasks/${task.id}`);
              toast(`A tarefa #${task.id} foi deletada com sucesso!`);
              fetchTasks();
            }}
          >
            Deletar
          </Button>
        </div>
      </Card>
    );
  }

  const todoCards = todo.map(mapTaskToView);
  const doingCards = doing.map(mapTaskToView);
  const doneCards = done.map(mapTaskToView);

  return (
    <div className="max-w-screen-lg m-auto p-5 flex">
      <div className="flex-1 pr-4">
        <h2 className="font-bold text-lg mb-2">Para fazer</h2>
        <div className="flex flex-col gap-2">{todoCards}</div>
      </div>
      <div className="flex-1 px-4 border-l-2 border-r-2 border-slate-500">
        <h2 className="font-bold text-lg mb-2">Em andamento</h2>
        <div className="flex flex-col gap-2">{doingCards}</div>
      </div>
      <div className="flex-1 pl-4">
        <h2 className="font-bold text-lg mb-2">Pronto</h2>
        <div className="flex flex-col gap-2">{doneCards}</div>
      </div>
    </div>
  );
}
