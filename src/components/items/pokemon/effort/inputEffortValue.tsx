import EffortInput from "@/components/items/pokemon/effort/effortInput";
import { Pokemon } from "@/domain";

type InputEffortValueProps = {
  effortValue: Pokemon["effortValue"];
  onChange: (val: Pokemon["effortValue"]) => void;
};

export default function InputEffortValueInput({
  effortValue,
  onChange,
}: InputEffortValueProps) {
  const onChangeEffortValue = (val: {
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
      <h3 className="text-lg font-semibold mb-3">努力値</h3>
      <div className="grid grid-cols-2 gap-4">
        <EffortInput
          text={"HP"}
          value={effortValue.hp}
          handleEffortValueChange={(val: number) =>
            onChangeEffortValue({ ...effortValue, hp: val })
          }
        />
        <EffortInput
          text={"攻撃"}
          value={effortValue.attack}
          handleEffortValueChange={(val: number) =>
            onChangeEffortValue({ ...effortValue, attack: val })
          }
        />
        <EffortInput
          text={"防御"}
          value={effortValue.block}
          handleEffortValueChange={(val: number) =>
            onChangeEffortValue({ ...effortValue, block: val })
          }
        />
        <EffortInput
          text={"特攻"}
          value={effortValue.concentration}
          handleEffortValueChange={(val: number) =>
            onChangeEffortValue({ ...effortValue, concentration: val })
          }
        />
        <EffortInput
          text={"特防"}
          value={effortValue.defense}
          handleEffortValueChange={(val: number) =>
            onChangeEffortValue({ ...effortValue, defense: val })
          }
        />
        <EffortInput
          text={"速さ"}
          value={effortValue.speed}
          handleEffortValueChange={(val: number) =>
            onChangeEffortValue({ ...effortValue, speed: val })
          }
        />
      </div>
    </div>
  );
}
