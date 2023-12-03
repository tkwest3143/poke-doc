"use client";
import NotFoundDataPage from "@/components/pages/notFoundData";
import PokemonInputPage from "@/components/pages/pokemonInput";
import { useSearchParams } from "next/navigation";

export default function PokemonPage() {
  const param = useSearchParams();
  const id = param.get("id");
  if (!id) {
    return <NotFoundDataPage />;
  }
  return <PokemonInputPage params={{ id }} />;
}
