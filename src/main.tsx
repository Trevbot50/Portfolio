
import { createRoot } from "react-dom/client";
import "./styles/index.css";

function renderFatalError(message: string, err?: unknown) {
  const root = document.getElementById("root");
  if (root) {
    const details = err instanceof Error ? `${err.name}: ${err.message}\n${err.stack ?? ""}` : String(err ?? "");
    root.innerHTML = `
      <div style="max-width:900px;margin:0 auto;padding:24px;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
        <h1 style="font-size:18px;margin:0 0 12px;">App failed to start</h1>
        <pre style="white-space:pre-wrap;background:#111;color:#eee;padding:12px;border-radius:8px;overflow:auto;">${escapeHtml(
          `${message}\n\n${details}`.trim()
        )}</pre>
      </div>
    `;
  }
  // Still log for the console
  // eslint-disable-next-line no-console
  console.error(message, err);
}

function escapeHtml(input: string) {
  return input.replace(/[&<>"']/g, (ch) => {
    switch (ch) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      case "'":
        return "&#39;";
      default:
        return ch;
    }
  });
}

// eslint-disable-next-line no-console
console.log("[bootstrap] main.tsx loaded");

window.addEventListener("error", (e) => {
  renderFatalError("Uncaught error", e.error ?? e.message);
});
window.addEventListener("unhandledrejection", (e) => {
  renderFatalError("Unhandled promise rejection", (e as PromiseRejectionEvent).reason);
});

async function bootstrap() {
  const el = document.getElementById("root");
  if (!el) throw new Error("Missing #root element");

  // Force an explicit URL import (bypasses resolver quirks + stale module graph entries).
  const appUrl = `/src/app/root.tsx?t=${Date.now()}`;

  // Debug what Vite is actually serving for this module.
  const res = await fetch(appUrl);
  const served = await res.text();
  // eslint-disable-next-line no-console
  console.log("[bootstrap] fetch", appUrl, "status:", res.status, res.statusText);
  // eslint-disable-next-line no-console
  console.log("[bootstrap] served module preview:", served.slice(0, 300));

  // Also inspect the ScrollChevron module that is currently failing at runtime.
  const chevronUrl = `/src/app/components/shared/scroll-chevron.tsx?t=${Date.now()}`;
  const chevronRes = await fetch(chevronUrl);
  const chevronServed = await chevronRes.text();
  // eslint-disable-next-line no-console
  console.log("[bootstrap] fetch", chevronUrl, "status:", chevronRes.status, chevronRes.statusText);
  // eslint-disable-next-line no-console
  console.log("[bootstrap] served scroll-chevron preview:", chevronServed.slice(0, 300));
  const AppModule = await import(/* @vite-ignore */ appUrl);

  // eslint-disable-next-line no-console
  console.log("[bootstrap] loaded", appUrl, "keys:", Object.keys(AppModule));
  // eslint-disable-next-line no-console
  console.log("[bootstrap] app export test:", (AppModule as any).__APP_EXPORT_TEST__);

  const RootApp = (AppModule as any).default ?? (AppModule as any).App;
  if (!RootApp) {
    throw new Error(
      `App module has no exports we can render. Available exports: ${Object.keys(AppModule).join(", ") || "(none)"}`
    );
  }

  createRoot(el).render(<RootApp />);
}

bootstrap().catch((err) => renderFatalError("Bootstrap exception", err));