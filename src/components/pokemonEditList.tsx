import { Pokemon } from "@/domain";
import { MinusCircleIcon, PlusIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useState } from "react";
import AddPokemonForm from "./addPokemonForm";
import { PokemonType } from "@/constants/pokemonType";
import PokemonTile from "./pokemonTile";

interface AddPokemonFormProps {
  pokemons: Pokemon[];
  setPokemons: (pokemons: Pokemon[]) => void;
}

const PokemonEditList = (prop: AddPokemonFormProps) => {
  const [showAddForm, setShowAddForm] = useState(false);

  const handleDelete = (id: string) => {
    prop.setPokemons(prop.pokemons.filter((pokemon) => pokemon.id !== id));
  };

  const AddPokemon = (value: Pokemon) => {
    prop.setPokemons([...prop.pokemons, value]);
    setShowAddForm(false);
  };

  return (
    <div>
      <div className="space-y-4">
        {prop.pokemons.map((pokemon) => (
          <div
            key={pokemon.id}
            className="flex items-center space-x-4 bg-white p-4 rounded shadow"
          >
            <PokemonTile pokemon={pokemon} />
            <button
              onClick={() => handleDelete(pokemon.id)}
              className="ml-auto px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              <MinusCircleIcon className="h-5 w-5" />
            </button>
          </div>
        ))}
        <div className="flex justify-between mb-4">
          {!showAddForm && (
            <button
              onClick={() => {
                setShowAddForm(true);
              }}
              className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              <PlusIcon className="h-5 w-5" />
            </button>
          )}
          {showAddForm && <AddPokemonForm addPokemon={AddPokemon} />}
        </div>
      </div>
    </div>
  );
};

export default PokemonEditList;
