import { Matches } from "class-validator";
import type { PokemonMode, BattleTurn } from "../battle.schema";

export class ChangeModeDto {
  @Matches(/^normal|atk|recover|def$/)
  pokemonMode: PokemonMode;
}
