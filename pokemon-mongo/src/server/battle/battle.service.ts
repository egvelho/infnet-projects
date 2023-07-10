import { Service } from "typedi";
import { BadRequestError } from "routing-controllers";
import { BattleRepository } from "./battle.repository";
import { TrainerService } from "../trainer/trainer.service";
import { IBattle, PartialBattleData, PokemonMode } from "./battle.schema";
import { ITrainer } from "../trainer/trainer.schema";
import { IPokemon } from "../pokemon/pokemon.schema";
import { JoinBattleDto } from "./dtos/join-battle.dto";
import { ChangeModeDto } from "./dtos/change-mode.dto";

@Service()
export class BattleService {
  constructor(
    private readonly battleRepository: BattleRepository,
    private readonly trainerService: TrainerService
  ) {}

  async findAll() {
    const battles = await this.battleRepository.findAll();
    return battles;
  }

  async findOne(id: string) {
    const battle = await this.battleRepository.findOne(id);
    return battle;
  }

  async delete(id: string) {
    const battle = await this.battleRepository.delete(id);
    return battle;
  }

  private async update(id: string, updateBattle: PartialBattleData) {
    const battle = await this.battleRepository.update(id, updateBattle);
    return battle;
  }

  private getPokemonChangeModeMessage(pokemonName: string, mode: PokemonMode) {
    if (mode === "atk") {
      return `${pokemonName} entrou no modo de ataque!`;
    } else if (mode === "def") {
      return `${pokemonName} está se defendendo!`;
    } else if (mode === "recover") {
      return `${pokemonName} começou a se recuperar!`;
    } else {
      return `${pokemonName} voltou ao normal`;
    }
  }

  private checkElementalAdvantage(myPokemon: IPokemon, enemyPokemon: IPokemon) {
    return (
      (myPokemon.type === "Fogo" && enemyPokemon.type === "Planta") ||
      (myPokemon.type === "Água" && enemyPokemon.type === "Fogo") ||
      (myPokemon.type === "Planta" && enemyPokemon.type === "Água")
    );
  }

  private calcDamage(
    myPokemonArg: IPokemon,
    enemyPokemonArg: IPokemon,
    myPokemonMode: PokemonMode,
    enemyPokemonMode: PokemonMode
  ) {
    const myPokemon = { ...myPokemonArg };
    const enemyPokemon = { ...enemyPokemonArg };
    const isElementalAdvantage = this.checkElementalAdvantage(
      myPokemon,
      enemyPokemon
    );
    const isCriticalHit = Math.random() <= (isElementalAdvantage ? 0.4 : 0.1);
    const criticalMultiplier = isCriticalHit ? 1.5 : 1;
    const damageMultiplier =
      (0.8 + Math.ceil(Math.random() * 0.4)) * criticalMultiplier;

    if (myPokemonMode === "atk") {
      myPokemon.atk = myPokemon.atk * 1.2;
    } else if (myPokemonMode === "def" || myPokemonMode === "recover") {
      myPokemon.atk = myPokemon.atk / 4;
    }

    if (enemyPokemonMode === "atk") {
      enemyPokemon.def = enemyPokemon.def / 2;
    } else if (enemyPokemonMode === "def") {
      enemyPokemon.def = enemyPokemon.def * 2;
    } else if (enemyPokemonMode === "recover") {
      enemyPokemon.def = enemyPokemon.def / 3;
    }

    const damage = Math.floor(
      myPokemon.atk * damageMultiplier - enemyPokemon.def
    );
    const finalDamage = damage <= 0 ? 1 : damage;
    return finalDamage;
  }

  async changeMode(id: string, changeModeDto: ChangeModeDto) {
    const battle = (await this.battleRepository.findOne(id)) as IBattle;
    if (battle.turn === "trainer_a") {
      const nextBattle = this.battleRepository.update(id, {
        turn: "trainer_b",
        pokemonAMode: changeModeDto.pokemonMode,
        message: this.getPokemonChangeModeMessage(
          battle.pokemonA.name,
          changeModeDto.pokemonMode
        ),
      });
      return nextBattle;
    } else {
      const nextBattle = await this.battleRepository.update(id, {
        turn: "trainer_a",
        pokemonBMode: changeModeDto.pokemonMode,
        message: this.getPokemonChangeModeMessage(
          battle.pokemonB.name,
          changeModeDto.pokemonMode
        ),
      });
      return nextBattle;
    }
  }

