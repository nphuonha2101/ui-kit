"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

export function HomeMotion({ children }: { children: React.ReactNode }) {
  const root = React.useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const rootEl = root.current;
    if (!rootEl) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const heroCopy = gsap.utils.toArray<HTMLElement>(
        "[data-motion='hero-copy'] > *",
        rootEl,
      );
      const heroCard = rootEl.querySelector<HTMLElement>("[data-motion='hero-card']");
      const heroGlow = rootEl.querySelector<HTMLElement>("[data-motion='hero-glow']");
      const revealEls = gsap.utils.toArray<HTMLElement>("[data-motion='reveal']", rootEl);
      const cardEls = gsap.utils.toArray<HTMLElement>(
        "[data-motion='component-card'], [data-motion='feature-card']",
        rootEl,
      );

      const hero = gsap.timeline({ defaults: { ease: "power3.out" } });

      hero.fromTo(
        heroCopy,
        { y: 22, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          stagger: 0.08,
        },
      );

      if (heroCard) {
        hero.fromTo(
          heroCard,
          { y: 30, scale: 0.985, autoAlpha: 0 },
          {
            y: 0,
            scale: 1,
            autoAlpha: 1,
            duration: 0.9,
          },
          "-=0.45",
        );
      }

      if (heroGlow) {
        gsap.to(heroGlow, {
          scale: 1.08,
          opacity: 0.85,
          duration: 6,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      }

      revealEls.forEach((el) => {
        gsap.fromTo(
          el,
          { y: 24, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              once: true,
            },
          },
        );
      });

      gsap.set(cardEls, { y: 26, autoAlpha: 0 });

      ScrollTrigger.batch(cardEls, {
        start: "top 90%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            y: 0,
            autoAlpha: 1,
            duration: 0.65,
            ease: "power2.out",
            stagger: 0.07,
            overwrite: true,
          }),
      });
    }, rootEl);

    // Hand off the pre-paint hidden state to GSAP-managed inline styles.
    document.documentElement.classList.remove("motion-ready");

    return () => mm.revert();
  }, { scope: root });

  return <div ref={root}>{children}</div>;
}
