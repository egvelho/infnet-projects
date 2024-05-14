import { z } from "zod";

const content = z
  .string()
  .min(16, {
    message: "O conteúdo precisa ter pelo menos 16 caracteres",
  })
  .max(270, {
    message: "O conteúdo precisa ter no máximo 270 caracteres",
  });

export const PostSchema = z.object({
  content,
});
