import { StandardPage } from "@/components/layout/standard-page";
import { SectionHeader } from "@/components/section-header";
import { Badge } from "../components/ui/badge";
import { cn } from "../components/ui/utils";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronRight } from "lucide-react";

type ProjectSectionData = {
  title: string;
  dateRange?: string;
  descriptionBeforeImage?: string;
  descriptionAfterImage?: string[];
  showImagePlaceholder?: boolean;
};

function ProjectAccordionItem({
  title,
  dateRange,
  descriptionBeforeImage,
  descriptionAfterImage,
  showImagePlaceholder,
}: ProjectSectionData) {
  return (
    <AccordionPrimitive.Item
      value={title}
      className="w-full rounded-2xl border border-border/75 bg-background shadow-sm overflow-hidden"
    >
      {/* Collapsed state shows ONLY title + chevron */}
      <AccordionPrimitive.Header className="flex">
        <AccordionPrimitive.Trigger
          className={cn(
            "w-full p-6 sm:p-7 md:p-8 flex items-center justify-between gap-4 text-left",
            "transition-colors hover:bg-muted/30",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            "[&[data-state=open]_.exp-chevron]:rotate-90",
          )}
        >
          <span className="text-2xl sm:text-3xl font-semibold tracking-tight">
            {title}
          </span>
          <ChevronRight className="exp-chevron size-6 text-foreground/60 transition-transform duration-200 shrink-0" />
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>

      <AccordionPrimitive.Content className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden">
        <div className="px-6 sm:px-7 md:px-8 pb-6 sm:pb-7 md:pb-8">
          {dateRange ? (
            <div className="flex justify-end">
              <Badge
                variant="secondary"
                className="rounded-full bg-muted text-muted-foreground px-3 py-1 text-xs font-medium"
              >
                {dateRange}
              </Badge>
            </div>
          ) : null}

          {descriptionBeforeImage ? (
            <p className={cn("mt-5 text-base sm:text-lg leading-relaxed text-foreground/80", dateRange ? "mt-4" : "mt-0")}>
              {descriptionBeforeImage}
            </p>
          ) : null}

          {showImagePlaceholder ? (
            <div className="mt-8">
              <div className="w-full h-56 sm:h-72 md:h-96 bg-black rounded-xl" />
            </div>
          ) : null}

          {descriptionAfterImage?.length ? (
            <div className="mt-7 space-y-4">
              {descriptionAfterImage.map((p, idx) => (
                <p
                  key={`${title}-after-${idx}`}
                  className="text-base sm:text-lg leading-relaxed text-foreground/80"
                >
                  {p}
                </p>
              ))}
            </div>
          ) : null}
        </div>
      </AccordionPrimitive.Content>
    </AccordionPrimitive.Item>
  );
}

const PROJECTS: ProjectSectionData[] = [
  {
    title: "AdRun",
    dateRange: "2025–Present",
    descriptionBeforeImage:
      "My first software position started at an ad-tech start up called AdRun, a company that sought to revolutionize UGC advertising and marketing.",
    showImagePlaceholder: true,
    descriptionAfterImage: [
      "As a small start up I was fortunate to work on various aspects of web development and software product development. First i was tasked to re-design and re-build their entire website UI. I quickly learned about component standardization, frontend error observability, and simple yet effective design.",
      "Next I was requested to build and integrate an emailing system to introduce notifications for our customers. With this project I got to dip my toes into API configuration and backend architecture.",
      "My final major project with AdRun was the rebuild of an automated billing engine. Here I gained a lot of experience in database architecture, backend functions, data validation, and data audibility. ",
    ],
  },
  {
    title: "Portfolio Website",
    dateRange: "2025–Present",
    descriptionBeforeImage:
      "After graduating college, I decided to build my own portfolio website to showcase my work and projects.",
    showImagePlaceholder: true,
    descriptionAfterImage: [
      "I wanted to create a website that was not only functional, but also visually appealing and easy to navigate. Feel free to contact me if you have any feedback or suggestions!",
    ],
  },
  {
    title: "MineChess",
    descriptionBeforeImage:
      "My first full-stack project! Stumbling upon the greatest game of all time, Chess, during covid has consumed much of my interest over the past few years. So much so my friend and I decided to build a chess variant of our own. Both trying to learn more about programming at the time, we decided building a website to host our chess variant would be a fun and instructive project.",
    showImagePlaceholder: true,
    descriptionAfterImage: [
      "Deciding to divy up the project into back-end and front-end development, I was happy to take care of the frontend part of the project. Outside of game logic, rules, and features i, built my first frontend ui where anyone with access to the internet could play with anyone else via invite codes! This was my first time working with javascript and react! I got to choose and design animations, implement features like color customizable boards, move order notation, and even a chat window so players could communicate during games! To this day I love showing and playing MineChess with other chess enthusiasts, I even believe that playing this chess varient helped me progress in “real” chess when I had felt plateaued. ",
    ],
  },
  { 
    title: "BioEndeavors",
    descriptionBeforeImage:
      "xxxx",
    showImagePlaceholder: true,
    descriptionAfterImage: [
      "xxxx",
    ],
   },
  { title: "FinFriends", 
    descriptionBeforeImage:
      "xxxx",
    showImagePlaceholder: true,
    descriptionAfterImage: [
      "xxxx",
    ],
  },
];

export function ExperienceProjectsPage() {
  return (
    <StandardPage>
      <section className="mx-auto max-w-7xl">
        <SectionHeader variant="page" title="Experience and Projects" />

        <AccordionPrimitive.Root type="single" collapsible className="mt-12 sm:mt-16 space-y-10 sm:space-y-12">
          {PROJECTS.map((p) => (
            <ProjectAccordionItem key={p.title} {...p} />
          ))}
        </AccordionPrimitive.Root>
      </section>
    </StandardPage>
  );
}

export default ExperienceProjectsPage;

