import Image from "next/image";
import { cn } from "@nphuonha/ui-kit";

export function BrandLogo({
  className,
  logoClassName = "h-5 sm:h-6",
}: {
  className?: string;
  logoClassName?: string;
}) {
  return (
    <span
      role="img"
      aria-label="nphuonha UI"
      className={cn("inline-flex items-center gap-1.5", className)}
    >
      <Image
        src="/nphuonha-logo.svg"
        alt=""
        width={3333}
        height={755}
        priority
        className={cn("w-auto dark:hidden", logoClassName)}
      />
      <Image
        src="/nphuonha-logo-dark.svg"
        alt=""
        width={3333}
        height={755}
        priority
        className={cn("hidden w-auto dark:block", logoClassName)}
      />
      <span
        aria-hidden="true"
        className="font-mono text-sm font-semibold tracking-[-0.02em] text-[#265E39] dark:text-[#A7D8B6] sm:text-base"
      >
        UI
      </span>
    </span>
  );
}
