import * as React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { IconButton } from "./icon-button";

function TestIcon({ size = 16, className }: { size?: number; className?: string }) {
  return <svg width={size} height={size} className={className} data-testid="test-icon" />;
}

describe("IconButton", () => {
  it("has an accessible name and renders its icon", () => {
    render(
      <IconButton aria-label="Search">
        <TestIcon />
      </IconButton>,
    );

    expect(screen.getByRole("button", { name: "Search" })).toBeInTheDocument();
    expect(screen.getByTestId("test-icon")).toBeVisible();
  });
});
