import { useTeamPokemonStore } from "../store/teamStore";
import type { Pokemon } from "../types/pokemonTypes";
import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";

interface TeamEditorProps {
  pokemon: Pokemon;
}

export function TeamEditor({ pokemon }: TeamEditorProps) {
  const teamPokemon = useTeamPokemonStore();
  const isTeamPokemon = useTeamPokemonStore((state) =>
    state.isInTeamPokemons(pokemon)
  );
  const isTeamFull = teamPokemon.teamPokemons.length >= 6;
  const handleClick = () => {
    if (!isTeamFull || isTeamPokemon) {
      toggleTeam(pokemon);
    }
  };

  const cardClasses =
    isTeamFull && !isTeamPokemon
      ? "opacity-50 cursor-not-allowed"
      : "cursor-pointer";

  const toggleTeam = (pokemon: Pokemon) => {
    if (isTeamPokemon) {
      teamPokemon.removeTeamPokemons(pokemon);
    } else {
      teamPokemon.addTeamPokemons(pokemon);
    }
  };
  const tooltipText =
    isTeamFull && !isTeamPokemon
      ? "Team is full,\nremove a Pokémon\nfrom the team"
      : isTeamPokemon
      ? "Remove from team"
      : "Add to team";

  return (
    <div className="flex justify-end items-center group relative">
      <div className="flex flex-wrap gap-2">
        <span
          className={`px-3 py-1 text-sm rounded-full font-medium group relative ${cardClasses}`}
        >
          {isTeamPokemon ? (
            <HeartIconSolid
              onClick={handleClick}
              className="w-6 h-6 text-red-500"
            />
          ) : (
            <HeartIconOutline
              onClick={handleClick}
              className="w-6 h-6 text-gray-400"
            />
          )}
          <span className="absolute -top-15 left-1/2 transform -translate-x-1/2 bg-stone-600 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-pre-line">
            {tooltipText}
          </span>
        </span>
      </div>
    </div>
  );
}
