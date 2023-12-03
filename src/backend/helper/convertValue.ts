export const convertStatusValue = (pokeApiValue: string) => {
  if (pokeApiValue === "special-attack") {
    return "concentration";
  }
  if (pokeApiValue === "special-defense") {
    return "defense";
  }
  return pokeApiValue;
};
