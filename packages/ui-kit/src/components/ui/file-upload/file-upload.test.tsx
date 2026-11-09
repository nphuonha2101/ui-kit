import * as React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm } from "react-hook-form";
import { describe, expect, it, vi } from "vitest";
import { FormField } from "../form";
import { FileUpload } from "./file-upload";

function makeFile(name: string, type = "application/pdf", size = 12) {
  return new File([new Uint8Array(size)], name, { type });
}

function fileInput(container: HTMLElement) {
  return container.querySelector(
    'input[type="file"]',
  ) as HTMLInputElement;
}

describe("FileUpload", () => {
  it("adds selected files and reports the new list", () => {
    const onFilesChange = vi.fn();
    const { container } = render(<FileUpload onFilesChange={onFilesChange} />);
    const file = makeFile("report.pdf");

    fireEvent.change(fileInput(container), { target: { files: [file] } });

    expect(onFilesChange).toHaveBeenCalledWith([file]);
    expect(onFilesChange.mock.calls[0][0][0]).toBe(file);
    expect(screen.getByText("report.pdf")).toBeInTheDocument();
  });

  it("removes a file from the list", async () => {
    const onFilesChange = vi.fn();
    const user = userEvent.setup();
    render(
      <FileUpload
        defaultFiles={[makeFile("report.pdf")]}
        onFilesChange={onFilesChange}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Remove report.pdf" }));

    expect(onFilesChange).toHaveBeenCalledWith([]);
    expect(screen.queryByText("report.pdf")).not.toBeInTheDocument();
  });

  it("rejects files that do not match accept", () => {
    const onReject = vi.fn();
    const { container } = render(
      <FileUpload accept="image/*" onReject={onReject} />,
    );

    fireEvent.change(fileInput(container), {
      target: { files: [makeFile("notes.txt", "text/plain")] },
    });

    expect(
      screen.getByText('"notes.txt" is not an accepted file type.'),
    ).toBeInTheDocument();
    expect(onReject).toHaveBeenCalledTimes(1);
  });

  it("rejects files above maxSize", () => {
    const onFilesChange = vi.fn();
    const { container } = render(
      <FileUpload maxSize={10} onFilesChange={onFilesChange} />,
    );

    fireEvent.change(fileInput(container), {
      target: { files: [makeFile("big.pdf", "application/pdf", 20)] },
    });

    expect(
      screen.getByText('"big.pdf" is larger than 10 B.'),
    ).toBeInTheDocument();
    expect(onFilesChange).not.toHaveBeenCalled();
  });

  it("respects maxFiles", () => {
    const onFilesChange = vi.fn();
    const { container } = render(
      <FileUpload maxFiles={1} onFilesChange={onFilesChange} />,
    );

    fireEvent.change(fileInput(container), {
      target: {
        files: [makeFile("one.pdf"), makeFile("two.pdf")],
      },
    });

    expect(onFilesChange).toHaveBeenCalledWith([expect.any(File)]);
    expect(onFilesChange.mock.calls[0][0]).toHaveLength(1);
    expect(
      screen.getByText("Only one file can be selected."),
    ).toBeInTheDocument();
  });

  it("replaces the file when multiple is false", async () => {
    const onFilesChange = vi.fn();
    const user = userEvent.setup();
    const { container } = render(
      <FileUpload multiple={false} onFilesChange={onFilesChange} />,
    );

    fireEvent.change(fileInput(container), {
      target: { files: [makeFile("first.pdf")] },
    });
    fireEvent.change(fileInput(container), {
      target: { files: [makeFile("second.pdf")] },
    });

    expect(onFilesChange).toHaveBeenLastCalledWith([
      expect.objectContaining({ name: "second.pdf" }),
    ]);
    expect(screen.queryByText("first.pdf")).not.toBeInTheDocument();
    expect(screen.getByText("second.pdf")).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: "Remove second.pdf" }),
    );
    expect(onFilesChange).toHaveBeenLastCalledWith([]);
  });

  it("accepts dropped files", () => {
    const onFilesChange = vi.fn();
    render(<FileUpload onFilesChange={onFilesChange} />);
    const file = makeFile("dropped.pdf");

    fireEvent.drop(
      screen.getByRole("button", { name: /drop files here or browse/i }),
      { dataTransfer: { files: [file] } },
    );

    expect(onFilesChange).toHaveBeenCalledWith([file]);
  });

  it("disables both the dropzone and the file input", () => {
    const { container } = render(<FileUpload disabled />);

    expect(
      screen.getByRole("button", { name: /drop files here or browse/i }),
    ).toBeDisabled();
    expect(fileInput(container)).toBeDisabled();
  });

  it("renders controlled files", () => {
    const file = makeFile("controlled.pdf");
    render(<FileUpload files={[file]} />);

    expect(screen.getByText("controlled.pdf")).toBeInTheDocument();
  });

  it("connects to react-hook-form through FormField", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    type Values = { files: File[] };

    function Demo() {
      const form = useForm<Values>({ defaultValues: { files: [] } });
      return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="files"
            label="Attachments"
            rules={{
              validate: (files) =>
                files.length > 0 || "Add at least one file",
            }}
            render={({ field }) => (
              <FileUpload
                files={field.value}
                onFilesChange={field.onChange}
                onBlur={field.onBlur}
              />
            )}
          />
          <button type="submit">Submit</button>
        </form>
      );
    }

    const { container } = render(<Demo />);
    const dropzone = screen.getByRole("button", { name: "Attachments" });

    await user.click(screen.getByRole("button", { name: "Submit" }));
    expect(await screen.findByText("Add at least one file")).toBeInTheDocument();
    expect(dropzone).toHaveAttribute("aria-invalid", "true");

    const file = makeFile("attached.pdf");
    fireEvent.change(fileInput(container), { target: { files: [file] } });
    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(onSubmit).toHaveBeenCalledWith(
      { files: [file] },
      expect.anything(),
    );
    expect(onSubmit.mock.calls[0][0].files[0]).toBe(file);
  });

  it("matches extension, MIME and wildcard accept values", () => {
    const onFilesChange = vi.fn();
    const { container } = render(
      <FileUpload
        accept=".pdf,image/*,application/json"
        onFilesChange={onFilesChange}
      />,
    );
    const pdf = makeFile("REPORT.PDF", "", 12);
    const png = makeFile("cover.PNG", "image/png", 12);
    const json = makeFile("data", "application/json", 12);
    const txt = makeFile("notes.txt", "text/plain", 12);

    fireEvent.change(fileInput(container), {
      target: { files: [pdf, png, json, txt] },
    });

    expect(onFilesChange).toHaveBeenCalledWith([pdf, png, json]);
    expect(
      screen.getByText('"notes.txt" is not an accepted file type.'),
    ).toBeInTheDocument();
  });

  it("accepts a file exactly at maxSize and rejects one byte over", () => {
    const onFilesChange = vi.fn();
    const { container } = render(
      <FileUpload maxSize={10} onFilesChange={onFilesChange} />,
    );
    const atLimit = makeFile("at-limit.pdf", "application/pdf", 10);
    const over = makeFile("over.pdf", "application/pdf", 11);

    fireEvent.change(fileInput(container), {
      target: { files: [atLimit, over] },
    });

    expect(onFilesChange).toHaveBeenCalledWith([atLimit]);
    expect(onFilesChange.mock.calls[0][0][0]).toBe(atLimit);
    expect(
      screen.getByText('"over.pdf" is larger than 10 B.'),
    ).toBeInTheDocument();
  });

  it("counts maxFiles across separate selections", () => {
    const onFilesChange = vi.fn();
    const { container } = render(
      <FileUpload maxFiles={2} onFilesChange={onFilesChange} />,
    );
    const first = makeFile("first.pdf");
    const second = makeFile("second.pdf");
    const third = makeFile("third.pdf");

    fireEvent.change(fileInput(container), {
      target: { files: [first, second] },
    });
    fireEvent.change(fileInput(container), {
      target: { files: [third] },
    });

    expect(onFilesChange).toHaveBeenCalledTimes(1);
    expect(onFilesChange).toHaveBeenCalledWith([first, second]);
    expect(
      screen.getByText("You can add up to 2 files."),
    ).toBeInTheDocument();
    expect(screen.queryByText("third.pdf")).not.toBeInTheDocument();
  });

  it("removes the correct file from a multi-file list", async () => {
    const user = userEvent.setup();
    const onFilesChange = vi.fn();
    const first = makeFile("first.pdf");
    const second = makeFile("second.pdf");
    const third = makeFile("third.pdf");
    render(
      <FileUpload
        defaultFiles={[first, second, third]}
        onFilesChange={onFilesChange}
      />,
    );

    await user.click(
      screen.getByRole("button", { name: "Remove second.pdf" }),
    );

    expect(onFilesChange).toHaveBeenCalledWith([first, third]);
    expect(onFilesChange.mock.calls[0][0][0]).toBe(first);
    expect(onFilesChange.mock.calls[0][0][1]).toBe(third);
  });

  it("ignores duplicate files", () => {
    const onFilesChange = vi.fn();
    const { container } = render(
      <FileUpload onFilesChange={onFilesChange} />,
    );
    const file = makeFile("same.pdf");

    fireEvent.change(fileInput(container), { target: { files: [file] } });
    fireEvent.change(fileInput(container), { target: { files: [file] } });

    expect(onFilesChange).toHaveBeenCalledTimes(1);
    expect(onFilesChange).toHaveBeenCalledWith([file]);
  });

  it("uses only the first file when multiple is false", () => {
    const onFilesChange = vi.fn();
    const { container } = render(
      <FileUpload multiple={false} onFilesChange={onFilesChange} />,
    );
    const first = makeFile("first.pdf");
    const second = makeFile("second.pdf");

    fireEvent.change(fileInput(container), {
      target: { files: [first, second] },
    });

    expect(onFilesChange).toHaveBeenCalledWith([first]);
    expect(
      screen.getAllByText("Only one file can be selected."),
    ).toHaveLength(1);
    expect(screen.queryByText("second.pdf")).not.toBeInTheDocument();
  });

  it("ignores dropped files when disabled", () => {
    const onFilesChange = vi.fn();
    render(<FileUpload disabled onFilesChange={onFilesChange} />);

    fireEvent.drop(
      screen.getByRole("button", { name: /drop files here or browse/i }),
      { dataTransfer: { files: [makeFile("blocked.pdf")] } },
    );

    expect(onFilesChange).not.toHaveBeenCalled();
  });

  it("clears previous rejections after a valid selection", () => {
    const onFilesChange = vi.fn();
    const { container } = render(
      <FileUpload accept=".pdf" onFilesChange={onFilesChange} />,
    );

    fireEvent.change(fileInput(container), {
      target: { files: [makeFile("notes.txt", "text/plain")] },
    });
    expect(
      screen.getByText('"notes.txt" is not an accepted file type.'),
    ).toBeInTheDocument();

    const pdf = makeFile("report.pdf");
    fireEvent.change(fileInput(container), { target: { files: [pdf] } });

    expect(
      screen.queryByText('"notes.txt" is not an accepted file type.'),
    ).not.toBeInTheDocument();
    expect(onFilesChange).toHaveBeenCalledWith([pdf]);
  });

  it("reports rejection details to onReject", () => {
    const onReject = vi.fn();
    const { container } = render(
      <FileUpload maxSize={10} onReject={onReject} />,
    );
    const over = makeFile("over.pdf", "application/pdf", 11);

    fireEvent.change(fileInput(container), {
      target: { files: [over] },
    });

    expect(onReject).toHaveBeenCalledWith([
      {
        file: over,
        reason: "size",
        message: '"over.pdf" is larger than 10 B.',
      },
    ]);
    expect(onReject.mock.calls[0][0][0].file).toBe(over);
  });

  it("builds a hint from accept, maxSize and maxFiles", () => {
    render(
      <FileUpload
        accept="image/*,.pdf"
        maxSize={5 * 1024 * 1024}
        maxFiles={3}
      />,
    );

    expect(
      screen.getByText("Images, PDF · Up to 5 MB per file · Up to 3 files"),
    ).toBeInTheDocument();
  });

  it("forwards the ref to the native file input", () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<FileUpload ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current?.type).toBe("file");
  });

  it("marks the native input as required", () => {
    const { container } = render(<FileUpload required />);
    expect(fileInput(container)).toBeRequired();
  });

  it("appends to controlled files and reports the exact list", () => {
    const onFilesChange = vi.fn();
    const existing = makeFile("existing.pdf");
    const added = makeFile("added.pdf");
    const { container } = render(
      <FileUpload files={[existing]} onFilesChange={onFilesChange} />,
    );

    fireEvent.change(fileInput(container), { target: { files: [added] } });

    expect(onFilesChange).toHaveBeenCalledWith([existing, added]);
    expect(onFilesChange.mock.calls[0][0][0]).toBe(existing);
    expect(onFilesChange.mock.calls[0][0][1]).toBe(added);
    expect(screen.getByText("existing.pdf")).toBeInTheDocument();
  });
});
