import { useEffect, useState } from "react";
import { Pokemon } from "@/domain";
import { Loading } from "@/components/items/loading";
import { invoke } from "@tauri-apps/api/tauri";
import { pokemonType } from "@/domain/interface/pokemon";
import InputPokemonDetail from "../items/pokemon/detail/inputDetail";
import MessageFloor from "../items/messageFloor";
import SaveButton from "../items/buttons/saveButton";
import PokemonTile from "../items/pokemon/detail/pokemonTile";
import InputDefeatedPokemon from "../items/pokemon/effort/inputDefeatedPokemon";
import InputEffortValueInput from "../items/pokemon/effort/inputEffortValue";
import InputIndividualValueInput from "../items/pokemon/individual/inputIndividualValue";
import SelectPokemonMasterDialog from "../selectPokemonMasterDialog";
import StatsValueDisplay from "../statsValueDisplay";
import { PokemonMaster } from "@/domain/pokemonMaster";

export default function PokemonInputPage({
  params,
}: {
  params: { id: string };
}) {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const [message, setMessage] = useState<string | undefined>(undefined);

  useEffect(() => {
    setIsLoading(true);
    invoke<pokemonType>("get_pokemon", {
      pokemonId: params.id,
    })
      .then((res) => {
        setPokemon(new Pokemon(res));
      })
      .catch((e) => setErrorMessage(e.error_message))
      .finally(() => setIsLoading(false));
  }, [params.id]);

  if (isLoading || pokemon === null) {
    return <Loading />;
  }
  const onChangeEffortValue = (val: {
    hp: number;
    attack: number;
    block: number;
    concentration: number;
    defense: number;
    speed: number;
  }) => {
    setPokemon(
      new Pokemon({
        ...pokemon.pokemonType,
        effort_value: val,
      })
    );
  };
  const onChangeIndividualValue = (val: {
    hp: number;
    attack: number;
    block: number;
    concentration: number;
    defense: number;
    speed: number;
  }) => {
    setPokemon(
      new Pokemon({
        ...pokemon.pokemonType,
        individual_value: val,
      })
    );
  };
  const onSelectDefeatedPokemon = (val: PokemonMaster) => {
    setPokemon(
      new Pokemon({
        ...pokemon.pokemonType,
        defeated_pokemon: [
          ...pokemon.defeatedPokemon,
          { pokemon_master: val.pokemonMasterType, defeated_count: 0 },
        ],
      })
    );
  };
  const onSavePokemon = () => {
    setIsLoading(true);
    setMessage(undefined);
    setErrorMessage(undefined);
    invoke<void>("save_pokemon", {
      pokemon: JSON.stringify(pokemon.pokemonType),
    })
      .then(() => {
        setMessage("保存しました");
      })
      .catch((e) =>
        setErrorMessage(e.message !== "" ? e.message : "エラーが発生しました")
      )
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 relative">
      <MessageFloor
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
        setMessage={setMessage}
        message={message}
      />
      <div className="p-6 bg-white shadow-lg rounded-lg">
        <div className="bg-blue-400 text-white">
          <PokemonTile pokemon={pokemon} />
        </div>

        <InputPokemonDetail pokemon={pokemon} onChangePokemon={setPokemon} />
        <div className="mt-4">
          <div className="pt-4 pb-4">
            <StatsValueDisplay
              labelTitle="ステータス"
              statsValue={pokemon.allStatusValueToStatusValue}
            />
          </div>
          <div className="pt-4 pb-4">
            <InputIndividualValueInput
              individualValue={pokemon.individualValue}
              onChange={onChangeIndividualValue}
            />
          </div>

          <div className="pt-4 pb-4">
            <InputEffortValueInput
              effortValue={pokemon.effortValue}
              onChange={onChangeEffortValue}
            />
          </div>
          <InputDefeatedPokemon
            pokemon={pokemon}
            onChangePokemon={(pokemon) => setPokemon(pokemon)}
          />
          <div className="pt-4 border-t">
            <SelectPokemonMasterDialog
              selectPokemonMaster={onSelectDefeatedPokemon}
            />
            <div className="pt-4">
              <StatsValueDisplay
                isViewSumValue={true}
                labelTitle="合計努力値"
                statsValue={pokemon.allEffortValueToStatusValue}
              />
            </div>
          </div>
        </div>
      </div>

      <SaveButton onClick={onSavePokemon} className="w-full mt-4" />
    </div>
  );
}
