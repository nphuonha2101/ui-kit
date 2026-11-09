import type { Metadata } from "next";
import { DesktopNavLab } from "./lab";

export const metadata: Metadata = {
  title: "DesktopNav lab",
  robots: { index: false, follow: false },
};

export default function DesktopNavLabPage() {
  return <DesktopNavLab />;
}
