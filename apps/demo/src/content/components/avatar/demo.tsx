"use client";

import { Avatar } from "@nphuonha/ui-kit";

const photo = `data:image/svg+xml;utf8,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><rect width="80" height="80" fill="#4f46e5"/><circle cx="40" cy="31" r="13" fill="#c7d2fe"/><path d="M13 80c2-19 12-29 27-29s25 10 27 29" fill="#c7d2fe"/></svg>',
)}`;

function AvatarDemo() {
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
}

function AvatarSizesDemo() {
  return (
    <div className="flex flex-wrap items-end justify-center gap-4">
      <Avatar alt="Small avatar" size="sm" />
      <Avatar alt="Default avatar" size="default" />
      <Avatar alt="Large avatar" size="lg" />
      <Avatar alt="Extra large avatar" size="xl" />
      <Avatar alt="Rounded avatar" shape="rounded" size="lg" />
    </div>
  );
}

export const demo = AvatarDemo;
export const examples = {
  "avatar-sizes": AvatarSizesDemo,
};
