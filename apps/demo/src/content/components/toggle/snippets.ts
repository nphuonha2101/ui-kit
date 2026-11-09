import type { ComponentSnippets } from "@/content/types";

export const snippets: ComponentSnippets = {
  "preview": `import * as React from "react";
import { Toggle } from "@nphuonha/ui-kit";
import {
  BellIcon,
  BookmarkSimpleIcon,
  HeartIcon,
  StarIcon,
} from "@phosphor-icons/react";

export function Example() {
  const [saved, setSaved] = React.useState(true);

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Toggle
        pressed={saved}
        onPressedChange={setSaved}
        startIcon={BookmarkSimpleIcon}
      >
        {saved ? "Saved" : "Save"}
      </Toggle>
      <Toggle defaultPressed startIcon={HeartIcon}>
        Like
      </Toggle>
      <Toggle variant="outline" startIcon={BellIcon}>
        Notify me
      </Toggle>
      <Toggle size="icon" aria-label="Star">
        <StarIcon size={17} />
      </Toggle>
      <Toggle disabled>Disabled</Toggle>
    </div>
  );
}`,
  "usage": `import { Toggle } from "@nphuonha/ui-kit";

<Toggle defaultPressed onPressedChange={(pressed) => console.log(pressed)}>
  Save
</Toggle>`,
  "examples": {
    "toggle-sizes": `<div className="flex flex-wrap items-center gap-3">
  <Toggle size="sm">Small</Toggle>
  <Toggle size="default" defaultPressed>Default</Toggle>
  <Toggle size="lg" shape="pill">Large pill</Toggle>
  <Toggle size="icon-sm" aria-label="Small star">
    <StarIcon size={15} />
  </Toggle>
  <Toggle size="icon" aria-label="Star">
    <StarIcon size={18} />
  </Toggle>
</div>`,
  },
};
