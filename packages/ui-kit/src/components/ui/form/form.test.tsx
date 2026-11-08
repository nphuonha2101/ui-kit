import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm } from "react-hook-form";
import { describe, expect, it, vi } from "vitest";
import { Input } from "../input";
import { Form, FormField } from "./form";

type Values = { email: string };

function Demo({ onSubmit }: { onSubmit: (values: Values) => void }) {
  const form = useForm<Values>({ defaultValues: { email: "" } });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          label="Email"
          rules={{ required: "Email is required" }}
          render={({ field }) => <Input type="email" {...field} />}
        />
        <button type="submit">Submit</button>
      </form>
    </Form>
  );
}

describe("FormField", () => {
  it("connects a native input to react-hook-form", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(<Demo onSubmit={onSubmit} />);

    const input = screen.getByRole("textbox", { name: "Email" });
    await user.type(input, "hello@example.com");
    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(onSubmit).toHaveBeenCalledWith(
      { email: "hello@example.com" },
      expect.anything(),
    );
  });

  it("shows validation errors and wires aria attributes", async () => {
    const user = userEvent.setup();
    render(<Demo onSubmit={vi.fn()} />);

    await user.click(screen.getByRole("button", { name: "Submit" }));

    const input = screen.getByRole("textbox", { name: "Email" });
    const error = await screen.findByText("Email is required");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("aria-describedby", error.id);
  });
});
