import { useEffect, useState } from "react";
import { SaveData } from "@/domain";
import { Loading } from "@/components/items/loading";
import PokemonList from "@/components/items/pokemon/detail/pokemonList";
import EditButton from "@/components/items/buttons/editButton";
import CreateSavedataButton from "@/components/items/buttons/createSaveDataButton";
import { invoke } from "@tauri-apps/api/tauri";
import { SavedataType } from "@/domain/interface/savedata";

export default function SaveDataDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [saveDataList, setSaveDataList] = useState<SaveData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    setIsLoading(true);
    invoke("get_savedata", {
      savedataId: Number(params.id),
    })
      .then((res) => {
        setSaveDataList(new SaveData(res as SavedataType));
      })
      .catch((e) => setErrorMessage(e.error_message))
      .finally(() => setIsLoading(false));
  }, [params.id]);
  if (isLoading || saveDataList === null) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white shadow-lg rounded-lg border border-gray-200">
        <h2 className="text-2xl font-bold text-center mb-4">所持ポケモン</h2>

        <PokemonList pokemons={saveDataList.pokemonModels} />
      </div>

      <div className="mt-6 p-6 bg-white shadow-lg rounded-lg">
        <EditButton
          href={`/savedata/create?id=${params.id}`}
          className="mb-6"
        />
        <CreateSavedataButton />
      </div>
    </div>
  );
}
