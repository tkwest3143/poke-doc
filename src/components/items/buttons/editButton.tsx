import { PencilIcon } from "@heroicons/react/24/solid";

import LinkButton from "./linkButton";

interface EditButtonProps {
  href: string;
  className?: string;
}

export default function EditButton({ href, className }: EditButtonProps) {
  return (
    <LinkButton href={href} className={className}>
      <PencilIcon className="h-5 w-5 mr-2" />
      編集する
    </LinkButton>
  );
}
