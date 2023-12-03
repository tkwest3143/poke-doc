import { useEffect, useState } from "react";
import { Pokemon, SaveData, SeriesMaster } from "@/domain";
import { findSavedataOutput } from "@/domain/interface/api/findSavedata";
import { Loading } from "../../loading";
import SelectInput from "../../select";
import TextInput from "../../textInput";
import { useRouter } from "next/navigation";
import PokemonEditList from "./pokemonEditList";
import { seriesMasterType } from "@/domain/interface/seriesMaster";
import { invoke } from "@tauri-apps/api/tauri";

export default function SavedataForm(prop: { id?: number; nextUrl: string }) {
  const router = useRouter();
  const [saveData, setSaveData] = useState<SaveData | undefined>(undefined);
  const [seriesMasters, setSeriesMasters] = useState<SeriesMaster[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    if (prop.id) {
      invoke<findSavedataOutput>("get_savedata_with_all_series", {
        savedataId: prop.id,
      })
        .then((res) => {
          console.log(res);
          setSaveData(new SaveData(res.savedata));
          setSeriesMasters(
            res.all_series.map((series) => new SeriesMaster(series))
          );
        })
        .catch(console.error);
    } else {
      invoke<seriesMasterType[]>("get_all_series_master_list")
        .then((res) => {
          setSaveData(
            new SaveData({
              id: 0,
              name: "",
              pokemons: [],
              series: res.find((series) => series.id === 1),
            })
          );
          setSeriesMasters(res.map((series) => new SeriesMaster(series)));
        })
        .catch(console.error);
    }
  }, [prop]);

  if (errorMessage) {
  }
  if (!saveData) {
    return <Loading />;
  }

  const onChange = (data: {
    title?: string;
    version?: string;
    pokemons?: Pokemon[];
  }) => {
    const cloneSavedata = saveData;
    if (data.title !== undefined || data.title === "") {
      cloneSavedata.name = data.title;
    }
    if (data.version) {
      const series = seriesMasters.find((sm) => sm.id === Number(data.version));
      if (!series) {
        throw new Error("not found series");
      }
      cloneSavedata.series = series.seriesMasterType;
    }
    if (data.pokemons) {
      cloneSavedata.pokemonModels = data.pokemons;
      cloneSavedata.numberingIDOfPokemons();
    }
    setSaveData(
      new SaveData({
        id: cloneSavedata.id,
        name: cloneSavedata.name,
        series: cloneSavedata.series,
        pokemons: cloneSavedata.pokemons,
      })
    );
  };
  const handleSubmit = async () => {
    if (saveData.series) {
      try {
        saveData.numberingIDOfPokemons();
        if (prop.id) {
          await invoke<string>("save_savedata", {
            savedata: JSON.stringify({
              id: prop.id,
              name: saveData.name,
              series: saveData.series,
              pokemons: saveData.pokemons,
            }),
          });
        } else {
          await invoke<string>("add_savedata", {
            savedata: JSON.stringify({
              id: 0,
              name: saveData.name,
              series: saveData.series,
              pokemons: saveData.pokemons,
            }),
          });
        }

        router.push(prop.nextUrl);
      } catch (e) {
        setErrorMessage("エラーが発生しました");
      }
    } else {
      setErrorMessage("シリーズが選択されませんでした");
    }
  };
  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  return (
    <div className="space-y-4">
      <TextInput
        id="title"
        name="title"
        placeholder="任意のタイトルを入力"
        value={saveData.name}
        onChange={(e) => onChange({ title: e.target.value })}
      />
      <SelectInput
        id="version"
        name="version"
        placeholder="シリーズを選択"
        value={saveData.series ? saveData.series.id.toString() : "1"}
        onChange={(e) => onChange({ version: e.target.value })}
        options={seriesMasters.map((series) => {
          return {
            value: series.id.toString(),
            label: series.name,
          };
        })}
      />
      <PokemonEditList
        pokemons={saveData.pokemonModels}
        setPokemons={(pokemons) => onChange({ pokemons: pokemons })}
      />
      <button
        onClick={handleSubmit}
        className="w-full px-4 py-2 text-white bg-cyan-500 rounded-md hover:bg-cyan-600"
      >
        登録する
      </button>
    </div>
  );
}
