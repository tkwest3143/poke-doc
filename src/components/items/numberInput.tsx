interface NumberInputProps {
  label?: string;
  id?: string;
  name?: string;
  placeholder?: string;
  value?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  min?: number;
  max?: number;
}

export default function NumberInput({
  label,
  id,
  name,
  placeholder,
  value,
  onChange,
  className,
  min,
  max,
}: NumberInputProps) {
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
        id={id}
        type="number"
        placeholder={placeholder}
        name={name}
        value={value}
        min={min}
        max={max}
        onChange={onChange}
        className={[baseClasses, className].join(" ")}
      />
    </>
  );
}
