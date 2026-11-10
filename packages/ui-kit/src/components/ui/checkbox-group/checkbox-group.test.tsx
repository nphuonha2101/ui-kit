import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { CheckboxGroup } from "./checkbox-group";

const options = [
  { value: "email", label: "Email" },
  { value: "sms", label: "SMS" },
  { value: "push", label: "Push notifications", description: "Mobile app only" },
];

describe("CheckboxGroup", () => {
  it("toggles options and reports the selected values", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <CheckboxGroup
        label="Channels"
        options={options}
        onValueChange={onValueChange}
      />,
    );

    await user.click(screen.getByRole("checkbox", { name: "Email" }));
    expect(screen.getByRole("checkbox", { name: "Email" })).toBeChecked();
    await waitFor(() =>
      expect(onValueChange).toHaveBeenLastCalledWith(["email"]),
    );

    await user.click(screen.getByRole("checkbox", { name: "SMS" }));
    await waitFor(() =>
      expect(onValueChange).toHaveBeenLastCalledWith(["email", "sms"]),
    );
  });

  it("supports a controlled value", () => {
    render(<CheckboxGroup label="Channels" options={options} value={["push"]} />);

    expect(screen.getByRole("checkbox", { name: "Push notifications" })).toBeChecked();
    expect(screen.getByRole("checkbox", { name: "Email" })).not.toBeChecked();
  });

  it("links its label, description and error", () => {
    render(
      <CheckboxGroup
        label="Channels"
        description="Pick at least one."
        error="Choose a channel."
        required
        options={options}
      />,
    );

    const group = screen.getByRole("group", { name: /Channels/ });
    expect(group).toHaveAttribute("aria-required", "true");
    expect(group).toHaveAttribute("aria-invalid", "true");
    expect(group).toHaveAccessibleDescription(
      "Pick at least one. Choose a channel.",
    );
    expect(screen.getByText("*")).toBeInTheDocument();
  });
});
