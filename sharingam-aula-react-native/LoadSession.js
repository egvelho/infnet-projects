import { useEffect } from "react";
import { useGlobalStore } from "./useGlobalStore";
import { api } from "./api";
import { AxiosError } from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

export function LoadSession() {
  const setUser = useGlobalStore((state) => state.setUser);
  const setToken = useGlobalStore((state) => state.setToken);

  async function loadSession() {
    const token = await AsyncStorage.getItem('token');

    if (!token) {
      return;
    }

    setToken(token);

    try {
      const request = await api.get("/account/profile");
      const user = request.data;
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