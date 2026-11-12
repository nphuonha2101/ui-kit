"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

const START_DELAY = 140;
const SAFETY_TIMEOUT = 10_000;

const ROUTE_START_EVENT = "ui-kit:route-start";

/** Start the indicator for programmatic navigations such as router.push(). */
export function startRouteTransition() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(ROUTE_START_EVENT));
}

const RouteTransitionContext = React.createContext(false);

/** True while a client-side navigation has been pending long enough to show. */
export function useRouteTransitionPending() {
  return React.useContext(RouteTransitionContext);
}

function normalizePath(pathname: string) {
  return pathname.replace(/\/+$/, "") || "/";
}

function isInternalNavigation(event: MouseEvent) {
  if (
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) {
    return false;
  }

  const target = event.target;
  const anchor =
    target instanceof Element ? target.closest<HTMLAnchorElement>("a[href]") : null;
  if (!anchor) return false;
  if (anchor.target && anchor.target !== "_self") return false;
  if (anchor.hasAttribute("download")) return false;

  const url = new URL(anchor.href, window.location.href);
  if (url.origin !== window.location.origin) return false;
  return normalizePath(url.pathname) !== normalizePath(window.location.pathname);
}

/**
 * Tracks client-side navigations and exposes a delayed pending flag. Fast
 * (prefetched) routes never flip it on, so the logo only reacts when a
 * transition actually takes long enough to need feedback.
 */
export function RouteTransitionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [pending, setPending] = React.useState(false);
  const active = React.useRef(false);
  const previousPathname = React.useRef(pathname);
  const timers = React.useRef<number[]>([]);

  const clearTimers = React.useCallback(() => {
    for (const timer of timers.current) window.clearTimeout(timer);
    timers.current = [];
  }, []);

  const reset = React.useCallback(() => {
    active.current = false;
    clearTimers();
    setPending(false);
  }, [clearTimers]);

  const start = React.useCallback(() => {
    if (active.current) return;
    clearTimers();
    active.current = true;
    setPending(false);

    timers.current.push(
      window.setTimeout(() => {
        if (active.current) setPending(true);
      }, START_DELAY),
      window.setTimeout(reset, SAFETY_TIMEOUT),
    );
  }, [clearTimers, reset]);

  const finish = React.useCallback(() => {
    if (!active.current) return;
    active.current = false;
    clearTimers();
    setPending(false);
  }, [clearTimers]);

  React.useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (isInternalNavigation(event)) start();
    };
    const onRouteStart = () => start();

    document.addEventListener("click", onClick);
    window.addEventListener("popstate", onRouteStart);
    window.addEventListener(ROUTE_START_EVENT, onRouteStart);

    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("popstate", onRouteStart);
      window.removeEventListener(ROUTE_START_EVENT, onRouteStart);
      clearTimers();
    };
  }, [clearTimers, start]);

  React.useEffect(() => {
    if (previousPathname.current === pathname) return;
    previousPathname.current = pathname;
    finish();
  }, [finish, pathname]);

  return (
    <RouteTransitionContext.Provider value={pending}>
      {children}
    </RouteTransitionContext.Provider>
  );
}
