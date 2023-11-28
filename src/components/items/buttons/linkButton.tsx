import Link from "next/link";

type LinkButtonProps = {
  children: React.ReactNode;
  href: string;
  onClick?: () => void;
  className?: string;
};

export default function LinkButton({
  href,
  children,
  className,
}: LinkButtonProps) {
  const baseClasses =
    "flex items-center justify-center relative text-gray-500 rounded-md bg-cyan-100 px-2 py-2 inline-block text-center cursor-pointer transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";
  const hoverClasses =
    "hover:bg-cyan-200 hover:shadow-md hover:shadow-cyan-200/50 hover:scale-105";
  return (
    <Link href={href} className={`${baseClasses} ${hoverClasses} ${className}`}>
      {children}
    </Link>
  );
}
