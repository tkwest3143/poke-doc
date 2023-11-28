import { z } from "zod";
import { pokemonMasterType, pokemonMasterValidaror } from "./pokemonMaster";

export const pokemonTypeValidator = {
  nickname: z.string(),
  id: z.number(),
  level: z.number(),
  pokemon_master: z.object(pokemonMasterValidaror),
  defeated_pokemon: z.array(
    z.object({
      pokemon_master: z.object(pokemonMasterValidaror),
      defeated_count: z.number(),
    })
  ),
  effort_value: z.object({
    hp: z.number(),
    attack: z.number(),
    block: z.number(),
    concentration: z.number(),
    defense: z.number(),
    speed: z.number(),
  }),
  individual_value: z.object({
    hp: z.number(),
    attack: z.number(),
    block: z.number(),
    concentration: z.number(),
    defense: z.number(),
    speed: z.number(),
  }),
};

export type pokemonType = {
  nickname: string;
  id: string;
  level: number;
  pokemon_master: pokemonMasterType;
  defeated_pokemon: {
    pokemon_master: pokemonMasterType;
    defeated_count: number;
  }[];
  effort_value: {
    hp: number;
    attack: number;
    block: number;
    concentration: number;
    defense: number;
    speed: number;
  };
  individual_value: {
    hp: number;
    attack: number;
    block: number;
    concentration: number;
    defense: number;
    speed: number;
  };
};
