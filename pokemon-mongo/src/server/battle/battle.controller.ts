import { Service } from "typedi";
import {
  JsonController,
  Authorized,
  CurrentUser,
  Get,
  Post,
  Patch,
  Body,
  Param,
} from "routing-controllers";
import { BattleService } from "./battle.service";
import { JoinBattleDto } from "./dtos/join-battle.dto";
import { ChangeModeDto } from "./dtos/change-mode.dto";
import type { ITrainer } from "../trainer/trainer.schema";

@Service()
@JsonController("/battles")
export class BattleController {
  constructor(private readonly battleService: BattleService) {}

  @Authorized()
  @Post("/join")
  async joinBattle(
    @Body() joinBattleDto: JoinBattleDto,
    @CurrentUser() trainer: ITrainer
  ) {
    joinBattleDto.trainer = trainer;
    const battle = await this.battleService.joinBattle(joinBattleDto);
    return battle;
  }

  @Authorized()
  @Post("/:id/attack")
  async attackAction(@Param("id") id: string) {
    const battle = await this.battleService.attack(id);
    return battle;
  }

  @Authorized()
  @Post("/:id/change-mode")
  async changeModeAction(
    @Param("id") id: string,
    @Body() changeModeDto: ChangeModeDto
  ) {
    const battle = await this.battleService.changeMode(id, changeModeDto);
    return battle;
  }

  @Authorized()
  @Get("/:id")
  async getOne(@Param("id") id: string) {
    const battle = await this.battleService.findOne(id);
    return battle;
  }
}
