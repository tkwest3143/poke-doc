"use client";
import EffortInputPage from "@/components/pages/effortInput";
import NotFoundDataPage from "@/components/pages/notFoundData";
import { useSearchParams } from "next/navigation";

export default function PokemonPage() {
  const param = useSearchParams();
  const id = param.get("id");
  if (!id) {
    return <NotFoundDataPage />;
  }
  return <EffortInputPage params={{ id }} />;
}
