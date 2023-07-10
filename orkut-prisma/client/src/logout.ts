import { browserHistory } from "./browserHistory";
import { AuthToken } from "./authToken";
import { useGlobalStore, initialUser } from "./useGlobalStore";
import toast from "react-simple-toasts";

const texts = {
  logoutSuccess: "Você encerrou sua sessão. Até mais!",
};

const setIsAuthenticated = useGlobalStore.getState().setIsAuthenticated;
const setUser = useGlobalStore.getState().setUser;

export function logout() {
  toast(texts.logoutSuccess);
  AuthToken.remove();
  setUser(initialUser);
  setIsAuthenticated(false);
  browserHistory.push("/");
}
