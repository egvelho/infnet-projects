import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalStore } from "../utils/useGlobalStore";
import { AuthToken } from "../utils/authToken";
import { api } from "../utils/api";
import { Card } from "../components/Card";
import { Title } from "../components/Title";
import { Button } from "../components/Button";

const texts = {
  title: "Criar conta",
  submit: "Enviar",
  namePlaceholder: "Nome",
  surnamePlaceholder: "Sobrenome",
  usernamePlaceholder: "Nome de usuário",
  passwordPlaceholder: "Senha",
};

export function SignUpRoute() {
  const setTrainer = useGlobalStore((store) => store.setTrainer);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const signUpData = {
      name,
      surname,
      username,
      password,
    };
    const { data } = await api.post("/auth/sign-up", signUpData);
    AuthToken.set(data.token);
    setTrainer(data.trainer);
    navigate("/treinador");
  }

  return (
    <div className="absolute top-0 left-0 w-[100vw] h-[100vh] flex flex-col flex-1 items-center justify-center">
      <Card className="max-w-screen-sm mx-auto my-4">
        <Title className="text-2xl text-center mb-4">{texts.title}</Title>
        <form noValidate className="flex flex-col gap-2" onSubmit={onSubmit}>
          <input
            type="text"
            placeholder={texts.namePlaceholder}
            className="bg-[#f0f0f0] p-2 rounded-md"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <input
            type="text"
            placeholder={texts.surnamePlaceholder}
            className="bg-[#f0f0f0] p-2 rounded-md"
            value={surname}
            onChange={(event) => setSurname(event.target.value)}
          />
          <input
            type="text"
            placeholder={texts.usernamePlaceholder}
            className="bg-[#f0f0f0] p-2 rounded-md"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <input
            type="password"
            placeholder={texts.passwordPlaceholder}
            className="bg-[#f0f0f0] p-2 rounded-md"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button type="submit">{texts.submit}</Button>
        </form>
      </Card>
    </div>
  );
}
