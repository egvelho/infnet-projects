import { useEffect } from "react";
import { useGlobalStore } from "../useGlobalStore";
import { AuthToken } from "../authToken";
import { getMyself } from "../api/getMyself";

export function AuthChecker() {
  const isAuthenticated = useGlobalStore((state) => state.isAuthenticated);
  const setIsAuthenticated = useGlobalStore(
    (state) => state.setIsAuthenticated
  );
  const setUser = useGlobalStore((state) => state.setUser);

  async function authChecker() {
    if (isAuthenticated) {
      return;
    }

    const token = AuthToken.get();
    if (!token) {
      return;
    }

    const myself = await getMyself();
    setIsAuthenticated(true);
    setUser(myself);
  }

  useEffect(() => {
    authChecker();
  }, [isAuthenticated]);

  return null;
}
