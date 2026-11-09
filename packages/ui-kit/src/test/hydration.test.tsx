import * as React from "react";
import { act } from "react";
import { hydrateRoot, type Root } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { SsrRoot, ssrFixtures, type SsrFixture } from "./ssr-fixtures";

const containers: HTMLElement[] = [];

afterEach(() => {
  for (const container of containers.splice(0)) container.remove();
  vi.restoreAllMocks();
});

function createContainer() {
  const container = document.createElement("div");
  document.body.appendChild(container);
  containers.push(container);
  return container;
}

async function hydrateFixture(fixture: SsrFixture) {
  const container = createContainer();

  // 1. Render on the "server".
  container.innerHTML = renderToString(<SsrRoot>{fixture.render()}</SsrRoot>);

  // 2. Hydrate the exact same tree on the "client".
  const recoverableErrors: unknown[] = [];
  const consoleErrors: unknown[][] = [];
  const spy = vi.spyOn(console, "error").mockImplementation((...args) => {
    consoleErrors.push(args);
  });

  let root: Root | undefined;
  try {
    await act(async () => {
      root = hydrateRoot(container, <SsrRoot>{fixture.render()}</SsrRoot>, {
        onRecoverableError: (error) => recoverableErrors.push(error),
      });
    });
  } finally {
    spy.mockRestore();
  }

  await act(async () => {
    root?.unmount();
  });
  container.remove();

  return { recoverableErrors, consoleErrors };
}

describe("hydration", () => {
  it.each(ssrFixtures)("hydrates $name without mismatches", async (fixture) => {
    const { recoverableErrors, consoleErrors } = await hydrateFixture(fixture);

    expect(consoleErrors).toEqual([]);
    expect(recoverableErrors).toEqual([]);
  });

  it("reports an intentional mismatch (harness sanity check)", async () => {
    let renderCount = 0;
    function Mismatch() {
      renderCount += 1;
      return <span>{renderCount}</span>;
    }

    const container = createContainer();
    container.innerHTML = renderToString(<Mismatch />);

    const recoverableErrors: unknown[] = [];
    const consoleErrors: unknown[][] = [];
    const spy = vi.spyOn(console, "error").mockImplementation((...args) => {
      consoleErrors.push(args);
    });

    let root: Root | undefined;
    try {
      await act(async () => {
        root = hydrateRoot(container, <Mismatch />, {
          onRecoverableError: (error) => recoverableErrors.push(error),
        });
      });
    } finally {
      spy.mockRestore();
    }

    await act(async () => {
      root?.unmount();
    });
    container.remove();

    expect(recoverableErrors.length + consoleErrors.length).toBeGreaterThan(0);
  });
});
