import { PokemonMaster } from "@/domain/pokemonMaster";
import SelectPokemonMaster from "./selectPokemonMaster";
import AddButton from "./items/buttons/addButton";
import { useState } from "react";

interface SelectPokemonMasterDialogProps {
  buttonText?: string;
  selectPokemonMaster: (value: PokemonMaster) => void;
}

export default function SelectPokemonMasterDialog({
  buttonText,
  selectPokemonMaster,
}: SelectPokemonMasterDialogProps) {
  const [showModal, setShowModal] = useState(false);

  const handleSelectPokemonMaster = (value: PokemonMaster) => {
    selectPokemonMaster(value);
    setShowModal(false);
  };
  return (
    <div className="flex flex-col items-end">
      <AddButton buttonText={buttonText} onClick={() => setShowModal(true)} />
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <SelectPokemonMaster
                selectPokemonMaster={handleSelectPokemonMaster}
              />
              <button
                onClick={() => setShowModal(false)}
                className="mt-3 bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
              >
                閉じる
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
