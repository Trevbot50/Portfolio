import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Github, Linkedin, Mail } from "lucide-react";
import { ScrollChevron } from "@/app/components/shared/scroll-chevron";
import { useState, useEffect } from "react";

export function Hero() {
  const textToType = "Developer & Designer";
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      if (!isDeleting && !isHighlighted) {
        // Typing forward
        if (displayedText.length < textToType.length) {
          setDisplayedText(textToType.slice(0, displayedText.length + 1));
          setTypingSpeed(120);
        } else {
          // Finished typing, wait before highlighting
          setTimeout(() => setIsHighlighted(true), 2000);
        }
      } else if (isHighlighted && !isDeleting) {
        // Highlight phase, wait before deleting
        setTimeout(() => {
          setIsHighlighted(false);
          setIsDeleting(true);
        }, 800);
      } else if (isDeleting) {
        // Delete all at once
        setDisplayedText("");
        setIsDeleting(false);
        setTypingSpeed(300); // Pause before starting again
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, isHighlighted, typingSpeed]);

  // Split the displayed text to insert line break after "Developer "
  const renderText = () => {
    if (displayedText.includes("&")) {
      const beforeAmpersand = displayedText.substring(0, displayedText.indexOf("&"));
      const afterAmpersand = displayedText.substring(displayedText.indexOf("&"));
      return (
        <>
          {beforeAmpersand}
          <br />
          {afterAmpersand}
        </>
      );
    }
    return displayedText;
  };

  return (
    <section className="relative container max-w-screen-xl mx-auto px-4 py-16 h-screen flex items-center bg-background">
      <div className="flex flex-col items-center text-center w-full">
        <Badge className="mb-4">Available for opportunities</Badge>
        <h1 className="mb-4 max-w-3xl text-4xl tracking-tight sm:text-5xl md:text-6xl">
          Software{" "}
          <span className={isHighlighted ? "bg-[#53D52F]/75 dark:bg-[#53D52F]/75 text-foreground px-1" : ""}>
            {renderText()}
          </span>
          <span className="animate-pulse">|</span>
        </h1>
        <p className="mb-8 max-w-2xl text-muted-foreground text-lg">
          Building modern web applications with a focus on clean code, user experience, and scalable solutions.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button size="lg">
            <Mail className="mr-2 h-4 w-4" />
            Contact Me
          </Button>
          <Button size="lg" variant="outline">
            <Github className="mr-2 h-4 w-4" />
            GitHub
          </Button>
          <Button size="lg" variant="outline">
            <Linkedin className="mr-2 h-4 w-4" />
            LinkedIn
          </Button>
        </div>
      </div>
      <ScrollChevron targetId="about" sectionId="hero" />
    </section>
  );
}

export default Hero;