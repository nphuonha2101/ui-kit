"use client";

import { IconButton, Tooltip } from "@nphuonha/ui-kit";
import { CopyIcon, MagnifyingGlassIcon, ShareIcon } from "@phosphor-icons/react";

function TooltipDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Tooltip content="Search documentation">
        <IconButton aria-label="Search"><MagnifyingGlassIcon size={18} /></IconButton>
      </Tooltip>
      <Tooltip content="Copy to clipboard">
        <IconButton aria-label="Copy" variant="secondary"><CopyIcon size={18} /></IconButton>
      </Tooltip>
      <Tooltip content="Share with your team">
        <IconButton aria-label="Share" variant="outline"><ShareIcon size={18} /></IconButton>
      </Tooltip>
    </div>
  );
}

export const demo = TooltipDemo;
export const examples = {};
