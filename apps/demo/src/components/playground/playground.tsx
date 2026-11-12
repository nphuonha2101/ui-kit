"use client";

import dynamic from "next/dynamic";
import { Spinner } from "@nphuonha/ui-kit";

const PlaygroundClient = dynamic(
  () => import("./playground-client").then((module) => module.PlaygroundClient),
  {
    ssr: false,
    loading: () => (
      <div className="flex min-h-[60vh] items-center justify-center gap-2 text-sm text-muted-foreground">
        <Spinner size={16} />
        Loading playground…
      </div>
    ),
  },
);

export function Playground() {
  return <PlaygroundClient />;
}
