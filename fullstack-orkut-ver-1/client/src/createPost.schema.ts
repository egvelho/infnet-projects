import { z } from "zod";

const errors = {
  minLengthMessage(prop: string, min: number) {
    return `O ${prop} precisa ter pelo menos ${min} caracteres.`;
  },
  maxLengthMessage(prop: string, max: number) {
    return `O ${prop} precisa ter no máximo ${max} caracteres.`;
  },
};

const messageSchema = z
  .string()
  .min(16, {
    message: errors.minLengthMessage("mensagem", 16),
  })
  .max(256, {
    message: errors.maxLengthMessage("mensagem", 256),
  });

export const createPostSchema = z.object({
  message: messageSchema,
});
