export function getCardBackgroundClass(type: string) {
  const bgClasses: { [key: string]: string } = {
    fire: "bg-red-100",
    water: "bg-blue-100",
    grass: "bg-green-100",
    electric: "bg-yellow-100",
    psychic: "bg-pink-100",
    poison: "bg-purple-100",
    bug: "bg-lime-100",
    flying: "bg-indigo-100",
    fighting: "bg-red-200",
    normal: "bg-gray-200",
    ground: "bg-yellow-200",
    rock: "bg-yellow-200",
    ghost: "bg-purple-200",
    ice: "bg-blue-100",
    dragon: "bg-indigo-200",
    fairy: "bg-pink-200",
    default: "bg-gray-200",
  };

  return bgClasses[type.toLowerCase()] || bgClasses.default;
}

export function getTypeClass(type: string) {
  const typeClasses: { [key: string]: string } = {
    fire: "bg-red-500 text-white",
    water: "bg-blue-500 text-white",
    grass: "bg-green-500 text-white",
    electric: "bg-yellow-400 text-white",
    psychic: "bg-pink-500 text-white",
    poison: "bg-purple-500 text-white",
    bug: "bg-lime-500 text-white",
    flying: "bg-indigo-300 text-white",
    fighting: "bg-red-700 text-white",
    normal: "bg-gray-400 text-white",
    ground: "bg-yellow-600 text-white",
    rock: "bg-yellow-800 text-white",
    ghost: "bg-purple-700 text-white",
    ice: "bg-blue-200 text-white",
    dragon: "bg-indigo-600 text-white",
    fairy: "bg-pink-300 text-white",
    default: "bg-gray-300 text-white",
  };

  return typeClasses[type.toLowerCase()] || typeClasses.default;
}

export function getNameTypeClass(type: string) {
  const typeClasses: { [key: string]: string } = {
    fire: "text-red-500",
    water: "text-blue-500",
    grass: "text-green-500",
    electric: "text-yellow-400",
    psychic: "text-pink-500",
    poison: "text-purple-500",
    bug: "text-lime-500",
    flying: "text-indigo-300",
    fighting: "text-red-700",
    normal: "text-gray-400",
    ground: "text-yellow-600",
    rock: "text-yellow-800",
    ghost: "text-purple-700",
    ice: "text-blue-200",
    dragon: "text-indigo-600",
    fairy: "text-pink-300",
    default: "text-gray-300",
  };

  return typeClasses[type.toLowerCase()] || typeClasses.default;
}
