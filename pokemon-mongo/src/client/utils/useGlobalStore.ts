import { create } from "zustand";
import { ITrainer } from "../../server/trainer/trainer.schema";

type StoreTrainer = ITrainer & { isAuthenticated: boolean };

type GlobalStore = {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  trainer: StoreTrainer;
  setTrainer: (trainer: Partial<StoreTrainer>) => void;
};

export const initialTrainer: StoreTrainer = {
  isAuthenticated: false,
  id: "",
  username: "",
  name: "",
  surname: "",
  password: "",
  credit: 0,
  pokemons: [],
};

export const useGlobalStore = create<GlobalStore>((set, get) => ({
  isLoading: false,
  setIsLoading(isLoading) {
    set({ isLoading });
  },
  trainer: initialTrainer,
  setTrainer(trainer) {
    set({ trainer: { ...get().trainer, ...trainer } });
  },
}));
