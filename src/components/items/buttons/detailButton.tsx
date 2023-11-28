import { InformationCircleIcon } from "@heroicons/react/24/solid";
import LinkButton from "./linkButton";

interface DetailButtonProps {
  href: string;
  className?: string;
}

export default function DetailButton({ href, className }: DetailButtonProps) {
  return (
    <LinkButton href={href} className={className}>
      <InformationCircleIcon className="h-5 w-5 mr-2" />
      詳細
    </LinkButton>
  );
}
