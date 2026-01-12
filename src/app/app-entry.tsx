export const __APP_ENTRY_TEST__ = "ok";
// eslint-disable-next-line no-console
console.log("[bootstrap] app-entry.tsx module evaluated", __APP_ENTRY_TEST__);

export default function AppEntry() {
  return (
    <div style={{ padding: 16, fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial" }}>
      <h1 style={{ margin: "0 0 8px", fontSize: 18 }}>AppEntry loaded</h1>
      <p style={{ margin: 0, opacity: 0.8 }}>
        If you see this, Vite is serving TSX modules correctly. Next we’ll swap back to your real <code>App</code>.
      </p>
    </div>
  );
}


