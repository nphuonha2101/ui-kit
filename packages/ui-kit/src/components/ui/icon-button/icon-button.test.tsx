import { render, screen } from "@testing-library/react";
import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import { describe, expect, it } from "vitest";
import { IconButton } from "./icon-button";

describe("IconButton", () => {
  it("has an accessible name", () => {
    render(
      <IconButton aria-label="Search">
        <MagnifyingGlassIcon />
      </IconButton>,
    );

    expect(screen.getByRole("button", { name: "Search" })).toBeInTheDocument();
  });
});
