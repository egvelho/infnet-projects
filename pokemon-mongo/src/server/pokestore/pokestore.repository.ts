import { Service } from "typedi";
import { PokeStore } from "./pokestore.model";
import { PokeStoreCreateDto } from "./dtos/pokestore-create.dto";

@Service()
export class PokeStoreRepository {
  constructor() {}

  async findAll() {
    const pokeStore = await PokeStore.find().lean();
    return pokeStore;
  }

  async findByName(name: string) {
    const pokeStoreItem = await PokeStore.findOne({
      name,
    }).lean();
    return pokeStoreItem;
  }

  async create(pokeStoreCreateDto: PokeStoreCreateDto) {
    const pokeStoreItem = (await PokeStore.create(pokeStoreCreateDto)).toJSON();
    return pokeStoreItem;
  }
}
