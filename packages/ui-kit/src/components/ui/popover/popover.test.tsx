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
    expect(screen.getByText("Popover body")).toBeInTheDocument();
  });
});
