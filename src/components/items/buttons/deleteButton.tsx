import { TrashIcon } from "@heroicons/react/24/solid";

interface DeleteButtonProps {
  onDelete: () => void;
  className?: string;
}

export default function DeleteButton({
  onDelete,
  className,
}: DeleteButtonProps) {
  return (
    <button
      onClick={onDelete}
      className={
        className +
        " flex items-center justify-center px-2 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
      }
    >
      <TrashIcon className="h-5 w-5 mr-2" />
      削除する
    </button>
  );
}
