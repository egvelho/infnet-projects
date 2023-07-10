import { api } from "./api";

type RequestEmailVerificationCodeOutput = {
  success: boolean;
};

export async function requestEmailVerificationCode(): Promise<RequestEmailVerificationCodeOutput> {
  const response = await api.post<RequestEmailVerificationCodeOutput>(
    "/auth/request-email-verification-code"
  );
  const data = response.data;
  return data;
}
