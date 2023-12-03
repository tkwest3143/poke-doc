import IndividualInput from "@/components/items/pokemon/individual/individualInput";
import { Pokemon } from "@/domain";

type InputIndividualValueProps = {
  individualValue: Pokemon["individualValue"];
  onChange: (val: Pokemon["individualValue"]) => void;
};

export default function InputIndividualValueInput({
  individualValue,
  onChange,
}: InputIndividualValueProps) {
  const onChangeIndividualValue = (val: {
    hp: number;
    attack: number;
    block: number;
    concentration: number;
    defense: number;
    speed: number;
  }) => {
    onChange(val);
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">個体値</h3>
      <div className="grid grid-cols-2 gap-4">
        <IndividualInput
          text={"HP"}
          value={individualValue.hp}
          handleValueChange={(val: number) =>
            onChangeIndividualValue({ ...individualValue, hp: val })
          }
        />
        <IndividualInput
          text={"攻撃"}
          value={individualValue.attack}
          handleValueChange={(val: number) =>
            onChangeIndividualValue({ ...individualValue, attack: val })
          }
        />
        <IndividualInput
          text={"防御"}
          value={individualValue.block}
          handleValueChange={(val: number) =>
            onChangeIndividualValue({ ...individualValue, block: val })
          }
        />
        <IndividualInput
          text={"特攻"}
          value={individualValue.concentration}
          handleValueChange={(val: number) =>
            onChangeIndividualValue({ ...individualValue, concentration: val })
          }
        />
        <IndividualInput
          text={"特防"}
          value={individualValue.defense}
          handleValueChange={(val: number) =>
            onChangeIndividualValue({ ...individualValue, defense: val })
          }
        />
        <IndividualInput
          text={"速さ"}
          value={individualValue.speed}
          handleValueChange={(val: number) =>
            onChangeIndividualValue({ ...individualValue, speed: val })
          }
        />
      </div>
    </div>
  );
}
