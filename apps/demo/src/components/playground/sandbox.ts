export function createSandboxHtml(runtimeUrl: string, baseUrl: string) {
  return `<!doctype html>
<html lang="en" data-ui="kit">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <base href="${baseUrl}" />
    <style id="kit-theme"></style>
    <style id="kit-accent"></style>
    <style>
      html, body { height: 100%; }
      body {
        margin: 0;
        display: grid;
        place-items: center;
        padding: 24px;
        background: var(--background);
        color: var(--foreground);
        font-family: var(--font-body);
      }
      #root { width: 100%; max-width: 640px; }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script src="${runtimeUrl}"></script>
    <script>
      (function () {
        "use strict";

        var root = document.getElementById("root");
        var themeStyle = document.getElementById("kit-theme");
        var accentStyle = document.getElementById("kit-accent");
        var runtime = window.KitPlaygroundRuntime;
        var reactRoot = null;
        var renderSeq = 0;
        var lastAppliedSeq = 0;
        // The sandbox is intentionally opaque. Only accept render/theme
        // messages from the direct parent page at the expected origin.
        var expectedOrigin = new URL(document.baseURI).origin;

        function send(type, payload) {
          parent.postMessage(
            Object.assign({ source: "kit-playground", type: type }, payload || {}),
            "*"
          );
        }

        function serialize(value) {
          if (typeof value === "string") return value;
          if (value instanceof Error) return value.stack || value.message;
          try {
            return JSON.stringify(value);
          } catch (error) {
            return String(value);
          }
        }

        ["log", "info", "warn", "error"].forEach(function (level) {
          var original = console[level];
          console[level] = function () {
            var args = Array.prototype.slice.call(arguments).map(serialize);
            send("log", { level: level, args: args });
            original.apply(console, arguments);
          };
        });

        window.addEventListener("error", function (event) {
          send("error", { message: event.message || "Unknown error" });
        });

        window.addEventListener("unhandledrejection", function (event) {
          send("error", { message: serialize(event.reason) });
        });

        function applyTheme(data) {
          var html = document.documentElement;
          html.setAttribute("data-ui", "kit");
          html.classList.toggle("dark", Boolean(data.dark));
          themeStyle.textContent = data.styles || "";

          var vars = data.accentVars || {};
          accentStyle.textContent =
            ":root{" +
            Object.keys(vars)
              .map(function (key) {
                return key + ":" + vars[key] + ";";
              })
              .join("") +
            "}";
        }

        function getPhosphorIcons() {
          if (!runtime.PhosphorIcons) return {};
          return new Proxy(runtime.PhosphorIcons, {
            get: function (target, prop) {
              if (prop in target) return target[prop];
              if (typeof prop === "string" && /Icon$/.test(prop)) {
                return function MissingIcon() {
                  return runtime.React.createElement("span", {
                    title: "Icon not bundled: " + prop,
                    style: {
                      display: "inline-block",
                      width: "1em",
                      height: "1em",
                      border: "1px dashed currentColor",
                      borderRadius: 4,
                      opacity: 0.5,
                    },
                  });
                };
              }
              return target[prop];
            },
          });
        }

        function makeRequire() {
          return function (id) {
            if (id === "react") return runtime.React;
            if (id === "react/jsx-runtime") return runtime.jsxRuntime;
            if (id === "react/jsx-dev-runtime") return runtime.jsxDevRuntime;
            if (id === "react-dom/client") return runtime.ReactDOMClient;
            if (id === "@nphuonha/ui-kit") return runtime.UIKit;
            if (id === "@phosphor-icons/react") return getPhosphorIcons();
            throw new Error(
              'Module not found: "' +
                id +
                '". Supported imports: react, react-dom/client, @nphuonha/ui-kit and @phosphor-icons/react (curated icons).'
            );
          };
        }

        function ErrorBoundary(props) {
          runtime.React.Component.call(this, props);
          this.state = { error: null };
        }

        ErrorBoundary.prototype = Object.create(runtime.React.Component.prototype);
        ErrorBoundary.prototype.constructor = ErrorBoundary;
        ErrorBoundary.getDerivedStateFromError = function (error) {
          return { error: error };
        };
        ErrorBoundary.prototype.componentDidCatch = function (error, info) {
          send("error", {
            message: serialize(error),
            seq: this.props.seq || 0,
          });
        };
        ErrorBoundary.prototype.render = function () {
          if (this.state.error) {
            return runtime.React.createElement(
              "div",
              {
                className:
                  "surface-curved relative rounded-card bg-destructive/10 p-4 text-sm text-destructive",
              },
              String(
                (this.state.error && (this.state.error.stack || this.state.error.message)) ||
                  this.state.error
              )
            );
          }
          return this.props.children;
        };

        function renderError(message, seq) {
          if (!runtime) return;
          if (!reactRoot) {
            reactRoot = runtime.ReactDOMClient.createRoot(root);
          }
          reactRoot.render(
            runtime.React.createElement(
              "div",
              {
                className:
                  "surface-curved relative rounded-card bg-destructive/10 p-4 text-sm text-destructive",
              },
              String(message)
            )
          );
          send("error", { message: serialize(message), seq: seq || 0 });
        }

        function render(code, seq) {
          if (!runtime) throw new Error("Playground runtime failed to load.");

          var module = { exports: {} };
          var fn = new Function("require", "module", "exports", code);
          fn(makeRequire(), module, module.exports);

          var App = module.exports.default || module.exports.App;
          if (typeof App !== "function") {
            throw new Error("Export a default App component from App.tsx.");
          }

          if (!reactRoot) {
            reactRoot = runtime.ReactDOMClient.createRoot(root);
          }
          // Remount the boundary on every render (key = seq). Without this,
          // a previous runtime error keeps ErrorBoundary in its error state
          // and all future renders keep showing the old fallback UI even
          // after the code is fixed.
          renderSeq += 1;
          var boundaryKey = typeof seq === "number" ? seq : renderSeq;
          reactRoot.render(
            runtime.React.createElement(
              ErrorBoundary,
              { key: boundaryKey, seq: boundaryKey },
              runtime.React.createElement(App)
            )
          );
          send("rendered", { seq: typeof seq === "number" ? seq : boundaryKey });
        }

        window.addEventListener("message", function (event) {
          if (event.source !== window.parent) return;
          if (event.origin !== expectedOrigin) return;

          var data = event.data;
          if (!data || data.source !== "kit-playground-host") return;

          if (data.type === "theme") {
            applyTheme(data);
            return;
          }

          if (data.type === "render") {
            var incomingSeq = typeof data.seq === "number" ? data.seq : 0;
            // Ignore out-of-order renders: a slow transform for old code must
            // not overwrite the result of newer code.
            if (incomingSeq !== 0 && incomingSeq < lastAppliedSeq) return;
            if (incomingSeq !== 0) lastAppliedSeq = incomingSeq;
            try {
              render(data.code, incomingSeq || undefined);
            } catch (error) {
              renderError(serialize(error), incomingSeq || 0);
            }
          }
        });

        send("ready", {});
      })();
    </script>
  </body>
</html>`;
}
