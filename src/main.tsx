
import { createRoot } from "react-dom/client";
import HomePage from "./pages/home";
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

window.addEventListener("error", (e) => {
  renderFatalError("Uncaught error", (e as ErrorEvent).error ?? (e as ErrorEvent).message);
});
window.addEventListener("unhandledrejection", (e) => {
  renderFatalError("Unhandled promise rejection", (e as PromiseRejectionEvent).reason);
});

const el = document.getElementById("root");
if (!el) throw new Error("Missing #root element");
createRoot(el).render(
  <HomePage />,
);