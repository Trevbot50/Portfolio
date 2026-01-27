import { ProjectCard } from "./project-card";
import { ScrollChevron } from "@/components/scroll-chevron";
import { SectionContent } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/section-header";

const projects = [
  {
    id: 1,
    title: "AdRun",
    description: "An Ad-tech start up that seeks to revolutionize UGC advertising and marketing.",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop",
    tags: ["TypeScript","React", "API Integration", "SQL", "Supabase"],
    siteUrl: "#",
    githubUrl: "#",
  },
  {
    id: 2,
    title: "MineChess",
    description: "Personal project to build a website to host a chess variant of our own creation.",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=600&fit=crop",
    tags: ["React", "Vercel", "Tailwind CSS"],
    siteUrl: "#",
    githubUrl: "#",
  },
  {
    id: 3,
    title: "FinFriends",
    description: "A program to help friend groups pro-rate their trip finances all in one place.",
    image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&h=600&fit=crop",
    tags: ["Python", "Pandas", "Seaborn", "Matplotlib"],
    siteUrl: "#",
    githubUrl: "#",
  },

];

export function Projects() {
  const featuredProjects = projects.slice(0, 3);
  const experienceHref = `${import.meta.env.BASE_URL}experience-projects/`;

  return (
    <section className="relative w-full h-screen flex flex-col">
      <ScrollChevron targetId="about" sectionId="projects" direction="up" />
      <SectionContent className="flex-1 flex flex-col">
        <SectionHeader
          className="pt-32 pb-4 flex-shrink-0"
          title="Featured Projects"
          subtitle="My favorite projects I've worked on."
          subtitleClassName="max-w-2xl mx-auto"
        />
        <div className="flex-1 flex items-center pb-40">
          <div className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3 px-1">
            {featuredProjects.map((project) => (
              <div key={project.id}>
                <ProjectCard {...project} />
              </div>
            ))}
          </div>
        </div>
      </SectionContent>

      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20">
        <Button size="lg" asChild>
          <a href={experienceHref}>Dive Deeper</a>
        </Button>
      </div>

      <ScrollChevron targetId="contact" sectionId="projects" />
    </section>
  );
}

export default Projects;