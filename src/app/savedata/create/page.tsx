"use client";
import SavedataForm from "@/components/items/savedata/input/savedataForm";
import { useSearchParams } from "next/navigation";

export default function SavedataCreatePage() {
  const param = useSearchParams();
  const id = param.get("id");
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-4">
          セーブデータを登録する
        </h2>
        <SavedataForm
          id={id ? Number(id) : undefined}
          nextUrl="/savedata/create/complete"
        />
      </div>
    </div>
  );
}
