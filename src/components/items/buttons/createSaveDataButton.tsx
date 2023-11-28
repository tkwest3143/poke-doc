import LinkButton from "./linkButton";
import { FolderPlusIcon, PencilSquareIcon } from "@heroicons/react/24/solid";

interface CreateSavedataButtonProps {
  className?: string;
}

export default function CreateSavedataButton({
  className,
}: CreateSavedataButtonProps) {
  return (
    <LinkButton href={`/savedata/create`} className={className}>
      <FolderPlusIcon className="h-5 w-5 mr-2" />
      新しいセーブデータを作成
    </LinkButton>
  );
}
