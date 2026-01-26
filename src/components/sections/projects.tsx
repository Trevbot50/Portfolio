import { ProjectCard } from "./project-card";
import { ScrollChevron } from "@/components/scroll-chevron";
import { SectionContent } from "@/components/layout";

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce solution with real-time inventory management and payment processing.",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop",
    tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 2,
    title: "Task Management App",
    description: "Collaborative task management tool with drag-and-drop interface and team features.",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=600&fit=crop",
    tags: ["TypeScript", "React", "Firebase", "Tailwind"],
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description: "Real-time weather monitoring dashboard with interactive maps and forecasting.",
    image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&h=600&fit=crop",
    tags: ["React", "API Integration", "Charts", "CSS"],
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 4,
    title: "Social Media Analytics",
    description: "Analytics platform for tracking social media engagement and generating insights.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    tags: ["Vue.js", "Express", "MongoDB", "D3.js"],
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 5,
    title: "Portfolio CMS",
    description: "Content management system for creative professionals to showcase their work.",
    image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800&h=600&fit=crop",
    tags: ["Next.js", "Sanity", "React", "Vercel"],
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 6,
    title: "AI Chat Assistant",
    description: "Intelligent chatbot powered by machine learning for customer support automation.",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=600&fit=crop",
    tags: ["Python", "TensorFlow", "React", "WebSocket"],
    demoUrl: "#",
    githubUrl: "#",
  },
];

export function Projects() {
  const featuredProjects = projects.slice(0, 3);

  return (
    <section className="relative w-full h-screen flex flex-col">
      <ScrollChevron targetId="about" sectionId="projects" direction="up" />
      <SectionContent className="flex-1 flex flex-col">
        <div className="pt-32 pb-4 text-center flex-shrink-0">
          <h2 className="mb-4 text-3xl sm:text-4xl">Featured Projects</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A selection of my recent work showcasing different technologies and problem-solving approaches.
          </p>
        </div>
        <div className="flex-1 flex items-center pb-20">
          <div className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3 px-1">
            {featuredProjects.map((project) => (
              <div key={project.id}>
                <ProjectCard {...project} />
              </div>
            ))}
          </div>
        </div>
      </SectionContent>
      <ScrollChevron targetId="contact" sectionId="projects" />
    </section>
  );
}

export default Projects;