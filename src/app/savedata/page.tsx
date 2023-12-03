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
        {saveDatas.length === 0 ? (
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <CreateSavedataButton />
          </div>
        ) : (
          <>
            <SavedataList
              savedata={saveDatas}
              onDeleteSavedata={async (id: number) => {
                await invoke("delete_savedata", {
                  savedataId: id,
                });
                const savedatas = await invoke<SavedataType[]>(
                  "get_all_savedata_list"
                );
                setSaveDatas(
                  savedatas.map((savedata) => new SaveData(savedata))
                );
              }}
            />
            <div className="p-6 bg-white shadow-lg rounded-lg">
              <CreateSavedataButton />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
