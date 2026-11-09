"use client";

import * as React from "react";
import { ArrowUpIcon } from "@phosphor-icons/react";
import { IconButton } from "@nphuonha/ui-kit";

export function BackToTop() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <IconButton
      aria-label="Back to top"
      variant="secondary"
      size="icon"
      shape="pill"
      onClick={() => {
        const reduce = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;
        window.scrollTo({
          top: 0,
          behavior: reduce ? "auto" : "smooth",
        });
      }}
      className="fixed bottom-[calc(env(safe-area-inset-bottom)+5rem)] right-4 z-40 shadow-soft lg:bottom-6 lg:right-6"
    >
      <ArrowUpIcon size={18} />
    </IconButton>
  );
}
