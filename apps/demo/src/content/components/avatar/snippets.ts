import type { ComponentSnippets } from "@/content/types";

export const snippets: ComponentSnippets = {
  "preview": `import { Avatar } from "@nphuonha/ui-kit";

const photo = "data:image/svg+xml,...";

export function Example() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <Avatar src={photo} alt="Minh Anh" size="xl" />
      <Avatar alt="Ada Lovelace" size="lg" />
      <Avatar alt="Grace Hopper" />
      <Avatar alt="Lin Chen" size="sm" />
      <Avatar alt="Rounded avatar" shape="rounded" />
      <Avatar fallback="?" />
    </div>
  );
}`,
  "usage": `import { Avatar } from "@nphuonha/ui-kit";

<Avatar src="/avatars/ada.jpg" alt="Ada Lovelace" size="lg" />`,
  "examples": {
    "avatar-sizes": `<div className="flex items-end gap-4">
  <Avatar alt="Small avatar" size="sm" />
  <Avatar alt="Default avatar" size="default" />
  <Avatar alt="Large avatar" size="lg" />
  <Avatar alt="Extra large avatar" size="xl" />
  <Avatar alt="Rounded avatar" shape="rounded" size="lg" />
</div>`,
  },
};
