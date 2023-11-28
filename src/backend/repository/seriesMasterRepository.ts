import { apiAccess } from "@/helper/apiAccess";
import { pokeApiAccess } from "../helper/pokeApiHandler";
import { exportMasterFile } from "../helper/exportMasterFile";
import { seriesMasterType } from "@/domain/interface/seriesMaster";

export class SeriesMasterRepository {
  constructor() {}

  async fetchAllSeries(): Promise<void> {
    const data: seriesMasterType[] = [];
    const results = (
      await pokeApiAccess<{
        results: {
          name: string;
          url: string;
        }[];
      }>("https://pokeapi.co/api/v2/version?limit=100000&offset=0", "GET")
    ).results;
    console.log("start fetch series master", `count = ${results.length}`);
    for (const result of results) {
      const generation = await apiAccess<{
        id: number;
        main_region: {
          name: string;
          url: string;
        };
        names: {
          language: {
            name: string;
            url: string;
          };
          name: string;
        }[];
      }>(result.url, "GET");
      const lang = generation.names.find(
        (name) =>
          name.language.name === "ja" || name.language.name === "ja-Hrkt"
      );
      if (lang) {
        data.push({
          id: generation.id,
          name: lang.name,
          max_effort_value: 510,
          max_individual_value: 31,
        });
      }
    }

    exportMasterFile("seriesMaster", data);
    console.log("complete fetch series master!!");
  }
}
