import { useEffect, useState } from "react";
import {
  getCardBackgroundClass,
  getNameTypeClass,
} from "../utils/pokemonBackGroundColors.ts";
import { mapPokemonDetails } from "../utils/pokemonBasics";
import type { Pokemon } from "../types/pokemonTypes";
import { getAllPokemons, getPokemon } from "../services/pokemonServices";
import { TeamEditor } from "../components/TeamEditor";

export default function Home() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  const getPokemons = async () => {
    try {
      const data = await getAllPokemons();
      const basicPokemons = data.results.map(
        (pokemon: { name: string; url: string }) => ({
          name: pokemon.name,
          url: pokemon.url,
        })
      );
      const pokemonDetails = await Promise.all(
        basicPokemons.map(async (pokemon: { name: string; url: string }) => {
          const details = await getPokemon(pokemon.name);
          return mapPokemonDetails(details);
        })
      );
      setPokemons(pokemonDetails);
    } catch (error) {
      console.error("Error al cargar los Pokémon:", error);
    }
  };
  useEffect(() => {
    getPokemons();
  }, []);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 pt-8 pb-16 md:mb-8 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {pokemons.map((pokemon) => (
        <div
          key={pokemon.name}
          className={`rounded-lg shadow-md p-4 flex flex-col transition-transform hover:scale-105 relative ${getCardBackgroundClass(
            pokemon.types[0]?.name
          )}`}
        >
          <div className="flex justify-between items-center w-full mb-3">
            <p
              className={`text-lg font-bold capitalize ${getNameTypeClass(
                pokemon.types[0]?.name
              )}`}
            >
              {pokemon.name}
            </p>
            <span
              className={`text-gray-700 font-bold opacity-70 ${getNameTypeClass(
                pokemon.types[0]?.name
              )}`}
            >
              #{pokemon.id}
            </span>
          </div>
          <div className="flex flex-col h-full">
            <div className="bg-opacity-80 rounded-lg p-3 flex justify-end items-center mb-auto">
              <img
                src={pokemon.imageFront}
                alt={`Imagen de ${pokemon.name}`}
                className="w-full max-w-xs object-contain h-48"
              />
            </div>
            <TeamEditor pokemon={pokemon} />
          </div>
        </div>
      ))}
    </div>
  );
}
