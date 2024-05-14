import { useEffect } from "react";
import { api } from "../api";
import { TokenStorage } from "../tokenStorage";
import { useGlobalStore } from "../useGlobalStore";

export function LoadUser() {
  const setUser = useGlobalStore((state) => state.setUser);
  const setIsAuthorized = useGlobalStore((state) => state.setIsAuthorized);

  async function loadUser() {
    const token = TokenStorage.getToken();
    if (!token) {
      return;
    }

    const request = await api.get("/auth/session");
    if (request === undefined) {
      return;
    }
    const user = request.data;
    setIsAuthorized(true);
    setUser({
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      avatar: user.avatar,
    });
  }

  useEffect(() => {
    loadUser();
  }, []);
  return null;
}
