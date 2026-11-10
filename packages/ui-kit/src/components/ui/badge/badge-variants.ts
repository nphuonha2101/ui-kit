import { cva, type VariantProps } from "class-variance-authority";

export const badgeVariants = cva(
  "surface-curved-soft relative inline-flex items-center gap-1 whitespace-nowrap rounded-pill px-2.5 py-0.5 text-xs font-semibold tracking-[-0.01em] transition-colors",
  {
    variants: {
      /** Tone of the badge. */
      variant: {
        neutral: "bg-surface text-foreground",
        primary: "bg-primary-soft text-primary-soft-foreground",
        success: "bg-success/12 text-success",
        warning: "bg-warning/14 text-warning",
        danger: "bg-destructive/12 text-destructive",
        info: "bg-info/12 text-info",
        solid: "bg-primary text-primary-foreground",
        outline: "bg-transparent text-foreground shadow-[inset_0_0_0_1px_var(--border)]",
      },
    },
    defaultVariants: { variant: "neutral" },
  },
);

export type BadgeVariants = VariantProps<typeof badgeVariants>;
