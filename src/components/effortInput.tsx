export default function EffortInput(prop: {
  text: string;
  value: number;
  handleEffortValueChange: (val: number) => void;
}) {
  return (
    <div className="flex items-center space-x-2">
      <p className="w-16">{prop.text}:</p>
      <input
        type="number"
        value={prop.value}
        onChange={(e) =>
          prop.handleEffortValueChange(Math.min(Number(e.target.value), 255))
        }
        className="border p-1 w-16 text-center"
        max="255"
      />
      <button
        onClick={() =>
          prop.handleEffortValueChange(Math.min(prop.value + 10, 255))
        }
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
      >
        +10
      </button>
      <button
        onClick={() =>
          prop.handleEffortValueChange(Math.min(prop.value + 100, 255))
        }
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded"
      >
        +100
      </button>
    </div>
  );
}
