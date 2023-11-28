import { Pokemon } from "@/domain";
import React, { useState } from "react";
import SelectPokemonMasterDialog from "./selectPokemonMasterDialog";
import AddButton from "./items/buttons/addButton";
import Image from "next/image";

interface AddPokemonFormProps {
  addPokemon: (value: Pokemon) => void;
}

export default function AddPokemonForm({ addPokemon }: AddPokemonFormProps) {
  const [nickname, setNickname] = useState("");
  const [level, setLevel] = useState(1);
  const [pokemonMaster, setPokemonMaster] = useState<
    Pokemon["pokemonMaster"] | undefined
  >(undefined);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = () => {
    if (!pokemonMaster) {
      setErrorMessage("ポケモンを選択してください。");
      return;
    }
    addPokemon(
      new Pokemon({
        id: "0",
        nickname,
        level,
        pokemon_master: pokemonMaster,
        defeated_pokemon: [],
        individual_value: {
          hp: 0,
          attack: 0,
          block: 0,
          concentration: 0,
          defense: 0,
          speed: 0,
        },
        effort_value: {
          hp: 0,
          attack: 0,
          block: 0,
          concentration: 0,
          defense: 0,
          speed: 0,
        },
      })
    );
  };
  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <SelectPokemonMasterDialog
        buttonText="ポケモンを選択"
        selectPokemonMaster={(val) => setPokemonMaster(val.pokemonMasterType)}
      />
      <div className="mt-4 p-2 border border-gray-300 rounded flex items-center">
        {pokemonMaster ? (
          <>
            <Image
              width={30}
              height={30}
              src={pokemonMaster.image}
              alt={pokemonMaster.name}
              className="h-10 w-10 object-cover rounded-full mr-2"
            />
            <span className="text-lg font-semibold">{pokemonMaster.name}</span>
          </>
        ) : (
          <div className="text-gray-500">ポケモンが選択されていません</div>
        )}
      </div>
      <label
        htmlFor="nickname"
        className="block text-sm font-medium text-gray-700 mt-4"
      >
        ニックネーム
      </label>
      <input
        id="nickname"
        type="text"
        placeholder="Nickname"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      />
      <label
        htmlFor="level"
        className="block text-sm font-medium text-gray-700 mt-4"
      >
        レベル (1〜100)
      </label>
      <input
        id="level"
        type="number"
        placeholder="Level"
        value={level}
        min={1}
        max={100}
        onChange={(e) => setLevel(parseInt(e.target.value))}
        className="w-1/4 p-2 border border-gray-300 rounded shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      />
      {errorMessage && (
        <div className="mt-2 text-red-500 text-sm">{errorMessage}</div>
      )}
      <AddButton onClick={handleSubmit} className="mt-4" />
    </div>
  );
}
