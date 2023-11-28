import { Pokemon } from "@/domain";
import Image from "next/image";
import { PokemonType } from "@/constants/pokemonType";

interface PokemonTileProps {
  pokemon: Pokemon;
}

const PokemonTile = (prop: PokemonTileProps) => {
  return (
    <div className="flex items-center space-x-4 p-4 ">
      <Image
        alt={prop.pokemon.viewName}
        height={12}
        width={12}
        src={prop.pokemon.viewImage ?? ""}
        className="h-12 w-12 object-cover rounded-full"
      />
      <div>
        <h3 className="text-lg font-bold">{prop.pokemon.viewName}</h3>
        <p>
          Level: {prop.pokemon.level}
          <p className="p-0 flex gap-1">
            {prop.pokemon.pokemonMaster.types.map((type) => (
              <div
                key={type}
                className={`text-white rounded text-xs p-1`}
                style={{ background: PokemonType[type].color }}
              >
                {PokemonType[type].name}
              </div>
            ))}
          </p>
        </p>
      </div>
    </div>
  );
};

export default PokemonTile;
