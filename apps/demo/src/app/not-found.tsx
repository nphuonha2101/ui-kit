import Link from "next/link";
import { CompassIcon } from "@/components/icons";
import { buttonVariants } from "@nphuonha/ui-kit";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-xl flex-col items-center justify-center gap-4 px-4 text-center">
      <span className="flex size-12 items-center justify-center rounded-control bg-primary-soft text-primary-soft-foreground">
        <CompassIcon size={22} />
      </span>
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        404
      </p>
      <h1 className="text-3xl font-semibold tracking-[-0.04em]">Page not found</h1>
      <p className="max-w-sm text-sm leading-7 text-muted-foreground">
        The page you are looking for does not exist. Try the component index or head back to
        the docs.
      </p>
      <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
        <Link href="/docs" className={buttonVariants()}>
          Back to docs
        </Link>
        <Link href="/docs/components" className={buttonVariants({ variant: "secondary" })}>
          Browse components
        </Link>
      </div>
    </div>
  );
}
