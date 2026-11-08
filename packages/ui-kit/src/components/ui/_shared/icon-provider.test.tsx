import * as React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Checkbox } from "../checkbox";
import { IconProvider } from "./icon-provider";

function CustomCheck({ size = 16, className, ...props }: React.SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg
      data-testid="custom-check"
      width={size}
      height={size}
      className={className}
      {...props}
    />
  );
}

describe("IconProvider", () => {
  it("swaps internal affordance icons", () => {
    render(
      <IconProvider icons={{ check: CustomCheck }}>
        <Checkbox label="Accept" defaultChecked />
      </IconProvider>,
    );

    expect(screen.getByTestId("custom-check")).toBeInTheDocument();
  });
});
