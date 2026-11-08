import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Button } from "../button";
import { Tooltip } from "./tooltip";

describe("Tooltip", () => {
  it("shows its content on hover", async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Helpful hint" delay={0}>
        <Button>Hover me</Button>
      </Tooltip>,
    );

    await user.hover(screen.getByRole("button", { name: "Hover me" }));

    expect(await screen.findByRole("tooltip")).toHaveTextContent("Helpful hint");
  });
});
