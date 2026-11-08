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
});
