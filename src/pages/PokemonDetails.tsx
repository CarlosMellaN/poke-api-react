import { PlayIcon } from "@heroicons/react/24/solid";
import {
  getCardBackgroundClass,
  getTypeClass,
  getNameTypeClass,
} from "../utils/pokemonBackGroundColors.ts";
import { Pokemon, PokemonSpecies } from "../types/pokemonTypes";
import {
  getPokemon,
  getPokemonSpecies,
  getEvolutionChainLink,
} from "../services/pokemonServices";
import {
  mapPokemonDetails,
  mapPokemonSpecies,
  mapEvolutionChain,
} from "../utils/pokemonBasics";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import PokemonChart from "../components/PokemonChart.tsx";
import EvolvesChain from "../components/EvolvesChain.tsx";
import TeamEditor from "../components/TeamEditor";

const PokemonDetails = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [pokemonSpecies, setPokemonSpecies] = useState<PokemonSpecies | null>(
    null
  );
  const { id } = useParams<{ id: string }>();
  const playCry = (pokemon: Pokemon) => {
    const cryUrl = `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${pokemon.id}.ogg`;
    const audio = new Audio(cryUrl);
    audio.play();
  };
  const [evolutionChainData, setEvolutionChainData] = useState<{
    evolveInitial: string | null;
    evolveNext: string | null;
    evolveFinal: string | null;
  } | null>(null);
  const [pokemonStageOne, setPokemonStageOne] = useState<Pokemon | null>(null);
  const [pokemonStageTwo, setPokemonStageTwo] = useState<Pokemon | null>(null);
  const [pokemonStageThree, setPokemonStageThree] = useState<Pokemon | null>(
    null
  );
  const fetchEvolutionData = async (evolutionChainUrl: string) => {
    try {
      const idEvolutionChain = evolutionChainUrl.split("/").slice(-2)[0];
      const evolutionChainResponse = await getEvolutionChainLink(
        idEvolutionChain
      );
      setEvolutionChainData(mapEvolutionChain(evolutionChainResponse));
    } catch (error) {
      console.error("Error fetching evolution chain data:", error);
      setEvolutionChainData(null);
    }
  };

  const fetchEvolutionStages = async (
    evolutionData: {
      evolveInitial: string | null;
      evolveNext: string | null;
      evolveFinal: string | null;
    } | null
  ) => {
    if (evolutionData) {
      setPokemonStageOne(
        evolutionData.evolveInitial
          ? await getPokemon(evolutionData.evolveInitial)
          : null
      );
      setPokemonStageTwo(
        evolutionData.evolveNext
          ? await getPokemon(evolutionData.evolveNext)
          : null
      );
      setPokemonStageThree(
        evolutionData.evolveFinal
          ? await getPokemon(evolutionData.evolveFinal)
          : null
      );
    } else {
      setPokemonStageOne(null);
      setPokemonStageTwo(null);
      setPokemonStageThree(null);
    }
  };

  const getPokemonDetails = async (id: string) => {
    try {
      setLoading(true);
      const pokemonDetails = await getPokemon(id);
      const pokemonSpeciesDetails = await getPokemonSpecies(id);

      setPokemon(mapPokemonDetails(pokemonDetails));
      setPokemonSpecies(mapPokemonSpecies(pokemonSpeciesDetails));
      await fetchEvolutionData(pokemonSpeciesDetails.evolution_chain.url);
    } catch (error) {
      console.error("Error fetching Pokémon details:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (id) {
      getPokemonDetails(id);
    }
  }, [id]);
  useEffect(() => {
    fetchEvolutionStages(evolutionChainData);
  }, [evolutionChainData]);
  if (loading) {
    return <div className="text-center py-8">Loading Pokémon...</div>;
  }
  if (!pokemon) {
    return <div className="text-center py-8">Can't find Pokémon</div>;
  }
  return (
    <>
      <div
        className={`grid grid-cols-1 pt-8 lg:mt-4 pb-16 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 rounded-lg shadow-md p-4 ${getCardBackgroundClass(
          pokemon.types[0]?.name
        )}`}
      >
        <div className="flex justify-between items-center mb-1">
          <div className="flex items-center gap-2">
            <p
              className={`text-lg font-bold capitalize ${getNameTypeClass(
                pokemon.types[0]?.name
              )}`}
            >
              {pokemon.name}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => playCry(pokemon)}>
              <PlayIcon className="size-6 text-indigo-400" aria-hidden="true" />
            </button>
            <TeamEditor pokemon={pokemon} />
            <span
              className={`font-bold opacity-70 ${getNameTypeClass(
                pokemon.types[0]?.name
              )}`}
            >
              #{pokemon.id}
            </span>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="bg-opacity-80 rounded-lg p-3 flex justify-center items-center flex-1 flex-col gap-4 order-1 md:order-2">
            <div className="w-full flex justify-center gap-2">
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
            <img
              src={pokemon.imageFront}
              alt={pokemon.name}
              className="w-full max-w-xs object-contain h-48"
            />
            <div className="w-full flex justify-center gap-2">
              <span
                className={`px-3 py-1 text-sm font-black ${getNameTypeClass(
                  pokemon.types[0].name
                )}`}
              >
                height: {pokemon.height}
              </span>
              <span
                className={`px-3 py-1 text-sm font-black ${getNameTypeClass(
                  pokemon.types[0].name
                )}`}
              >
                weight: {pokemon.weight}
              </span>
            </div>
            <div className="w-full max-w-lg mx-auto">
              <p className="text-sm text-gray-600">
                {pokemonSpecies?.description || "No description available."}
              </p>
            </div>
          </div>
          <div className="w-full max-w-lg mx-auto flex-1 order-2 md:order-1">
            <PokemonChart stats={pokemon.stats} />
          </div>
        </div>
      </div>
      <div className="border-t border-gray-300 my-4"></div>
      <EvolvesChain
        pokemonStageOne={pokemonStageOne}
        pokemonStageTwo={pokemonStageTwo}
        pokemonStageThree={pokemonStageThree}
        pokemonTypes={pokemon.types}
      />
    </>
  );
};

export default PokemonDetails;
