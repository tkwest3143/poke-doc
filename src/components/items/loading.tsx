import { ArrowPathIcon } from "@heroicons/react/24/solid";

interface LoadingProps {
  message?: string;
}
export function Loading({ message }: LoadingProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="animate-spin">
        <ArrowPathIcon className="h-5 w-5" />
      </div>
      {message ?? "Loading..."}
    </div>
  );
}
