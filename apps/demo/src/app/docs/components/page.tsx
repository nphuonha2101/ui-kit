import type { Metadata } from "next";
import { ComponentIndex } from "@/components/docs/component-index";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Components",
  description:
    "Browse the accessible React components in @nphuonha/ui-kit with live previews, code and API reference.",
  path: "/docs/components/",
});

export default function ComponentsPage() {
  return <ComponentIndex />;
}
