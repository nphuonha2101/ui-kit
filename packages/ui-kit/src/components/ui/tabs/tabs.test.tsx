import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Tabs } from "./tabs";

describe("Tabs", () => {
  it("changes the active tab and panel", async () => {
    const user = userEvent.setup();
    render(
      <Tabs
        defaultValue="overview"
        items={[
          { value: "overview", label: "Overview", content: <p>Overview content</p> },
          { value: "details", label: "Details", content: <p>Details content</p> },
        ]}
      />,
    );

    const overview = screen.getByRole("tab", { name: "Overview" });
    const details = screen.getByRole("tab", { name: "Details" });

    expect(overview).toHaveAttribute("aria-selected", "true");

    await user.click(details);

    expect(details).toHaveAttribute("aria-selected", "true");
    expect(screen.getByText("Details content")).toBeInTheDocument();
  });
});
