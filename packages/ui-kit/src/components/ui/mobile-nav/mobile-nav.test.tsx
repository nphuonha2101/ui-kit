import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { MobileNav, type MobileNavItem } from "./mobile-nav";

const items: MobileNavItem[] = [
  { value: "home", label: "Home" },
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
  { value: "pricing", label: "Pricing", href: "/pricing" },
];

describe("MobileNav", () => {
  it("opens with a logo and collapsible submenus", async () => {
    const user = userEvent.setup();
    render(
      <MobileNav
        items={items}
        defaultValue="home"
        logo={<span>Acme</span>}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Open menu" }));

    const dialog = await screen.findByRole("dialog", { name: "Menu" });
    expect(dialog).toBeInTheDocument();
    expect(screen.getByText("Acme")).toBeInTheDocument();

    const components = screen.getByRole("button", { name: "Components" });
    expect(components).toHaveAttribute("aria-expanded", "false");

    await user.click(components);
    expect(components).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("button", { name: "Forms" })).toBeInTheDocument();
  });

  it("selects a leaf and closes the menu", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <MobileNav
        items={items}
        defaultValue="home"
        onValueChange={onValueChange}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Open menu" }));
    await user.click(await screen.findByRole("button", { name: "Components" }));
    await user.click(screen.getByRole("button", { name: "Buttons" }));

    expect(onValueChange).toHaveBeenCalledWith("buttons");
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("renders links for leaf items with href", async () => {
    const user = userEvent.setup();
    render(<MobileNav items={items} defaultValue="home" />);

    await user.click(screen.getByRole("button", { name: "Open menu" }));

    expect(screen.getByRole("link", { name: "Pricing" })).toHaveAttribute(
      "href",
      "/pricing",
    );
  });

  it("staggers items and supports large centered items", async () => {
    const user = userEvent.setup();
    render(
      <MobileNav
        items={items}
        size="lg"
        itemsAlign="center"
        defaultValue="home"
      />,
    );

    await user.click(screen.getByRole("button", { name: "Open menu" }));

    const home = screen.getByRole("button", { name: "Home" });
    expect(home).toHaveClass("text-[1.75rem]");
    expect(home.parentElement).toHaveClass("mobile-nav-item");
    expect(home.parentElement?.style.animationDelay).toBe("0ms");

    const pricing = screen.getByRole("link", { name: "Pricing" });
    expect(pricing.parentElement?.style.animationDelay).toBe("90ms");

    expect(
      screen.getByRole("navigation", { name: "Mobile navigation" }),
    ).toHaveClass("justify-center");
  });
});
