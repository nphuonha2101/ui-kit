import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Fieldset } from "./fieldset";
import { Input } from "../input";

describe("Fieldset", () => {
  it("renders a legend and description", () => {
    render(
      <Fieldset legend="Shipping address" description="Where should we deliver?">
        <Input aria-label="Street" />
      </Fieldset>,
    );

    expect(screen.getByRole("group")).toBeInTheDocument();
    expect(screen.getByText("Shipping address")).toBeInTheDocument();
    expect(screen.getByText("Where should we deliver?")).toBeInTheDocument();
  });

  it("disables every control inside the fieldset", () => {
    render(
      <Fieldset legend="Account" disabled>
        <Input aria-label="Email" />
      </Fieldset>,
    );

    expect(screen.getByRole("textbox", { name: "Email" })).toBeDisabled();
  });
});
