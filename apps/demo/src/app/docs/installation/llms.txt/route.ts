import { INSTALLATION_AGENT_PROMPT } from "@/content/llms";

export const dynamic = "force-static";

export function GET() {
  return new Response(INSTALLATION_AGENT_PROMPT, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
