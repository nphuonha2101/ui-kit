import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Avatar } from "./avatar";

describe("Avatar", () => {
  it("derives initials from the alt text when no image is provided", () => {
    render(<Avatar alt="Ada Lovelace" />);
    expect(screen.getByText("AL")).toBeInTheDocument();
  });

  it("renders a custom fallback", () => {
    render(<Avatar alt="Ada Lovelace" fallback="AD" />);
    expect(screen.getByText("AD")).toBeInTheDocument();
  });

  it("forwards accessibility props to the root", () => {
    render(<Avatar alt="Ada Lovelace" data-testid="avatar" />);
    expect(screen.getByTestId("avatar")).toBeInTheDocument();
  });
});
