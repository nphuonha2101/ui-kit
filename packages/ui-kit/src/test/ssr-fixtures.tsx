import * as React from "react";
import { useForm } from "react-hook-form";
import {
  Accordion,
  Alert,
  AlertDialog,
  Avatar,
  Badge,
  BottomNav,
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  ButtonLink,
  Calendar,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  DatePicker,
  DesktopNav,
  Dialog,
  EmptyState,
  Field,
  FileUpload,
  IconButton,
  IconProvider,
  Input,
  Kbd,
  KbdGroup,
  Label,
  MobileNav,
  NumberField,
  Pagination,
  Popover,
  Progress,
  RadioGroup,
  ScrollArea,
  Select,
  Separator,
  Sheet,
  Skeleton,
  Slider,
  Spinner,
  Switch,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  Textarea,
  Toaster,
  Toggle,
  ToggleGroup,
  Tooltip,
  accentStyle,
} from "../index";
import { Form, FormField } from "../components/ui/form";

function TestIcon({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      className={className}
      aria-hidden="true"
    />
  );
}

const selectOptions = [
  { value: "home", label: "Home" },
  { value: "search", label: "Search", disabled: true },
];

const navItems = [
  { value: "home", label: "Home", icon: TestIcon, activeIcon: TestIcon },
  { value: "search", label: "Search", icon: TestIcon, badge: 2 },
];

const desktopNavItems = [
  { value: "overview", label: "Overview" },
  {
    value: "components",
    label: "Components",
    children: [
      { value: "buttons", label: "Buttons" },
      {
        value: "forms",
        label: "Forms",
        children: [{ value: "input", label: "Input" }],
      },
    ],
  },
];

function FormFixture() {
  const form = useForm<{ email: string }>({ defaultValues: { email: "" } });
  return (
    <Form {...form}>
      <form>
        <FormField
          control={form.control}
          name="email"
          label="Email"
          description="We never share it."
          render={({ field }) => (
            <Input type="email" placeholder="you@example.com" {...field} />
          )}
        />
      </form>
    </Form>
  );
}

export interface SsrFixture {
  name: string;
  render: () => React.ReactElement;
}

export function SsrRoot({ children }: { children: React.ReactNode }) {
  return (
    <div data-ui="kit" style={accentStyle("#0d9488", "light")}>
      {children}
    </div>
  );
}

