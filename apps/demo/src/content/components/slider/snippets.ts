import type { ComponentSnippets } from "@/content/types";

export const snippets: ComponentSnippets = {
  "preview": `import { Slider } from "@nphuonha/ui-kit";

export function Example() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-7">
      <Slider label="Volume" defaultValue={64} showValue />
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
