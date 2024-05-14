import { useState } from "react";
import style from "./CreateNotepadForm.module.css";
import { TextField } from "../TextField/TextField";
import { TextArea } from "../TextArea/TextArea";
import { Title } from "../Title/Title";
import { Card } from "../Card/Card";
import { Button } from "../Button/Button";

function validateTitle(title: string) {
  return validateField({
    field: title,
    fieldName: "título",
    minLength: 4,
    maxLength: 16,
  });
}

function validateSubtitle(subtitle: string) {
  return validateField({
    field: subtitle,
    fieldName: "subtítulo",
    minLength: 8,
    maxLength: 24,
  });
}

function validateContent(content: string) {
  return validateField({
    field: content,
    fieldName: "conteúdo",
    minLength: 16,
    maxLength: 140,
  });
}

type ValidateFieldArgs = {
  field: string;
  fieldName: string;
  minLength: number;
  maxLength: number;
};

function validateField({
  field,
  fieldName,
  minLength,
  maxLength,
}: ValidateFieldArgs) {
  if (field.length < minLength) {
    return {
      error: true,
      message: `O ${fieldName} precisa ter pelo menos ${minLength} caracteres.`,
    };
  } else if (field.length > maxLength) {
    return {
      error: true,
      message: `O ${fieldName} precisa ter no máximo ${maxLength} caracteres.`,
    };
  } else {
    return {
      error: false,
      message: "",
    };
  }
}

export type CreateNotepadFormProps = {
  onCreateNotepadSuccess: () => void;
};

export function CreateNotepadForm({
  onCreateNotepadSuccess,
}: CreateNotepadFormProps) {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");

  const [titleTouched, setTitleTouched] = useState(false);
  const [subtitleTouched, setSubtitleTouched] = useState(false);
  const [contentTouched, setContentTouched] = useState(false);

  const titleValidation = validateTitle(title);
  const subtitleValidation = validateSubtitle(subtitle);
  const contentValidation = validateContent(content);

  const isFormValid =
    !titleValidation.error &&
    !subtitleValidation.error &&
    !contentValidation.error;

  function setTouched(setTouchedFn: (touched: boolean) => void) {
    setTouchedFn(true);
  }

  async function onFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setTitleTouched(true);
    setSubtitleTouched(true);
    setContentTouched(true);

    if (!isFormValid) {
      return;
    }

    const notepad = {
      title,
      subtitle,
      content,
    };
    const notepadStr = JSON.stringify(notepad);

    const response = await fetch("https://notepads.eduardovelho.com/notepads", {
      method: "POST",
      body: notepadStr,
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      await response.json();
      alert("Notepad criado com sucesso!");
      onCreateNotepadSuccess();
    } else {
      alert("Houve um erro. Por favor, tente novamente");
    }
  }

  return (
    <Card>
      <Title>Criar notepad</Title>
      <form className={style.form} onSubmit={onFormSubmit}>
        <fieldset>
          <TextField
            placeholder="Digite o título"
            value={title}
            onChange={(value) => {
              setTitle(value);
              setTouched(setTitleTouched);
            }}
            onBlur={() => setTouched(setTitleTouched)}
            message={titleTouched ? titleValidation.message : ""}
            error={titleTouched && titleValidation.error}
          />
        </fieldset>
        <fieldset>
          <TextField
            placeholder="Digite o subtítulo"
            value={subtitle}
            onChange={(value) => {
              setSubtitle(value);
              setTouched(setSubtitleTouched);
            }}
            onBlur={() => setTouched(setSubtitleTouched)}
            message={subtitleTouched ? subtitleValidation.message : ""}
            error={subtitleTouched && subtitleValidation.error}
          />
        </fieldset>
        <fieldset>
          <TextArea
            placeholder="Digite o conteúdo"
            value={content}
            onChange={(value) => {
              setContent(value);
              setTouched(setContentTouched);
            }}
            onBlur={() => setTouched(setContentTouched)}
            message={contentTouched ? contentValidation.message : ""}
            error={contentTouched && contentValidation.error}
          />
        </fieldset>
        <Button>Enviar</Button>
      </form>
    </Card>
  );
}
