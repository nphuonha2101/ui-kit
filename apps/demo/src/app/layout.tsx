import type { Metadata } from "next";
import Script from "next/script";
import "@fontsource/work-sans/400.css";
import "@fontsource/work-sans/500.css";
import "@fontsource/work-sans/600.css";
import "@fontsource/work-sans/700.css";
import "@fontsource/google-sans-code/400.css";
import "@fontsource/google-sans-code/500.css";
import "@fontsource/google-sans-code/600.css";
import "./globals.css";
import { Providers } from "@/components/site/providers";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";

export const metadata: Metadata = {
  metadataBase: new URL("https://ui.nphuonha.id.vn"),
  title: {
    default: "UI Kit — Solid, borderless, expressive",
    template: "%s — UI Kit",
  },
  description:
    "A solid, borderless, modern React UI kit built on Base UI, with a customizable accent and token-driven surfaces.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-ui="kit" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function(){try{
  var t=localStorage.getItem('ui-kit-theme');
  if(t==='dark'){document.documentElement.classList.add('dark');}
  var v=localStorage.getItem('ui-kit-accent-vars');
  if(v){var o=JSON.parse(v);for(var k in o){document.documentElement.style.setProperty(k,o[k]);}}
}catch(e){}})();`}
        </Script>
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
