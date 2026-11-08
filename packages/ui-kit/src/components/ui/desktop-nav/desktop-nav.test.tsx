import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { DesktopNav } from "./desktop-nav";

const items = [
  { value: "overview", label: "Overview" },
  { value: "components", label: "Components" },
  { value: "themes", label: "Themes" },
];

const Icon = () => <svg aria-hidden="true" />;
const ActiveIcon = () => <svg data-testid="active-icon" aria-hidden="true" />;

describe("DesktopNav", () => {
  it("swaps to the active icon for the selected item", () => {
    render(
      <DesktopNav
        items={[
          {
            value: "overview",
            label: "Overview",
            icon: Icon,
            activeIcon: ActiveIcon,
          },
        ]}
        defaultValue="overview"
      />,
    );

    expect(screen.getByTestId("active-icon")).toBeInTheDocument();
  });
  it("marks the default item active and switches on click", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(
      <DesktopNav
        items={items}
        defaultValue="overview"
        onValueChange={onValueChange}
      />,
    );

    const overview = screen.getByRole("button", { name: "Overview" });
    const components = screen.getByRole("button", { name: "Components" });

    expect(overview).toHaveAttribute("aria-current", "page");
    expect(components).not.toHaveAttribute("aria-current");

    await user.click(components);

    expect(components).toHaveAttribute("aria-current", "page");
    expect(overview).not.toHaveAttribute("aria-current");
    expect(onValueChange).toHaveBeenCalledWith("components");
  });

  it("respects controlled values", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(
      <DesktopNav
        items={items}
        value="overview"
        onValueChange={onValueChange}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Themes" }));

    expect(onValueChange).toHaveBeenCalledWith("themes");
    expect(screen.getByRole("button", { name: "Overview" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("renders links when href is provided", () => {
    render(
      <DesktopNav
        items={[
          { value: "docs", label: "Docs", href: "/docs" },
          { value: "components", label: "Components", href: "/docs/components" },
        ]}
        defaultValue="components"
      />,
    );

    expect(screen.getByRole("link", { name: "Docs" })).toHaveAttribute("href", "/docs");
    expect(screen.getByRole("link", { name: "Components" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("does not activate disabled items", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(
      <DesktopNav
        items={[
          { value: "overview", label: "Overview" },
          { value: "themes", label: "Themes", disabled: true },
        ]}
        defaultValue="overview"
        onValueChange={onValueChange}
      />,
    );

    const themes = screen.getByRole("button", { name: "Themes" });
    expect(themes).toBeDisabled();

    await user.click(themes);
    expect(onValueChange).not.toHaveBeenCalled();
  });
});
