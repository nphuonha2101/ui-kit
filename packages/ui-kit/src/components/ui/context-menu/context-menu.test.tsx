import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ContextMenu } from "./context-menu";

describe("ContextMenu", () => {
  it("opens on right click and invokes an item action", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(
      <ContextMenu
        items={[
          { label: "Edit", onSelect },
          { type: "separator" },
          { label: "Delete", danger: true },
        ]}
      >
        <div>Right-click me</div>
      </ContextMenu>,
    );

    fireEvent.contextMenu(screen.getByText("Right-click me"));
    await user.click(await screen.findByRole("menuitem", { name: "Edit" }));

    expect(onSelect).toHaveBeenCalledTimes(1);
    await waitFor(() =>
      expect(screen.queryByRole("menu")).not.toBeInTheDocument(),
    );
  });

  it("renders disabled items without firing their action", async () => {
    const onSelect = vi.fn();
    render(
      <ContextMenu items={[{ label: "Archive", disabled: true, onSelect }]}>
        <div>Right-click me</div>
      </ContextMenu>,
    );

    fireEvent.contextMenu(screen.getByText("Right-click me"));
    const item = await screen.findByRole("menuitem", { name: "Archive" });

    expect(item).toHaveAttribute("data-disabled");
    fireEvent.click(item);
    expect(onSelect).not.toHaveBeenCalled();
  });

  it("renders submenu triggers", async () => {
    render(
      <ContextMenu
        items={[
          {
            type: "submenu",
            label: "Export",
            items: [{ label: "PDF" }, { label: "CSV" }],
          },
        ]}
      >
        <div>Right-click me</div>
      </ContextMenu>,
    );

    fireEvent.contextMenu(screen.getByText("Right-click me"));
    expect(
      await screen.findByRole("menuitem", { name: "Export" }),
    ).toBeInTheDocument();
  });

  it("renders groups, labels and separators", async () => {
    render(
      <ContextMenu
        items={[
          { type: "label", label: "File" },
          {
            type: "group",
            label: "Actions",
            items: [{ label: "Rename" }, { label: "Move" }],
          },
          { type: "separator" },
          { label: "Delete", danger: true },
        ]}
      >
        <div>Right-click me</div>
      </ContextMenu>,
    );

    fireEvent.contextMenu(screen.getByText("Right-click me"));
    expect(await screen.findByText("File")).toBeInTheDocument();
    expect(screen.getByText("Actions")).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: "Rename" })).toBeInTheDocument();
    expect(screen.getAllByRole("separator").length).toBeGreaterThan(0);
    expect(screen.getByRole("menuitem", { name: "Delete" })).toHaveClass(
      "text-destructive",
    );
  });

  it("forwards an accessible name and trigger classes", async () => {
    const { container } = render(
      <ContextMenu
        aria-label="File actions"
        triggerClassName="context-area"
        items={[{ label: "Edit" }]}
      >
        <div>Right-click me</div>
      </ContextMenu>,
    );

    expect(container.querySelector(".context-area")).not.toBeNull();
    fireEvent.contextMenu(screen.getByText("Right-click me"));
    expect(
      await screen.findByRole("menu", { name: "File actions" }),
    ).toBeInTheDocument();
  });

  it("closes on Escape without selecting", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(
      <ContextMenu items={[{ label: "Edit", onSelect }]}>
        <div>Right-click me</div>
      </ContextMenu>,
    );

    fireEvent.contextMenu(screen.getByText("Right-click me"));
    await screen.findByRole("menuitem", { name: "Edit" });
    await user.keyboard("{Escape}");

    await waitFor(() =>
      expect(screen.queryByRole("menu")).not.toBeInTheDocument(),
    );
    expect(onSelect).not.toHaveBeenCalled();
  });

  it("invokes an action from inside a submenu", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(
      <ContextMenu
        items={[
          {
            type: "submenu",
            label: "Export",
            items: [{ label: "PDF", onSelect }],
          },
        ]}
      >
        <div>Right-click me</div>
      </ContextMenu>,
    );

    fireEvent.contextMenu(screen.getByText("Right-click me"));
    fireEvent.click(await screen.findByRole("menuitem", { name: "Export" }));
    await user.click(await screen.findByRole("menuitem", { name: "PDF" }));

    expect(onSelect).toHaveBeenCalledTimes(1);
    await waitFor(() =>
      expect(screen.queryByRole("menu")).not.toBeInTheDocument(),
    );
  });
});
