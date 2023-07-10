import { Service } from "typedi";
import { TrainerRepository } from "./trainer.repository";
import { CreateTrainerDto } from "./dtos/create-trainer.dto";
import { UpdateTrainerDto } from "./dtos/update-trainer.dto";
import { IPokemon } from "../pokemon/pokemon.schema";

@Service()
export class TrainerService {
  constructor(private readonly trainerRepository: TrainerRepository) {}

  async findAll() {
    const trainers = await this.trainerRepository.findAll();
    return trainers;
  }

  async findOne(username: string) {
    const trainer = await this.trainerRepository.findOne(username);
    return trainer;
  }

  async findOneWithPassword(username: string) {
    const trainer = await this.trainerRepository.findOneWithPassword(username);
    return trainer;
  }

  async create(createTrainerDto: CreateTrainerDto) {
    const trainer = await this.trainerRepository.create(createTrainerDto);
    return trainer;
  }

  async delete(username: string) {
    const trainer = await this.trainerRepository.deleteByUsername(username);
    return trainer;
  }

  async update(username: string, updateTrainerDto: Partial<UpdateTrainerDto>) {
    const trainer = await this.trainerRepository.updateByUsername(
      username,
      updateTrainerDto
    );
    return trainer;
  }

  async addPokemon(username: string, pokemon: IPokemon, credit: number) {
    await this.trainerRepository.addPokemon(username, pokemon, credit);
  }

  async updatePokemon(username: string, pokemon: IPokemon) {
    await this.trainerRepository.updatePokemon(username, pokemon);
  }
}
