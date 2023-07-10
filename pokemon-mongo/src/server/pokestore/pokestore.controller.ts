import {
  JsonController,
  Get,
  Post,
  Body,
  Param,
  CurrentUser,
  Authorized,
} from "routing-controllers";
import { Service } from "typedi";
import { PokeStoreService } from "./pokestore.service";
import type { ITrainer } from "../trainer/trainer.schema";
import { PokeStoreCreateDto } from "./dtos/pokestore-create.dto";

@Service()
@JsonController("/pokestore")
export class PokeStoreController {
  constructor(private readonly pokeStoreService: PokeStoreService) {}

  @Authorized()
  @Get()
  async getAll() {
    const pokeStore = await this.pokeStoreService.findAll();
    return pokeStore;
  }

  @Authorized()
  @Get("/:name")
  async getOne(@Param("name") name: string) {
    const pokeStoreItem = await this.pokeStoreService.findByName(name);
    return pokeStoreItem;
  }

  @Authorized()
  @Post()
  async create(@Body() pokeStoreCreateDto: PokeStoreCreateDto) {
    const pokeStoreItem = await this.pokeStoreService.create(
      pokeStoreCreateDto
    );
    return pokeStoreItem;
  }

  @Authorized()
  @Post("/buy/:name")
  async buyPokemon(
    @CurrentUser() trainer: ITrainer,
    @Param("name") pokemonName: string
  ) {
    const nextTrainer = await this.pokeStoreService.buyPokemon(
      pokemonName,
      trainer
    );
    return nextTrainer;
  }
}
