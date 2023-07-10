import { IPokemon } from "../../server/pokemon/pokemon.schema";
import { Button } from "./Button";

export type PokemonListProps = {
  pokemons: IPokemon[];
  actionArea?: (pokemon: IPokemon) => React.ReactNode;
};

export function PokemonList({ pokemons, actionArea }: PokemonListProps) {
  return (
    <div>
      {pokemons.map((pokemon) => (
        <PokemonItem
          key={pokemon.name}
          pokemon={pokemon}
          actionArea={actionArea}
        />
      ))}
    </div>
  );
}

type PokemonItemProps = {
  pokemon: IPokemon;
  actionArea?: (pokemon: IPokemon) => React.ReactNode;
};

function PokemonItem({ pokemon, actionArea }: PokemonItemProps) {
  return (
    <div className="flex flex-row gap-2 py-2 border-b">
      <div>
        <img src={pokemon.imageMini} />
      </div>
      <div className="flex flex-col flex-1">
        <span className="leading-tight text-xl font-bold font-[VT323]">
          {pokemon.name} ({pokemon.type})
        </span>
        <div className="flex flex-row gap-4">
          <span>
            LVL {pokemon.level} ({pokemon.exp} EXP)
          </span>
          <span>{pokemon.hp} HP</span>
          <span>{pokemon.atk} ATK</span>
          <span>{pokemon.def} DEF</span>
        </div>
      </div>
      {actionArea && <div>{actionArea(pokemon)}</div>}
    </div>
  );
}
