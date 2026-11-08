import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Textarea } from "./textarea";

describe("Textarea", () => {
  it("marks the field invalid when error is set", () => {
    render(<Textarea placeholder="Message" error />);
    expect(screen.getByPlaceholderText("Message")).toHaveAttribute("aria-invalid", "true");
  });
});
