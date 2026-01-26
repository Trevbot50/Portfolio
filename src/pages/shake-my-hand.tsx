import { Header } from "../components/header";
import { ThemeToggle } from "../components/theme-toggle";

export function ShakeMyHandPage() {
  return (
    <>
      <ThemeToggle />
      <Header />

      {/* Intentionally empty page content (header + theme toggle only). */}
      <main
        className="min-h-screen bg-background"
        style={{ paddingTop: "var(--header-height)" }}
      >
        <div className="mx-auto max-w-screen-2xl px-6 sm:px-8 py-12">
          <h1 className="text-4xl sm:text-5xl">Hello there.</h1>
        </div>
      </main>
    </>
  );
}

export default ShakeMyHandPage;

