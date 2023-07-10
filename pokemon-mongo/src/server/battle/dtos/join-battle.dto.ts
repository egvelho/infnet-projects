import { IsString } from "class-validator";
import { ITrainer } from "../../trainer/trainer.schema";

export class JoinBattleDto {
  @IsString()
  pokemonName: string;

  trainer: ITrainer;
}
