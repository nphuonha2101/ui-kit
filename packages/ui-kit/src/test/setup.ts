import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

// Vitest does not expose its globals unless `globals: true`, so
// @testing-library/react cannot set this up automatically. Without it, React
// logs "The current testing environment is not configured to support act(...)"
// for every update made through act().
(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

afterEach(() => {
  cleanup();
});

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

globalThis.ResizeObserver = ResizeObserverMock as unknown as typeof ResizeObserver;

// The setup file is also loaded by SSR tests that run in the "node" environment,
// where DOM globals are intentionally absent. Guard DOM-only mocks so those
// tests can verify that components never touch browser APIs during render.
if (typeof window !== "undefined" && !window.matchMedia) {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }),
  });
}

if (typeof HTMLElement !== "undefined") {
  if (!HTMLElement.prototype.scrollIntoView) {
    HTMLElement.prototype.scrollIntoView = vi.fn() as unknown as typeof HTMLElement.prototype.scrollIntoView;
  }

  if (!HTMLElement.prototype.hasPointerCapture) {
    HTMLElement.prototype.hasPointerCapture = vi.fn(() => false) as unknown as typeof HTMLElement.prototype.hasPointerCapture;
  }

  if (!HTMLElement.prototype.setPointerCapture) {
    HTMLElement.prototype.setPointerCapture = vi.fn() as unknown as typeof HTMLElement.prototype.setPointerCapture;
  }

  if (!HTMLElement.prototype.releasePointerCapture) {
    HTMLElement.prototype.releasePointerCapture = vi.fn() as unknown as typeof HTMLElement.prototype.releasePointerCapture;
  }
}

// Base UI interrogates WAAPI during close animations. jsdom implements neither
// getAnimations nor animate, so return an empty animation list.
if (typeof Element !== "undefined" && !Element.prototype.getAnimations) {
  Element.prototype.getAnimations = (() => []) as typeof Element.prototype.getAnimations;
}
