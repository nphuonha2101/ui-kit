import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Toaster, toast } from "./toast";

describe("Toaster", () => {
  it("renders and exposes the toast API", () => {
    const { container } = render(<Toaster />);
    expect(container).toBeInTheDocument();
    expect(typeof toast).toBe("function");
  });
});
