import { cva, type VariantProps } from "class-variance-authority";

export const toggleVariants = cva(
  "relative inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap text-sm font-medium tracking-[-0.01em] transition-[background-color,color,box-shadow,transform] duration-[var(--duration-ui)] ease-[var(--ease-out-ui)] outline-none select-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-45 disabled:shadow-none disabled:hover:bg-transparent disabled:hover:text-muted-foreground motion-safe:active:scale-[0.97]",
  {
    variants: {
      variant: {
        default:
          "bg-transparent text-muted-foreground hover:bg-surface hover:text-foreground data-[pressed]:surface-curved-soft data-[pressed]:bg-primary-soft data-[pressed]:text-primary-soft-foreground",
        outline:
          "bg-transparent text-foreground shadow-[inset_0_0_0_1.5px_var(--border)] hover:bg-surface data-[pressed]:surface-curved-soft data-[pressed]:bg-primary-soft data-[pressed]:text-primary-soft-foreground data-[pressed]:shadow-[inset_0_0_0_1.5px_var(--primary)]",
      },
      size: {
        sm: "h-9 px-3.5 text-[13px]",
        default: "h-10 px-4",
        lg: "h-11 px-5 text-[15px]",
        icon: "size-10 p-0",
        "icon-sm": "size-9 p-0",
      },
      shape: {
        rounded: "rounded-control",
        pill: "rounded-pill",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      shape: "rounded",
    },
  },
);

export type ToggleVariants = VariantProps<typeof toggleVariants>;
