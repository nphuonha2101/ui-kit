"use client";

import Link from "next/link";
import Image from "next/image";
import { GithubLogoIcon, PackageIcon } from "@phosphor-icons/react";
import { BrandLogo } from "./brand-logo";

const GITHUB_URL = "https://github.com/nphuonha2101/ui-kit";
const NPM_URL = "https://www.npmjs.com/package/@nphuonha/ui-kit";

const columns = [
  {
    title: "Documentation",
    links: [
      { label: "Introduction", href: "/docs" },
      { label: "Installation", href: "/docs/installation" },
      { label: "Theming", href: "/docs/theming" },
      { label: "Components", href: "/docs/components" },
      { label: "For agents", href: "/docs/agents" },
    ],
  },
  {
    title: "Components",
    links: [
      { label: "Button", href: "/docs/components/button" },
      { label: "Input", href: "/docs/components/input" },
      { label: "Dialog", href: "/docs/components/dialog" },
      { label: "Tabs", href: "/docs/components/tabs" },
    ],
  },
  {
    title: "Project",
    links: [
      { label: "GitHub", href: GITHUB_URL, external: true },
      { label: "npm package", href: NPM_URL, external: true },
      { label: "Issues", href: `${GITHUB_URL}/issues`, external: true },
      { label: "MIT License", href: `${GITHUB_URL}/blob/main/LICENSE`, external: true },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-border/60 bg-background">
      <div className="mx-auto w-full max-w-6xl px-4 pt-16 md:px-6 sm:pt-20">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" aria-label="nphuonha UI home" className="inline-flex">
              <BrandLogo logoClassName="h-7 sm:h-8" />
            </Link>
            <p className="mt-4 max-w-[260px] text-sm leading-relaxed text-muted-foreground">
              Solid surfaces, borderless components and an accent you can change at
              runtime. Built with React, Next.js and Base UI.
            </p>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h4 className="mb-4 text-sm font-semibold text-foreground">{column.title}</h4>
              <div className="flex flex-col gap-3">
                {column.links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    {...("external" in link && link.external
                      ? { target: "_blank", rel: "noreferrer" }
                      : {})}
                    className="w-fit text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-14 flex max-w-5xl flex-col gap-4 border-t border-border/60 pt-7 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} nphuonha UI &bull; MIT License
          </p>
          <div className="flex items-center gap-4">
            <p>
              Built by{" "}
              <a
                href="https://nphuonha.id.vn"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-foreground transition-colors hover:underline"
              >
                nphuonha
              </a>
            </p>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub repository"
              className="transition-colors hover:text-foreground"
            >
              <GithubLogoIcon size={16} />
            </a>
            <a
              href={NPM_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="npm package"
              className="transition-colors hover:text-foreground"
            >
              <PackageIcon size={16} />
            </a>
          </div>
        </div>

        <div className="pointer-events-none relative -mb-[2.5vw] mt-12 select-none overflow-hidden">
          <div
            aria-hidden="true"
            className="flex items-end justify-center gap-[0.35vw] opacity-[0.08]"
          >
            <Image
              src="/nphuonha-logo.svg"
              alt=""
              width={3333}
              height={755}
              className="h-auto w-[82%] dark:hidden"
            />
            <Image
              src="/nphuonha-logo-dark.svg"
              alt=""
              width={3333}
              height={755}
              className="hidden h-auto w-[82%] dark:block"
            />
            <span className="pb-[2%] font-mono text-[clamp(2rem,8vw,8.75rem)] font-semibold leading-none tracking-[-0.02em] text-[#265E39] dark:text-[#A7D8B6]">
              UI
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
