import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Switch } from "./switch";

describe("Switch", () => {
  it("toggles with its label", async () => {
    const user = userEvent.setup();
    render(<Switch label="Notifications" />);

    const control = screen.getByRole("switch", { name: "Notifications" });
    expect(control).not.toBeChecked();

    await user.click(control);
    expect(control).toBeChecked();
  });
});
