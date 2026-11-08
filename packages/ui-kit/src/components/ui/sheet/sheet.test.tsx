import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Button } from "../button";
import { Sheet } from "./sheet";

describe("Sheet", () => {
  it("opens with an accessible name and closes", async () => {
    const user = userEvent.setup();
    render(
      <Sheet
        trigger={<Button>Open sheet</Button>}
        title="Filters"
        description="Narrow down the results."
      >
        <p>Sheet body</p>
      </Sheet>,
    );

    await user.click(screen.getByRole("button", { name: "Open sheet" }));

    const dialog = await screen.findByRole("dialog", { name: "Filters" });
    expect(dialog).toBeInTheDocument();
    expect(screen.getByText("Sheet body")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Close" }));
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });
});
