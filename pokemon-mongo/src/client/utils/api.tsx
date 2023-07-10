import axios from "axios";
import toast from "react-simple-toasts";
import { useGlobalStore } from "./useGlobalStore";
import { browserHistory } from "./browserHistory";
import { AuthToken } from "./authToken";
import { ErrorToast } from "../components/ErrorToast";

const texts = {
  unauthenticatedError: "Sua sessão expirou. Por favor, faça login novamente.",
};

const setIsLoading = useGlobalStore.getState().setIsLoading;

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  setIsLoading(true);
  const token = AuthToken.get();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    setIsLoading(false);
    return response;
  },
  (error) => {
    setIsLoading(false);
    const status: number = error.request.status;
    if (status === 401) {
      AuthToken.remove();
      toast(texts.unauthenticatedError);
      browserHistory.push("/");
    } else if (status === 400) {
      const data = error.response.data;
      if (data.errors) {
        const errors: string[] = data.errors
          .map(({ constraints }: any) => Object.values(constraints))
          .flat();
        for (const error of errors) {
          errorToast(error);
        }
      } else if (data.message) {
        errorToast(data.message);
      }
    }
  }
);

function errorToast(error: string) {
  toast(error, {
    render(message) {
      return <ErrorToast message={message} />;
    },
  });
}
