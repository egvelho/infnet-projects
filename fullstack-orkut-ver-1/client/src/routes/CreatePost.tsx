import { useState } from "react";
import { useZorm } from "react-zorm";
import toast from "react-simple-toasts";
import { useNavigate } from "react-router-dom";
import { TextField } from "../components/TextField";
import { TextArea } from "../components/TextArea";
import { ErrorMessage } from "../components/ErrorMessage";
import { Button } from "../components/Button";
import { Title } from "../components/Title";
import { createPostSchema } from "../createPost.schema";
import { createPost } from "../api/createPost";
import { useGlobalStore } from "../useGlobalStore";
import { FiLoader } from "react-icons/fi";

const texts = {
  title: "Criar post",
  createPostSuccess: "O post foi criado com sucesso!",
  createPostFailure: "Houve um erro ao criar o seu post. :(",
  titlePlaceholder: "Digite o título",
  subtitlePlaceholder: "Digite o subtítulo",
  contentPlaceholder: "Digite o conteúdo",
  submitButtonLabel: "Enviar",
};

export function CreatePost() {
  const navigate = useNavigate();
  const isLoading = useGlobalStore((state) => state.isLoading);
  const setIsLoading = useGlobalStore((state) => state.setIsLoading);
  const zo = useZorm("create-post", createPostSchema, {
    async onValidSubmit(event) {
      event.preventDefault();
      const post = event.data;
      setIsLoading(true);
      const response = await createPost(post);
      setIsLoading(false);
      if (response.success) {
        toast(texts.createPostSuccess);
        navigate("/");
      } else {
        toast(texts.createPostFailure);
      }
    },
  });
  const disabled = zo.validation?.success === false;

  return (
    <div>
      <Title>{texts.title}</Title>
      <form
        className="flex flex-col gap-3 mx-2 md:mx-auto md:max-w-screen-md"
        noValidate
        ref={zo.ref}
      >
        <div>
          <TextArea
            placeholder={texts.contentPlaceholder}
            name={zo.fields.message()}
            className={zo.errors.message("border-red-500 focus:border-red-500")}
          />
          {zo.errors.message((error) => (
            <ErrorMessage message={error.message} />
          ))}
        </div>
        <Button disabled={disabled} type="submit">
          {isLoading ? (
            <FiLoader className="text-white animate-spin text-lg inline" />
          ) : (
            texts.submitButtonLabel
          )}
        </Button>
      </form>
    </div>
  );
}
