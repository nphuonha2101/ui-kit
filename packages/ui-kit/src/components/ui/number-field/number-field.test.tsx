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
});
