import * as React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Alert } from "./alert";

function TestIcon({ size = 16, className }: { size?: number; className?: string }) {
  return <svg width={size} height={size} className={className} data-testid="test-icon" />;
}

describe("Alert", () => {
  it("renders as a status region with a title and icon", () => {
    render(
      <Alert variant="info" title="Heads up" icon={TestIcon}>
        Supporting message.
      </Alert>,
    );

    const status = screen.getByRole("status");
    expect(status).toHaveTextContent("Heads up");
    expect(status).toHaveTextContent("Supporting message.");
    expect(screen.getByTestId("test-icon")).toBeInTheDocument();
  });
});
