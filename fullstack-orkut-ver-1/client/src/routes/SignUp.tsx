import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-simple-toasts";
import { useGlobalStore } from "../useGlobalStore";
import { AuthToken } from "../authToken";
import { signUp } from "../api/signUp";
import { Card } from "../components/Card";
import { Title } from "../components/Title";
import { Button } from "../components/Button";
import { TextField } from "../components/TextField";

export function SignUp() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setIsAuthenticated = useGlobalStore(
    (state) => state.setIsAuthenticated
  );
  const setUser = useGlobalStore((state) => state.setUser);

  async function onFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await signUp({
      email,
      passwd: password,
      first_name: firstName,
      last_name: lastName,
    });
    if (response.success) {
      AuthToken.set(response.jwt);
      setIsAuthenticated(true);
      setUser(response.user);
      toast("Conta criada com sucesso!");
      navigate("/perfil");
    }
  }

  return (
    <div>
      <Card className="max-w-screen-sm mx-auto mt-4">
        <Title>Criar conta</Title>
        <form
          noValidate
          className="flex flex-col gap-2"
          onSubmit={onFormSubmit}
        >
          <TextField
            type="text"
            placeholder="Digite o seu nome"
            value={firstName}
            onChange={setFirstName}
          />
          <TextField
            type="text"
            placeholder="Digite o seu sobrenome"
            value={lastName}
            onChange={setLastName}
          />
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
