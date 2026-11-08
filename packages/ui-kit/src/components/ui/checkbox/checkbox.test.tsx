import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Checkbox } from "./checkbox";

describe("Checkbox", () => {
  it("toggles from its label", async () => {
    const user = userEvent.setup();
    render(<Checkbox label="Accept terms" />);

    const checkbox = screen.getByRole("checkbox", { name: "Accept terms" });
    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it("exposes the indeterminate state", () => {
    render(<Checkbox label="Mixed" indeterminate />);
    expect(screen.getByRole("checkbox", { name: "Mixed" })).toHaveAttribute(
      "aria-checked",
      "mixed",
    );
  });
});
