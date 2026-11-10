import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "../button";
import { Menu } from "./menu";

describe("Menu", () => {
  it("opens and invokes an item action", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(
      <Menu
        trigger={<Button>Actions</Button>}
        items={[
          { label: "Edit", onSelect },
          { type: "separator" },
          { label: "Delete", danger: true },
        ]}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Actions" }));
    await user.click(await screen.findByRole("menuitem", { name: "Edit" }));

    expect(onSelect).toHaveBeenCalledTimes(1);
    await waitFor(() =>
      expect(screen.queryByRole("menu")).not.toBeInTheDocument(),
    );
  });

  it("renders disabled items without firing their action", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(
      <Menu
        trigger={<Button>Open</Button>}
        items={[{ label: "Archive", disabled: true, onSelect }]}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Open" }));
    const item = await screen.findByRole("menuitem", { name: "Archive" });

    expect(item).toHaveAttribute("data-disabled");
    await user.click(item);
    expect(onSelect).not.toHaveBeenCalled();
  });

  it("renders submenu triggers", async () => {
    const user = userEvent.setup();
    render(
      <Menu
        trigger={<Button>Open</Button>}
        items={[
          {
            type: "submenu",
            label: "Export",
            items: [{ label: "PDF" }, { label: "CSV" }],
          },
        ]}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Open" }));
    expect(
      await screen.findByRole("menuitem", { name: "Export" }),
    ).toBeInTheDocument();
  });
});
