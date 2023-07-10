import { useState, useEffect } from "react";
import { Card } from "../components/Card";
import { Title } from "../components/Title";
import { LinkButton } from "../components/LinkButton";
import { PokemonList } from "../components/PokemonList";
import { api } from "../utils/api";
import { initialTrainer } from "../utils/useGlobalStore";

const texts = {
  title: "Minha pokedex",
  battleAction: "Batalhar!",
};

export function TrainerRoute() {
  const [trainer, setTrainer] = useState(initialTrainer);

  async function loadTrainer() {
    const response = await api.get("/trainers/auth/myself");
    const nextTrainer = response.data;
    setTrainer(nextTrainer);
  }

  useEffect(() => {
    loadTrainer();
  }, []);

  return (
    <div className="mt-4">
      <Card className="max-w-screen-sm mx-auto my-4">
        <Title className="text-2xl text-center mb-4">{texts.title}</Title>
        <PokemonList
          pokemons={trainer.pokemons}
          actionArea={(pokemon) => (
            <LinkButton to={`/batalhar/${pokemon.name}`}>
              {texts.battleAction}
            </LinkButton>
          )}
        />
      </Card>
    </div>
  );
}
