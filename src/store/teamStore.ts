import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";
import type { Pokemon } from "../types/pokemonTypes";
interface TeamPokemonState {
  teamPokemons: Pokemon[];
  addTeamPokemons: (pokemon: Pokemon) => void;
  removeTeamPokemons: (pokemon: Pokemon) => void;
  isInTeamPokemons: (pokemon: Pokemon) => boolean;
}

export const useTeamPokemonStore = create<TeamPokemonState>()(
  devtools(
    persist(
      (set, get) => ({
        teamPokemons: [],
        addTeamPokemons: (pokemon: Pokemon) =>
          set((state) => {
            if (state.teamPokemons.length >= 6) return state;
            return {
              teamPokemons: [...state.teamPokemons, pokemon],
            };
          }),
        removeTeamPokemons: (pokemon: Pokemon) =>
          set((state) => ({
            teamPokemons: state.teamPokemons.filter(
              (p) => p.name !== pokemon.name
            ),
          })),
        isInTeamPokemons: (pokemon: Pokemon) => {
          return get().teamPokemons.some((p) => p.name === pokemon.name);
        },
      }),
      {
        name: "teamPokemons", // nombre de la clave en el localStorage
        storage: createJSONStorage(() => localStorage), // donde se almacenará (localStorage por defecto)
        // Opcional: puedes especificar qué partes del estado quieres persistir
        partialize: (state) => ({ teamPokemons: state.teamPokemons }),
      }
    ),
    { name: "teamPokemons" }
  )
);
// console.log(useTeamPokemonStore.getState().teamPokemons);
