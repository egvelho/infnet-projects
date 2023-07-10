import { create } from "zustand";

export const useGlobalStore = create((set) => ({
  isLoading: false,
  setIsLoading(isLoading) {
    set({ isLoading });
  },
}));
