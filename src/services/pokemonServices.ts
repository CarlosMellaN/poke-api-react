import axios, { type AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
  headers: {
    "Content-type": "application/json",
  },
});

// export const getAllPokemons = async (limit: number, offset: number) => {
export const getAllPokemons = async () => {
  try {
    const response = await apiClient.get(`pokemon?limit=151&offset=0`);
    return response.data;
  } catch (error) {
    console.error("Error fetching pokemons:", error);
    throw error;
  }
};

export const getPokemon = async (id: string) => {
  try {
    const response = await apiClient.get(`pokemon/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching pokemon:", error);
    throw error;
  }
};

export const getPokemonSpecies = async (id: string) => {
  try {
    const response = await apiClient.get(`pokemon-species/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching pokemon species:", error);
    throw error;
  }
};

export const getEvolutionChainLink = async (id: string) => {
  try {
    const response = await apiClient.get(`evolution-chain/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching evolution chain:", error);
    throw error;
  }
};

export default apiClient;
