import { useState } from "react";
import Modal from "react-modal";
import toast from "react-simple-toasts";
import { useGlobalStore } from "./useGlobalStore";
import { TextField } from "./components/TextField";
import { Button } from "./components/Button";
import { requestEmailVerificationCode } from "./api/requestEmailVerificationCode";
import { verifyEmail } from "./api/verifyEmail";

const texts = {
  title: "Verificar email",
  description(email: string) {
    return (
      <>
        Para continuar, é necessário que você verifique o seu email. Por favor,
        digite o código enviado para o email <strong>{email}</strong>.
      </>
    );
  },
  codePlaceholder: "Digite o código",
  resendEmailText: "Não recebeu o email?",
  resendEmailLinkText: "Solicite um novo código.",
  resendEmailSuccess: "Um novo código foi enviado para o seu email!",
  resendEmailFailure: "Houve um erro ao enviar um novo código.",
  verifyEmailSuccess: "Seu email foi verificado com sucesso!",
  verifyEmailFailure:
    "Houve um erro ao verificar o seu email. Por favor, tente novamente.",
  submit: "Enviar",
};

export function EmailVerificationModal() {
  const [code, setCode] = useState("");
  const user = useGlobalStore((state) => state.user);
  const setUser = useGlobalStore((state) => state.setUser);

  async function onRequestEmailVerificationCode() {
    const { success } = await requestEmailVerificationCode();
    if (success) {
      toast(texts.resendEmailSuccess);
    } else {
      toast(texts.resendEmailFailure);
    }
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { success } = await verifyEmail(code);
    if (success) {
      setUser({ isEmailVerified: 1 });
      toast(texts.verifyEmailSuccess);
    } else {
      toast(texts.verifyEmailFailure);
    }
  }

  const isOpen = user.isAuthenticated === true && user.isEmailVerified === 0;
  return (
    <Modal isOpen={isOpen}>
      <h2 className="font-bold text-2xl text-center mb-2">{texts.title}</h2>
      <p className="text-gray-500 leading-tight mb-4">
        {texts.description(user.email)}
      </p>
      <form className="flex flex-col gap-2" noValidate onSubmit={onSubmit}>
        <TextField
          placeholder={texts.codePlaceholder}
          value={code}
          onChange={setCode}
        />
        <Button type="submit">{texts.submit}</Button>
        <p className="text-sm text-gray-500 leading-tight">
          {texts.resendEmailText}{" "}
          <button
            className="text-blue-500 text-bold hover:underline cursor-pointer"
            onClick={onRequestEmailVerificationCode}
          >
            {texts.resendEmailLinkText}
          </button>
        </p>
      </form>
    </Modal>
  );
}
