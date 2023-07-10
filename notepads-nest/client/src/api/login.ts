import { api } from "./api";
import type { User } from "../types";

type LoginOutput = {
  accessToken: string;
  user: User;
};

export async function login(
  email: string,
  password: string
): Promise<LoginOutput | null> {
  const response = await api.post(
    "/auth/login",
    {
      email,
      password,
    },
    {
      validateStatus(status) {
        console.log("status", status);
        if (status <= 401) {
          return true;
        }
        return false;
      },
    }
  );

  if (response.status >= 400) {
    return null;
  }
  return response.data;
}
