import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Accordion } from "./accordion";

const items = [
  {
    value: "shipping",
    title: "How long does shipping take?",
    content: "Standard delivery arrives in 3–5 business days.",
  },
  {
    value: "returns",
    title: "Can I return an order?",
    content: "Yes, returns are free within 30 days.",
  },
];

describe("Accordion", () => {
  it("expands the item marked as default", () => {
    render(<Accordion items={items} defaultValue={["shipping"]} />);

    const trigger = screen.getByRole("button", { name: "How long does shipping take?" });
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Standard delivery arrives in 3–5 business days.")).toBeInTheDocument();
  });

  it("opens a panel when its trigger is clicked", async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} />);

    const trigger = screen.getByRole("button", { name: "Can I return an order?" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    await user.click(trigger);

    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Yes, returns are free within 30 days.")).toBeInTheDocument();
  });

  it("keeps one item open at a time by default", async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} defaultValue={["shipping"]} />);

    await user.click(screen.getByRole("button", { name: "Can I return an order?" }));

    expect(
      screen.getByRole("button", { name: "How long does shipping take?" }),
    ).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByRole("button", { name: "Can I return an order?" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
  });
});
