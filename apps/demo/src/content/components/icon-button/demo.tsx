"use client";

import { IconButton } from "@nphuonha/ui-kit";
import { CopyIcon, HeartIcon, MagnifyingGlassIcon, ShareIcon } from "@phosphor-icons/react";

function IconButtonDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <IconButton aria-label="Search"><MagnifyingGlassIcon size={18} /></IconButton>
      <IconButton aria-label="Copy" variant="secondary"><CopyIcon size={18} /></IconButton>
      <IconButton aria-label="Like" variant="soft"><HeartIcon size={18} /></IconButton>
      <IconButton aria-label="Share" variant="outline"><ShareIcon size={18} /></IconButton>
      <IconButton aria-label="Disabled share" variant="outline" disabled><ShareIcon size={18} /></IconButton>
    </div>
  );
}

export const demo = IconButtonDemo;
export const examples = {};
