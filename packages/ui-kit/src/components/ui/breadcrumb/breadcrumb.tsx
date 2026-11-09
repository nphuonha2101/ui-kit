"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { useKitIcon } from "../_shared/icon-provider";

export function Breadcrumb({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"nav">) {
  return (
    <nav
      aria-label="breadcrumb"
      className={cn("text-sm", className)}
      {...props}
    />
  );
}

export function BreadcrumbList({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"ol">) {
  return (
    <ol
      className={cn(
        "flex flex-wrap items-center gap-1.5 break-words text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

export function BreadcrumbItem({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"li">) {
  return (
    <li
      className={cn("inline-flex items-center gap-1.5", className)}
      {...props}
    />
  );
}

export interface BreadcrumbLinkProps
  extends React.ComponentPropsWithoutRef<"a"> {
  /** Render the child element (for example a framework Link) with breadcrumb styles. */
  asChild?: boolean;
}

export function BreadcrumbLink({
  asChild,
  className,
  children,
  ...props
}: BreadcrumbLinkProps) {
  const classes = cn(
    "rounded-2xs outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40",
    className,
  );

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<{ className?: string }>;
    return React.cloneElement(child, {
      className: cn(classes, child.props.className),
    });
  }

  return (
    <a className={classes} {...props}>
      {children}
    </a>
  );
}

export function BreadcrumbPage({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"span">) {
  return (
    <span
      aria-current="page"
      className={cn("font-medium text-foreground", className)}
      {...props}
    />
  );
}

export function BreadcrumbSeparator({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"li">) {
  const ChevronRight = useKitIcon("chevronRight");
  return (
    <li
      role="presentation"
      aria-hidden="true"
      className={cn("text-muted-foreground/60 [&>svg]:size-3.5", className)}
      {...props}
    >
      {children ?? <ChevronRight size={14} />}
    </li>
  );
}

export function BreadcrumbEllipsis({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"span">) {
  return (
    <span
      role="presentation"
      aria-hidden="true"
      className={cn(
        "inline-flex size-6 items-center justify-center text-muted-foreground",
        className,
      )}
      {...props}
    >
      …
    </span>
  );
}
