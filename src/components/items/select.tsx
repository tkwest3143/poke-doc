interface SelectInputProps {
  id?: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Array<{ value: string; label: string }>;
  className?: string;
  placeholder?: string;
  label?: string;
}

export default function SelectInput({
  id,
  name,
  value,
  onChange,
  options,
  className,
  placeholder,
  label,
}: SelectInputProps) {
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
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className={`${baseClasses} ${className}`}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
}
