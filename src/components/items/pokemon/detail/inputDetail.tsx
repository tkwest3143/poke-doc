import React, { useEffect, useState } from "react";
import SelectInput from "../../select";
import TextInput from "../../textInput";
import { Pokemon } from "@/domain";
import NumberInput from "../../numberInput";
import { invoke } from "@tauri-apps/api/tauri";
import { natureMasterType } from "@/domain/interface/natureMaster";
import { Loading } from "../../loading";

type InputPokemonDetailProps = {
  pokemon: Pokemon;
  onChangePokemon: (val: Pokemon) => void;
};
export default function InputPokemonDetail({
  pokemon,
  onChangePokemon,
}: InputPokemonDetailProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [natures, setNatures] = useState<natureMasterType[]>([]);
  useEffect(() => {
    setIsLoading(true);
    invoke<natureMasterType[]>("get_all_nature_master_list")
      .then((res) => {
        setNatures(res);
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-4 grid grid-cols-4 gap-2">
      <div className="col-span-2">
        <TextInput
          label="ニックネーム"
          value={pokemon.nickname}
          onChange={(val) =>
            onChangePokemon(
              new Pokemon({
                ...pokemon.pokemonType,
                nickname: val.currentTarget.value,
              })
            )
          }
        />
      </div>
      <div className="">
        <NumberInput
          placeholder="レベル"
          label="レベル"
          value={pokemon.level}
          onChange={(val) =>
            onChangePokemon(
              new Pokemon({
                ...pokemon.pokemonType,
                level: Number(val.currentTarget.value),
              })
            )
          }
          min={1}
          max={100}
        />
      </div>
      <div className="">
        <SelectInput
          label="性格"
          placeholder="性格"
          options={natures.map((nature) => ({
            value: nature.id.toString(),
            label: nature.name,
          }))}
          value={pokemon.nature?.id.toString() ?? ""}
          onChange={(val) =>
            onChangePokemon(
              new Pokemon({
                ...pokemon.pokemonType,
                nature: natures.find(
                  (nature) => nature.id.toString() === val.currentTarget.value
                ),
              })
            )
          }
        />
      </div>
    </div>
  );
}
