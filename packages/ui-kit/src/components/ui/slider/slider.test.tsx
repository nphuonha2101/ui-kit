import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Slider } from "./slider";

describe("Slider", () => {
  it("renders a labelled slider and steps with the keyboard", async () => {
    const user = userEvent.setup();
    render(<Slider label="Volume" defaultValue={40} />);

    const slider = screen.getByRole("slider", { name: "Volume" });
    expect(slider).toHaveValue("40");

    slider.focus();
    await user.keyboard("{ArrowRight}");
    expect(slider).toHaveValue("41");
  });
});
