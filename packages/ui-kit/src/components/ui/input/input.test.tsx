import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Input } from "./input";

describe("Input", () => {
  it("marks the field invalid when error is set", () => {
    render(<Input placeholder="Email" error />);
    expect(screen.getByPlaceholderText("Email")).toHaveAttribute("aria-invalid", "true");
  });
});
