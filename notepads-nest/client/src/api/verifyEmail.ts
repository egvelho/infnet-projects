import { api } from "./api";

export type VerifyEmailInput = string;
export type VerifyEmailOutput = { success: boolean };

export async function verifyEmail(code: string) {
  const response = await api.post<VerifyEmailOutput>("/auth/verify-email", {
    code,
  });
  const data = response.data;
  return data;
}
