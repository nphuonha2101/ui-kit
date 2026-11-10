import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { OTPField } from "./otp-field";

describe("OTPField", () => {
  it("renders the requested number of slots and a label", () => {
    render(<OTPField label="Verification code" length={4} />);

    expect(screen.getByText("Verification code")).toBeInTheDocument();
    expect(screen.getAllByRole("textbox")).toHaveLength(4);
  });

  it("reports the complete value while typing", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<OTPField label="Code" length={4} onValueChange={onValueChange} />);

    await user.click(screen.getAllByRole("textbox")[0]);
    await user.keyboard("1234");

    await waitFor(() =>
      expect(onValueChange).toHaveBeenLastCalledWith("1234"),
    );
    expect(screen.getByRole("textbox", { name: "Digit 4 of 4" })).toHaveValue(
      "4",
    );
  });

  it("links the error message and invalid state", () => {
    render(<OTPField label="Code" error="That code is incorrect." />);

    const error = screen.getByRole("alert");
    const firstSlot = screen.getAllByRole("textbox")[0];
    expect(error).toHaveTextContent("That code is incorrect.");
    expect(firstSlot).toHaveAttribute("aria-invalid", "true");
    expect(firstSlot).toHaveAttribute("aria-describedby", error.id);
  });

  it("forwards required to the native form control", () => {
    const { container } = render(
      <OTPField label="Code" name="code" required />,
    );

    expect(screen.getByRole("group", { name: "Code" })).toHaveAttribute(
      "aria-required",
      "true",
    );
    expect(container.querySelector('input[name="code"]')).toBeRequired();
  });
});
