import Link from "next/link";

export default function CreateCompletePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-4">登録完了</h2>
        <p className="text-center mb-8">セーブデータの登録が完了しました。</p>

        <div className="flex flex-col space-y-4">
          <Link
            href="/savedata/create"
            className="px-4 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600 transition-colors"
          >
            続けて登録する
          </Link>
          <Link
            href="/savedata"
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
          >
            セーブデータの一覧へ戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
