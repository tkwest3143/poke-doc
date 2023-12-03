import StatsValueDisplay from "@/components/statsValueDisplay";
import { Pokemon } from "@/domain";
import Image from "next/image";
import DeleteButton from "../../buttons/deleteButton";

type InputDefeatedPokemonProps = {
  pokemon: Pokemon;
  onChangePokemon: (val: Pokemon) => void;
};

export default function InputDefeatedPokemon({
  pokemon,
  onChangePokemon,
}: InputDefeatedPokemonProps) {
  const onChangeDefeatedCount = (index: number, newCount: number) => {
    const updatedDefeatedPokemon = [...pokemon.defeatedPokemon];
    updatedDefeatedPokemon[index].defeated_count = newCount;
    onChangePokemon(
      new Pokemon({
        ...pokemon.pokemonType,
        defeated_pokemon: updatedDefeatedPokemon,
      })
    );
  };

  const onDeleteDefeatedPokemon = (index: number) => {
    const updatedDefeatedPokemon = pokemon.defeatedPokemon;
    updatedDefeatedPokemon.splice(index, 1);

    onChangePokemon(
      new Pokemon({
        ...pokemon.pokemonType,
        defeated_pokemon: updatedDefeatedPokemon,
      })
    );
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">倒したポケモン</h3>
      {pokemon.defeatedPokemon.map((dp, index) => (
        <div key={index} className="mb-6">
          <div className="grid grid-cols-4 gap-4 items-center mb-2">
            <div className="col-span-2 flex items-center">
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
            </div>

            <div>
              <DeleteButton onDelete={() => onDeleteDefeatedPokemon(index)} />
            </div>

            <div>
              <span className="font-medium text-gray-700 mr-2">倒した数</span>
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
          <StatsValueDisplay
            labelTitle="取得できる努力値"
            statsValue={dp.pokemon_master.get_effort_value}
          />
        </div>
      ))}
    </div>
  );
}
