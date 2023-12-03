import { SaveData } from "@/domain";
import Image from "next/image";
import DeleteButton from "../../buttons/deleteButton";
import DetailButton from "../../buttons/detailButton";

export default function SavedataList({
  savedata,
  onDeleteSavedata,
}: {
  savedata: SaveData[];
  onDeleteSavedata: (id: number) => void;
}) {
  return (
    <div className="flex flex-col items-center justify-between p-24 bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        {savedata.map((saveData) => (
          <div
            key={saveData.name}
            className="bg-white p-6 rounded-lg shadow-lg border border-gray-200"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              タイトル: {saveData.name}
            </h2>{" "}
            <p className="text-gray-600 mb-3">
              シリーズ:{" "}
              <span className="font-semibold">{saveData.series?.name}</span>
            </p>
            <p className="text-gray-600 mb-1">
              ポケモン数:{" "}
              <span className="font-semibold">{saveData.pokemons.length}</span>
            </p>
            {saveData.getNPokemons(6).map((pokemon) => (
              <div
                key={pokemon.id}
                className="flex items-center space-x-4 p-2 bg-white shadow rounded-lg mb-3"
              >
                <Image
                  width={30}
                  height={30}
                  src={pokemon.viewImage ?? ""}
                  alt={pokemon.viewName}
                  className="h-16 w-16 object-cover rounded-full border-2 border-gray-300"
                />
                <span className="font-semibold text-gray-700">
                  {pokemon.viewName}
                </span>
              </div>
            ))}
            <div className="flex flex-col items-end space-y-2">
              <DetailButton href={`/savedata/detail?id=${saveData.id}`} />
              <DeleteButton onDelete={() => onDeleteSavedata(saveData.id)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
