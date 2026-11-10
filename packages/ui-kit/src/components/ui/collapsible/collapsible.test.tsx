import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Collapsible } from "./collapsible";

describe("Collapsible", () => {
  it("opens and closes its panel", async () => {
    const user = userEvent.setup();
    render(
      <Collapsible title="Advanced filters">
        <p>Filter controls</p>
      </Collapsible>,
    );

    const trigger = screen.getByRole("button", { name: "Advanced filters" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Filter controls")).toBeInTheDocument();

    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("respects defaultOpen", () => {
    render(
      <Collapsible title="Details" defaultOpen>
        <p>Panel body</p>
      </Collapsible>,
    );

    expect(screen.getByRole("button", { name: "Details" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
  });
});
