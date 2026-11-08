import { NumberField } from "@nphuonha/ui-kit";

function NumberFieldDemo() {
  return (
    <div className="mx-auto flex w-full max-w-xs flex-col gap-4">
      <NumberField
        label="Quantity"
        defaultValue={1}
        min={1}
        max={10}
        description="Between 1 and 10."
      />
      <NumberField
        label="Price"
        defaultValue={19.99}
        min={0}
        step={0.5}
        format={{ style: "currency", currency: "USD" }}
      />
    </div>
  );
}

export const demo = NumberFieldDemo;
export const examples = {};
