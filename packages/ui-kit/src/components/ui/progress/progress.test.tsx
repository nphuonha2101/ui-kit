import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Progress } from "./progress";

describe("Progress", () => {
  it("exposes the current value and formatted percentage", () => {
    render(<Progress value={64} label="Uploading" showValue />);

    const progress = screen.getByRole("progressbar");
    expect(progress).toHaveAttribute("aria-valuenow", "64");
    expect(progress).toHaveAttribute("aria-valuemax", "100");
    expect(screen.getByText("Uploading")).toBeInTheDocument();
    expect(screen.getByText("64%")).toBeInTheDocument();
  });

  it("supports custom ranges", () => {
    render(<Progress value={3} min={0} max={12} aria-label="Steps" />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "3");
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuemax", "12");
  });

  it("renders an indeterminate state when value is null", () => {
    render(<Progress value={null} label="Loading" aria-label="Loading" />);
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuetext",
      "indeterminate progress",
    );
  });
});
