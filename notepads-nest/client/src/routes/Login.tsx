import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { TextField } from "../components/TextField";
import { login } from "../api/login";
import { AuthToken } from "../authToken";
import { useGlobalStore } from "../useGlobalStore";
import toast from "react-simple-toasts";

const texts = {
  title: "Entrar na sua conta",
  subtitle:
    "Seja bem-vindo ao sistema de notepads! Entre com suas credenciais para acessar a sua conta.",
  emailPlaceholder: "Digite o seu email",
  passwordPlaceholder: "Digite a sua senha",
  submitButtonLabel: "Entrar",
  invalidCredentialsError: "O email ou senha digitados são inválidos.",
};

const initialLoginForm = {
  email: "",
  password: "",
};

export function Login() {
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState(initialLoginForm);
  const setUser = useGlobalStore((state) => state.setUser);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { email, password } = loginForm;
    const response = await login(email, password);
    if (response !== null) {
      const { accessToken, user } = response;
      AuthToken.set(accessToken);
      setUser({ ...user, isAuthenticated: true });
      navigate("/usuario");
    } else {
      toast(texts.invalidCredentialsError);
    }
  }

  return (
    <div>
      <Card className="max-w-screen-sm mt-4 mx-auto">
        <h2 className="text-3xl font-bold text-center">{texts.title}</h2>
        <p className="text-md text-gray-500 leading-none mb-4">
          {texts.subtitle}
        </p>
        <form className="flex flex-col gap-2" noValidate onSubmit={onSubmit}>
          <TextField
            type="email"
            placeholder={texts.emailPlaceholder}
            value={loginForm.email}
            onChange={(email) => setLoginForm({ ...loginForm, email })}
          />
          <TextField
            type="password"
            placeholder={texts.passwordPlaceholder}
            value={loginForm.password}
            onChange={(password) => setLoginForm({ ...loginForm, password })}
          />
          <Button type="submit" className="w-full">
            {texts.submitButtonLabel}
          </Button>
        </form>
      </Card>
    </div>
  );
}
