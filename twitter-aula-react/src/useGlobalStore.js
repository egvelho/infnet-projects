import { create } from "zustand";

export const initialUser = {
  id: 0,
  username: "",
  email: "",
  cpf: "",
  gender: "",
  pronouns: "",
  name: "",
  surname: "",
  password: "",
  avatar: null,
  acceptTerms: false,
};

export const useGlobalStore = create((set) => ({
  user: initialUser,
  isLoading: false,
  isAuthenticated: false,
  setUser(user) {
    set({ user });
  },
  setIsLoading(isLoading) {
    set({ isLoading });
  },
  setIsAuthenticated(isAuthenticated) {
    set({ isAuthenticated });
  },
  cleanUser() {
    set({ user: initialUser });
  },
}));
