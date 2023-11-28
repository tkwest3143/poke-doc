"use client";
import { useRouter } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const currentYear = new Date().getFullYear();
  return (
    <div className="flex flex-col h-screen">
      <header className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">ポケモン管理ツール</h1>
          <div>
            <button
              onClick={() => router.back()}
              className="text-white bg-blue-500 hover:bg-blue-700 px-3 py-2 rounded mr-2"
            >
              戻る
            </button>
            <button
              onClick={() => router.push("/")}
              className="text-white bg-green-500 hover:bg-green-700 px-3 py-2 rounded"
            >
              ホームに戻る
            </button>
          </div>
        </div>
      </header>

      {/* mainタグにスクロール可能なスタイルを適用 */}
      <main className="flex-grow overflow-auto container mx-auto p-4">
        {children}
      </main>

      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>© {currentYear} Your Company Name. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
