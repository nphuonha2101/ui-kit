import { cva, type VariantProps } from "class-variance-authority";

export const alertVariants = cva(
  "surface-curved-soft relative flex w-full items-start gap-3 rounded-card px-4 py-3.5 text-sm",
  {
    variants: {
      /** Tone of the alert. */
      variant: {
        neutral: "bg-surface text-foreground",
        info: "bg-info/10 text-foreground",
        success: "bg-success/10 text-foreground",
        warning: "bg-warning/12 text-foreground",
        danger: "bg-destructive/10 text-foreground",
      },
    },
    defaultVariants: { variant: "neutral" },
  },
);

export type AlertVariants = VariantProps<typeof alertVariants>;
