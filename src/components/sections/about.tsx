import { Card, CardContent } from "@/components/ui/card";
import { Code2, Palette, Zap } from "lucide-react";
import { ScrollChevron } from "@/components/scroll-chevron";
import { SectionContent } from "@/components/layout";
import { MousePointerClick } from 'lucide-react';
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const skills = [
  {
    icon: Code2,
    title: "Clean Code",
    description: "Writing maintainable, scalable code following best practices and design patterns.",
  },
  {
    icon: Palette,
    title: "UI/UX Focus",
    description: "Creating intuitive interfaces with attention to detail and user experience.",
  },
  {
    icon: Zap,
    title: "Performance",
    description: "Optimizing applications for speed, efficiency, and excellent user experience.",
  },
];

export function About() {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [isExiting, setIsExiting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    let currentIndex = 0;
    let timeouts: Array<ReturnType<typeof setTimeout>> = [];
    
    // Function to add cards one by one
    const addCard = () => {
      if (currentIndex < skills.length) {
        setVisibleCards(prev => [...prev, currentIndex]);
        currentIndex++;
        const timeout = setTimeout(addCard, 900); // 600ms * 1.5 = 900ms delay between each card
        timeouts.push(timeout);
      } else {
        // All cards are visible, wait 3 seconds then exit all
        const exitTimeout = setTimeout(() => {
          setIsExiting(true);
          const resetTimeout = setTimeout(() => {
            // Reset after exit animation completes
            setVisibleCards([]);
            setIsExiting(false);
            currentIndex = 0;
            const restartTimeout = setTimeout(addCard, 450); // 300ms * 1.5 = 450ms - Start again after brief pause
            timeouts.push(restartTimeout);
          }, 900); // Give enough time for exit animation (0.75s + buffer)
          timeouts.push(resetTimeout);
        }, 3000); // 2000ms * 1.5 = 3000ms
        timeouts.push(exitTimeout);
      }
    };

    // Start the animation
    addCard();

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, [isPaused]);

  return (
    <section className="relative w-full h-screen flex items-center overflow-hidden">
      <ScrollChevron targetId="hero" sectionId="about" direction="up" />
      <SectionContent className="py-16 overflow-y-auto">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl sm:text-4xl">About Me</h2>
          <p className="text-muted-foreground text-lg">
            Creating digital experiences that feel more than just a click. <MousePointerClick className="inline-block ml-1" size={20} />
          </p>
        </div>
        <div className="flex justify-center mb-4">
          <button 
            onClick={() => setIsPaused(!isPaused)}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {isPaused ? "Animation paused" : "Pause Animation"}
          </button>
        </div>
        <div className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12">
          <AnimatePresence>
            {skills.map((skill, index) => (
              visibleCards.includes(index) && (
                <motion.div
                  key={skill.title}
                  initial={{ x: "calc(100vw + 400px)", opacity: 0 }}
                  animate={{ 
                    x: isExiting ? "calc(-100vw - 400px)" : 0, 
                    opacity: isExiting ? 0 : 1 
                  }}
                  exit={{ x: "calc(-100vw - 400px)", opacity: 0 }}
                  transition={{ 
                    duration: 0.75, // 0.5 * 1.5 = 0.75
                    ease: [0.16, 1, 0.3, 1] 
                  }}
                  className="relative"
                >
                  <Card>
                    <CardContent className="pt-6">
                      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        <skill.icon className="h-6 w-6" />
                      </div>
                      <h3 className="mb-2">{skill.title}</h3>
                      <p className="text-sm text-muted-foreground">{skill.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>
        <div className="w-full text-center">
          <p className="text-muted-foreground mb-4">
            I'm a software developer with a passion for building modern web applications. With experience in both front and backend development, I enjoy turning complex problems into simple, 
            beautiful, and intuitive solutions.
          </p>
        </div>

        <div className="mt-10 flex justify-center">
          <Button size="lg" asChild>
            <a href={`${import.meta.env.BASE_URL}shake-my-hand/`}>Shake My Hand</a>
          </Button>
        </div>
      </SectionContent>
      <ScrollChevron targetId="projects" sectionId="about" />
    </section>
  );
}

export default About;