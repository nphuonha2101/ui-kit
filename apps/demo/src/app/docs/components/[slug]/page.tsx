import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ComponentDoc } from "@/components/docs/component-doc";
import { getComponent, registry } from "@/content/components";
import { getSnippets } from "@/content/components/snippets-map";
import { pageMetadata } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return registry.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const meta = getComponent(slug);
  if (!meta) {
    return {
      title: "Component not found",
      robots: { index: false, follow: false },
    };
  }
  return pageMetadata({
    title: meta.title,
    description: meta.description,
    path: `/docs/components/${slug}/`,
  });
}

export default async function ComponentPage({ params }: PageProps) {
  const { slug } = await params;
  const meta = getComponent(slug);
  const snippets = getSnippets(slug);
  if (!meta || !snippets) notFound();
  return <ComponentDoc meta={meta} snippets={snippets} />;
}
