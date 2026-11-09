"use client";

import * as React from "react";
import { cn, type IconComponent } from "../../../lib/utils";
import { useKitIcon } from "../_shared/icon-provider";
import { IconButton } from "../icon-button";
import { Label } from "../label";

export type FileRejectionReason = "type" | "size" | "count";

export interface FileRejection {
  file: File;
  reason: FileRejectionReason;
  message: string;
}

export interface FileUploadProps {
  id?: string;
  name?: string;
  files?: File[];
  defaultFiles?: File[];
  onFilesChange?: (files: File[]) => void;
  onReject?: (rejections: FileRejection[]) => void;
  accept?: string;
  multiple?: boolean;
  maxFiles?: number;
  maxSize?: number;
  disabled?: boolean;
  required?: boolean;
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: React.ReactNode;
  title?: React.ReactNode;
  hint?: React.ReactNode;
  icon?: IconComponent;
  showPreviews?: boolean;
  className?: string;
  dropzoneClassName?: string;
  onBlur?: React.FocusEventHandler<HTMLButtonElement>;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean;
}

const sizeUnits = ["B", "KB", "MB", "GB", "TB"] as const;

function formatFileSize(bytes: number) {
  if (!Number.isFinite(bytes) || bytes <= 0) return "0 B";
  const unitIndex = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    sizeUnits.length - 1,
  );
  const value = bytes / 1024 ** unitIndex;
  return `${new Intl.NumberFormat(undefined, {
    maximumFractionDigits: unitIndex === 0 ? 0 : 1,
  }).format(value)} ${sizeUnits[unitIndex]}`;
}

function describeAccept(accept?: string) {
  if (!accept) return null;
  const tokens = accept
    .split(",")
    .map((token) => token.trim())
    .filter(Boolean);
  if (!tokens.length) return null;
  if (tokens.length > 3) return "Supported files";
  return tokens
    .map((token) => {
      if (token.startsWith(".")) return token.slice(1).toUpperCase();
      if (token.endsWith("/*")) {
        const family = token.slice(0, -2);
        return `${family.charAt(0).toUpperCase()}${family.slice(1)}s`;
      }
      const subtype = token.split("/")[1];
      return (subtype ?? token).toUpperCase();
    })
    .join(", ");
}

function matchesAccept(file: File, accept?: string) {
  if (!accept) return true;
  const name = file.name.toLowerCase();
  const type = file.type.toLowerCase();
  return accept.split(",").some((rawToken) => {
    const token = rawToken.trim().toLowerCase();
    if (!token) return false;
    if (token.startsWith(".")) return name.endsWith(token);
    if (token.endsWith("/*")) return type.startsWith(token.slice(0, -1));
    return type === token;
  });
}

function fileKey(file: File) {
  return `${file.name}:${file.size}:${file.lastModified}`;
}

function FilePreview({
  file,
  showPreview,
}: {
  file: File;
  showPreview: boolean;
}) {
  const FileIcon = useKitIcon("file");
  const [url, setUrl] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (
      !showPreview ||
      !file.type.startsWith("image/") ||
      typeof URL.createObjectURL !== "function"
    ) {
      setUrl(null);
      return;
    }
    const nextUrl = URL.createObjectURL(file);
    setUrl(nextUrl);
    return () => URL.revokeObjectURL(nextUrl);
  }, [file, showPreview]);

  return (
    <span className="relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-xs bg-surface text-muted-foreground">
      {url ? (
        <img src={url} alt="" className="size-full object-cover" />
      ) : (
        <FileIcon size={18} aria-hidden="true" />
      )}
    </span>
  );
}

