import { useEffect } from "react";
import { useGlobalStore } from "./useGlobalStore";
import { axios } from "./axios";
import { AuthService } from "./auth.service";
import { AxiosError } from "axios";

export function LoadSession() {
  const setUser = useGlobalStore((state) => state.setUser);
  const setIsAuthenticated = useGlobalStore(
    (state) => state.setIsAuthenticated
  );

  async function loadSession() {
    const token = AuthService.getToken();

    if (!token) {
      return;
    }

    try {
      const request = await axios.get("/account/profile");
      const user = request.data;
      setIsAuthenticated(true);
      setUser(user);
    } catch (error) {
      if (error instanceof AxiosError) {
        // ...
      } else {
        throw error;
      }
    }
  }

  useEffect(() => {
    loadSession();
  }, []);

  return null;
}
