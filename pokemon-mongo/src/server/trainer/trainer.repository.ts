import { Service } from "typedi";
import { Trainer } from "./trainer.model";
import { CreateTrainerDto } from "./dtos/create-trainer.dto";
import { UpdateTrainerDto } from "./dtos/update-trainer.dto";
import { IPokemon } from "../pokemon/pokemon.schema";

@Service()
export class TrainerRepository {
  constructor() {}

  async findAll() {
    const trainers = await Trainer.find().lean();
    return trainers;
  }

  async findOne(username: string) {
    const trainer = await Trainer.findOne({ username }).lean();
    return trainer;
  }

  async findOneWithPassword(username: string) {
    const trainer = await Trainer.findOne({ username })
      .select("+password")
      .lean();
    return trainer;
  }

  async create(createTrainerDto: CreateTrainerDto) {
    const { pokemons, password, ...trainer } = (
      await Trainer.create(createTrainerDto)
    ).toJSON();
    trainer.id = trainer._id.toString();
    return trainer;
  }

  async deleteByUsername(username: string) {
    const trainer = await Trainer.findOneAndDelete(
      {
        username,
      },
      {
        new: true,
      }
    ).lean();
    return trainer;
  }

  async updateByUsername(
    username: string,
    updateTrainerDto: Partial<UpdateTrainerDto>
  ) {
    const trainer = await Trainer.findOneAndUpdate(
      { username },
      updateTrainerDto,
      { new: true }
    ).lean();
    return trainer;
  }

  async addPokemon(username: string, pokemon: IPokemon, credit: number) {
    await Trainer.updateOne(
      {
        username,
      },
      {
        credit,
        $push: {
          pokemons: pokemon,
        },
      }
    );
  }

  async updatePokemon(username: string, pokemon: IPokemon) {
    await Trainer.updateOne(
      {
        username,
      },
      {
        $set: {
          pokemons: pokemon,
        },
      }
    );
  }
}
