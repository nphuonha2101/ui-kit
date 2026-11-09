import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { RadioGroup } from "./radio-group";

describe("RadioGroup", () => {
  it("selects an option and exposes accessible names", async () => {
    const user = userEvent.setup();
    render(
      <RadioGroup
        label="Plan"
        defaultValue="free"
        options={[
          { value: "free", label: "Free" },
          { value: "pro", label: "Pro", description: "Most features" },
        ]}
      />,
    );

    expect(screen.getByRole("radiogroup", { name: "Plan" })).toBeInTheDocument();

    const pro = screen.getByRole("radio", { name: "Pro" });
    expect(pro).not.toBeChecked();

    await user.click(pro);
    expect(pro).toBeChecked();
  });

  it("links an error message to the group", () => {
    render(
      <RadioGroup
        label="Plan"
        error="Choose a plan"
        options={[
          { value: "free", label: "Free" },
          { value: "pro", label: "Pro" },
        ]}
      />,
    );

    const group = screen.getByRole("radiogroup", { name: "Plan" });
    const error = screen.getByRole("alert");

    expect(error).toHaveTextContent("Choose a plan");
    expect(group).toHaveAttribute("aria-invalid", "true");
    expect(group).toHaveAttribute("aria-describedby", error.id);
  });

  it("marks required and exposes aria-required", () => {
    const { container } = render(
      <RadioGroup
        label="Plan"
        required
        options={[
          { value: "free", label: "Free" },
          { value: "pro", label: "Pro" },
        ]}
      />,
    );

    expect(screen.getByText("*")).toHaveClass("text-destructive");
    expect(screen.getByRole("radiogroup", { name: "Plan" })).toHaveAttribute(
      "aria-required",
      "true",
    );

    const inputs = container.querySelectorAll('input[type="radio"]');
    expect(inputs.length).toBeGreaterThan(0);
    for (const input of Array.from(inputs)) expect(input).toBeRequired();
  });
});
