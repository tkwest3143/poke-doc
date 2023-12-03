import {
  SeriesMasterRepository,
  PokemonMasterRepository,
  NatureMasterRepository,
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
  const natureMasterRepository = new NatureMasterRepository();
  const pokemonMasterRepository = new PokemonMasterRepository();
  await pokemonMasterRepository.fetchPokemonData();
  await seriesMasterRepository.fetchAllSeries();
  await natureMasterRepository.fetchAllNature();
};

importeMasterData()
  .then(() => {
    console.log("success import data");
  })
  .catch((e) => {
    console.error(e);
  })
  .finally(() => process.exit());
