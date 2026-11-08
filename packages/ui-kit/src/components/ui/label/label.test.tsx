import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Input } from "../input";
import { Label } from "./label";

describe("Label", () => {
  it("associates with a control without including the required mark in the name", () => {
    render(
      <>
        <Label htmlFor="email" requiredMark>
          Email
        </Label>
        <Input id="email" />
      </>,
    );

    expect(screen.getByRole("textbox", { name: "Email" })).toBeInTheDocument();
  });
});
