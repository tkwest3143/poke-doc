"use client";
import { ReactNode, useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import SavedataList from "@/components/items/savedata/detail/savedataList";
import CreateSavedataButton from "@/components/items/buttons/createSaveDataButton";
import { SaveData } from "@/domain";
import { SavedataType } from "@/domain/interface/savedata";

export default function Savedata() {
  const [saveDatas, setSaveDatas] = useState<SaveData[]>([]);
  useEffect(() => {
    invoke<SavedataType[]>("get_all_savedata_list")
      .then((res) => {
        setSaveDatas(res.map((savedata) => new SaveData(savedata)));
      })
      .catch(console.error);
  }, []);
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* メインコンテンツ */}
      <div className="flex-grow p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-4">
          セーブデータ一覧
        </h2>

        <SavedataList
          savedata={saveDatas}
          onDeleteSavedata={function (id: number): void {}}
        />
      </div>

      {/* 固定フッター */}
      <div className="p-6 bg-white shadow-lg rounded-lg">
        <CreateSavedataButton />
      </div>
    </div>
  );
}
