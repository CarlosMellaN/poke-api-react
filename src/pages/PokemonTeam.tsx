import { NavLink } from "react-router-dom";
import TeamEditor from "../components/TeamEditor";
import PokemonChart from "../components/PokemonChart";
import { PlayIcon } from "@heroicons/react/24/solid";
import {
  getCardBackgroundClass,
  getNameTypeClass,
  getTypeClass,
} from "../utils/pokemonBackGroundColors.ts";
import { useTeamPokemonStore } from "../store/teamStore";
import { Pokemon } from "../types/pokemonTypes";

const PokemonTeam = () => {
  const teamPokemon = useTeamPokemonStore();
  const playCry = (pokemon: Pokemon) => {
    const cryUrl = `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${pokemon.id}.ogg`;
    const audio = new Audio(cryUrl);
    audio.play();
  };
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 pt-8 pb-16 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {teamPokemon.teamPokemons.length === 0 ? (
          <div className="col-span-full text-center py-16">
            <p className="text-2xl font-bold text-gray-800 mb-4">
              No Pokémon in your team yet!
            </p>
            <p className="text-lg text-gray-600 mb-8">
              Start adding Pokémon to your team to see them here.
            </p>
            <NavLink
              to="/"
              className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-colors"
            >
              Explore Pokémon
            </NavLink>
          </div>
        ) : (
          <>
            {teamPokemon.teamPokemons.map((pokemon) => (
              // Use the Pokemon type for better type safety
              <div
                key={pokemon.name}
                className={`rounded-lg shadow-md p-4 flex flex-col transition-transform hover:scale-105 relative mb-8 ${getCardBackgroundClass(
                  pokemon.types[0]?.name
                )}`}
              >
                <NavLink to={`/team/${pokemon.id}`}>
                  <div className="flex justify-between items-center w-full mb-1">
                    <p
                      className={`text-lg font-bold capitalize ${getNameTypeClass(
                        pokemon.types[0]?.name
                      )}`}
                    >
                      {pokemon.name}
                    </p>
                    <span
                      className={`text-gray font-bold opacity-70 ${getNameTypeClass(
                        pokemon.types[0]?.name
                      )}`}
                    >
                      #{pokemon.id}
                    </span>
                  </div>
                  <div className="flex flex-col h-full">
                    <div className="bg-opacity-80 rounded-lg p-3 flex justify-end items-center mb-1">
                      <img
                        src={pokemon.imageFront}
                        alt={pokemon.name}
                        className="w-full max-w-xs object-contain h-48"
                      />
                    </div>
                    <div className="w-full max-w-lg mx-auto mb-4">
                      <PokemonChart stats={pokemon.stats} />
                    </div>
                  </div>
                </NavLink>
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-2">
                  <div className="w-full md:w-1/2 flex gap-2">
                    {pokemon.types.map((type) => (
                      <span
                        key={type.name}
                        className={`px-3 py-1 text-sm rounded-full font-medium ${getTypeClass(
                          type.name
                        )}`}
                      >
                        {type.name}
                      </span>
                    ))}
                  </div>
                  <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                    <button onClick={() => playCry(pokemon)}>
                      <PlayIcon
                        className="size-6 text-indigo-400"
                        aria-hidden="true"
                      />
                    </button>
                    <TeamEditor pokemon={pokemon} />
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default PokemonTeam;
