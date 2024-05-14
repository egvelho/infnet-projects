import { create } from "zustand";

export const useDrawerState = create((set, get) => ({
  open: false,
  setOpen(open) {
    set({ open });
  },
  toggle() {
    set({ open: !get().open });
  },
}));
