import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Toggle } from "./toggle";

describe("Toggle", () => {
  it("toggles its pressed state", async () => {
    const user = userEvent.setup();
    render(<Toggle>Save</Toggle>);

    const toggle = screen.getByRole("button", { name: "Save" });
    expect(toggle).toHaveAttribute("aria-pressed", "false");

    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-pressed", "true");

    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-pressed", "false");
  });

  it("supports uncontrolled default pressed state", () => {
    render(<Toggle defaultPressed>Saved</Toggle>);
    expect(screen.getByRole("button", { name: "Saved" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("does not toggle while disabled", async () => {
    const user = userEvent.setup();
    render(<Toggle disabled>Save</Toggle>);

    const toggle = screen.getByRole("button", { name: "Save" });
    expect(toggle).toBeDisabled();

    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-pressed", "false");
  });
});
