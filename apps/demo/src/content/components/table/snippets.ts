import type { ComponentSnippets } from "@/content/types";

export const snippets: ComponentSnippets = {
  "preview": `import {
  Badge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@nphuonha/ui-kit";

export function Example() {
  return (
    <div className="surface-curved relative w-full overflow-hidden rounded-card bg-card shadow-soft">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">INV-001</TableCell>
            <TableCell>Acme Studio</TableCell>
            <TableCell><Badge variant="success">Paid</Badge></TableCell>
            <TableCell className="text-right tabular-nums">$1,200.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}`,
  "usage": `<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Invoice</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>INV-001</TableCell>
      <TableCell><Badge variant="success">Paid</Badge></TableCell>
    </TableRow>
  </TableBody>
</Table>`
};
