import { Github, Linkedin, Twitter } from "lucide-react";
import { SectionContent } from "@/components/layout";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background">
      <SectionContent className="py-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2026 Portfolio. All rights reserved.
          </p>
        </div>
      </SectionContent>
    </footer>
  );
}

export default Footer;