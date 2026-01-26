import * as React from "react";

type SectionContentProps = React.ComponentProps<"div"> & {
  /**
   * Constrain the content width while keeping the section background full-bleed.
   * If false, we only apply horizontal padding and let content be full width.
   */
  constrained?: boolean;
};

export function SectionContent({
  constrained = true,
  className,
  ...props
}: SectionContentProps) {
  const base = constrained
    ? "mx-auto w-full max-w-screen-2xl px-6 sm:px-8"
    : "w-full px-6 sm:px-8";

  return <div className={`${base} ${className ?? ""}`} {...props} />;
}

export default SectionContent;



