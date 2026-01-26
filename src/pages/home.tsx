import { FullscreenLayout, FullscreenSection } from "../components/layout";
import { Header } from "../components/header";
import { Hero } from "../components/sections/hero";
import { Projects } from "../components/sections/projects";
import { About } from "../components/sections/about";
import { Contact } from "../components/sections/contact";
import { ThemeToggle } from "../components/theme-toggle";

export function HomePage() {
  return (
    <>
      <ThemeToggle />

      <FullscreenLayout>
        <Header /> {/* Header inside the scrollable container */}

        <FullscreenSection id="hero" className="bg-background">
          <Hero />
        </FullscreenSection>

        <FullscreenSection id="about" className="bg-muted">
          <About />
        </FullscreenSection>

        <FullscreenSection id="projects" className="bg-background">
          <Projects />
        </FullscreenSection>

        <FullscreenSection id="contact" className="bg-muted">
          <Contact />
        </FullscreenSection>
      </FullscreenLayout>
    </>
  );
}

export default HomePage;



