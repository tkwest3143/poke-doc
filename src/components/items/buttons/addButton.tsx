import { PlusIcon } from "@heroicons/react/24/solid";

type AddButtonProps = {
  buttonText?: string;
  onClick: () => void;
  className?: string;
};

export default function AddButton({
  className,
  onClick,
  buttonText,
}: AddButtonProps) {
  return (
    <button
      onClick={onClick}
      className={
        className +
        " flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
      }
    >
      <PlusIcon className="h-5 w-5 mr-2" />
      {buttonText ?? "追加"}
    </button>
  );
}
