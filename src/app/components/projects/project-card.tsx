import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

export interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
}

export function ProjectCard({ title, description, image, tags, demoUrl, githubUrl }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-video w-full overflow-hidden bg-muted">
        <img 
          src={image} 
          alt={title}
          className="h-full w-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="gap-2">
        {demoUrl && (
          <Button variant="default" size="sm" className="flex-1">
            <ExternalLink className="mr-2 h-4 w-4" />
            Live Demo
          </Button>
        )}
        {githubUrl && (
          <Button variant="outline" size="sm" className="flex-1">
            <Github className="mr-2 h-4 w-4" />
            Code
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default ProjectCard;