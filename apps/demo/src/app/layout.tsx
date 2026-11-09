import type { Metadata } from "next";
import "@fontsource/work-sans/400.css";
import "@fontsource/work-sans/500.css";
import "@fontsource/work-sans/600.css";
import "@fontsource/work-sans/700.css";
import "@fontsource/google-sans-code/400.css";
import "@fontsource/google-sans-code/500.css";
import "@fontsource/google-sans-code/600.css";
import "./globals.css";
import { Providers } from "@/components/site/providers";
import { InlineScript } from "@/components/site/inline-script";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import {
  OG_IMAGE,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
} from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: SITE_TITLE,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  authors: [{ name: "nphuonha", url: "https://nphuonha.id.vn" }],
  creator: "nphuonha",
  publisher: "nphuonha",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE.url],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      inLanguage: "en",
    },
    {
      "@type": "SoftwareApplication",
      name: SITE_NAME,
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Web",
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      author: {
        "@type": "Person",
        name: "nphuonha",
        url: "https://nphuonha.id.vn",
      },
      sameAs: [
        "https://github.com/nphuonha2101/ui-kit",
        "https://www.npmjs.com/package/@nphuonha/ui-kit",
      ],
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-ui="kit" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <InlineScript
          id="theme-init"
          html={`(function(){try{
  var t=localStorage.getItem('ui-kit-theme');
  if(t==='dark'){document.documentElement.classList.add('dark');}
  var v=localStorage.getItem('ui-kit-accent-vars');
  if(v){var o=JSON.parse(v);for(var k in o){document.documentElement.style.setProperty(k,o[k]);}}
}catch(e){}})();
(function(){try{
  if(!window.matchMedia||!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    document.documentElement.classList.add('motion-ready');
    window.setTimeout(function(){document.documentElement.classList.remove('motion-ready');},3000);
  }
}catch(e){}})();`}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Providers>
          <SiteHeader />
          <main className="flex-1 pt-16">{children}</main>
          <SiteFooter />
        </Providers>
        {process.env.NODE_ENV === "production" ? (
          <script
            type="module"
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={JSON.stringify({
              token: "70b29b839a2e4ae383648efc1c71772e",
            })}
          />
        ) : null}
      </body>
    </html>
  );
}
