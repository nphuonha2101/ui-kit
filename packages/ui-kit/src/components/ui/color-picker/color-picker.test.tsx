import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ColorPicker } from "./color-picker";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("ColorPicker", () => {
  it("shows the selected color and opens the picker", async () => {
    const user = userEvent.setup();
    render(<ColorPicker label="Brand color" defaultValue="#0d9488" />);

    const trigger = screen.getByRole("button", { name: "Brand color" });
    expect(trigger).toHaveTextContent("#0D9488");

    await user.click(trigger);

    expect(
      await screen.findByRole("dialog", { name: "Brand color" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("slider", { name: "Hue" })).toBeInTheDocument();
    expect(
      screen.getByRole("slider", { name: "Saturation and brightness" }),
    ).toBeInTheDocument();
  });

  it("changes the value with the hue and saturation sliders", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <ColorPicker
        label="Color"
        defaultValue="#ff0000"
        onValueChange={onValueChange}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Color" }));

    const hue = screen.getByRole("slider", { name: "Hue" });
    hue.focus();
    await user.keyboard("{ArrowRight}");

    const hueValue = onValueChange.mock.calls.at(-1)?.[0] as string;
    expect(hueValue).toMatch(/^#[0-9a-f]{6}$/);
    expect(hueValue).not.toBe("#ff0000");

    const area = screen.getByRole("slider", {
      name: "Saturation and brightness",
    });
    area.focus();
    await user.keyboard("{ArrowDown}");

    const brightnessValue = onValueChange.mock.calls.at(-1)?.[0] as string;
    expect(brightnessValue).not.toBe(hueValue);
  });

  it("accepts a typed hex value and reverts invalid input", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <ColorPicker
        label="Color"
        defaultValue="#0d9488"
        onValueChange={onValueChange}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Color" }));
    const input = screen.getByRole("textbox", { name: "Hex color" });

    await user.clear(input);
    await user.type(input, "#00ff00");

    expect(onValueChange).toHaveBeenLastCalledWith("#00ff00");
    expect(input).toHaveValue("#00ff00");

    await user.clear(input);
    await user.type(input, "#zzz");
    fireEvent.blur(input);

    expect(input).toHaveValue("#00FF00");
  });

  it("selects a preset swatch", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <ColorPicker
        label="Color"
        defaultValue="#000000"
        swatches={["#ff0000", "#00ff00"]}
        onValueChange={onValueChange}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Color" }));
    await user.click(screen.getByRole("button", { name: "Use #ff0000" }));

    expect(onValueChange).toHaveBeenLastCalledWith("#ff0000");
    expect(screen.getByRole("button", { name: "Color" })).toHaveTextContent(
      "#FF0000",
    );
  });

  it("clears the value", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <ColorPicker
        label="Color"
        defaultValue="#0d9488"
        clearable
        onValueChange={onValueChange}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Color" }));
    await user.click(screen.getByRole("button", { name: "Clear" }));

    expect(onValueChange).toHaveBeenLastCalledWith(null);
    expect(screen.getByRole("button", { name: "Color" })).toHaveTextContent(
      "Pick a color",
    );
  });

  it("renders a hidden input with a normalized hex value", () => {
    const { container } = render(
      <ColorPicker label="Color" defaultValue="#abc" name="brand" />,
    );

    expect(container.querySelector('input[name="brand"]')).toHaveValue(
      "#aabbcc",
    );
    expect(screen.getByRole("button", { name: "Color" })).toHaveTextContent(
      "#AABBCC",
    );
  });

  it("supports disabled, required and error states", () => {
    render(
      <ColorPicker
        label="Color"
        required
        description="Pick a brand color."
        error="A color is required."
      />,
    );

    expect(screen.getByText("*")).toHaveClass("text-destructive");
    expect(screen.getByText("Required")).toHaveClass("sr-only");
    expect(screen.getByRole("alert")).toHaveTextContent(
      "A color is required.",
    );
    expect(screen.getByRole("button", { name: "Color" })).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });

  it("disables the trigger", () => {
    render(<ColorPicker label="Color" disabled />);
    expect(screen.getByRole("button", { name: "Color" })).toBeDisabled();
  });

  it("updates the picker when a controlled value changes", async () => {
    const user = userEvent.setup();
    const { rerender } = render(
      <ColorPicker
        label="Color"
        value="#ff0000"
        onValueChange={() => {}}
      />,
    );

    rerender(
      <ColorPicker
        label="Color"
        value="#00ff00"
        onValueChange={() => {}}
      />,
    );

    const trigger = screen.getByRole("button", { name: "Color" });
    expect(trigger).toHaveTextContent("#00FF00");

    await user.click(trigger);
    expect(screen.getByRole("textbox", { name: "Hex color" })).toHaveValue(
      "#00FF00",
    );
  });

  it("accepts a hex value without the leading hash", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <ColorPicker
        label="Color"
        defaultValue="#0d9488"
        onValueChange={onValueChange}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Color" }));
    const input = screen.getByRole("textbox", { name: "Hex color" });
    await user.clear(input);
    await user.type(input, "00ff00");

    expect(onValueChange).toHaveBeenLastCalledWith("#00ff00");

    fireEvent.blur(input);
    expect(input).toHaveValue("#00FF00");
  });

  it("uses coarse keyboard steps with shift", async () => {
    const user = userEvent.setup();
    render(<ColorPicker label="Color" defaultValue="#ff0000" />);

    await user.click(screen.getByRole("button", { name: "Color" }));
    const hue = screen.getByRole("slider", { name: "Hue" });

    fireEvent.keyDown(hue, { key: "ArrowRight", shiftKey: true });

    expect(hue).toHaveAttribute("aria-valuenow", "10");
  });

  it("updates the hue and saturation from pointer input", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <ColorPicker
        label="Color"
        defaultValue="#ff0000"
        onValueChange={onValueChange}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Color" }));

    const hue = screen.getByRole("slider", { name: "Hue" });
    hue.getBoundingClientRect = () =>
      ({
        left: 0,
        top: 0,
        right: 100,
        bottom: 10,
        width: 100,
        height: 10,
        x: 0,
        y: 0,
        toJSON: () => ({}),
      }) as DOMRect;
    fireEvent.pointerDown(hue, { clientX: 50, clientY: 5, pointerId: 1 });

    expect(hue).toHaveAttribute("aria-valuenow", "180");

    const area = screen.getByRole("slider", {
      name: "Saturation and brightness",
    });
    area.getBoundingClientRect = () =>
      ({
        left: 0,
        top: 0,
        right: 100,
        bottom: 100,
        width: 100,
        height: 100,
        x: 0,
        y: 0,
        toJSON: () => ({}),
      }) as DOMRect;
    fireEvent.pointerDown(area, { clientX: 50, clientY: 25, pointerId: 2 });

    expect(area).toHaveAttribute("aria-valuenow", "50");
    expect(area).toHaveAttribute(
      "aria-valuetext",
      expect.stringContaining("brightness 75%"),
    );
    expect(onValueChange).toHaveBeenCalled();
  });

  it("picks a color with the eyedropper when available", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    vi.stubGlobal(
      "EyeDropper",
      class {
        open() {
          return Promise.resolve({ sRGBHex: "#123456" });
        }
      },
    );

    render(
      <ColorPicker
        label="Color"
        showEyeDropper
        onValueChange={onValueChange}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Color" }));
    await user.click(
      await screen.findByRole("button", {
        name: "Pick a color from the screen",
      }),
    );

    await waitFor(() => {
      expect(onValueChange).toHaveBeenLastCalledWith("#123456");
    });
  });
});
