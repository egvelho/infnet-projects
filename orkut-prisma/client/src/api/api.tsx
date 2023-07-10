import axios from "axios";
import { browserHistory } from "../browserHistory";
import { AuthToken } from "../authToken";
import { useGlobalStore, initialUser } from "../useGlobalStore";
import { ErrorToast } from "../components/ErrorToast";
import toast from "react-simple-toasts";

export const api = axios.create({
  baseURL: "http://localhost:8080",
});

const texts = {
  sessionExpiredError: "Sua sessão expirou. Por favor, entre novamente.",
};

const setIsLoading = useGlobalStore.getState().setIsLoading;
const setIsAuthenticated = useGlobalStore.getState().setIsAuthenticated;
const setUser = useGlobalStore.getState().setUser;

api.interceptors.request.use((config) => {
  const token = AuthToken.get();
  setIsLoading(true);
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => {
    setIsLoading(false);
    return response;
  },
  (error) => {
    setIsLoading(false);
    if (error.response.status === 400) {
      if (error.response.data.errors) {
        const errors: string[] = error.response.data.errors
          .map(({ constraints }: any) => Object.values(constraints))
          .flat();
        errors.forEach((error) =>
          toast(error, {
            render(error) {
              return <ErrorToast message={error} />;
            },
          })
        );
      } else if (error.response.data.message) {
        toast(error.response.data.message, {
          render(error) {
            return <ErrorToast message={error} />;
          },
        });
      }
    }
    if (error.response.status === 401) {
      toast(texts.sessionExpiredError);
      AuthToken.remove();
      setUser(initialUser);
      setIsAuthenticated(false);
      browserHistory.push("/entrar");
    }
  }
);
