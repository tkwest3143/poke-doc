import { pokemonMasterType } from "@/domain/interface/pokemonMaster";
import { downloadImage, exportMasterFile, pokeApiAccess } from "../helper";
export class PokemonMasterRepository {
  async fetchPokemonData() {
    const results = (
      await pokeApiAccess<{
        count: number;
        results: {
          name: string;
          url: string;
        }[];
      }>("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0", "GET")
    ).results;
    console.log("start fetch pokemon master", `count = ${results.length}`);
    const unitLength = results.length / 3;
    const firstPokekmons = results.slice(0, unitLength);
    const secondPokekmons = results.slice(unitLength, unitLength + unitLength);
    const threePokekmons = results.slice(
      unitLength + unitLength,
      results.length
    );
    console.log(
      `firstPokekmons = ${firstPokekmons.length} , last_name = ${
        firstPokekmons[firstPokekmons.length - 1].name
      }`,
      `secondPokekmons = ${secondPokekmons.length} , first_name = ${
        secondPokekmons[0].name
      } last_name = ${secondPokekmons[secondPokekmons.length - 1].name}`,
      `threePokekmons = ${threePokekmons.length} , first_name = ${threePokekmons[0].name}`,
      `allCount = ${
        firstPokekmons.length + secondPokekmons.length + threePokekmons.length
      }`
    );
    const [firstPokekmonsMaster, secondPokekmonsMaster, threePokekmonsMaster] =
      await Promise.all([
        this.fetchTargetPokemonItems(firstPokekmons),
        this.fetchTargetPokemonItems(secondPokekmons),
        this.fetchTargetPokemonItems(threePokekmons),
      ]);
    const data: pokemonMasterType[] = [
      ...firstPokekmonsMaster,
      ...secondPokekmonsMaster,
      ...threePokekmonsMaster,
    ];
    data.sort((a, b) => Number(a.id) - Number(b.id));
    console.log("start export master file");
    exportMasterFile("pokemonMaster", data);

    console.log("complete fetch pokemon master!!");
  }
  private async fetchTargetPokemonItems(
    results: { name: string; url: string }[]
  ): Promise<pokemonMasterType[]> {
    const pokemonMasters: pokemonMasterType[] = [];
    for (const result of results) {
      const pokemon = await pokeApiAccess<{
        count: number;
        id: number;
        order: number;
        stats: {
          base_stat: number;
          effort: number;
          stat: {
            name: string;
          };
        }[];
        species: {
          url: string;
        };
        types: {
          type: { name: string; url: string };
        }[];
        forms: {
          url: string;
        }[];
        sprites: {
          front_default?: string;
          front_shiny?: string;
          other: {
            "official-artwork": {
              front_default?: string;
              front_shiny?: string;
            };
          };
        };
      }>(result.url, "GET");
      const [form, speacies] = await Promise.all([
        pokeApiAccess<{
          is_battle_only: boolean;
        }>(pokemon.forms[0].url, "GET"),
        pokeApiAccess<{
          names: {
            language: {
              name: string;
              url: string;
            };
            name: string;
          }[];
        }>(pokemon.species.url, "GET"),
      ]);
      if (form.is_battle_only) {
        continue;
      }
      const lang = speacies.names.find((name) => name.language.name === "ja");
      const hp = pokemon.stats.find((stat) => stat.stat.name === "hp");
      const attack = pokemon.stats.find((stat) => stat.stat.name === "attack");
      const defense = pokemon.stats.find(
        (stat) => stat.stat.name === "defense"
      );
      const specialAttack = pokemon.stats.find(
        (stat) => stat.stat.name === "special-attack"
      );
      const specialDefense = pokemon.stats.find(
        (stat) => stat.stat.name === "special-defense"
      );
      const speed = pokemon.stats.find((stat) => stat.stat.name === "speed");
      if (lang) {
        const getEffortValue = {
          hp: hp ? hp.effort : 0,
          attack: attack ? attack.effort : 0,
          block: defense ? defense.effort : 0,
          concentration: specialAttack ? specialAttack.effort : 0,
          defense: specialDefense ? specialDefense.effort : 0,
          speed: speed ? speed.effort : 0,
        };
        const base_stats = {
          hp: hp ? hp.base_stat : 0,
          attack: attack ? attack.base_stat : 0,
          block: defense ? defense.base_stat : 0,
          concentration: specialAttack ? specialAttack.base_stat : 0,
          defense: specialDefense ? specialDefense.base_stat : 0,
          speed: speed ? speed.base_stat : 0,
        };
        let image = pokemon.sprites.front_default
          ? await downloadImage(
              pokemon.sprites.front_default,
              pokemon.id.toString(),
              { directoryName: "pokemons", isNotUpdateImage: true }
            )
          : undefined;
        if (!image) {
          image = pokemon.sprites.other["official-artwork"].front_default
            ? await downloadImage(
                pokemon.sprites.other["official-artwork"].front_default,
                pokemon.id.toString(),
                { directoryName: "pokemons", isNotUpdateImage: true }
              )
            : "";
        }

        const pokemonMaster = {
          name: lang.name,
          image,
          order: pokemon.order === -1 ? 99999 : pokemon.order,
          types: pokemon.types.map((type) => type.type.name),
        };

        pokemonMasters.push({
          id: pokemon.id.toString(),
          ...pokemonMaster,
          get_effort_value: {
            ...getEffortValue,
          },
          base_stats,
        });
      }
    }
    return pokemonMasters;
  }
}
