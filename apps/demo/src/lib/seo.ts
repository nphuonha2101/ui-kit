import type { Metadata } from "next";

export const SITE_URL = "https://ui.nphuonha.id.vn";
export const SITE_NAME = "nphuonha UI";
export const SITE_TITLE = "nphuonha UI — Solid, borderless React UI kit";
export const SITE_DESCRIPTION =
  "A solid, borderless React UI kit for Tailwind v4. Base UI primitives where they exist, first-party calendar, date/time, color and data-grid controls where they don't, plus semantic tokens and a runtime-customizable accent.";

export const OG_IMAGE = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: SITE_TITLE,
};

export function pageMetadata({
  title,
  description,
  path,
}: {
  title?: string;
  description?: string;
  path: string;
}): Metadata {
  const fullTitle = title ? `${title} — ${SITE_NAME}` : SITE_TITLE;
  const pageDescription = description ?? SITE_DESCRIPTION;

  return {
    ...(title ? { title } : {}),
    description: pageDescription,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: path,
      siteName: SITE_NAME,
      title: fullTitle,
      description: pageDescription,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: pageDescription,
      images: [OG_IMAGE.url],
    },
  };
}
