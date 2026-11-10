import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm } from "react-hook-form";
import { describe, expect, it, vi } from "vitest";
import { Field } from "../field";
import { FormField } from "../form";
import { Combobox } from "./combobox";

const options = [
  { value: "next", label: "Next.js" },
  { value: "vite", label: "Vite" },
  { value: "remix", label: "Remix" },
];

describe("Combobox", () => {
  it("filters options and selects a value", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <Combobox
        aria-label="Framework"
        options={options}
        onValueChange={onValueChange}
      />,
    );

    const input = screen.getByRole("combobox", { name: "Framework" });
    await user.click(input);
    await user.type(input, "vit");

    await waitFor(() =>
      expect(
        screen.queryByRole("option", { name: "Next.js" }),
      ).not.toBeInTheDocument(),
    );
    const option = await screen.findByRole("option", { name: "Vite" });
    await user.click(option);

    expect(onValueChange).toHaveBeenLastCalledWith("vite");
    expect(input).toHaveValue("Vite");
  });

  it("keeps a controlled single value in sync", () => {
    render(
      <Combobox
        aria-label="Framework"
        options={options}
        value="remix"
      />,
    );

    expect(screen.getByRole("combobox", { name: "Framework" })).toHaveValue(
      "Remix",
    );
  });

  it("renders selected chips in multiple mode", async () => {
    const user = userEvent.setup();
    render(
      <Combobox
        aria-label="Frameworks"
        multiple
        options={options}
        defaultValue={["next", "vite"]}
      />,
    );

    expect(screen.getByText("Next.js")).toBeInTheDocument();
    expect(screen.getByText("Vite")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Remove Vite" }));
    expect(screen.queryByText("Vite")).not.toBeInTheDocument();
  });

  it("works with Field labels and errors", () => {
    render(
      <Field label="Framework" error="Choose a framework">
        <Combobox options={options} />
      </Field>,
    );

    const input = screen.getByRole("combobox", { name: "Framework" });
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleDescription("Choose a framework");
  });

  it("receives the FormField label through aria-labelledby", () => {
    type Values = { framework: string };

    function Demo() {
      const form = useForm<Values>({ defaultValues: { framework: "" } });
      return (
        <FormField
          control={form.control}
          name="framework"
          label="Framework"
          render={({ field }) => (
            <Combobox
              value={field.value || null}
              onValueChange={(value) => field.onChange(value ?? "")}
              onBlur={field.onBlur}
              options={options}
            />
          )}
        />
      );
    }

    render(<Demo />);
    expect(
      screen.getByRole("combobox", { name: "Framework" }),
    ).toBeInTheDocument();
  });

  it("forwards required to the native form control", () => {
    const { container } = render(
      <Combobox
        aria-label="Framework"
        name="framework"
        required
        options={options}
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
