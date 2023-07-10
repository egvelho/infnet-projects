import { useEffect } from "react";
import { useGlobalStore } from "../utils/useGlobalStore";
import { api } from "../utils/api";
import { AuthToken } from "../utils/authToken";

export function LoadAuthTrainer() {
  const trainer = useGlobalStore((state) => state.trainer);
  const setTrainer = useGlobalStore((state) => state.setTrainer);

  useEffect(() => {
    const token = AuthToken.get();
    if (!token || trainer.isAuthenticated) {
      return;
    }

    api.get("/trainers/auth/myself").then((response) => {
      const trainer = response.data;
      setTrainer({ ...trainer, isAuthenticated: true });
    });
  }, [trainer]);

  return null;
}
