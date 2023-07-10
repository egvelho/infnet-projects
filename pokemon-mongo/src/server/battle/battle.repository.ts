import { Service } from "typedi";
import { Battle } from "./battle.model";
import { PartialBattleData } from "./battle.schema";

@Service()
export class BattleRepository {
  constructor() {}

  async findAll() {
    const battles = await Battle.find().lean();
    return battles;
  }

  async findOneWaitingStep() {
    const battles = await Battle.findOne({
      trainerB: null,
    }).lean({ autopopulate: true });
    return battles;
  }

  async findOne(id: string) {
    const battle = await Battle.findById(id).lean({ autopopulate: true });
    return battle;
  }

  async create(createBattle: PartialBattleData) {
    const battle = (await Battle.create(createBattle)).toJSON();
    battle.id = battle._id.toString();
    return battle;
  }

  async update(id: string, updateBattle: PartialBattleData) {
    const battle = await Battle.findByIdAndUpdate(id, updateBattle, {
      new: true,
    }).lean({ autopopulate: true });
    return battle;
  }

  async delete(id: string) {
    const battle = await Battle.findByIdAndDelete(id).lean({
      autopopulate: true,
    });
    return battle;
  }

  async deleteTrainerEmptyBattles(trainerId: string) {
    await Battle.deleteMany({
      trainerA: trainerId,
      trainerB: null,
      step: "waiting",
    });
  }
}
