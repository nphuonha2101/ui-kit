"use client";

import * as React from "react";
import { IconButton, Tooltip } from "@nphuonha/ui-kit";
import { CopyIcon, MagnifyingGlassIcon, ShareIcon } from "@phosphor-icons/react";

function TooltipDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <TooltipWrapper content="Search documentation">
        <IconButton aria-label="Search"><MagnifyingGlassIcon size={18} /></IconButton>
      </TooltipWrapper>
      <TooltipWrapper content="Copy to clipboard">
        <IconButton aria-label="Copy" variant="secondary"><CopyIcon size={18} /></IconButton>
      </TooltipWrapper>
      <TooltipWrapper content="Share with your team">
        <IconButton aria-label="Share" variant="outline"><ShareIcon size={18} /></IconButton>
      </TooltipWrapper>
    </div>
  );
}

function TooltipWrapper({ content, children }: { content: string; children: React.ReactElement }) {
  return <Tooltip content={content}>{children}</Tooltip>;
}

export const demo = TooltipDemo;
export const examples = {};
