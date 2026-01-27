import * as React from "react";

import { cn } from "@/components/ui/utils";

type SectionHeaderProps = {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  /**
   * "page" matches your current H1 styles,
   * "section" matches the repeated H2 styles.
   */
  variant?: "page" | "section";
  align?: "left" | "center";
  titleClassName?: string;
  subtitleClassName?: string;
  className?: string;
};

export function SectionHeader({
  title,
  subtitle,
  variant = "section",
  align = "center",
  titleClassName,
  subtitleClassName,
  className,
}: SectionHeaderProps) {
  const isPage = variant === "page";

  const HeadingTag = (isPage ? "h1" : "h2") as keyof JSX.IntrinsicElements;
  const headingClassName = isPage
    ? "text-4xl sm:text-5xl font-semibold tracking-tight"
    : "text-3xl sm:text-4xl";

  return (
    <div className={cn("space-y-3", align === "center" ? "text-center" : "text-left", className)}>
      <HeadingTag className={cn(headingClassName, titleClassName)}>{title}</HeadingTag>
      {subtitle ? <p className={cn("text-muted-foreground text-lg", subtitleClassName)}>{subtitle}</p> : null}
    </div>
  );
}

export default SectionHeader;

