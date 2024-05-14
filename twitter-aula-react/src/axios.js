import Axios from "axios";
import { AuthService } from "./auth.service";
import toast from "react-simple-toasts";
import { history } from "./history";
import { useGlobalStore } from "./useGlobalStore";

export const axios = Axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const { setIsAuthenticated, cleanUser, setIsLoading } =
  useGlobalStore.getState();

axios.interceptors.request.use((config) => {
  setIsLoading(true);
  const token = AuthService.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axios.interceptors.response.use(
  (response) => {
    setIsLoading(false);
    return response;
  },
  (error) => {
    setIsLoading(false);
    const request = error.request;
    if (request.status === 401) {
      setIsAuthenticated(false);
      cleanUser();
      AuthService.removeToken();
      toast("Sua sessão expirou. Por favor, entre novamente.");
      history.push("/entrar");
    }

    return Promise.reject(error);
  }
);
