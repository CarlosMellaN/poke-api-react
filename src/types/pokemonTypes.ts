export interface Pokemon {
  name: string;
  id: number;
  url: string;
  imageFront: string;
  imageBack: string;
  cries: string;
  types: { name: string }[];
  height: number;
  weight: number;
  stats: { base_stat: number; stat: { name: string } }[];
}

export interface PokemonSpecies {
  name: string;
  id: number;
  description: { flavor_text: string };
  evolutionChain: { url: string };
}

export interface EvolutionChainLink {
  evolveInitial: string;
  evolveFinal: string;
  evolveNext: string;
  id: number;
}
