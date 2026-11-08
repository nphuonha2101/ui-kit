import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { BottomNav } from "./bottom-nav";

const Icon = () => <svg aria-hidden="true" />;
const ActiveIcon = () => <svg data-testid="active-icon" aria-hidden="true" />;

const items = [
  { value: "home", label: "Home", icon: Icon },
  { value: "search", label: "Search", icon: Icon },
  { value: "profile", label: "Profile", icon: Icon },
];

describe("BottomNav", () => {
  it("swaps to the active icon for the selected item", () => {
    render(
      <BottomNav
        items={[
          {
            value: "home",
            label: "Home",
            icon: Icon,
            activeIcon: ActiveIcon,
          },
        ]}
        defaultValue="home"
      />,
    );

    expect(screen.getByTestId("active-icon")).toBeInTheDocument();
  });
  it("marks the default item active and switches on click", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(
      <BottomNav
        items={items}
        defaultValue="home"
        onValueChange={onValueChange}
      />,
    );

    const home = screen.getByRole("button", { name: "Home" });
    const search = screen.getByRole("button", { name: "Search" });

    expect(home).toHaveAttribute("aria-current", "page");
    expect(search).not.toHaveAttribute("aria-current");

    await user.click(search);

    expect(search).toHaveAttribute("aria-current", "page");
    expect(home).not.toHaveAttribute("aria-current");
    expect(onValueChange).toHaveBeenCalledWith("search");
  });

  it("respects controlled values", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(
      <BottomNav
        items={items}
        value="home"
        onValueChange={onValueChange}
      />,
    );

    const search = screen.getByRole("button", { name: "Search" });
    await user.click(search);

    expect(onValueChange).toHaveBeenCalledWith("search");
    expect(screen.getByRole("button", { name: "Home" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("renders links when href is provided", () => {
    render(
      <BottomNav
        items={[
          { value: "home", label: "Home", icon: Icon, href: "/" },
          { value: "search", label: "Search", icon: Icon, href: "/search" },
        ]}
        defaultValue="search"
      />,
    );

    const home = screen.getByRole("link", { name: "Home" });
    const search = screen.getByRole("link", { name: "Search" });

    expect(home).toHaveAttribute("href", "/");
    expect(search).toHaveAttribute("aria-current", "page");
  });

  it("does not activate disabled items", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(
      <BottomNav
        items={[
          { value: "home", label: "Home", icon: Icon },
          { value: "search", label: "Search", icon: Icon, disabled: true },
        ]}
        defaultValue="home"
        onValueChange={onValueChange}
      />,
    );

    const search = screen.getByRole("button", { name: "Search" });
    expect(search).toBeDisabled();

    await user.click(search);
    expect(onValueChange).not.toHaveBeenCalled();
  });
});
