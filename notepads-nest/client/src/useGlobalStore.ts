import { create } from "zustand";
import type { User } from "./types";

type StoreUser = User & { isAuthenticated: boolean; isEmailVerified: number };

type GlobalStore = {
  user: StoreUser;
  setUser: (user: Partial<StoreUser>) => void;
};

export const initialUser = {
  isAuthenticated: false,
  isEmailVerified: 0,
  name: "",
  surname: "",
  email: "",
  id: 0,
  userPicture: null,
};

export const useGlobalStore = create<GlobalStore>((set, get) => ({
  user: initialUser,
  setUser(user) {
    set({ user: { ...get().user, ...user } });
  },
}));
