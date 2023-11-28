import { useEffect, useState } from "react";
import { pokemonMasterType } from "@/domain/interface/pokemonMaster";
import { PokemonMaster } from "@/domain/pokemonMaster";
import Image from "next/image";
import { invoke } from "@tauri-apps/api/tauri";

interface SelectPokemonMasterProps {
  selectPokemonMaster: (value: PokemonMaster) => void;
}

export default function SelectPokemonMaster({
  selectPokemonMaster,
}: SelectPokemonMasterProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [pokemonMasters, setPokemonMasters] = useState<pokemonMasterType[]>([]);
  const [filteredPokemonMasters, setFilteredPokemonMasters] = useState<
    PokemonMaster[]
  >([]);

  useEffect(() => {
    invoke<pokemonMasterType[]>("get_all_pokemon_master_list")
      .then((res) => {
        setPokemonMasters(res);
      })
      .catch(console.error);
  }, []);
  useEffect(() => {
    const filtered = pokemonMasters
      .filter((pm) => pm.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .map((pm) => new PokemonMaster(pm));
    setFilteredPokemonMasters(filtered);
  }, [searchQuery, pokemonMasters]);

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search Pokemon Master"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="p-2 border rounded w-full"
      />
      {filteredPokemonMasters.length > 0 && (
        <ul className="mt-2 max-h-40 overflow-y-auto border rounded bg-white">
          {filteredPokemonMasters.map((pm) => (
            <li
              key={pm.id}
              onClick={() => {
                setSearchQuery(pm.name);
                selectPokemonMaster(new PokemonMaster(pm.pokemonMasterType));
              }}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              <Image
                width={30}
                height={30}
                src={pm.viewImage}
                className="h-12 w-12 object-cover rounded-full"
                alt={pm.name}
              />
              {pm.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
