import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UI Kit — Solid / Clean / Flat / Modern",
  description: "MVP showcase for @nphuonha/ui-kit.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-ui="kit" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
