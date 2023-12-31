interface TextInputProps {
  label?: string;
  id?: string;
  name?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export default function TextInput({
  id,
  label,
  name,
  placeholder,
  value,
  onChange,
  className,
}: TextInputProps) {
  const baseClasses =
    "block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:border-cyan-500 focus:ring focus:ring-cyan-200 focus:ring-opacity-50";

  return (
    <>
      {label ?? (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 mt-4"
        >
          {label}
        </label>
      )}
      <input
        type="text"
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`${baseClasses} ${className}`}
      />
    </>
  );
}
