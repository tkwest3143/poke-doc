import {
  SeriesMasterRepository,
  PokemonMasterRepository,
} from "@/backend/repository";
import * as dotenv from "dotenv";
const importeMasterData = async () => {
  dotenv.config();
  process.stdin.resume();
  process.stdin.setEncoding("utf-8");
  let arg = "";
  process.stdin.on("data", (d) => {
    arg += d;
  });

  const seriesMasterRepository = new SeriesMasterRepository();
  const pokemonMasterRepository = new PokemonMasterRepository();
  await pokemonMasterRepository.fetchPokemonData();
  await seriesMasterRepository.fetchAllSeries();
};

importeMasterData()
  .then(() => {
    console.log("success import data");
  })
  .catch((e) => {
    console.error(e);
  })
  .finally(() => process.exit());
