import { SavedataType } from "../savedata";
import { seriesMasterType } from "../seriesMaster";

export type findSavedataOutput = {
  savedata: SavedataType;
  all_series: seriesMasterType[];
};

export type findAllSavedataOutput = {
  savedatas: SavedataType[];
};