export const ssrFixtures: SsrFixture[] = [
  {
    name: "Accordion",
    render: () => (
      <Accordion
        items={[
          {
            value: "shipping",
            title: "Shipping",
            description: "Delivery options",
            content: "Ships in 2-3 business days.",
          },
          { value: "returns", title: "Returns", content: "30-day return window." },
        ]}
      />
    ),
  },
  {
    name: "Alert",
    render: () => (
      <Alert variant="warning" title="Heads up" icon={TestIcon}>
        Your session expires soon.
      </Alert>
    ),
  },
  {
    name: "AlertDialog",
    render: () => (
      <AlertDialog trigger={<Button>Delete</Button>} title="Delete item?">
        This action cannot be undone.
      </AlertDialog>
    ),
  },
  {
    name: "Avatar",
    render: () => <Avatar alt="Ada Lovelace" fallback="AL" />,
  },
  {
    name: "Badge",
    render: () => <Badge>New</Badge>,
  },
  {
    name: "BottomNav",
    render: () => <BottomNav items={navItems} defaultValue="home" />,
  },
  {
    name: "Breadcrumb",
    render: () => (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbEllipsis />
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Components</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    ),
  },
  {
    name: "Button",
    render: () => (
      <Button startIcon={TestIcon} endIcon={TestIcon}>
        Continue
      </Button>
    ),
  },
  {
    name: "ButtonLink",
    render: () => (
      <ButtonLink href="/docs" startIcon={TestIcon}>
        Docs
      </ButtonLink>
    ),
  },
  {
    name: "Calendar",
    render: () => (
      <Calendar
        mode="single"
        locale="en-US"
        defaultMonth={new Date(2026, 0, 1)}
        defaultValue={new Date(2026, 0, 15)}
        label="Start date"
        description="Choose a launch date."
      />
    ),
  },
  {
    name: "Card",
    render: () => (
      <Card>
        <CardHeader>
          <CardTitle>Card title</CardTitle>
          <CardDescription>Card description</CardDescription>
        </CardHeader>
        <CardContent>Card content</CardContent>
        <CardFooter>
          <Button>Action</Button>
        </CardFooter>
      </Card>
    ),
  },
  {
    name: "Checkbox",
    render: () => (
      <Checkbox label="Accept terms" description="Required to continue" />
    ),
  },
  {
    name: "DatePicker",
    render: () => (
      <DatePicker
        label="Start date"
        description="Choose a launch date."
        locale="en-US"
        defaultValue={new Date(2026, 0, 15)}
      />
    ),
  },
  {
    name: "DesktopNav",
    render: () => <DesktopNav items={desktopNavItems} defaultValue="overview" />,
  },
  {
    name: "Dialog",
    render: () => (
      <Dialog trigger={<Button>Open</Button>} title="Dialog title" description="Dialog description">
        Dialog body
      </Dialog>
    ),
  },
  {
    name: "EmptyState",
    render: () => (
      <EmptyState
        icon={TestIcon}
        title="Nothing here"
        description="Create your first item to get started."
        action={<Button>Create item</Button>}
      />
    ),
  },
  {
    name: "Field",
    render: () => (
      <Field label="Email" description="We never share it." error="Email is required" required>
        <Input placeholder="you@example.com" />
      </Field>
    ),
  },
  {
    name: "FileUpload",
    render: () => (
      <FileUpload
        label="Attachments"
        description="PDF or images up to 5 MB."
        accept="image/*,.pdf"
        maxSize={5 * 1024 * 1024}
        maxFiles={5}
      />
    ),
  },
  {
    name: "Form / FormField",
    render: () => <FormFixture />,
  },
  {
    name: "IconButton",
    render: () => (
      <IconButton aria-label="Search">
        <TestIcon />
      </IconButton>
    ),
  },
  {
    name: "IconProvider",
    render: () => (
      <IconProvider icons={{ check: TestIcon }}>
        <Button startIcon={TestIcon}>Save</Button>
      </IconProvider>
    ),
  },
  {
    name: "Input",
    render: () => <Input placeholder="Email" />,
  },
  {
    name: "Kbd",
    render: () => (
      <KbdGroup>
        <Kbd>Ctrl</Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>
    ),
  },
  {
    name: "Label",
    render: () => <Label htmlFor="name">Name</Label>,
  },
  {
    name: "MobileNav",
    render: () => (
      <MobileNav items={desktopNavItems} trigger={<Button>Menu</Button>} />
    ),
  },
  {
    name: "NumberField",
    render: () => <NumberField label="Quantity" defaultValue={1} min={0} />,
  },
  {
    name: "Pagination",
    render: () => <Pagination pageCount={12} defaultPage={4} />,
  },
  {
    name: "Popover",
    render: () => (
      <Popover trigger={<Button>Open popover</Button>} title="Popover">
        Popover body
      </Popover>
    ),
  },
  {
    name: "Progress",
    render: () => <Progress value={60} label="Upload" showValue />,
  },
  {
    name: "RadioGroup",
    render: () => (
      <RadioGroup
        label="Plan"
        options={[
          { value: "free", label: "Free", description: "For personal projects" },
          { value: "pro", label: "Pro" },
        ]}
      />
    ),
  },
  {
    name: "ScrollArea",
    render: () => (
      <ScrollArea className="h-40">
        <p>Scrollable content</p>
      </ScrollArea>
    ),
  },
  {
    name: "Select",
    render: () => <Select options={selectOptions} aria-label="Destination" />,
  },
  {
    name: "Separator",
    render: () => <Separator orientation="vertical" decorative={false} />,
  },
  {
    name: "Sheet",
    render: () => (
      <Sheet trigger={<Button>Open sheet</Button>} title="Sheet title">
        Sheet body
      </Sheet>
    ),
  },
  {
    name: "Skeleton",
    render: () => <Skeleton className="h-4 w-40" />,
  },
  {
    name: "Slider",
    render: () => (
      <Slider
        label="Volume"
        defaultValue={40}
        showValue
        marks={[{ value: 0, label: "0" }, { value: 100, label: "100" }]}
      />
    ),
  },
  {
    name: "Spinner",
    render: () => <Spinner />,
  },
  {
    name: "Switch",
    render: () => (
      <Switch label="Notifications" description="Receive email updates" />
    ),
  },
  {
    name: "Table",
    render: () => (
      <Table>
        <TableCaption>Recent invoices</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>INV-001</TableCell>
            <TableCell>Paid</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    ),
  },
  {
    name: "Tabs",
    render: () => (
      <Tabs
        items={[
          { value: "account", label: "Account", content: "Account settings" },
          { value: "billing", label: "Billing", content: "Billing settings" },
        ]}
      />
    ),
  },
  {
    name: "Textarea",
    render: () => <Textarea placeholder="Message" />,
  },
  {
    name: "Toaster",
    render: () => <Toaster />,
  },
  {
    name: "Toggle",
    render: () => <Toggle aria-label="Bold">B</Toggle>,
  },
  {
    name: "ToggleGroup",
    render: () => (
      <ToggleGroup
        aria-label="View"
        items={[
          { value: "grid", label: "Grid", icon: TestIcon },
          { value: "list", label: "List", icon: TestIcon },
        ]}
      />
    ),
  },
  {
    name: "Tooltip",
    render: () => (
      <Tooltip content="Search">
        <Button>Hover me</Button>
      </Tooltip>
    ),
  },
];
