import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../components/Card";
import { TextField } from "../components/TextField";
import { Button } from "../components/Button";
import { AxiosError } from "axios";
import { AuthService } from "../auth.service";
import { axios } from "../axios";
import toast from "react-simple-toasts";
import { useGlobalStore } from "../useGlobalStore";

export function SignInPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const setUser = useGlobalStore((state) => state.setUser);
  const setIsAuthenticated = useGlobalStore(
    (state) => state.setIsAuthenticated
  );

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await axios.post("/account/sign-in", {
        username,
        password,
      });

      const token = response.data.token;
      AuthService.setToken(token);

      const { user } = response.data;
      const { name, pronouns } = user;
      const boasVindas = {
        "ele-dele": `Seja bem-vindo, ${name}!`,
        "ela-dela": `Seja bem-vinda, ${name}!`,
        "elu-delu": `Seja bem-vinde, ${name}!`,
      };
      toast(boasVindas[pronouns]);
      setUser(user);
      setIsAuthenticated(true);
      navigate("/perfil");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast(error.response.data.error);
      } else {
        throw error;
      }
    }
  }

  return (
    <div className="w-full h-full flex items-center justify-center bg-[url(/background.jpg)]">
      <Card className="md:min-w-96">
        <h2 className="text-center font-bold text-2xl mb-4">
          Entrar na sua conta
        </h2>
        <form
          action=""
          noValidate
          onSubmit={onSubmit}
          className="flex flex-col gap-2"
        >
          <fieldset>
            <TextField
              className="w-full"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Digite o seu username"
            />
          </fieldset>
          <fieldset>
            <TextField
              className="w-full"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Digite a sua senha"
            />
          </fieldset>
          <Button type="submit">Enviar</Button>
        </form>
      </Card>
    </div>
  );
}
