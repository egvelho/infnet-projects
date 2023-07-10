import axios from "axios";
import toast from "react-simple-toasts";
import { browserHistory } from "../browserHistory";
import { AuthToken } from "../authToken";
import { ErrorToast } from "../components/ErrorToast";

const texts = {
  unauthenticatedError: "Sua sessão expirou. Por favor, faça login novamente.",
};

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.request.use((config) => {
  const token = AuthToken.get();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const status: number = error.request.status;
    if (status === 401) {
      AuthToken.remove();
      toast(texts.unauthenticatedError);
      browserHistory.push("/login");
    } else if (status === 422) {
      error.response.data.message.forEach((message: string) => {
        toast(message, {
          render(message) {
            return <ErrorToast message={message} />;
          },
        });
      });
    }
  }
);
