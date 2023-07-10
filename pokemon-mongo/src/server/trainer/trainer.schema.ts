import { Schema } from "mongoose";
import { IPokemon, pokemonSchema } from "../pokemon/pokemon.schema";

// @ts-ignore
import mongooseLeanId from "mongoose-lean-id";

export interface ITrainer {
  id: string;
  username: string;
  name: string;
  surname: string;
  password: string;
  credit: number;
  pokemons: IPokemon[];
}

export const trainerSchema = new Schema<ITrainer>({
  username: {
    type: Schema.Types.String,
    required: true,
    unique: true,
    lowercase: true,
  },
  name: {
    type: Schema.Types.String,
    required: true,
    minlength: 2,
    maxlength: 64,
  },
  surname: {
    type: Schema.Types.String,
    required: true,
    minlength: 2,
    maxlength: 64,
  },
  password: {
    type: Schema.Types.String,
    required: true,
    minlength: 4,
    maxlength: 128,
    select: false,
  },
  credit: {
    type: Schema.Types.Number,
    required: true,
    min: 0,
  },
  pokemons: [pokemonSchema],
});

trainerSchema.plugin(mongooseLeanId);
