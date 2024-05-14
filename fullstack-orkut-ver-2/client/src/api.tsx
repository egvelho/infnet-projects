import axios from "axios";
import toast from "react-simple-toasts";
import { TokenStorage } from "./tokenStorage";
import { globalNavigate } from "./globalNavigate";
import { useGlobalStore } from "./useGlobalStore";

const { setIsLoading, setUser } = useGlobalStore.getState();

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.request.use((config) => {
  setIsLoading(true);
  const token = TokenStorage.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (config) => {
    setIsLoading(false);
    return config;
  },
  (error) => {
    setIsLoading(false);
    if (error.response.status === 401) {
      const token = TokenStorage.getToken();
      if (token) {
        TokenStorage.removeToken();
        setUser({
          id: 0,
          first_name: "",
          last_name: "",
          email: "",
          avatar: "",
        });
        toast("Sua sessão expirou. Por favor, entre novamente.");
        globalNavigate.navigate("/entrar");
        return;
      }
    }

    if (error.response.data.errors && error.response.status >= 400) {
      const errors = error.response.data.errors.map((issue) =>
        Object.values(issue.constraints).at(0)
      );
      errors.forEach((error) =>
        toast(error, {
          render(message) {
            return (
              <div className="p-2 rounded-md text-gray-100 bg-red-500">
                {message}
              </div>
            );
          },
        })
      );
    } else if (error.response.data.message && error.response.status >= 400) {
      toast(error.response.data.message, {
        render(message) {
          return (
            <div className="p-2 rounded-md text-gray-100 bg-red-500">
              {message}
            </div>
          );
        },
      });
    } else {
      throw error;
    }
  }
);
