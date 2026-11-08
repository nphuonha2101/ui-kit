import { render, screen } from "@testing-library/react";
import { InfoIcon } from "@phosphor-icons/react";
import { describe, expect, it } from "vitest";
import { Alert } from "./alert";

describe("Alert", () => {
  it("renders as a status region with a title", () => {
    render(
      <Alert variant="info" title="Heads up" icon={InfoIcon}>
        Supporting message.
      </Alert>,
    );

    const status = screen.getByRole("status");
    expect(status).toHaveTextContent("Heads up");
    expect(status).toHaveTextContent("Supporting message.");
  });
});
