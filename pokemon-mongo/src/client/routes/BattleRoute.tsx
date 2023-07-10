import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { IBattle, PokemonMode } from "../../server/battle/battle.schema";
import type { ITrainer } from "../../server/trainer/trainer.schema";
import type { IPokemon } from "../../server/pokemon/pokemon.schema";
import { api } from "../utils/api";
import { useGlobalStore } from "../utils/useGlobalStore";

const initialTrainer: ITrainer = {
  id: "",
  credit: 0,
  name: "",
  password: "",
  pokemons: [],
  surname: "",
  username: "",
};

const initialPokemon: IPokemon = {
  atk: 0,
  def: 0,
  exp: 0,
  hp: 0,
  id: "",
  imageBack: "",
  imageFront: "",
  imageMini: "",
  level: 0,
  name: "",
  price: 0,
  type: "",
};

const initialBattleState: IBattle = {
  id: "",
  pokemonA: initialPokemon,
  pokemonB: initialPokemon,
  pokemonAMode: "normal",
  pokemonBMode: "normal",
  trainerA: initialTrainer,
  trainerB: initialTrainer,
  turn: "trainer_a",
  step: "waiting",
};

const battleTickTimeout = 2000;

export function BattleRoute() {
  const navigate = useNavigate();
  const pokemonName = useParams().pokemonName;
  const [battleState, setBattleState] = useState(initialBattleState);
  const trainer = useGlobalStore((state) => state.trainer);
  const setTrainer = useGlobalStore((state) => state.setTrainer);
  const isMyselfTrainerA = battleState.trainerA.username === trainer.username;
  const isMyselfTrainerB = battleState.trainerB.username === trainer.username;
  const isWaiting = battleState.step === "waiting";
  const isBattleStarted = !isWaiting;
  const [isShouldDisplayMessage, setIsShouldDisplayMessage] = useState(false);
  const [isTurn, setIsTurn] = useState(false);
  const enemyTrainer = isMyselfTrainerA
    ? battleState.trainerB
    : battleState.trainerA;
  const [myPokemon, enemyPokemon] = isMyselfTrainerA
    ? [battleState.pokemonA, battleState.pokemonB]
    : [battleState.pokemonB, battleState.pokemonA];
  const [myPokemonMode, enemyPokemonMode] = isMyselfTrainerA
    ? [battleState.pokemonAMode, battleState.pokemonBMode]
    : [battleState.pokemonBMode, battleState.pokemonAMode];

  async function battleTick() {
    if (!battleState.id || battleState.step === "finished") {
      return;
    }

    const response = await api.get<IBattle>(`/battles/${battleState.id}`);
    const battle = response.data;

    if (battle.step === "finished") {
      setBattleState({ ...battleState, ...battle });
      setIsTurn(false);
      setIsShouldDisplayMessage(true);
      const { data: nextTrainer } = await api.get<ITrainer>(
        "/trainers/auth/myself"
      );
      setTrainer(nextTrainer);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      navigate("/treinador");
      return;
    }

    if (battleState.message === battle.message && isBattleStarted && isTurn) {
      setIsShouldDisplayMessage(false);
    } else {
      setIsShouldDisplayMessage(true);
    }

    if (battleState.turn !== battle.turn) {
      if (
        (isMyselfTrainerA && battle.turn === "trainer_a") ||
        (isMyselfTrainerB && battle.turn === "trainer_b")
      ) {
        setIsTurn(true);
      } else {
        setIsTurn(false);
      }
    }

    setBattleState({ ...battleState, ...battle });
  }

  async function joinBattle() {
    if (battleState.id) {
      return;
    }

    const response = await api.post<IBattle>("/battles/join", {
      pokemonName,
    });
    const battle = response.data;
    setBattleState({ ...battleState, ...battle });

    if (battle.trainerA.username === trainer.username) {
      setIsTurn(true);
    }
  }

  async function onPokemonAttack() {
    setIsTurn(false);
    const response = await api.post<IBattle>(
      `/battles/${battleState.id}/attack`,
      {}
    );
  }

  async function onPokemonChangeMode(pokemonMode: PokemonMode) {
    setIsTurn(false);
    const response = await api.post<IBattle>(
      `/battles/${battleState.id}/change-mode`,
      { pokemonMode }
    );
  }

  useEffect(() => {
    joinBattle();
  }, [pokemonName]);

  useEffect(() => {
    const battleTickTimeoutId = setTimeout(battleTick, battleTickTimeout);
    return () => clearTimeout(battleTickTimeoutId);
  }, [battleState]);

  return (
    <div className="absolute top-0 left-0 w-[100vw] h-[100vh] flex flex-col flex-1 items-center justify-center">
      <div className="w-[640px] h-[480px] rounded-xl bg-[url(/battle-background.jpg)] bg-no-repeat bg-cover shadow-2xl relative">
        {isBattleStarted && (
          <>
            <div className="z-10 top-[40px] right-[230px] absolute ">
              <PokemonStatus pokemon={enemyPokemon} />
            </div>
            <img
              src={enemyPokemon.imageFront}
              className="w-[180px] absolute top-[50px] right-[30px]"
            />
            <div className="z-10 right-[160px] bottom-[140px] absolute ">
              <PokemonStatus pokemon={myPokemon} />
            </div>
          </>
        )}
        <img
          src={myPokemon.imageBack}
          className="w-[230px] absolute bottom-[70px] left-[60px]"
        />
        <div className="z-10 absolute bottom-0 left-0 w-full p-4 gap-2 flex flex-col">
          {isShouldDisplayMessage && (
            <BattleMessage message={battleState.message} />
          )}
          {isTurn && isBattleStarted && (
            <PokemonActionMenu
              myPokemonMode={myPokemonMode}
              onAttackAction={onPokemonAttack}
              onChangeModeAction={onPokemonChangeMode}
            />
          )}
        </div>
      </div>
    </div>
  );
}

