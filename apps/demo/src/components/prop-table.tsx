import type { ComponentProp } from "@/lib/registry";

export function PropTable({ props }: { props: ComponentProp[] }) {
  if (props.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">No props documented yet.</p>
    );
  }

  return (
    <div className="surface-curved relative overflow-x-auto rounded-card bg-card shadow-soft">
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
  );
}
