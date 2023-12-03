import { z } from "zod";

export const pokemonMasterValidaror = {
  id: z.string(),
  name: z.string(),
  image: z.string(),
  get_effort_value: z.object({
    hp: z.number(),
    attack: z.number(),
    block: z.number(),
    concentration: z.number(),
    defense: z.number(),
    speed: z.number(),
  }),
};

export type pokemonMasterType = {
  id: string;
  name: string;
  image: string;
  types: string[];
  get_effort_value: {
    hp: number;
    attack: number;
    block: number;
    concentration: number;
    defense: number;
    speed: number;
  };
  base_stats: {
    hp: number;
    attack: number;
    block: number;
    concentration: number;
    defense: number;
    speed: number;
  };
};
