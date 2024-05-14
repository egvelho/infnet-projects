import { useNavigate } from "react-router-dom";
import toast from "react-simple-toasts";
import { useState } from "react";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { TextField } from "../components/TextField";
import { api } from "../api";
import { TokenStorage } from "../tokenStorage";
import { useGlobalStore } from "../useGlobalStore";

const initialForm = {
  email: "",
  password: "",
};

export function SignInRoute() {
  const [form, setForm] = useState(initialForm);
  const navigate = useNavigate();
  const setIsAuthorized = useGlobalStore((state) => state.setIsAuthorized);
  const setUser = useGlobalStore((state) => state.setUser);

  async function submitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await api.post("/auth/sign-in", form);
    if (response === undefined) {
      return;
    }
    const { token, user } = response.data;
    TokenStorage.setToken(token);
    setIsAuthorized(true);
    setUser({
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      avatar: user.avatar,
    });
    navigate("/usuario");
    toast(`Olá novamente, ${user.first_name}!`);
  }

  return (
    <div className="flex align-center justify-center w-full">
      <Card>
        <h2 className="text-center text-2xl mb-3">Entrar na sua conta</h2>
        <form onSubmit={submitForm} className="flex flex-col gap-2 w-full">
          <TextField
            valor={form.email}
            quandoMudar={(email) => setForm({ ...form, email })}
            textoPadrao="Email"
          />
          <TextField
            valor={form.password}
            quandoMudar={(password) => setForm({ ...form, password })}
            textoPadrao="Senha"
            tipo="password"
          />
          <Button type="submit">Entrar</Button>
        </form>
      </Card>
    </div>
  );
}
