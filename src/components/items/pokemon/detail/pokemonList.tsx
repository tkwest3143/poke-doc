import { Pokemon } from "@/domain";
import Image from "next/image";

import DetailButton from "../../buttons/detailButton";

interface PokemonListProps {
  pokemons: Pokemon[];
}

export default function PokemonList({ pokemons }: PokemonListProps) {
  return (
    <div className="container p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {pokemons.map((pokemon) => (
          <div key={pokemon.id} className="bg-white rounded-lg shadow-md p-4">
            <Image
              src={pokemon.viewImage ?? ""}
              alt={pokemon.id.toString()}
              width={100}
              height={100}
            />
            <div className="font-bold text-lg">{pokemon.viewName}</div>
            <div className="text-gray-600">レベル: {pokemon.level}</div>
            <DetailButton href={`/savedata/pokemon?id=${pokemon.id}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
