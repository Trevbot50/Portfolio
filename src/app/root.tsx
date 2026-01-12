import { Header } from "./components/shared/header";
import { Hero } from "./components/hero/hero-landing";
import { Projects } from "./components/projects/projects";
import { About } from "./components/about/about";
import { Contact } from "./components/contact/contact";
import { Footer } from "./components/shared/footer";
import { ThemeToggle } from "./components/shared/theme-toggle";

export function RootApp() {
  return (
    <div className="min-h-screen scroll-smooth">
      <Header />
      <main>
        <div id="hero">
          <Hero />
        </div>
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <ThemeToggle />
    </div>
  );
}

export default RootApp;


