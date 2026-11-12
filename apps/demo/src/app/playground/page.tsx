import type { Metadata } from "next";
import { Playground } from "@/components/playground/playground";

export const metadata: Metadata = {
  title: "Playground",
  description:
    "Edit kit components in a VS Code-style editor with TypeScript hints and a client-side sandbox.",
  robots: { index: false, follow: false },
};

export default function PlaygroundPage() {
  return <Playground />;
}
