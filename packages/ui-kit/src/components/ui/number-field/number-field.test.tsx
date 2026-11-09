import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { NumberField } from "./number-field";

describe("NumberField", () => {
  it("increments and decrements with the stepper buttons", async () => {
    const user = userEvent.setup();
    render(<NumberField label="Quantity" defaultValue={2} />);

    const input = screen.getByRole("textbox", { name: "Quantity" });
    expect(input).toHaveValue("2");

    await user.click(screen.getByRole("button", { name: "Increase value" }));
    expect(input).toHaveValue("3");

    await user.click(screen.getByRole("button", { name: "Decrease value" }));
    expect(input).toHaveValue("2");
  });

  it("marks required and links description and error messages", () => {
    render(
      <NumberField
        label="Quantity"
        description="How many seats?"
        error="Quantity is required"
        required
      />,
    );

    const input = screen.getByRole("textbox", { name: "Quantity" });
    const description = screen.getByText("How many seats?");
    const error = screen.getByRole("alert");
    const describedBy = input.getAttribute("aria-describedby") ?? "";

    expect(screen.getByText("*")).toHaveClass("text-destructive");
    expect(input).toBeRequired();
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(describedBy).toContain(description.id);
    expect(describedBy).toContain(error.id);
  });
});
