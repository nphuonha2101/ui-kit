import type { Metadata } from "next";
import { ComponentIndex } from "@/components/docs/component-index";

export const metadata: Metadata = { title: "Components" };

export default function ComponentsPage() {
  return <ComponentIndex />;
}
