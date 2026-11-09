import type { ComponentSnippets } from "@/content/types";

export const snippets: ComponentSnippets = {
  "preview": `import { Progress } from "@nphuonha/ui-kit";

export function Example() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-6">
      <Progress value={64} label="Uploading assets" showValue />
      <Progress value={32} label="Storage used" tone="success" showValue />
      <Progress
        value={82}
        label="Plan limit"
        tone="warning"
        size="lg"
        showValue
      />
    </div>
  );
}`,
  "usage": `import { Progress } from "@nphuonha/ui-kit";

<Progress value={64} label="Uploading" showValue />`,
  "examples": {
    "progress-indeterminate": `<Progress value={null} label="Preparing workspace" showValue />`,
    "progress-tones": `<div className="flex flex-col gap-4">
  <Progress value={48} label="Primary" size="sm" showValue />
  <Progress value={64} label="Success" tone="success" showValue />
  <Progress value={78} label="Warning" tone="warning" showValue />
  <Progress value={92} label="Danger" tone="danger" showValue />
</div>`,
  },
};
