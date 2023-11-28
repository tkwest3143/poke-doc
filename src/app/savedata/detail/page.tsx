"use client";

import SaveDataDetailPage from "@/components/pages/savedataDetail";
import NotFoundDataPage from "@/components/pages/notFoundData";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const param = useSearchParams();
  const id = param.get("id");
  if (!id) {
    return <NotFoundDataPage />;
  }
  return <SaveDataDetailPage params={{ id }} />;
}
