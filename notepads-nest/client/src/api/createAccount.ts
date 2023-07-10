import { api } from "./api";
import type { User } from "../types";

type CreateAccountInput = {
  name: string;
  surname: string;
  email: string;
  password: string;
};

type CreateAccountOutput = {
  success: true;
  accessToken: string;
  user: User;
};

export async function createAccount(
  createAccountInput: CreateAccountInput
): Promise<CreateAccountOutput> {
  const response = await api.post("/auth/create-account", createAccountInput);
  return response.data;
}
