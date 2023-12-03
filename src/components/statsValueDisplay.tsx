type StatsValueDisplayProps = {
  labelTitle: string;
  statsValue: {
    hp: number;
    attack: number;
    block: number;
    concentration: number;
    defense: number;
    speed: number;
  };
  isViewSumValue?: boolean;
};

export default function StatsValueDisplay({
  labelTitle,
  statsValue,
  isViewSumValue = false,
}: StatsValueDisplayProps) {
  const renderValue = (value: number) => {
    return value === 0 ? (
      <span className="text-gray-400">{value}</span>
    ) : (
      <span>{value}</span>
    );
  };
  const allSumValue = () => {
    return Object.values(statsValue).reduce(
      (prev, current) => prev + current,
      0
    );
  };

  return (
    <div className="border border-gray-300 rounded-lg p-4 shadow-md">
      <h3 className="font-semibold border-b border-gray-300 mb-3">
        {labelTitle}
      </h3>
      <div className="grid grid-cols-6 gap-2">
        <span>HP: {renderValue(statsValue.hp)}</span>
        <span>攻撃: {renderValue(statsValue.attack)}</span>
        <span>防御: {renderValue(statsValue.block)}</span>
        <span>特攻: {renderValue(statsValue.concentration)}</span>
        <span>特防: {renderValue(statsValue.defense)}</span>
        <span>速さ: {renderValue(statsValue.speed)}</span>
        {isViewSumValue ? (
          <span className="col-end-7">合計: {renderValue(allSumValue())}</span>
        ) : undefined}
      </div>
    </div>
  );
}
