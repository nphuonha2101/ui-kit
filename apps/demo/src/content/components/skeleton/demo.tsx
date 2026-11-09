"use client";

import { Skeleton } from "@nphuonha/ui-kit";

function SkeletonDemo() {
  return (
    <div className="mx-auto flex w-full max-w-md items-start gap-3">
      <Skeleton variant="circle" className="size-12" />
      <div className="flex flex-1 flex-col gap-2">
        <Skeleton variant="text" className="w-2/3" />
        <Skeleton variant="text" />
        <Skeleton variant="text" className="w-4/5" />
      </div>
    </div>
  );
}

function SkeletonLinesDemo() {
  return (
    <div className="mx-auto w-full max-w-md">
      <Skeleton variant="text" lines={4} />
    </div>
  );
}

function SkeletonCardDemo() {
  return (
    <div className="mx-auto w-full max-w-sm rounded-card bg-card p-5 shadow-[var(--shadow-soft)]">
      <Skeleton className="mb-4 h-36 w-full" />
      <div className="flex flex-col gap-2">
        <Skeleton variant="text" className="w-1/2" />
        <Skeleton variant="text" />
        <Skeleton variant="text" className="w-3/4" />
      </div>
    </div>
  );
}

export const demo = SkeletonDemo;
export const examples = {
  "skeleton-lines": SkeletonLinesDemo,
  "skeleton-card": SkeletonCardDemo,
};