type BattleMessageProps = {
  message?: string;
};

function BattleMessage({ message = "" }: BattleMessageProps) {
  return (
    <div className="w-full h-full p-4 rounded-lg bg-gray-300 bg-opacity-50 backdrop-blur font-bold font-[VT323]">
      <span className="text-4xl leading-tight text-slate-800 ">{message}</span>
    </div>
  );
}

type PokemonActionMenuProps = {
  myPokemonMode: PokemonMode;
  onAttackAction(): Promise<void>;
  onChangeModeAction(mode: PokemonMode): Promise<void>;
};

function PokemonActionMenu({
  myPokemonMode,
  onAttackAction,
  onChangeModeAction,
}: PokemonActionMenuProps) {
  return (
    <div className="w-full h-full p-4 rounded-lg bg-gray-300 bg-opacity-50 backdrop-blur font-bold font-[VT323] flex items-center gap-4">
      <div className="flex">
        <button
          className="text-5xl text-slate-800 hover:underline cursor-pointer"
          onClick={onAttackAction}
        >
          Atacar!
        </button>
      </div>
      <div className="flex flex-col flex-1">
        <span className="text-4xl text-red-900">Modos</span>
        <div className="text-3xl flex gap-4 text-slate-800">
          <button
            onClick={() => onChangeModeAction("normal")}
            className={`hover:underline cursor-pointer ${
              myPokemonMode === "normal" ? "text-sky-700" : ""
            }`}
          >
            Normal
          </button>
          <button
            onClick={() => onChangeModeAction("atk")}
            className={`hover:underline cursor-pointer ${
              myPokemonMode === "atk" ? "text-sky-700" : ""
            }`}
          >
            Ataque
          </button>
          <button
            onClick={() => onChangeModeAction("recover")}
            className={`hover:underline cursor-pointer ${
              myPokemonMode === "recover" ? "text-sky-700" : ""
            }`}
          >
            Recuperação
          </button>
          <button
            onClick={() => onChangeModeAction("def")}
            className={`hover:underline cursor-pointer ${
              myPokemonMode === "def" ? "text-sky-700" : ""
            }`}
          >
            Defesa
          </button>
        </div>
      </div>
    </div>
  );
}

type PokemonStatusProps = {
  pokemon: IPokemon;
};

function PokemonStatus({
  pokemon: { level, name, hp, currentHp = hp },
}: PokemonStatusProps) {
  return (
    <div className="p-2 rounded-lg bg-gray-300 bg-opacity-50 backdrop-blur font-bold font-[VT323] flex flex-col items-center text-slate-800">
      <div className="text-2xl flex gap-8">
        <span className="flex-1">{name}</span>
        <span>Lvl {level}</span>
      </div>
      <div className="flex text-2xl w-full gap-2">
        <span>HP</span>
        <span className="w-full relative text-xl leading-tight bg-red-500 border-slate-800 border-4 px-2">
          <span
            className={`z-10 absolute top-0 left-0 bg-green-600 h-full`}
            style={{
              width: Math.ceil(((currentHp || 0) * 100) / hp)
                .toString()
                .concat("%"),
            }}
          ></span>
          <span className="z-20 relative">
            {currentHp} / {hp}
          </span>
        </span>
      </div>
    </div>
  );
}
