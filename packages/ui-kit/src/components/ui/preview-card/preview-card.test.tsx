import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { PreviewCard } from "./preview-card";

describe("PreviewCard", () => {
  it("opens on hover and exposes its content", async () => {
    const user = userEvent.setup();
    render(
      <PreviewCard
        delay={0}
        closeDelay={0}
        trigger={<a href="#profile">@nphuonha</a>}
      >
        <p>Design systems and UI engineering.</p>
      </PreviewCard>,
    );

    await user.hover(screen.getByRole("link", { name: "@nphuonha" }));

    expect(
      await screen.findByText("Design systems and UI engineering."),
    ).toBeInTheDocument();
  });
});
