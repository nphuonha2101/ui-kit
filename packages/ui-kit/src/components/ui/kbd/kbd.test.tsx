import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Kbd, KbdGroup } from "./kbd";

describe("Kbd", () => {
  it("renders keyboard keys in a group", () => {
    render(
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>,
    );

    expect(screen.getByText("⌘").tagName).toBe("KBD");
    expect(screen.getByText("K").tagName).toBe("KBD");
  });
});
