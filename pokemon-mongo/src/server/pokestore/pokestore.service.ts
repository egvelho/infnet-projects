import { Service } from "typedi";
import { BadRequestError } from "routing-controllers";
import { PokeStoreRepository } from "./pokestore.repository";
import { PokeStoreCreateDto } from "./dtos/pokestore-create.dto";
import { TrainerService } from "../trainer/trainer.service";
import { ITrainer } from "../trainer/trainer.schema";

@Service()
export class PokeStoreService {
  constructor(
    private readonly pokeStoreRepository: PokeStoreRepository,
    private readonly trainerService: TrainerService
  ) {}

  async findAll() {
    const pokeStore = await this.pokeStoreRepository.findAll();
    return pokeStore;
  }

  async findByName(name: string) {
    const pokeStoreItem = await this.pokeStoreRepository.findByName(name);
    return pokeStoreItem;
  }

  async create(pokeStoreCreateDto: PokeStoreCreateDto) {
    const pokeStoreItem = await this.pokeStoreRepository.create(
      pokeStoreCreateDto
    );
    return pokeStoreItem;
  }

  async buyPokemon(pokemonName: string, trainer: ITrainer) {
    if (trainer.pokemons.some((pokemon) => pokemon.name === pokemonName)) {
      throw new BadRequestError("Você já comprou esse pokemon.");
    }

    const pokemon = await this.pokeStoreRepository.findByName(pokemonName);

    if (pokemon === null) {
      throw new BadRequestError("Esse pokemon não existe.");
    }

    if (trainer.credit < pokemon.price) {
      throw new BadRequestError(
        "Você não possui créditos suficientes para comprar esse pokemon."
      );
    }

    trainer.credit = trainer.credit - pokemon.price;
    await this.trainerService.addPokemon(
      trainer.username,
      pokemon,
      trainer.credit
    );
    return trainer;
  }
}
