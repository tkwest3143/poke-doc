export default function IndividualInput(prop: {
  text: string;
  value: number;
  handleValueChange: (val: number) => void;
}) {
  return (
    <div className="flex items-center space-x-2">
      <p className="w-16">{prop.text}:</p>
      <input
        type="number"
        value={prop.value}
        onChange={(e) =>
          prop.handleValueChange(Math.min(Number(e.target.value), 31))
        }
        className="border p-1 w-16 text-center"
        max="31"
      />
      <button
        onClick={() => prop.handleValueChange(Math.min(prop.value + 10, 31))}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
      >
        +10
      </button>
    </div>
  );
}
