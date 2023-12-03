import { pokemonType } from "./interface/pokemon";
import { SavedataType } from "./interface/savedata";
import { seriesMasterType } from "./interface/seriesMaster";
import { Pokemon } from "./pokemon";

export class SaveData {
  constructor(private prop: SavedataType) {}
  get id() {
    return this.prop.id;
  }
  set name(val: string) {
    this.prop.name = val;
  }
  get name() {
    return this.prop.name;
  }
  set pokemons(val: pokemonType[]) {
    this.prop.pokemons = val;
  }
  get pokemons() {
    return this.prop.pokemons;
  }
  set pokemonModels(val: Pokemon[]) {
    this.prop.pokemons = val.map((pokemon) => pokemon.pokemonType);
  }
  get pokemonModels() {
    return this.pokemons.map((pokemon) => new Pokemon(pokemon));
  }
  set series(val: seriesMasterType | undefined) {
    this.prop.series = val;
  }
  get series() {
    return this.prop.series;
  }

  getNPokemons(n: number): Pokemon[] {
    const result: Pokemon[] = [];
    for (let i = 0; i < n; i++) {
      if (!this.pokemonModels[i]) {
        break;
      }
      result.push(this.pokemonModels[i]);
    }
    return result;
  }

  numberingIDOfPokemons(): void {
    this.prop.pokemons = this.prop.pokemons.map(
      (pokemon, index): pokemonType => ({
        ...pokemon,
        id: `${this.id}_${index}`,
      })
    );
  }
}
