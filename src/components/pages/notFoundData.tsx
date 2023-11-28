import Link from "next/link";
import { HomeIcon } from "@heroicons/react/24/solid";

export default function NotFoundDataPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          対象のデータが見つかりませんでした。
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          お探しのデータは存在しないか、アクセスできません。
        </p>
        <Link href="/">
          <a className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
            <HomeIcon className="h-5 w-5 mr-2" />
            トップに戻る
          </a>
        </Link>
      </div>
    </div>
  );
}
