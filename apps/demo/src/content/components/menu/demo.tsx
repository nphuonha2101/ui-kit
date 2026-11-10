"use client";

import { Button, Menu } from "@nphuonha/ui-kit";
import {
  CopyIcon,
  PencilSimpleIcon,
  TrashIcon,
} from "@phosphor-icons/react";

function MenuDemo() {
  return (
    <div className="mx-auto flex w-full max-w-sm justify-center">
      <Menu
        trigger={<Button variant="secondary">Actions</Button>}
        items={[
          { label: "Edit", icon: PencilSimpleIcon, shortcut: "E" },
          { label: "Duplicate", icon: CopyIcon },
          { type: "separator" },
          { label: "Delete", icon: TrashIcon, danger: true },
        ]}
      />
    </div>
  );
}

function MenuGroupsDemo() {
  return (
    <div className="mx-auto flex w-full max-w-sm justify-center">
      <Menu
        trigger={<Button variant="secondary">Open menu</Button>}
        items={[
          {
            type: "group",
            label: "Document",
            items: [
              { label: "Rename", shortcut: "F2" },
              { label: "Move to…", shortcut: "⌘⇧M" },
              { label: "Duplicate", shortcut: "⌘D" },
            ],
          },
          { type: "separator" },
          {
            type: "group",
            label: "Danger zone",
            items: [{ label: "Move to trash", danger: true }],
          },
        ]}
      />
    </div>
  );
}

function MenuSubmenuDemo() {
  return (
    <div className="mx-auto flex w-full max-w-sm justify-center">
      <Menu
        trigger={<Button variant="secondary">Export</Button>}
        items={[
          {
            type: "submenu",
            label: "Download as",
            items: [
              { label: "PDF" },
              { label: "CSV" },
              { label: "Markdown" },
            ],
          },
          { type: "separator" },
          { label: "Copy link" },
        ]}
      />
    </div>
  );
}

export const demo = MenuDemo;
export const examples = {
  "menu-groups": MenuGroupsDemo,
  "menu-submenu": MenuSubmenuDemo,
};
