import { api } from "./api";
import type { User } from "../../../shared/types";

type SignInOutput =
  | {
      success: false;
      jwt: null;
      user: null;
    }
  | {
      success: true;
      jwt: string;
      user: User;
    };

export async function signIn(
  email: string,
  password: string
): Promise<SignInOutput> {
  const response = await api.post("/auth/sign-in", { email, password });
  return response.data;
}
