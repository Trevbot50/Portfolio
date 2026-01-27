import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, Linkedin, MapPin } from "lucide-react";
import { ScrollChevron } from "@/components/scroll-chevron";
import { Footer } from "@/components/footer";
import { SectionContent } from "@/components/layout";
import { SectionHeader } from "@/components/section-header";

export function Contact() {
  return (
    <section className="relative w-full h-screen flex flex-col overflow-y-auto">
      <ScrollChevron targetId="projects" sectionId="contact" direction="up" />
      <div className="flex-1 flex items-center py-16">
        <SectionContent>
          <SectionHeader
            className="mb-12"
            title="Get In Touch"
            subtitle="Have a project in mind? Let's discuss how we can work together."
          />
          <div className="grid w-full gap-8 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Send a Message</CardTitle>
                <CardDescription>Fill out the form below and I'll get back to you soon.</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="name">Name</label>
                    <Input id="name" placeholder="Your name" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email">Email</label>
                    <Input id="email" type="email" placeholder="your.email@example.com" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message">Message</label>
                    <Textarea id="message" placeholder="Your inquiry..." rows={5} />
                  </div>
                  <Button type="submit" className="w-full">Send Message</Button>
                </form>
              </CardContent>
            </Card>
            <div className="space-y-6">
              <a
                href="https://www.linkedin.com/in/trevor-woon-1a5abb17a"
                target="_blank"
                rel="noreferrer"
                className="block"
              >
                <Card className="transition-colors hover:bg-muted/30 dark:hover:border-white">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        <Linkedin className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="mb-1">LinkedIn</h3>
                        <p className="text-sm text-muted-foreground">linkedin.com/in/trevor-woon-1a5abb17a</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </a>

              <a href="https://github.com/Trevbot50" target="_blank" rel="noreferrer" className="block">
                <Card className="transition-colors hover:bg-muted/30 dark:hover:border-white">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        <Github className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="mb-1">GitHub</h3>
                        <p className="text-sm text-muted-foreground">github.com/Trevbot50</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </a>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="mb-1">Location</h3>
                      <p className="text-sm text-muted-foreground">Bay Area, CA</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </SectionContent>
      </div>

      <Footer />
    </section>
  );
}

export default Contact;