import type { Pokemon, PokemonSpecies, EvolutionChainLink } from "@/types/pokemonTypes";

export function mapPokemonDetails(pokemonData: any): Pokemon {
  const mappedPokemon = {
    name: pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1),
    id: pokemonData.id,
    url: pokemonData.species?.url || "",
    imageFront: pokemonData.sprites?.front_default || "",
    imageBack: pokemonData.sprites?.back_default || "",
    cries: pokemonData.cries.latest,
    types: pokemonData.types.map((type: { type: { name: string } }) => ({
      name: type.type.name,
    })),
    height: pokemonData.height,
    weight: pokemonData.weight,
    stats: pokemonData.stats.map((stat: { base_stat: number; stat: { name: string } }) => ({
      base_stat: stat.base_stat,
      stat: { name: stat.stat.name },
    })),
  };

  return mappedPokemon;
}

export function mapPokemonSpecies(pokemonSpeciesData: any): PokemonSpecies {
  const mappedPokemonSpecies = {
    name: pokemonSpeciesData.name,
    id: pokemonSpeciesData.id,
    description: pokemonSpeciesData.flavor_text_entries
      .find((entry: { language: { name: string } }) => entry.language.name === "en")
      .flavor_text.replace(/\f/g, "\n"),
    evolutionChain: pokemonSpeciesData.evolution_chain.url,
  };

  return mappedPokemonSpecies;
}

export function mapEvolutionChain(EvolutionChainLinkData: any): EvolutionChainLink {
  const mappedEvolutionChain = {
    evolveInitial: EvolutionChainLinkData.chain.species?.name || "",
    evolveNext: EvolutionChainLinkData.chain.evolves_to[0]?.species?.name || "",
    evolveFinal: EvolutionChainLinkData.chain.evolves_to[0].evolves_to[0]?.species?.name || "",
    id: EvolutionChainLinkData.id,
  };

  return mappedEvolutionChain;
}
