import { api } from "./api";
import type { User } from "../../../shared/types";

type SignInInput = {
  email: string;
  passwd: string;
  first_name: string;
  last_name: string;
};

type SignUpOutput =
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

export async function signUp(data: SignInInput): Promise<SignUpOutput> {
  const response = await api.post("/auth/sign-up", data);
  return response.data;
}
