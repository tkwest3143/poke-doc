import { pokemonType } from "./interface/pokemon";
import { pokemonMasterType } from "./interface/pokemonMaster";

export class Pokemon {
  constructor(private prop: pokemonType) {}
  get pokemonType() {
    return this.prop;
  }
  get nickname(): string {
    return this.prop.nickname;
  }
  get id(): string {
    return this.prop.id;
  }
  get level(): number {
    return this.prop.level;
  }
  get defeatedPokemon() {
    return this.prop.defeated_pokemon;
  }
  get effortValue(): {
    hp: number;
    attack: number;
    block: number;
    concentration: number;
    defense: number;
    speed: number;
  } {
    return this.prop.effort_value;
  }
  get viewName(): string {
    if (!this.prop.nickname) {
      return this.pokemonMaster.name;
    }
    return this.prop.nickname;
  }
  get viewImage(): string {
    if (this.pokemonMaster.image) {
      return this.pokemonMaster.image;
    }
    return "";
  }
  get pokemonMaster(): pokemonMasterType {
    return this.prop.pokemon_master;
  }
}
