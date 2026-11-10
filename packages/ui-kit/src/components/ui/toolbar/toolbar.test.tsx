import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import {
  Toolbar,
  ToolbarButton,
  ToolbarGroup,
  ToolbarSeparator,
  ToolbarToggle,
} from "./toolbar";

describe("Toolbar", () => {
  it("moves focus with arrow keys and wraps at the end", async () => {
    const user = userEvent.setup();
    render(
      <Toolbar aria-label="Formatting">
        <ToolbarGroup aria-label="History">
          <ToolbarButton>Undo</ToolbarButton>
          <ToolbarButton>Redo</ToolbarButton>
        </ToolbarGroup>
        <ToolbarSeparator />
        <ToolbarButton>Bold</ToolbarButton>
      </Toolbar>,
    );

    expect(screen.getByRole("toolbar", { name: "Formatting" })).toBeInTheDocument();

    const undo = screen.getByRole("button", { name: "Undo" });
    const redo = screen.getByRole("button", { name: "Redo" });
    const bold = screen.getByRole("button", { name: "Bold" });

    undo.focus();
    await user.keyboard("{ArrowRight}");
    expect(redo).toHaveFocus();

    await user.keyboard("{ArrowRight}");
    expect(bold).toHaveFocus();

    await user.keyboard("{ArrowRight}");
    expect(undo).toHaveFocus();
  });

  it("supports vertical arrow navigation", async () => {
    const user = userEvent.setup();
    render(
      <Toolbar aria-label="Actions" orientation="vertical">
        <ToolbarButton>Cut</ToolbarButton>
        <ToolbarButton>Copy</ToolbarButton>
      </Toolbar>,
    );

    const cut = screen.getByRole("button", { name: "Cut" });
    const copy = screen.getByRole("button", { name: "Copy" });

    cut.focus();
    await user.keyboard("{ArrowDown}");
    expect(copy).toHaveFocus();
  });

  it("toggles toolbar toggles", async () => {
    const user = userEvent.setup();
    render(
      <Toolbar aria-label="Formatting">
        <ToolbarToggle aria-label="Bold">B</ToolbarToggle>
      </Toolbar>,
    );

    const bold = screen.getByRole("button", { name: "Bold" });
    expect(bold).toHaveAttribute("aria-pressed", "false");

    await user.click(bold);
    expect(bold).toHaveAttribute("aria-pressed", "true");
  });

  it("disables every control when the toolbar is disabled", () => {
    render(
      <Toolbar aria-label="Formatting" disabled>
        <ToolbarButton>Bold</ToolbarButton>
        <ToolbarToggle aria-label="Italic">I</ToolbarToggle>
      </Toolbar>,
    );

    expect(screen.getByRole("button", { name: "Bold" })).toHaveAttribute(
      "aria-disabled",
      "true",
    );
    expect(screen.getByRole("button", { name: "Italic" })).toHaveAttribute(
      "aria-disabled",
      "true",
    );
  });
});
