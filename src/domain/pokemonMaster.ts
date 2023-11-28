import { pokemonType } from "./interface/pokemon";
import { pokemonMasterType } from "./interface/pokemonMaster";

export class PokemonMaster {
  constructor(private prop: pokemonMasterType) {}
  get pokemonMasterType() {
    return this.prop;
  }
  get name(): string {
    return this.prop.name;
  }
  get id(): string {
    return this.prop.id;
  }
  get viewImage() {
    if (this.prop.image) {
      return this.prop.image;
    }
    return "";
  }
}
