import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-simple-toasts";
import { useGlobalStore } from "../useGlobalStore";
import { AuthToken } from "../authToken";
import { signIn } from "../api/signIn";
import { Card } from "../components/Card";
import { Title } from "../components/Title";
import { Button } from "../components/Button";
import { TextField } from "../components/TextField";

export function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setIsAuthenticated = useGlobalStore(
    (state) => state.setIsAuthenticated
  );
  const setUser = useGlobalStore((state) => state.setUser);

  async function onFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await signIn(email, password);
    if (response.success) {
      AuthToken.set(response.jwt);
      setIsAuthenticated(true);
      setUser(response.user);
      toast("Você entrou na sua conta");
      navigate("/perfil");
    } else {
      toast("Email ou senha inválidos.");
    }
  }

  return (
    <div>
      <Card className="max-w-screen-sm mx-auto mt-4">
        <Title>Entrar na sua conta</Title>
        <form
          noValidate
          className="flex flex-col gap-2"
          onSubmit={onFormSubmit}
        >
          <TextField
            type="text"
            placeholder="Digite o seu email"
            value={email}
            onChange={setEmail}
          />
          <TextField
            type="password"
            placeholder="Digite a sua senha"
            value={password}
            onChange={setPassword}
          />
          <Button type="submit">Enviar</Button>
        </form>
      </Card>
    </div>
  );
}
