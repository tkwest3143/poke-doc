import { ServerIcon } from "@heroicons/react/24/solid";

import DefaultButton from "./defaultButton";

interface SaveButtonProps {
  onClick: () => void;
  className?: string;
}

export default function SaveButton({ onClick, className }: SaveButtonProps) {
  return (
    <DefaultButton onClick={onClick} className={className}>
      <ServerIcon className="h-5 w-5 mr-2" />
      保存する
    </DefaultButton>
  );
}
