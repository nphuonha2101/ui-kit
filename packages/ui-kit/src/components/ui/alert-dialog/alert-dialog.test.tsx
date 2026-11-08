import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { AlertDialog } from "./alert-dialog";

describe("AlertDialog", () => {
  it("renders an alert dialog and calls onConfirm", async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();

    render(
      <AlertDialog
        defaultOpen
        title="Delete project?"
        description="This action cannot be undone."
        confirmLabel="Delete"
        onConfirm={onConfirm}
      />,
    );

    expect(
      await screen.findByRole("alertdialog", { name: "Delete project?" }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Delete" }));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });
});
