import type { ComponentProp } from "@/content/types";
import { PropTableCopyButton } from "./prop-table-copy";

export function PropTable({
  props,
  title,
}: {
  props: ComponentProp[];
  title?: string;
}) {
  if (props.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">No props documented yet.</p>
    );
  }

  return (
    <div className="surface-curved relative overflow-hidden rounded-card bg-card shadow-soft">
      <div className="flex items-center justify-between gap-3 border-b border-border/60 bg-surface/40 px-4 py-2">
        <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
          {props.length} {props.length === 1 ? "prop" : "props"}
        </span>
        <PropTableCopyButton props={props} title={title} />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-surface/60 text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-semibold">Prop</th>
              <th className="px-4 py-3 font-semibold">Type</th>
              <th className="px-4 py-3 font-semibold">Default</th>
              <th className="px-4 py-3 font-semibold">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {props.map((prop) => (
              <tr key={prop.name} className="transition-colors hover:bg-surface/40">
                <td className="whitespace-nowrap px-4 py-3 font-mono text-xs font-medium text-foreground">
                  {prop.name}
                </td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                  {prop.type}
                </td>
                <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-muted-foreground">
                  {prop.default ?? "—"}
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  {prop.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
