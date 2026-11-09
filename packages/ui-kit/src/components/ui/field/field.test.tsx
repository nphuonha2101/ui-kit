import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Field } from "./field";
import { Input } from "../input";

describe("Field", () => {
  it("wires the label, description and error to the control", () => {
    render(
      <Field
        id="email"
        label="Email"
        description="We never share it."
        error="Email is required"
      >
        <Input />
      </Field>,
    );

    const input = screen.getByLabelText("Email");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleDescription("We never share it. Email is required");
  });

  it("marks the label and forwards required to the control", () => {
    render(
      <Field label="Email" required>
        <Input />
      </Field>,
    );

    expect(screen.getByText("*")).toHaveClass("text-destructive");
    expect(screen.getByRole("textbox")).toBeRequired();
  });

  it("styles the control as invalid when the field has an error", () => {
    render(
      <Field label="Email" error="Email is required">
        <Input />
      </Field>,
    );

    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveClass("bg-destructive/10");
  });

  it("uses the child id and preserves its invalid state", () => {
    render(
      <Field label="Email">
        <Input id="custom-email" error />
      </Field>,
    );

    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("id", "custom-email");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByLabelText("Email")).toBe(input);
  });
});
