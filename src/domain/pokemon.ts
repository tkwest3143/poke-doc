import { natureMasterType } from "./interface/natureMaster";
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
  get individualValue(): {
    hp: number;
    attack: number;
    block: number;
    concentration: number;
    defense: number;
    speed: number;
  } {
    return this.prop.individual_value;
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
  get nature(): natureMasterType | undefined {
    return this.prop.nature;
  }

  getAllEffortValue(type: keyof typeof this.effortValue): number {
    const targetValue = this.effortValue[type];
    const defeatedPokemonValue = this.defeatedPokemon
      .map((p) => p.pokemon_master.get_effort_value[type] * p.defeated_count)
      .reduce((prev, current) => prev + current, 0);
    return targetValue + defeatedPokemonValue;
  }
  get allEffortValueToStatusValue() {
    return {
      hp: this.getAllEffortValue("hp"),
      attack: this.getAllEffortValue("attack"),
      block: this.getAllEffortValue("block"),
      concentration: this.getAllEffortValue("concentration"),
      defense: this.getAllEffortValue("defense"),
      speed: this.getAllEffortValue("speed"),
    };
  }

  get allStatusValueToStatusValue() {
    return {
      hp: this.getCalculateStatus("hp"),
      attack: this.getCalculateStatus("attack"),
      block: this.getCalculateStatus("block"),
      concentration: this.getCalculateStatus("concentration"),
      defense: this.getCalculateStatus("defense"),
      speed: this.getCalculateStatus("speed"),
    };
  }
  getCalculateStatus(type: keyof typeof this.individualValue) {
    if (type === "hp") {
      return Math.floor(
        Math.floor(
          Math.floor(
            this.pokemonMaster.base_stats.hp * 2 +
              this.individualValue.hp +
              this.getAllEffortValue(type) / 4
          ) *
            (this.level / 100)
        ) +
          10 +
          this.level
      );
    } else {
      const increase = this.nature ? this.nature.increased_stat : undefined;
      const decrease = this.nature ? this.nature.decreased_stat : undefined;

      let personalityCorrection = 1.0;
      if (increase !== undefined && !decrease) {
        personalityCorrection = 1.1;
      } else if (!increase !== undefined && decrease !== undefined) {
        personalityCorrection = 0.9;
      }
      return Math.floor(
        Math.floor(
          Math.floor(
            this.pokemonMaster.base_stats[type] * 2 +
              this.individualValue[type] +
              this.getAllEffortValue(type) / 4
          ) *
            (this.level / 100) +
            5
        ) * personalityCorrection
      );
    }
  }
}
