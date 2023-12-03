import { apiAccess } from "@/helper/apiAccess";
import { natureMasterType } from "@/domain/interface/natureMaster";
import { pokeApiAccess, convertStatusValue, exportMasterFile } from "../helper";

export class NatureMasterRepository {
  constructor() {}

  async fetchAllNature(): Promise<void> {
    const data: natureMasterType[] = [];
    const results = (
      await pokeApiAccess<{
        results: {
          name: string;
          url: string;
        }[];
      }>("https://pokeapi.co/api/v2/nature?limit=100000&offset=0", "GET")
    ).results;
    console.log("start fetch nature master", `count = ${results.length}`);
    for (const result of results) {
      const nature = await apiAccess<{
        id: number;
        decreased_stat: {
          name: string;
          url: string;
        } | null;
        increased_stat: {
          name: string;
          url: string;
        } | null;
        names: {
          language: {
            name: string;
            url: string;
          };
          name: string;
        }[];
      }>(result.url, "GET");
      const lang = nature.names.find(
        (name) =>
          name.language.name === "ja" || name.language.name === "ja-Hrkt"
      );

      let increased_stat = nature.increased_stat
        ? convertStatusValue(nature.increased_stat.name)
        : undefined;

      let decreased_stat = nature.decreased_stat
        ? convertStatusValue(nature.decreased_stat.name)
        : undefined;

      if (lang) {
        data.push({
          id: nature.id,
          name: lang.name,
          increased_stat,
          decreased_stat,
        });
      }
    }

    exportMasterFile("natureMaster", data);
    console.log("complete fetch nature master!!");
  }
}
