import {
  Badge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@nphuonha/ui-kit";

const invoices = [
  { id: "INV-001", client: "Acme Studio", amount: "$1,200.00", status: "Paid" },
  { id: "INV-002", client: "Northwind", amount: "$480.00", status: "Pending" },
  { id: "INV-003", client: "Lumen Labs", amount: "$2,150.00", status: "Paid" },
  { id: "INV-004", client: "Kite & Co.", amount: "$320.00", status: "Overdue" },
];

const statusVariant = {
  Paid: "success",
  Pending: "warning",
  Overdue: "danger",
} as const;

function TableDemo() {
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
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell className="font-medium text-foreground">
                {invoice.id}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {invoice.client}
              </TableCell>
              <TableCell>
                <Badge variant={statusVariant[invoice.status as keyof typeof statusVariant]}>
                  {invoice.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right tabular-nums">
                {invoice.amount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export const demo = TableDemo;
export const examples = {};
