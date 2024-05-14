import { create } from "zustand";
import type { User } from "../../shared/types";

type GlobalState = {
  user: User;
  setUser: (user: Partial<User>) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
};

export const initialUser: User = {
  id: 0,
  email: "",
  created_at: "",
  first_name: "",
  last_name: "",
  passwd: "",
};

export const initialGlobalState = {
  user: initialUser,
  isAuthenticated: false,
  isLoading: false,
};

export const useGlobalStore = create<GlobalState>((set) => {
  return {
    ...initialGlobalState,
    setUser(user: Partial<User>) {
      set((state) => ({
        user: {
          ...state.user,
          ...user,
        },
      }));
    },
    setIsAuthenticated(isAuthenticated: boolean) {
      set((state) => ({
        isAuthenticated,
      }));
    },
    setIsLoading(isLoading: boolean) {
      set((state) => ({
        isLoading,
      }));
    },
  };
});
