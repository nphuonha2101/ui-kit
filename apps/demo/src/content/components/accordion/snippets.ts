import type { ComponentSnippets } from "@/content/types";

export const snippets: ComponentSnippets = {
  "preview": `import { Accordion } from "@nphuonha/ui-kit";
import {
  ArrowUUpLeftIcon,
  ShieldCheckIcon,
  TruckIcon,
} from "@phosphor-icons/react";

const items = [
  {
    value: "shipping",
    title: "How long does shipping take?",
    description: "Delivery windows and express options",
    icon: TruckIcon,
    content:
      "Orders leave our warehouse within 24 hours. Standard delivery arrives in 3–5 business days, and express options are available at checkout.",
  },
  {
    value: "returns",
    title: "Can I return an order?",
    description: "Free returns within 30 days",
    icon: ArrowUUpLeftIcon,
    content:
      "Yes. Start a return from your account and drop the parcel at any partner location. Refunds are issued to the original payment method.",
  },
  {
    value: "security",
    title: "How is my payment protected?",
    description: "Encryption and fraud monitoring",
    icon: ShieldCheckIcon,
    content:
      "Payments are encrypted in transit and processed by a PCI-compliant provider. Suspicious activity is monitored around the clock.",
  },
];

export function Example() {
  return (
    <div className="mx-auto w-full max-w-lg">
      <Accordion items={items} defaultValue={["shipping"]} />
    </div>
  );
}`,
  "usage": `import { Accordion } from "@nphuonha/ui-kit";

<Accordion
  items={[
    {
      value: "shipping",
      title: "How long does shipping take?",
      content: "Standard delivery arrives in 3–5 business days.",
    },
  ]}
  defaultValue={["shipping"]}
/>`,
  "examples": {
    "accordion-multiple": `<Accordion
  items={items}
  multiple
  defaultValue={["shipping", "returns"]}
/>`,
    "accordion-separated": `<Accordion
  items={items}
  variant="separated"
  defaultValue={["security"]}
/>`,
  },
};
