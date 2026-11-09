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

  it("toggles from the visible label", async () => {
    const user = userEvent.setup();
    render(<Switch label="Notifications" />);

    await user.click(screen.getByText("Notifications"));

    expect(screen.getByRole("switch")).toBeChecked();
  });

  it("renders and links an error message", () => {
    render(<Switch label="Notifications" error="Choose a setting" />);

    const control = screen.getByRole("switch");
    const error = screen.getByRole("alert");

    expect(error).toHaveTextContent("Choose a setting");
    expect(control).toHaveAttribute("aria-invalid", "true");
    expect(control).toHaveAttribute("aria-describedby", error.id);
  });

  it("uses a boolean error only for the invalid state", () => {
    render(<Switch label="Notifications" error />);

    expect(screen.getByRole("switch")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("marks required and forwards native required", () => {
    const { container } = render(
      <Switch label="Notifications" required />,
    );

    expect(screen.getByText("*")).toHaveClass("text-destructive");
    expect(screen.getByRole("switch")).toHaveAttribute(
      "aria-required",
      "true",
    );
    expect(
      container.querySelector('input[type="checkbox"]'),
    ).toBeRequired();
  });
});
