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

  it("marks required and forwards native required", () => {
    const { container } = render(
      <Checkbox label="Accept terms" required />,
    );

    expect(screen.getByText("*")).toHaveClass("text-destructive");
    expect(screen.getByRole("checkbox")).toHaveAttribute(
      "aria-required",
      "true",
    );
    expect(
      container.querySelector('input[type="checkbox"]'),
    ).toBeRequired();
  });
});
