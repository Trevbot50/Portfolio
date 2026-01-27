import * as React from "react";

import { cn } from "@/components/ui/utils";
import { AppShell } from "@/components/layout/app-shell";
import { SectionContent } from "@/components/layout/section-content";

type StandardPageProps = {
  children: React.ReactNode;
  /**
   * Extra classes applied to the <main> element.
   */
  mainClassName?: string;
  /**
   * Extra classes applied to the centered content container.
   */
  contentClassName?: string;
  /**
   * Controls whether the floating ThemeToggle is rendered.
   */
  showThemeToggle?: boolean;
};

/**
 * Shared skeleton for non-sectioned pages that still live inside the
 * app's FullscreenLayout + fixed Header.
 */
export function StandardPage({
  children,
  mainClassName,
  contentClassName,
  showThemeToggle = true,
}: StandardPageProps) {
  return (
    <AppShell showThemeToggle={showThemeToggle}>
        <main
          className={cn("min-h-screen bg-background", mainClassName)}
          style={{ paddingTop: "var(--header-height)" }}
        >
          <SectionContent className={cn("py-12 sm:py-16", contentClassName)}>
            {children}
          </SectionContent>
        </main>
    </AppShell>
  );
}

export default StandardPage;

