import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ScrollArea } from "./scroll-area";

describe("ScrollArea", () => {
  it("renders its content", () => {
    render(
      <ScrollArea className="h-40">
        <div>Scrollable content</div>
      </ScrollArea>,
    );

    expect(screen.getByText("Scrollable content")).toBeInTheDocument();
  });
});
