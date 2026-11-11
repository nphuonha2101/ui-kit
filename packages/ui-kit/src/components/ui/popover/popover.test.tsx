import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Button } from "../button";
import { Popover } from "./popover";

describe("Popover", () => {
  it("opens with an accessible title", async () => {
    const user = userEvent.setup();
    render(
      <Popover
        trigger={<Button>Open popover</Button>}
        title="Updates"
        description="Product news"
      >
        <p>Popover body</p>
      </Popover>,
    );

    await user.click(screen.getByRole("button", { name: "Open popover" }));

    expect(await screen.findByRole("dialog", { name: "Updates" })).toBeInTheDocument();
    // Portal renders into <body>: it must carry its own kit scope.
    expect(screen.getByRole("dialog", { name: "Updates" })).toHaveAttribute("data-ui", "kit");
    expect(screen.getByText("Popover body")).toBeInTheDocument();
  });
});
