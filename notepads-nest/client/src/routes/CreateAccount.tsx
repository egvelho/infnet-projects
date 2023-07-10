import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { TextField } from "../components/TextField";
import { createAccount } from "../api/createAccount";
import { AuthToken } from "../authToken";
import { useGlobalStore } from "../useGlobalStore";
import toast from "react-simple-toasts";

const texts = {
  title: "Criar conta",
  subtitle:
    "Seja bem-vindo ao sistema de notepads! Por favor, digite os dados solicitados para criar a sua conta.",
  namePlaceholder: "Digite o seu nome",
  surnamePlaceholder: "Digite o seu sobrenome",
  emailPlaceholder: "Digite o seu email",
  passwordPlaceholder: "Digite a sua senha",
  confirmPasswordPlaceholder: "Confirme a sua senha",
  submitButtonLabel: "Enviar",
  createAccountSuccessMessage: "Sua conta foi criada com sucesso!",
};

const initialCreateAccountForm = {
  name: "",
  surname: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export function CreateAccount() {
  const navigate = useNavigate();
  const [createAccountForm, setCreateAccountForm] = useState(
    initialCreateAccountForm
  );
  const setUser = useGlobalStore((state) => state.setUser);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { confirmPassword, ...createAccountData } = createAccountForm;

    const response = await createAccount(createAccountData);
    if (response.success === true) {
      AuthToken.set(response.accessToken);
      setUser(response.user);
      toast(texts.createAccountSuccessMessage);
      navigate("/usuario");
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
            type="text"
            placeholder={texts.namePlaceholder}
            value={createAccountForm.name}
            onChange={(name) =>
              setCreateAccountForm({ ...createAccountForm, name })
            }
          />
          <TextField
            type="text"
            placeholder={texts.surnamePlaceholder}
            value={createAccountForm.surname}
            onChange={(surname) =>
              setCreateAccountForm({ ...createAccountForm, surname })
            }
          />
          <TextField
            type="email"
            placeholder={texts.emailPlaceholder}
            value={createAccountForm.email}
            onChange={(email) =>
              setCreateAccountForm({ ...createAccountForm, email })
            }
          />
          <TextField
            type="password"
            placeholder={texts.passwordPlaceholder}
            value={createAccountForm.password}
            onChange={(password) =>
              setCreateAccountForm({ ...createAccountForm, password })
            }
          />
          <TextField
            type="password"
            placeholder={texts.confirmPasswordPlaceholder}
            value={createAccountForm.confirmPassword}
            onChange={(confirmPassword) =>
              setCreateAccountForm({ ...createAccountForm, confirmPassword })
            }
          />
          <Button type="submit" className="w-full">
            {texts.submitButtonLabel}
          </Button>
        </form>
      </Card>
    </div>
  );
}
