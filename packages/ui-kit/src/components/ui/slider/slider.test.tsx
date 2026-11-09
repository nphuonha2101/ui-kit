import { act } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Slider } from "./slider";

describe("Slider", () => {
  it("links description and error messages", () => {
    render(
      <Slider
        label="Volume"
        description="Set the output level."
        error="Volume is required"
      />,
    );

    const slider = screen.getByRole("slider", { name: "Volume" });
    const error = screen.getByRole("alert");
    const description = screen.getByText("Set the output level.");
    const describedBy = slider.getAttribute("aria-describedby") ?? "";

    expect(error).toHaveTextContent("Volume is required");
    expect(slider).toHaveAttribute("aria-invalid", "true");
    expect(describedBy).toContain(description.id);
    expect(describedBy).toContain(error.id);
  });

  it("renders a labelled slider and steps with the keyboard", async () => {
    const user = userEvent.setup();
    render(<Slider label="Volume" defaultValue={40} />);

    const slider = screen.getByRole("slider", { name: "Volume" });
    expect(slider).toHaveValue("40");

    act(() => slider.focus());
    await user.keyboard("{ArrowRight}");
    expect(slider).toHaveValue("41");
  });
});
