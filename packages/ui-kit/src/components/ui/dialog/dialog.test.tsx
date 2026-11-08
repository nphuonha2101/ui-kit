import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Button } from "../button";
import { Dialog } from "./dialog";

describe("Dialog", () => {
  it("opens with an accessible name and closes", async () => {
    const user = userEvent.setup();
    render(
      <Dialog
        trigger={<Button>Open dialog</Button>}
        title="Confirm action"
        description="This action cannot be undone."
      >
        <p>Body</p>
      </Dialog>,
    );

    await user.click(screen.getByRole("button", { name: "Open dialog" }));

    const dialog = await screen.findByRole("dialog", { name: "Confirm action" });
    expect(dialog).toBeInTheDocument();
    expect(screen.getByText("Body")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Close" }));
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });
});
