import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MapPin, Phone } from "lucide-react";
import { ScrollChevron } from "@/components/scroll-chevron";
import { Footer } from "@/components/footer";
import { SectionContent } from "@/components/layout";

export function Contact() {
  return (
    <section className="relative w-full h-screen flex flex-col overflow-y-auto">
      <ScrollChevron targetId="projects" sectionId="contact" direction="up" />
      <div className="flex-1 flex items-center py-16">
        <SectionContent>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl sm:text-4xl">Get In Touch</h2>
            <p className="text-muted-foreground text-lg">
              Have a project in mind? Let's discuss how we can work together.
            </p>
          </div>
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
                    <Textarea id="message" placeholder="Tell me about your project..." rows={5} />
                  </div>
                  <Button type="submit" className="w-full">Send Message</Button>
                </form>
              </CardContent>
            </Card>
            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="mb-1">Email</h3>
                      <p className="text-sm text-muted-foreground">trevorwoon8@gmail.com</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="mb-1">Phone</h3>
                      <p className="text-sm text-muted-foreground">+1 (650) 485-9745</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
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