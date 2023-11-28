import { pokemonType } from "./pokemon";
import { seriesMasterType } from "./seriesMaster";

export type SavedataType = {
  id: number;
  name: string;
  series?: seriesMasterType;
  pokemons: pokemonType[];
};
