"use client";

import * as React from "react";
import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";
import { cn } from "../../../lib/utils";
import { useKitIcon } from "../_shared/icon-provider";

const sizeClasses = {
  sm: "size-8 text-xs",
  default: "size-10 text-sm",
  lg: "size-12 text-base",
  xl: "size-16 text-lg",
} as const;

const shapeClasses = {
  circle: "rounded-full",
  rounded: "rounded-control",
} as const;

const iconSizes = {
  sm: 14,
  default: 17,
  lg: 20,
  xl: 26,
} as const;

const pixelSizes = {
  sm: 32,
  default: 40,
  lg: 48,
  xl: 64,
} as const;

export interface AvatarProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  src?: string;
  alt?: string;
  fallback?: React.ReactNode;
  size?: keyof typeof sizeClasses;
  shape?: keyof typeof shapeClasses;
  delay?: number;
}

function getInitials(name?: string) {
  if (!name?.trim()) return null;
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function Avatar({
  src,
  alt,
  fallback,
  size = "default",
  shape = "circle",
  delay = 0,
  className,
  ...props
}: AvatarProps) {
  const UserIcon = useKitIcon("user");
  const initials = getInitials(alt);
  const content =
    fallback !== undefined ? (
      fallback
    ) : initials ? (
      initials
    ) : (
      <UserIcon size={iconSizes[size]} />
    );

  return (
    <AvatarPrimitive.Root
      className={cn(
        "surface-curved-soft relative inline-flex shrink-0 select-none items-center justify-center overflow-hidden bg-primary-soft font-semibold text-primary-soft-foreground",
        sizeClasses[size],
        shapeClasses[shape],
        className,
      )}
      {...props}
    >
      {src ? (
        <AvatarPrimitive.Image
          src={src}
          alt={alt ?? ""}
          width={pixelSizes[size]}
          height={pixelSizes[size]}
          className="size-full object-cover"
        />
      ) : null}
      <AvatarPrimitive.Fallback
        delay={delay}
        className="flex size-full items-center justify-center"
      >
        {content}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  );
}
