import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-simple-toasts";
import { Card } from "../components/Card";
import { Title } from "../components/Title";
import { Button } from "../components/Button";
import { PokemonList } from "../components/PokemonList";
import { api } from "../utils/api";
import { useGlobalStore } from "../utils/useGlobalStore";
import type { IPokeStore } from "../../server/pokestore/pokestore.schema";
import type { IPokemon } from "../../server/pokemon/pokemon.schema";

const texts = {
  title: "Loja de pokemons",
  buySuccess: "Pokemon comprado com sucesso!",
};

const initialPokeStore: IPokeStore[] = [];

export function PokeStoreRoute() {
  const navigate = useNavigate();
  const setTrainer = useGlobalStore((state) => state.setTrainer);
  const [pokeStore, setPokeStore] = useState(initialPokeStore);

  async function loadPokeStore() {
    const response = await api.get<IPokeStore[]>("/pokestore");
    const nextPokeStore = response.data;
    setPokeStore(nextPokeStore);
  }

  async function onBuy(pokemon: IPokemon) {
    const response = await api.post(`/pokestore/buy/${pokemon.name}`);
    const nextTrainer = response.data;
    setTrainer(nextTrainer);
    toast(texts.buySuccess);
    navigate("/treinador");
  }

  useEffect(() => {
    loadPokeStore();
  }, []);

  return (
    <div className="mt-4">
      <Card className="max-w-screen-sm mx-auto my-4">
        <Title className="text-2xl text-center mb-4">{texts.title}</Title>
        <PokemonList
          pokemons={pokeStore}
          actionArea={(pokemon) => (
            <Button onClick={() => onBuy(pokemon)}>
              Comprar {pokemon.price.toString().padStart(3, "0")}c
            </Button>
          )}
        />
      </Card>
    </div>
  );
}
