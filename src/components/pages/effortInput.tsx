import { useEffect, useState } from "react";
import { Pokemon } from "@/domain";
import { Loading } from "@/components/items/loading";
import PokemonDetail from "@/components/pokemonDetail";
import { invoke } from "@tauri-apps/api/tauri";
import { pokemonType } from "@/domain/interface/pokemon";

export default function EffortInputPage({
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
  const [showMessageOverlay, setShowMessageOverlay] = useState(false);

  useEffect(() => {
    if (message) {
      setShowMessageOverlay(true);
      const timer = setTimeout(() => {
        setMessage(undefined);
        setShowMessageOverlay(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [message]);
  if (isLoading || pokemon === null) {
    return <Loading />;
  }
  const onSavePokemon = (val: Pokemon) => {
    setIsLoading(true);
    setMessage(undefined);
    setErrorMessage(undefined);
    setPokemon(val);
    invoke<void>("save_pokemon", {
      pokemon: JSON.stringify(val.pokemonType),
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
      {/* メッセージの位置を固定 */}
      <div className="absolute bottom-0 w-full px-4 py-2">
        {errorMessage && (
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-red-100 text-red-500 text-center z-50">
            {" "}
            <button
              onClick={() => setErrorMessage(undefined)}
              className="absolute right-2 text-lg"
            >
              &#10006;
            </button>
            {errorMessage}
          </div>
        )}

        {showMessageOverlay && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
            <div className="p-4 bg-green-400 shadow-lg rounded">
              {message && <span className="text-white ">{message}</span>}
            </div>
          </div>
        )}
      </div>
      <div className="p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-4"></h2>

        <PokemonDetail pokemon={pokemon} onChangePokemon={onSavePokemon} />
      </div>
    </div>
  );
}
