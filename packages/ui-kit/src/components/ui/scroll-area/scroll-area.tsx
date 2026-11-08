"use client";

import * as React from "react";
import { ScrollArea as ScrollAreaPrimitive } from "@base-ui/react/scroll-area";
import { cn } from "../../../lib/utils";

export interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "vertical" | "horizontal" | "both";
  scrollbar?: "auto" | "hidden";
  viewportClassName?: string;
  contentClassName?: string;
}

const scrollbarVisibility = cn(
  "pointer-events-none opacity-0 transition-opacity duration-[var(--duration-ui)] ease-[var(--ease-out-ui)]",
  "group-hover/scrollarea:pointer-events-auto group-hover/scrollarea:opacity-100",
  "group-focus-within/scrollarea:pointer-events-auto group-focus-within/scrollarea:opacity-100",
  "data-[scrolling]:pointer-events-auto data-[scrolling]:opacity-100",
);

export function ScrollArea({
  orientation = "vertical",
  scrollbar = "auto",
  viewportClassName,
  contentClassName,
  className,
  children,
  ...props
}: ScrollAreaProps) {
  const showVertical = scrollbar !== "hidden" && (orientation === "vertical" || orientation === "both");
  const showHorizontal = scrollbar !== "hidden" && (orientation === "horizontal" || orientation === "both");

  return (
    <ScrollAreaPrimitive.Root
      className={cn("group/scrollarea relative overflow-hidden", className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        className={cn(
          "size-full rounded-[inherit] outline-none focus-visible:ring-2 focus-visible:ring-ring/35",
          viewportClassName,
        )}
      >
        <ScrollAreaPrimitive.Content className={contentClassName}>
          {children}
        </ScrollAreaPrimitive.Content>
      </ScrollAreaPrimitive.Viewport>

      {showVertical ? (
        <ScrollAreaPrimitive.Scrollbar
          orientation="vertical"
          className={cn("flex w-2 touch-none select-none p-0.5", scrollbarVisibility)}
        >
          <ScrollAreaPrimitive.Thumb className="relative flex-1 rounded-full bg-muted-foreground/30 transition-colors hover:bg-muted-foreground/50" />
        </ScrollAreaPrimitive.Scrollbar>
      ) : null}

      {showHorizontal ? (
        <ScrollAreaPrimitive.Scrollbar
          orientation="horizontal"
          className={cn("flex h-2 touch-none select-none flex-col p-0.5", scrollbarVisibility)}
        >
          <ScrollAreaPrimitive.Thumb className="relative flex-1 rounded-full bg-muted-foreground/30 transition-colors hover:bg-muted-foreground/50" />
        </ScrollAreaPrimitive.Scrollbar>
      ) : null}

      {showVertical && showHorizontal ? (
        <ScrollAreaPrimitive.Corner className="bg-transparent" />
      ) : null}
    </ScrollAreaPrimitive.Root>
  );
}
