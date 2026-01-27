import * as React from "react";

import { FullscreenLayout } from "@/components/layout/fullscreen-layout";
import { Header } from "@/components/header";
import { ThemeToggle } from "@/components/theme-toggle";

type AppShellProps = {
  children: React.ReactNode;
  showHeader?: boolean;
  showThemeToggle?: boolean;
};

/**
 * Shared "app chrome": ThemeToggle + fixed Header + FullscreenLayout scroll container.
 */
export function AppShell({ children, showHeader = true, showThemeToggle = true }: AppShellProps) {
  return (
    <>
      {showThemeToggle ? <ThemeToggle /> : null}
      <FullscreenLayout>
        {showHeader ? <Header /> : null}
        {children}
      </FullscreenLayout>
    </>
  );
}

export default AppShell;