  async attack(id: string) {
    const battle: any = (await this.battleRepository.findOne(id)) as IBattle;
    const [myPokemon, enemyPokemon] =
      battle.turn === "trainer_a"
        ? ["pokemonA", "pokemonB"]
        : ["pokemonB", "pokemonA"];

    const damage = this.calcDamage(
      battle[myPokemon],
      battle[enemyPokemon],
      battle[myPokemon.concat("Mode")],
      battle[enemyPokemon.concat("Mode")]
    );

    const nextHp =
      (battle[enemyPokemon].currentHp || battle[enemyPokemon].hp) - damage;
    const nextExp = battle[myPokemon].exp + Math.ceil(damage / 10);
    const currentHp = nextHp < 0 ? 0 : nextHp;

    if (battle[myPokemon.concat("Mode")] === "recover") {
      const nextRecoverHp = Math.floor(battle[myPokemon].currentHp * 1.1);
      battle[myPokemon].currentHp =
        nextRecoverHp > battle[myPokemon].hp
          ? battle[myPokemon].hp
          : nextRecoverHp;
    }

    const nextTurn = battle.turn === "trainer_a" ? "trainer_b" : "trainer_a";
    const nextBattle = this.update(id, {
      [myPokemon]: {
        ...battle[myPokemon],
        exp: nextExp,
      },
      [enemyPokemon]: {
        ...battle[enemyPokemon],
        currentHp,
      },
      turn: nextTurn,
      message: `${battle[myPokemon].name} causou ${damage} de dano em ${
        battle[enemyPokemon].name
      }!${
        currentHp === 0 ? `${battle[enemyPokemon].name} foi derrotado!` : ""
      }`,
    });

    if (currentHp === 0) {
      const nextBattle = await this.finishBattle(id);
      return nextBattle;
    }

    return nextBattle;
  }

  private getPokemonLeveledUp(pokemon: IPokemon): IPokemon {
    const levelsUp = Math.floor(pokemon.exp / 100);
    pokemon.exp = Math.floor(
      levelsUp > 0 ? Math.floor(pokemon.exp % 100) : pokemon.exp
    );
    pokemon.level = pokemon.level + levelsUp;
    for (let level = 0; level < levelsUp; level++) {
      pokemon.atk = Math.floor(pokemon.atk * 1.1);
      pokemon.def = Math.floor(pokemon.def * 1.1);
      pokemon.hp = Math.floor(pokemon.hp * 1.1);
    }
    const { currentHp, ...nextPokemon } = pokemon;
    return nextPokemon;
  }

  async finishBattle(id: string) {
    const battle = (await this.findOne(id)) as IBattle;
    const pokemonALeveledUp = this.getPokemonLeveledUp(battle.pokemonA);
    const pokemonBLeveledUp = this.getPokemonLeveledUp(battle.pokemonB);
    const trainerACredits =
      battle.trainerA.credit + Math.ceil(battle.pokemonA.exp);
    const trainerBCredits =
      battle.trainerB.credit + Math.ceil(battle.pokemonB.exp);
    await this.trainerService.update(battle.trainerA.username, {
      credit: trainerACredits,
    });
    await this.trainerService.update(battle.trainerB.username, {
      credit: trainerBCredits,
    });
    await this.trainerService.updatePokemon(
      battle.trainerA.username,
      pokemonALeveledUp
    );
    await this.trainerService.updatePokemon(
      battle.trainerB.username,
      pokemonBLeveledUp
    );
    const trainerWinner =
      battle.pokemonA.currentHp === 0
        ? battle.trainerB.username
        : battle.trainerA.username;
    const nextBattle = await this.battleRepository.update(id, {
      step: "finished",
      message: `O treinador ${trainerWinner} venceu a batalha!`,
    });
    return nextBattle;
  }

  async joinBattle(joinBattleDto: JoinBattleDto) {
    const trainer = joinBattleDto.trainer;
    const pokemon = trainer.pokemons.find(
      (pokemon) => pokemon.name === joinBattleDto.pokemonName
    );

    if (!pokemon) {
      throw new BadRequestError("Você não possui um pokemon com esse nome");
    }
    pokemon.currentHp = pokemon.hp;

    await this.battleRepository.deleteTrainerEmptyBattles(trainer.id);
    const waitingBattle = await this.battleRepository.findOneWaitingStep();
    let battle: IBattle;
    if (waitingBattle) {
      battle = (await this.battleRepository.update(waitingBattle.id, {
        trainerB: trainer.id,
        pokemonB: pokemon,
        step: "battle",
        message: `${pokemon.name} entrou na batalha!`,
      })) as IBattle;
    } else {
      battle = await this.battleRepository.create({
        trainerA: trainer.id,
        pokemonA: pokemon,
        message: "Aguardando oponente...",
      });
    }
    return battle;
  }
}
