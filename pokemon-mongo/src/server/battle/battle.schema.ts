import { Schema } from "mongoose";
import { pokemonSchema } from "../pokemon/pokemon.schema";
import { ITrainer } from "../trainer/trainer.schema";
import { IPokemon } from "../pokemon/pokemon.schema";

// @ts-ignore
import mongooseLeanId from "mongoose-lean-id";
import mongooseAutoPopulate from "mongoose-autopopulate";

export type PokemonMode = "normal" | "atk" | "recover" | "def";
export type BattleStep = "waiting" | "battle" | "finished";
export type BattleTurn = "trainer_a" | "trainer_b";

export interface IBattle {
  id: string;
  trainerA: ITrainer;
  trainerB: ITrainer;
  pokemonA: IPokemon;
  pokemonB: IPokemon;
  pokemonAMode: PokemonMode;
  pokemonBMode: PokemonMode;
  step: BattleStep;
  turn: BattleTurn;
  message?: string;
}

export type PartialBattleData = Partial<{ [key in keyof IBattle]: any }>;

export const battleSchema = new Schema<IBattle>({
  trainerA: {
    ref: "Trainer",
    type: Schema.Types.ObjectId,
    autopopulate: true,
  },
  trainerB: {
    ref: "Trainer",
    type: Schema.Types.ObjectId,
    autopopulate: true,
  },
  pokemonA: pokemonSchema,
  pokemonB: pokemonSchema,
  pokemonAMode: {
    type: Schema.Types.String,
    required: true,
    default: "normal",
  },
  pokemonBMode: {
    type: Schema.Types.String,
    required: true,
    default: "normal",
  },
  step: {
    type: Schema.Types.String,
    required: true,
    default: "waiting",
  },
  turn: {
    type: Schema.Types.String,
    required: true,
    default: "trainer_a",
  },
  message: {
    type: Schema.Types.String,
    required: false,
  },
});

battleSchema.plugin(mongooseLeanId);
battleSchema.plugin(mongooseAutoPopulate);
