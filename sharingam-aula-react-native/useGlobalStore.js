import { create } from 'zustand'

export const initialState = {
  user: {
    id: 0,
    name: '',
    username: '',
    email: '',
  },
  token: '',
}

export const useGlobalStore = create((set) => ({
  ...initialState,
  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),
}));