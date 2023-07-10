import { useEffect } from "react";
import { useGlobalStore } from "./useGlobalStore";
import { getMyself } from "./api/getMyself";
import { AuthToken } from "./authToken";

export function LoadAuthUser() {
  const user = useGlobalStore((state) => state.user);
  const setUser = useGlobalStore((state) => state.setUser);

  useEffect(() => {
    const token = AuthToken.get();
    if (!token || user.isAuthenticated) {
      return;
    }

    getMyself().then((user) => {
      setUser({ ...user, isAuthenticated: true });
    });
  }, [user]);

  return null;
}
