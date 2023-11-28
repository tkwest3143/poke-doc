import { Pokemon } from "@/domain";
import Image from "next/image";
import { useState } from "react";
import EffortInput from "./effortInput";
import { PokemonMaster } from "@/domain/pokemonMaster";
import SelectPokemonMasterDialog from "./selectPokemonMasterDialog";
import EffortValueDisplay from "./effortValueDisplay";
import SaveButton from "./items/buttons/saveButton";
import DeleteButton from "./items/buttons/deleteButton";
import PokemonTile from "./pokemonTile";

type PokemonDetailProps = {
  pokemon: Pokemon;
  onChangePokemon: (val: Pokemon) => void;
};

export default function PokemonDetail({
  pokemon,
  onChangePokemon,
}: PokemonDetailProps) {
  const [target, setTarget] = useState<Pokemon>(pokemon);

  const onChangeEffortValue = (val: {
    hp: number;
    attack: number;
    block: number;
    concentration: number;
    defense: number;
    speed: number;
  }) => {
    setTarget(
      new Pokemon({
        ...target.pokemonType,
        effort_value: val,
      })
    );
  };
  const onSelectDefeatedPokemon = (val: PokemonMaster) => {
    setTarget(
      new Pokemon({
        ...target.pokemonType,
        defeated_pokemon: [
          ...target.defeatedPokemon,
          { pokemon_master: val.pokemonMasterType, defeated_count: 0 },
        ],
      })
    );
  };

  const onChangeDefeatedCount = (index: number, newCount: number) => {
    const updatedDefeatedPokemon = [...target.defeatedPokemon];
    updatedDefeatedPokemon[index].defeated_count = newCount;
    setTarget(
      new Pokemon({
        ...target.pokemonType,
        defeated_pokemon: updatedDefeatedPokemon,
      })
    );
  };

  const onDeleteDefeatedPokemon = (index: number) => {
    const updatedDefeatedPokemon = target.defeatedPokemon;
    updatedDefeatedPokemon.splice(index, 1);

    setTarget(
      new Pokemon({
        ...target.pokemonType,
        defeated_pokemon: updatedDefeatedPokemon,
      })
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 bg-blue-400 text-white">
        <PokemonTile pokemon={pokemon} />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold mb-3">努力値</h3>
        <div className="grid grid-cols-2 gap-4">
          <EffortInput
            text={"HP"}
            value={target.effortValue.hp}
            handleEffortValueChange={(val: number) =>
              onChangeEffortValue({ ...target.effortValue, hp: val })
            }
          />
          <EffortInput
            text={"攻撃"}
            value={target.effortValue.attack}
            handleEffortValueChange={(val: number) =>
              onChangeEffortValue({ ...target.effortValue, attack: val })
            }
          />
          <EffortInput
            text={"防御"}
            value={target.effortValue.block}
            handleEffortValueChange={(val: number) =>
              onChangeEffortValue({ ...target.effortValue, block: val })
            }
          />
          <EffortInput
            text={"特攻"}
            value={target.effortValue.concentration}
            handleEffortValueChange={(val: number) =>
              onChangeEffortValue({ ...target.effortValue, concentration: val })
            }
          />
          <EffortInput
            text={"特防"}
            value={target.effortValue.defense}
            handleEffortValueChange={(val: number) =>
              onChangeEffortValue({ ...target.effortValue, defense: val })
            }
          />
          <EffortInput
            text={"速さ"}
            value={target.effortValue.speed}
            handleEffortValueChange={(val: number) =>
              onChangeEffortValue({ ...target.effortValue, speed: val })
            }
          />
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold mb-3">倒したポケモン</h3>
        {target.defeatedPokemon.map((dp, index) => (
          <div key={index} className="mb-6">
            <div className="flex items-center mb-2">
              <Image
                width={48}
                height={48}
                src={dp.pokemon_master.image}
                alt={dp.pokemon_master.name}
                className="h-12 w-12 object-cover rounded-full"
              />

              <span className="ml-2 font-semibold text-lg">
                {dp.pokemon_master.name}
              </span>
              <div className="ml-5">
                <DeleteButton onDelete={() => onDeleteDefeatedPokemon(index)} />
              </div>
            </div>

            <EffortValueDisplay
              labelTitle="取得できる努力値"
              effortValue={dp.pokemon_master.get_effort_value}
            />
            <div className="flex items-center mt-2">
              <span className="font-medium text-gray-700 mr-2">倒した数:</span>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  value={dp.defeated_count}
                  onChange={(e) =>
                    onChangeDefeatedCount(index, parseInt(e.target.value, 10))
                  }
                  className="border p-1 w-20 text-center"
                />
                <button
                  onClick={() =>
                    onChangeDefeatedCount(index, dp.defeated_count + 10)
                  }
                  className="px-2 py-1 border rounded bg-blue-500 text-white hover:bg-blue-600"
                >
                  +10回
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t">
        <SelectPokemonMasterDialog
          selectPokemonMaster={onSelectDefeatedPokemon}
        />
        <SaveButton
          onClick={() => onChangePokemon(target)}
          className="w-full mt-4"
        />
      </div>
    </div>
  );
}
