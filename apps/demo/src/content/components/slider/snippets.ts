import type { ComponentSnippets } from "@/content/types";

export const snippets: ComponentSnippets = {
  "preview": `import * as React from "react";
import { Slider } from "@nphuonha/ui-kit";

export function Example() {
  const [volume, setVolume] = React.useState(64);

  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-7">
      <Slider
        label="Volume"
        value={volume}
        onValueChange={setVolume}
        showValue
      />
      <Slider
        label="Price range"
        defaultValue={[20, 80]}
        min={0}
        max={100}
        step={5}
        showValue
      />
    </div>
  );
}`,
  "usage": `<Slider
  label="Volume"
  value={volume}
  onValueChange={setVolume}
  showValue
/>`
};
