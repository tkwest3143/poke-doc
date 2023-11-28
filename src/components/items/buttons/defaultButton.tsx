type DefaultButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
};

export default function DefaultButton({
  icon,
  onClick,
  children,
  className,
}: DefaultButtonProps) {
  const baseClasses =
    "flex items-center justify-center relative text-gray-500 rounded-md bg-cyan-100 px-2 py-2 inline-block text-center cursor-pointer transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";
  const hoverClasses =
    "hover:bg-cyan-200 hover:shadow-md hover:shadow-cyan-200/50 hover:scale-105";
  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${hoverClasses} ${className}`}
    >
      {icon}
      {children}
    </button>
  );
}
