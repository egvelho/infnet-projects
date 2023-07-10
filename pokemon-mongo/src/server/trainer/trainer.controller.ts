import {
  JsonController,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Authorized,
  CurrentUser,
} from "routing-controllers";
import { Service } from "typedi";
import { CreateTrainerDto } from "./dtos/create-trainer.dto";
import { UpdateTrainerDto } from "./dtos/update-trainer.dto";
import { TrainerService } from "./trainer.service";
import type { ITrainer } from "./trainer.schema";

@Service()
@JsonController("/trainers")
export class TrainerController {
  constructor(private readonly trainerService: TrainerService) {}

  @Authorized()
  @Get()
  async getAll() {
    const trainers = await this.trainerService.findAll();
    return trainers;
  }

  @Authorized()
  @Get("/:username")
  async getOne(@Param("username") username: string) {
    const trainer = await this.trainerService.findOne(username);
    return trainer;
  }

  @Authorized()
  @Post()
  async create(@Body() createTrainerDto: CreateTrainerDto) {
    const trainer = await this.trainerService.create(createTrainerDto);
    return trainer;
  }

  @Authorized()
  @Put("/:username")
  async update(
    @Param("username") username: string,
    @Body() updateTrainerDto: UpdateTrainerDto
  ) {
    const trainer = await this.trainerService.update(
      username,
      updateTrainerDto
    );
    return trainer;
  }

  @Authorized()
  @Delete("/:username")
  async delete(@Param("username") username: string) {
    const trainer = await this.trainerService.delete(username);
    return trainer;
  }

  @Authorized()
  @Get("/auth/myself")
  async getMyself(@CurrentUser() trainer: ITrainer) {
    return trainer;
  }
}
