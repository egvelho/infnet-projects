import { Schema } from "mongoose";

// @ts-ignore
import mongooseLeanId from "mongoose-lean-id";

export interface IPokemon {
  id: string;
  name: string;
  imageMini: string;
  imageFront: string;
  imageBack: string;
  type: string;
  hp: number;
  currentHp?: number;
  atk: number;
  def: number;
  level: number;
  exp: number;
  price: number;
}

export const pokemonSchema = new Schema<IPokemon>({
  name: {
    type: Schema.Types.String,
    required: true,
    minlength: 2,
    maxlength: 16,
  },
  imageMini: {
    type: Schema.Types.String,
    required: true,
    minlength: 2,
  },
  imageFront: {
    type: Schema.Types.String,
    required: true,
    minlength: 2,
  },
  imageBack: {
    type: Schema.Types.String,
    required: true,
    minlength: 2,
  },
  type: {
    type: Schema.Types.String,
    required: true,
  },
  hp: {
    type: Schema.Types.Number,
    required: true,
    min: 0,
  },
  currentHp: {
    type: Schema.Types.Number,
    required: false,
    min: 0,
  },
  atk: {
    type: Schema.Types.Number,
    required: true,
    min: 1,
  },
  def: {
    type: Schema.Types.Number,
    required: true,
    min: 0,
  },
  level: {
    type: Schema.Types.Number,
    required: true,
    min: 1,
    max: 99,
  },
  exp: {
    type: Schema.Types.Number,
    required: true,
    min: 0,
    max: 100,
  },
  price: {
    type: Schema.Types.Number,
    required: true,
    min: 0,
  },
});

pokemonSchema.plugin(mongooseLeanId);
