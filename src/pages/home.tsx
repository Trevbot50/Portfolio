import { AppShell, FullscreenSection } from "../components/layout";
import { Hero } from "../components/sections/hero";
import { Projects } from "../components/sections/projects";
import { About } from "../components/sections/about";
import { Contact } from "../components/sections/contact";

export function HomePage() {
  return (
    <AppShell>
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
    </AppShell>
  );
}

export default HomePage;



