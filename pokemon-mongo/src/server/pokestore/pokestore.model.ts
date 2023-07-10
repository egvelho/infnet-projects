import { model } from "mongoose";
import { pokeStoreSchema, IPokeStore } from "./pokestore.schema";

export const PokeStore = model<IPokeStore>("PokeStore", pokeStoreSchema);
