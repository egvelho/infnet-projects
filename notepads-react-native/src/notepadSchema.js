import * as yup from "yup";

export const notepadSchema = yup.object().shape({
  title: yup
    .string()
    .min(4, "O título precisa ter pelo menos 4 caracteres")
    .max(20, "O título precisa ter no máximo 20 caracteres")
    .required("O campo título não pode ficar vazio"),
  subtitle: yup
    .string()
    .min(8, "O subtítulo precisa ter pelo menos 8 caracteres")
    .max(32, "O subtítulo precisa ter no máximo 32 caracteres")
    .required("O campo subtítulo não pode ficar vazio"),
  content: yup
    .string()
    .min(12, "O conteúdo precisa ter pelo menos 12 caracteres")
    .max(256, "O conteúdo precisa ter no máximo 256 caracteres")
    .required("O campo conteúdo não pode ficar vazio"),
});
