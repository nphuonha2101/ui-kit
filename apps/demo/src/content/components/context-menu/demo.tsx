"use client";

import { ContextMenu } from "@nphuonha/ui-kit";
import {
  CopyIcon,
  PencilSimpleIcon,
  TrashIcon,
} from "@phosphor-icons/react";

function ContextMenuDemo() {
  return (
    <div className="mx-auto flex w-full max-w-sm justify-center">
      <ContextMenu
        triggerClassName="w-full rounded-control border border-dashed border-border px-4 py-10 text-center text-sm text-muted-foreground"
        items={[
          { label: "Edit", icon: PencilSimpleIcon, shortcut: "E" },
          { label: "Duplicate", icon: CopyIcon },
          { type: "separator" },
          { label: "Delete", icon: TrashIcon, danger: true },
        ]}
      >
        Right-click here
      </ContextMenu>
    </div>
  );
}

function ContextMenuSubmenuDemo() {
  return (
    <div className="mx-auto flex w-full max-w-sm justify-center">
      <ContextMenu
        triggerClassName="w-full rounded-control border border-dashed border-border px-4 py-10 text-center text-sm text-muted-foreground"
        items={[
          {
            type: "submenu",
            label: "Share",
            items: [{ label: "Copy link" }, { label: "Email" }],
          },
          { type: "separator" },
          { label: "Download" },
        ]}
      >
        Right-click here
      </ContextMenu>
    </div>
  );
}

export const demo = ContextMenuDemo;
export const examples = {
  "context-menu-submenu": ContextMenuSubmenuDemo,
};
