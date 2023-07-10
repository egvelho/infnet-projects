import { AuthToken } from "../authToken";
import toast from "react-simple-toasts";
import { browserHistory } from "../browserHistory";

const texts = {
  logoutMessage: "Sua sessão foi finalizada com sucesso!",
};

export function logout() {
  AuthToken.remove();
  toast(texts.logoutMessage);
  browserHistory.push("/");
}
