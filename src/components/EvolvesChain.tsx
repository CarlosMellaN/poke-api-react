import { Pokemon } from "../types/pokemonTypes";
import { getNameTypeClass } from "../utils/pokemonBackGroundColors.ts";

interface EvolvesChainProps {
  pokemonStageOne: Pokemon | null;
  pokemonStageTwo: Pokemon | null;
  pokemonStageThree: Pokemon | null;
  pokemonTypes: Pokemon["types"] | undefined;
}

const EvolvesChain = ({
  pokemonStageOne,
  pokemonStageTwo,
  pokemonStageThree,
  pokemonTypes,
}: EvolvesChainProps) => {
  console.log(
    "pokemonStageOne",
    pokemonStageOne,
    "pokemonStageTwo",
    pokemonStageTwo,
    "pokemonStageThree",
    pokemonStageThree
  );
  return (
    <div className="p-4 mt-2">
      <h2
        className={`text-2xl font-bold text-center mb-6 ${getNameTypeClass(
          pokemonTypes?.[0]?.name
        )}`}
      >
        Evolution Chain
      </h2>
      <div className="flex flex-col md:flex-row justify-around items-center gap-6">
        {pokemonStageOne && (
          <div className="flex flex-col items-center transition-shadow">
            {pokemonStageOne.imageFront && (
              <img
                src={pokemonStageOne.imageFront}
                alt={pokemonStageOne.name}
                className="w-32 h-32 object-contain"
              />
            )}
            <p
              className={`mt-2 text-lg font-semibold text-gray-800 ${getNameTypeClass(
                pokemonTypes?.[0]?.name
              )}}`}
            >
              {pokemonStageOne.name}
            </p>
          </div>
        )}

        {pokemonStageTwo && (
          <div className="flex flex-col items-center transition-shadow">
            {pokemonStageTwo.imageFront && (
              <img
                src={pokemonStageTwo.imageFront}
                alt={pokemonStageTwo.name}
                className="w-32 h-32 object-contain"
              />
            )}
            <p
              className={`mt-2 text-lg font-semibold text-gray-800 ${getNameTypeClass(
                pokemonTypes?.[0]?.name
              )}}`}
            >
              {pokemonStageTwo.name}
            </p>
          </div>
        )}

        {pokemonStageThree && (
          <div className="flex flex-col items-center transition-shadow">
            {pokemonStageThree.imageFront && (
              <img
                src={pokemonStageThree.imageFront}
                alt={pokemonStageThree.name}
                className="w-32 h-32 object-contain"
              />
            )}
            <p
              className={`mt-2 text-lg font-semibold text-gray-800 ${getNameTypeClass(
                pokemonTypes?.[0]?.name
              )}}`}
            >
              {pokemonStageThree.name}
            </p>
          </div>
        )}

        {!pokemonStageOne && !pokemonStageTwo && !pokemonStageThree && (
          <p className="text-gray-500">No evolution data available.</p>
        )}
      </div>
    </div>
  );
};

export default EvolvesChain;
