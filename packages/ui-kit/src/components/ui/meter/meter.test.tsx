import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Meter } from "./meter";

describe("Meter", () => {
  it("exposes the current value and formatted value", () => {
    render(
      <Meter value={72} max={100} label="Storage used" showValue />,
    );

    expect(screen.getByRole("meter")).toHaveAttribute("aria-valuenow", "72");
    expect(screen.getByRole("meter")).toHaveAttribute("aria-valuemax", "100");
    expect(screen.getByText("Storage used")).toBeInTheDocument();
    expect(screen.getByText("72%")).toBeInTheDocument();
  });

  it("derives a threshold tone when optimum is set", () => {
    const { container } = render(
      <Meter value={10} low={40} high={70} optimum={100} aria-label="Disk usage" />,
    );

    expect(container.querySelector(".bg-destructive")).not.toBeNull();
  });

  it("supports an explicit tone and custom range", () => {
    const { container } = render(
      <Meter value={3} min={0} max={12} tone="warning" aria-label="Queue" />,
    );

    expect(screen.getByRole("meter")).toHaveAttribute("aria-valuemax", "12");
    expect(container.querySelector(".bg-warning")).not.toBeNull();
  });
});
