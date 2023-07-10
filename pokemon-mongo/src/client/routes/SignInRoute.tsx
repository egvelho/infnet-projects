import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalStore } from "../utils/useGlobalStore";
import { api } from "../utils/api";
import { AuthToken } from "../utils/authToken";
import { Card } from "../components/Card";
import { Title } from "../components/Title";
import { Button } from "../components/Button";

const texts = {
  title: "Entrar na sua conta",
  submit: "Enviar",
  usernamePlaceholder: "Nome de usuário",
  passwordPlaceholder: "Senha",
};

export function SignInRoute() {
  const trainer = useGlobalStore((store) => store.trainer);
  const setTrainer = useGlobalStore((store) => store.setTrainer);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (trainer.isAuthenticated) {
      navigate("/treinador");
    }
  }, []);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { data } = await api.post("/auth/sign-in", { username, password });
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
