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
});
