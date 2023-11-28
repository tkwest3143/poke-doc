type EffortValueDisplayProps = {
  labelTitle?: string;
  effortValue: {
    hp: number;
    attack: number;
    block: number;
    concentration: number;
    defense: number;
    speed: number;
  };
};

export default function EffortValueDisplay({
  labelTitle,
  effortValue,
}: EffortValueDisplayProps) {
  const renderValue = (value: number) => {
    return value === 0 ? (
      <span className="text-gray-400">{value}</span>
    ) : (
      <span>{value}</span>
    );
  };

  return (
    <div className="border border-gray-300 rounded-lg p-4 shadow-md">
      <h3 className="font-semibold border-b border-gray-300 mb-3">
        {labelTitle ?? "努力値"}
      </h3>
      <div className="grid grid-cols-6 gap-2">
        <span>HP: {renderValue(effortValue.hp)}</span>
        <span>攻撃: {renderValue(effortValue.attack)}</span>
        <span>防御: {renderValue(effortValue.block)}</span>
        <span>特攻: {renderValue(effortValue.concentration)}</span>
        <span>特防: {renderValue(effortValue.defense)}</span>
        <span>速さ: {renderValue(effortValue.speed)}</span>
      </div>
    </div>
  );
}