export const FileUpload = React.forwardRef<HTMLInputElement, FileUploadProps>(
  function FileUpload(
    {
      id,
      name,
      files,
      defaultFiles,
      onFilesChange,
      onReject,
      accept,
      multiple = true,
      maxFiles,
      maxSize,
      disabled,
      required,
      label,
      description,
      error,
      title,
      hint,
      icon,
      showPreviews = true,
      className,
      dropzoneClassName,
      onBlur,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      "aria-describedby": ariaDescribedBy,
      "aria-invalid": ariaInvalid,
    },
    ref,
  ) {
    const UploadIcon = useKitIcon("upload");
    const CloseIcon = useKitIcon("close");
    const DropzoneIcon = icon ?? UploadIcon;
    const autoId = React.useId();
    const inputId = id ?? autoId;
    const buttonId = `${inputId}-dropzone`;
    const descriptionId = description ? `${inputId}-description` : undefined;
    const errorId = error ? `${inputId}-error` : undefined;
    const rejectionId = `${inputId}-rejections`;
    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const dragDepth = React.useRef(0);
    const [internalFiles, setInternalFiles] = React.useState<File[]>(
      () => defaultFiles ?? [],
    );
    const [rejections, setRejections] = React.useState<FileRejection[]>([]);
    const [dragging, setDragging] = React.useState(false);

    const controlled = files !== undefined;
    const currentFiles = controlled ? files : internalFiles;
    const rejectionMessages = Array.from(
      new Set(rejections.map((rejection) => rejection.message)),
    );
    const invalid =
      Boolean(error) || Boolean(ariaInvalid) || rejectionMessages.length > 0;

    const setInputRef = React.useCallback(
      (node: HTMLInputElement | null) => {
        inputRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      },
      [ref],
    );

    React.useEffect(() => {
      const input = inputRef.current;
      if (!input || typeof DataTransfer === "undefined") return;
      try {
        const transfer = new DataTransfer();
        for (const file of currentFiles) transfer.items.add(file);
        input.files = transfer.files;
      } catch {
        // Some environments expose DataTransfer without writable files.
      }
    }, [currentFiles]);

    const commit = (nextFiles: File[]) => {
      if (!controlled) setInternalFiles(nextFiles);
      onFilesChange?.(nextFiles);
    };

    const reject = (nextRejections: FileRejection[]) => {
      setRejections(nextRejections);
      if (nextRejections.length) onReject?.(nextRejections);
    };

    const validate = (file: File): FileRejection | null => {
      if (!matchesAccept(file, accept)) {
        return {
          file,
          reason: "type",
          message: `"${file.name}" is not an accepted file type.`,
        };
      }
      if (maxSize !== undefined && file.size > maxSize) {
        return {
          file,
          reason: "size",
          message: `"${file.name}" is larger than ${formatFileSize(maxSize)}.`,
        };
      }
      return null;
    };

    const addFiles = (incoming: File[]) => {
      if (!incoming.length) return;

      const rejected: FileRejection[] = [];
      const accepted: File[] = [];

      if (!multiple) {
        const [first, ...rest] = incoming;
        if (first) {
          const rejection = validate(first);
          if (rejection) rejected.push(rejection);
          else accepted.push(first);
        }
        for (const file of rest) {
          rejected.push({
            file,
            reason: "count",
            message: "Only one file can be selected.",
          });
        }
      } else {
        const existingKeys = new Set(currentFiles.map(fileKey));
        for (const file of incoming) {
          if (
            maxFiles !== undefined &&
            currentFiles.length + accepted.length >= maxFiles
          ) {
            rejected.push({
              file,
              reason: "count",
              message:
                maxFiles === 1
                  ? "Only one file can be selected."
                  : `You can add up to ${maxFiles} files.`,
            });
            continue;
          }
          if (existingKeys.has(fileKey(file))) continue;
          const rejection = validate(file);
          if (rejection) {
            rejected.push(rejection);
            continue;
          }
          accepted.push(file);
          existingKeys.add(fileKey(file));
        }
      }

      if (accepted.length) {
        commit(
          multiple ? [...currentFiles, ...accepted] : accepted.slice(0, 1),
        );
      }
      reject(rejected);
    };

    const openPicker = () => {
      if (!disabled) inputRef.current?.click();
    };

    const removeFile = (index: number) => {
      commit(currentFiles.filter((_, fileIndex) => fileIndex !== index));
    };

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      addFiles(Array.from(event.target.files ?? []));
      event.target.value = "";
    };

    const onDragEnter = (event: React.DragEvent<HTMLButtonElement>) => {
      if (disabled) return;
      event.preventDefault();
      dragDepth.current += 1;
      setDragging(true);
    };

    const onDragOver = (event: React.DragEvent<HTMLButtonElement>) => {
      if (disabled) return;
      event.preventDefault();
      event.dataTransfer.dropEffect = "copy";
    };

    const onDragLeave = (event: React.DragEvent<HTMLButtonElement>) => {
      if (disabled) return;
      event.preventDefault();
      dragDepth.current = Math.max(0, dragDepth.current - 1);
      if (dragDepth.current === 0) setDragging(false);
    };

    const onDrop = (event: React.DragEvent<HTMLButtonElement>) => {
      if (disabled) return;
      event.preventDefault();
      dragDepth.current = 0;
      setDragging(false);
      addFiles(Array.from(event.dataTransfer.files ?? []));
    };

    const hintParts: string[] = [];
    const acceptLabel = describeAccept(accept);
    if (acceptLabel) hintParts.push(acceptLabel);
    if (maxSize !== undefined) {
      hintParts.push(`Up to ${formatFileSize(maxSize)} per file`);
    }
    if (!multiple) hintParts.push("One file");
    else if (maxFiles !== undefined) {
      hintParts.push(
        maxFiles === 1 ? "One file" : `Up to ${maxFiles} files`,
      );
    }
    if (!hintParts.length) hintParts.push("Any file type");
    const hintText = hint ?? hintParts.join(" · ");

    const describedBy =
      [ariaDescribedBy, descriptionId, errorId, rejectionId]
        .filter(Boolean)
        .join(" ") || undefined;

    return (
      <div className={cn("flex flex-col gap-1.5", className)}>
        {label ? (
          <Label htmlFor={inputId} requiredMark={required}>
            {label}
          </Label>
        ) : null}

        <input
          ref={setInputRef}
          id={inputId}
          name={name}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          required={required}
          onChange={onInputChange}
          className="sr-only"
          tabIndex={-1}
          aria-hidden="true"
        />

        <button
          id={buttonId}
          type="button"
          disabled={disabled}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
          onBlur={onBlur}
          onClick={openPicker}
          onDragEnter={onDragEnter}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          className={cn(
            "surface-curved-soft relative flex w-full cursor-pointer flex-col items-center justify-center gap-2.5 rounded-card bg-surface px-6 py-8 text-center outline-none transition-[background-color,box-shadow] duration-[var(--duration-ui)] ease-[var(--ease-out-ui)]",
            "hover:bg-surface-hover focus-visible:ring-2 focus-visible:ring-ring/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            dragging && "bg-primary-soft/45 shadow-[var(--shadow-soft)]",
            invalid && "bg-destructive/10",
            disabled && "cursor-not-allowed opacity-45 hover:bg-surface",
            dropzoneClassName,
          )}
        >
          <span className="flex size-11 items-center justify-center rounded-pill bg-primary-soft text-primary-soft-foreground">
            <DropzoneIcon size={20} />
          </span>
          <span className="flex flex-col gap-1">
            <span className="text-sm font-medium text-foreground">
              {title ?? (
                <>
                  Drop files here or{" "}
                  <span className="text-primary">browse</span>
                </>
              )}
            </span>
            {hintText ? (
              <span className="text-xs text-muted-foreground">{hintText}</span>
            ) : null}
          </span>
        </button>

        {rejectionMessages.length ? (
          <div
            id={rejectionId}
            role="alert"
            className="flex flex-col gap-1 text-xs font-medium text-destructive"
          >
            {rejectionMessages.map((message) => (
              <p key={message}>{message}</p>
            ))}
          </div>
        ) : null}

        {currentFiles.length ? (
          <ul className="mt-1 flex flex-col gap-2" aria-label="Selected files">
            {currentFiles.map((file, index) => (
              <li
                key={`${fileKey(file)}:${index}`}
                className="surface-curved-soft relative flex items-center gap-3 rounded-control bg-field px-2.5 py-2"
              >
                <FilePreview file={file} showPreview={showPreviews} />
                <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <span
                    className="truncate text-sm font-medium text-foreground"
                    title={file.name}
                  >
                    {file.name}
                  </span>
                  <span className="text-xs tabular-nums text-muted-foreground">
                    {formatFileSize(file.size)}
                  </span>
                </span>
                <IconButton
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  aria-label={`Remove ${file.name}`}
                  onClick={() => removeFile(index)}
                  disabled={disabled}
                  className="shrink-0 text-muted-foreground hover:text-foreground"
                >
                  <CloseIcon size={15} aria-hidden="true" />
                </IconButton>
              </li>
            ))}
          </ul>
        ) : null}

        {description ? (
          <p id={descriptionId} className="text-xs text-muted-foreground">
            {description}
          </p>
        ) : null}
        {error && typeof error !== "boolean" ? (
          <p
            id={errorId}
            role="alert"
            className="text-xs font-medium text-destructive"
          >
            {error}
          </p>
        ) : null}
      </div>
    );
  },
);
FileUpload.displayName = "FileUpload";
