import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Pagination } from "./pagination";

describe("Pagination", () => {
  it("marks the current page and reports page changes", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();

    render(
      <Pagination page={5} pageCount={10} onPageChange={onPageChange} />,
    );

    expect(screen.getByRole("button", { name: "Page 5" })).toHaveAttribute(
      "aria-current",
      "page",
    );

    await user.click(screen.getByRole("button", { name: "Page 6" }));
    expect(onPageChange).toHaveBeenCalledWith(6);
  });

  it("disables the previous button on the first page", () => {
    render(<Pagination page={1} pageCount={3} />);
    expect(screen.getByRole("button", { name: "Previous page" })).toBeDisabled();
  });
});
