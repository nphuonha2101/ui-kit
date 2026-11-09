import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm } from "react-hook-form";
import { describe, expect, it, vi } from "vitest";
import { Input } from "../input";
import { NumberField } from "../number-field";
import { RadioGroup } from "../radio-group";
import { Slider } from "../slider";
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
          required
          rules={{ required: "Email is required" }}
          render={({ field }) => <Input type="email" {...field} />}
        />
        <button type="submit">Submit</button>
      </form>
    </Form>
  );
}

function expectValidAriaReferences(container: HTMLElement) {
  for (const node of Array.from(
    container.querySelectorAll("[aria-describedby], [aria-labelledby]"),
  )) {
    for (const attribute of ["aria-describedby", "aria-labelledby"]) {
      const value = node.getAttribute(attribute);
      if (!value) continue;
      for (const id of value.split(/\s+/)) {
        expect(
          document.getElementById(id),
          `Missing ${attribute} target #${id}`,
        ).not.toBeNull();
      }
    }
  }
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

  it("labels a slider through FormField", () => {
    type Values = { volume: number };

    function SliderDemo() {
      const form = useForm<Values>({ defaultValues: { volume: 40 } });
      return (
        <FormField
          control={form.control}
          name="volume"
          label="Volume"
          render={({ field }) => (
            <Slider
              value={field.value}
              onValueChange={field.onChange}
              onBlur={field.onBlur}
            />
          )}
        />
      );
    }

    render(<SliderDemo />);
    expect(
      screen.getByRole("slider", { name: "Volume" }),
    ).toBeInTheDocument();
  });

  it("preserves a control's own invalid state", () => {
    function InvalidDemo() {
      const form = useForm<{ email: string }>({
        defaultValues: { email: "" },
      });
      return (
        <FormField
          control={form.control}
          name="email"
          label="Email"
          render={() => <Input error />}
        />
      );
    }

    render(<InvalidDemo />);

    expect(screen.getByRole("textbox")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("marks required fields", () => {
    render(<Demo onSubmit={vi.fn()} />);
    expect(screen.getByText("*")).toHaveClass("text-destructive");
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

  it("renders one error message for custom controls", async () => {
    const user = userEvent.setup();
    type Values = { plan: string };

    function CustomDemo() {
      const form = useForm<Values>({ defaultValues: { plan: "" } });
      return (
        <form onSubmit={form.handleSubmit(() => {})}>
          <FormField
            control={form.control}
            name="plan"
            label="Plan"
            required
            rules={{ required: "Choose a plan" }}
            render={({ field }) => (
              <RadioGroup
                value={field.value}
                onValueChange={field.onChange}
                onBlur={field.onBlur}
                options={[
                  { value: "free", label: "Free" },
                  { value: "pro", label: "Pro" },
                ]}
              />
            )}
          />
          <button type="submit">Submit</button>
        </form>
      );
    }

    const { container } = render(<CustomDemo />);

    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(await screen.findAllByRole("alert")).toHaveLength(1);
    expect(screen.getAllByText("Choose a plan")).toHaveLength(1);
    expect(screen.getByRole("radiogroup")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    expectValidAriaReferences(container);
  });

  it("does not leave dangling aria references for boolean errors", async () => {
    const user = userEvent.setup();
    type Values = { quantity: number | null };

    function NumberDemo() {
      const form = useForm<Values>({ defaultValues: { quantity: null } });
      return (
        <form onSubmit={form.handleSubmit(() => {})}>
          <FormField
            control={form.control}
            name="quantity"
            label="Quantity"
            rules={{
              validate: (value) =>
                value !== null || "Quantity is required",
            }}
            render={({ field }) => (
              <NumberField
                value={field.value}
                onValueChange={field.onChange}
                onBlur={field.onBlur}
              />
            )}
          />
          <button type="submit">Submit</button>
        </form>
      );
    }

    const { container } = render(<NumberDemo />);

    await user.click(screen.getByRole("button", { name: "Submit" }));

    const error = await screen.findByRole("alert");
    const input = screen.getByRole("textbox");
    expect(error).toHaveTextContent("Quantity is required");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input.getAttribute("aria-describedby")).toContain(error.id);
    expectValidAriaReferences(container);
  });
});
