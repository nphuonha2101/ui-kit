import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ButtonLink } from "./button-link";

describe("ButtonLink", () => {
  it("renders an anchor with the button styles", () => {
    render(
      <ButtonLink href="/docs" variant="outline">
        Read the docs
      </ButtonLink>,
    );

    const link = screen.getByRole("link", { name: "Read the docs" });
    expect(link).toHaveAttribute("href", "/docs");
    expect(link).toHaveClass("h-10");
  });

  it("supports a custom render element", () => {
    render(
      <ButtonLink href="/theming" render={<a data-testid="custom-link" />}>
        Theming
      </ButtonLink>,
    );

    const link = screen.getByTestId("custom-link");
    expect(link).toHaveAttribute("href", "/theming");
    expect(link).toHaveAttribute("class");
  });

  it("supports icon-only links", () => {
    render(
      <ButtonLink href="/docs" size="icon" aria-label="Docs">
        <span>icon</span>
      </ButtonLink>,
    );

    expect(screen.getByRole("link", { name: "Docs" })).toBeInTheDocument();
  });
});
