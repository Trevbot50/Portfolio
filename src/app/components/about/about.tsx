import { Card, CardContent } from "@/app/components/ui/card";
import { Code2, Palette, Zap, ChevronDown } from "lucide-react";
import { ScrollChevron } from "@/app/components/shared/scroll-chevron";
import { MousePointerClick } from 'lucide-react';
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { ImageWithFallback } from "@/app/components/shared/image-with-fallback";

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
  const [isExpanded, setIsExpanded] = useState(false);

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
    <section id="about" className="relative w-full bg-[#CDCDCD] h-screen flex items-center overflow-hidden">
      <ScrollChevron targetId="hero" sectionId="about" direction="up" />
      <div className="container max-w-screen-xl mx-auto px-4 py-16 w-full overflow-y-auto">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl sm:text-4xl">About Me</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
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
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-muted-foreground mb-4">
            I'm a software developer with a passion for building modern web applications. With experience in both front and backend development, I enjoy turning complex problems into simple, 
            beautiful, and intuitive solutions.
          </p>

          {/* Dive Deeper Section */}
          <div className="mt-8">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-2 text-2xl sm:text-3xl hover:opacity-70 transition-opacity"
            >
              Dive Deeper
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-6 h-6" />
              </motion.div>
            </button>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <Card className="mt-6 text-left">
                    <CardContent className="pt-6">
                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-4">
                          <h3 className="text-xl font-semibold">My Journey</h3>
                          <p className="text-sm text-muted-foreground">
                            My path into software development started with python and creating tools to help gain insights from large sets of complex data.
                            Working at my first start up, I discovered my passion for efficiency and asthetics both visually and tecnically. 
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Beyond the screen, I find inspiration in nature and community. Whether it's scaling thousands of feet of rock,
                            strategizing over a chess board, or just hanging with friends, all my experiences ultimatley shape my approach to problem-solving and design.
                          </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <ImageWithFallback
                              src="https://images.unsplash.com/photo-1522163182402-834f871fd851?w=400"
                              alt="Rock climbing"
                              className="w-full h-32 object-cover rounded-lg"
                            />
                            <p className="text-xs text-muted-foreground">Climbing adventures</p>
                          </div>
                          <div className="space-y-2">
                            <ImageWithFallback
                              src="https://images.unsplash.com/photo-1551632811-561732d1e306?w=400"
                              alt="Backpacking"
                              className="w-full h-32 object-cover rounded-lg"
                            />
                            <p className="text-xs text-muted-foreground">Wilderness backpacking</p>
                          </div>
                          <div className="space-y-2 col-span-2">
                            <ImageWithFallback
                              src="https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=400"
                              alt="Chess"
                              className="w-full h-32 object-cover rounded-lg"
                            />
                            <p className="text-xs text-muted-foreground">Strategic thinking through chess</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <ScrollChevron targetId="projects" sectionId="about" />
    </section>
  );
}

export default About;