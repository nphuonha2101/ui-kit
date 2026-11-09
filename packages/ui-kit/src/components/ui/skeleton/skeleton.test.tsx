import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Skeleton } from "./skeleton";

describe("Skeleton", () => {
  it("renders a single placeholder", () => {
    render(<Skeleton data-testid="skeleton" />);
    expect(screen.getByTestId("skeleton")).toHaveClass("animate-pulse");
  });

  it("renders one row per text line", () => {
    const { container } = render(
      <Skeleton variant="text" lines={4} data-testid="skeleton" />,
    );
    expect(container.querySelectorAll(".animate-pulse")).toHaveLength(4);
  });

  it("is hidden from assistive technology", () => {
    render(<Skeleton data-testid="skeleton" />);
    expect(screen.getByTestId("skeleton")).toHaveAttribute("aria-hidden", "true");
  });
});
