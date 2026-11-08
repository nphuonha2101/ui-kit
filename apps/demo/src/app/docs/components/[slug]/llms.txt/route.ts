import { getComponent, registry } from "@/content/components";
import { getSnippets } from "@/content/components/snippets-map";
import { buildComponentAgentPrompt } from "@/content/llms";

export const dynamic = "force-static";

export function generateStaticParams() {
  return registry.map((entry) => ({ slug: entry.slug }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const meta = getComponent(slug);
  const snippets = getSnippets(slug);

  if (!meta || !snippets) {
    return new Response("Component not found", { status: 404 });
  }

  return new Response(buildComponentAgentPrompt(meta, snippets), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
