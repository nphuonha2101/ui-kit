import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ToggleGroup } from "./toggle-group";

const items = [
  { value: "grid", label: "Grid" },
  { value: "list", label: "List" },
  { value: "board", label: "Board" },
];

describe("ToggleGroup", () => {
  it("keeps a single item pressed and switches between items", async () => {
    const user = userEvent.setup();
    render(
      <ToggleGroup
        aria-label="View"
        items={items}
        defaultValue={["grid"]}
      />,
    );

    const grid = screen.getByRole("button", { name: "Grid" });
    const list = screen.getByRole("button", { name: "List" });
    expect(grid).toHaveAttribute("aria-pressed", "true");

    await user.click(list);
    expect(list).toHaveAttribute("aria-pressed", "true");
    expect(grid).toHaveAttribute("aria-pressed", "false");
  });

  it("allows multiple pressed items", async () => {
    const user = userEvent.setup();
    render(
      <ToggleGroup
        aria-label="Filters"
        items={items}
        multiple
        defaultValue={["grid"]}
      />,
    );

    await user.click(screen.getByRole("button", { name: "List" }));
    expect(screen.getByRole("button", { name: "Grid" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByRole("button", { name: "List" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });
});
