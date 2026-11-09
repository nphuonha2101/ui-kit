import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Select } from "./select";

describe("Select", () => {
  it("selects an option", async () => {
    const user = userEvent.setup();
    render(
      <Select
        aria-label="Framework"
        placeholder="Choose a framework"
        defaultValue="next"
        options={[
          { value: "next", label: "Next.js" },
          { value: "vite", label: "Vite" },
        ]}
      />,
    );

    const trigger = screen.getByRole("combobox", { name: "Framework" });
    expect(trigger).toHaveTextContent("Next.js");

    await user.click(trigger);
    const option = await screen.findByRole("option", { name: "Vite" });
    await user.click(option);

    expect(trigger).toHaveTextContent("Vite");
  });

  it("renders the invalid state from error or aria-invalid", () => {
    const { rerender } = render(
      <Select
        aria-label="Framework"
        error
        options={[{ value: "next", label: "Next.js" }]}
      />,
    );

    expect(screen.getByRole("combobox")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    expect(screen.getByRole("combobox")).toHaveClass("bg-destructive/10");

    rerender(
      <Select
        aria-label="Framework"
        aria-invalid
        options={[{ value: "next", label: "Next.js" }]}
      />,
    );

    expect(screen.getByRole("combobox")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });

  it("forwards required to the trigger and native input", () => {
    const { container } = render(
      <Select
        aria-label="Framework"
        name="framework"
        required
        options={[
          { value: "next", label: "Next.js" },
          { value: "vite", label: "Vite" },
        ]}
      />,
    );

    expect(screen.getByRole("combobox", { name: "Framework" })).toHaveAttribute(
      "aria-required",
      "true",
    );
    expect(
      container.querySelector('input[name="framework"]'),
    ).toBeRequired();
  });
});
