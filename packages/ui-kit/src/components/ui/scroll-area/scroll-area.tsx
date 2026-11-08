"use client";

import * as React from "react";
import { ScrollArea as ScrollAreaPrimitive } from "@base-ui/react/scroll-area";
import { cn } from "../../../lib/utils";

export interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "vertical" | "horizontal" | "both";
  viewportClassName?: string;
  contentClassName?: string;
}

export function ScrollArea({
  orientation = "vertical",
  viewportClassName,
  contentClassName,
  className,
  children,
  ...props
}: ScrollAreaProps) {
  const showVertical = orientation === "vertical" || orientation === "both";
  const showHorizontal = orientation === "horizontal" || orientation === "both";

  return (
    <ScrollAreaPrimitive.Root
      className={cn("relative overflow-hidden", className)}
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
          className="flex w-2 touch-none select-none p-0.5 transition-colors"
        >
          <ScrollAreaPrimitive.Thumb className="relative flex-1 rounded-full bg-muted-foreground/30 transition-colors hover:bg-muted-foreground/50" />
        </ScrollAreaPrimitive.Scrollbar>
      ) : null}

      {showHorizontal ? (
        <ScrollAreaPrimitive.Scrollbar
          orientation="horizontal"
          className="flex h-2 touch-none select-none flex-col p-0.5 transition-colors"
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
