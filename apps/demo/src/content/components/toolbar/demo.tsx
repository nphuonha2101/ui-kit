"use client";

import {
  ArrowClockwiseIcon,
  ArrowCounterClockwiseIcon,
  CursorIcon,
  HandIcon,
  ListBulletsIcon,
  ListNumbersIcon,
  MagnifyingGlassMinusIcon,
  MagnifyingGlassPlusIcon,
  TextAlignCenterIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
  TextBIcon,
  TextItalicIcon,
  TextUnderlineIcon,
} from "@phosphor-icons/react";
import {
  Toolbar,
  ToolbarButton,
  ToolbarGroup,
  ToolbarInput,
  ToolbarLink,
  ToolbarSeparator,
  ToolbarToggle,
} from "@nphuonha/ui-kit";

function ToolbarDemo() {
  return (
    <div className="flex w-full flex-col items-center gap-4">
      <div className="w-full overflow-x-auto">
        <Toolbar aria-label="Text formatting" className="mx-auto w-full max-w-xl">
          <ToolbarGroup aria-label="History">
            <ToolbarButton aria-label="Undo">
              <ArrowCounterClockwiseIcon size={16} />
            </ToolbarButton>
            <ToolbarButton aria-label="Redo">
              <ArrowClockwiseIcon size={16} />
            </ToolbarButton>
          </ToolbarGroup>
          <ToolbarSeparator />
          <ToolbarGroup aria-label="Text style">
            <ToolbarToggle aria-label="Bold" defaultPressed>
              <TextBIcon size={16} />
            </ToolbarToggle>
            <ToolbarToggle aria-label="Italic">
              <TextItalicIcon size={16} />
            </ToolbarToggle>
            <ToolbarToggle aria-label="Underline">
              <TextUnderlineIcon size={16} />
            </ToolbarToggle>
          </ToolbarGroup>
          <ToolbarSeparator />
          <ToolbarGroup aria-label="Alignment">
            <ToolbarButton aria-label="Align left">
              <TextAlignLeftIcon size={16} />
            </ToolbarButton>
            <ToolbarButton aria-label="Align center">
              <TextAlignCenterIcon size={16} />
            </ToolbarButton>
            <ToolbarButton aria-label="Align right">
              <TextAlignRightIcon size={16} />
            </ToolbarButton>
          </ToolbarGroup>
          <ToolbarSeparator />
          <ToolbarGroup aria-label="Lists">
            <ToolbarButton aria-label="Bulleted list">
              <ListBulletsIcon size={16} />
            </ToolbarButton>
            <ToolbarButton aria-label="Numbered list">
              <ListNumbersIcon size={16} />
            </ToolbarButton>
          </ToolbarGroup>
          <ToolbarLink href="#" className="ml-auto">
            Help
          </ToolbarLink>
        </Toolbar>
      </div>
      <p className="text-xs text-muted-foreground">
        Use the arrow keys to move between controls.
      </p>
    </div>
  );
}

function ToolbarVerticalDemo() {
  return (
    <Toolbar aria-label="Canvas tools" orientation="vertical" className="w-fit">
      <ToolbarButton aria-label="Select">
        <CursorIcon size={16} />
      </ToolbarButton>
      <ToolbarButton aria-label="Pan">
        <HandIcon size={16} />
      </ToolbarButton>
      <ToolbarSeparator />
      <ToolbarButton aria-label="Zoom in">
        <MagnifyingGlassPlusIcon size={16} />
      </ToolbarButton>
      <ToolbarButton aria-label="Zoom out">
        <MagnifyingGlassMinusIcon size={16} />
      </ToolbarButton>
    </Toolbar>
  );
}

function ToolbarSearchDemo() {
  return (
    <Toolbar aria-label="Table actions" variant="plain" className="w-full max-w-lg">
      <ToolbarButton>Filter</ToolbarButton>
      <ToolbarButton>Export</ToolbarButton>
      <ToolbarSeparator />
      <ToolbarInput
        aria-label="Search rows"
        placeholder="Search rows…"
        className="ml-auto"
      />
    </Toolbar>
  );
}

export const demo = ToolbarDemo;
export const examples = {
  "toolbar-vertical": ToolbarVerticalDemo,
  "toolbar-search": ToolbarSearchDemo,
};
