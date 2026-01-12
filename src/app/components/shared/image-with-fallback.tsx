import * as React from "react";

import { cn } from "@/app/components/ui/utils";

type ImageWithFallbackProps = Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  src: string;
  fallbackSrc?: string;
};

export function ImageWithFallback({ src, fallbackSrc, alt = "", className, ...props }: ImageWithFallbackProps) {
  const [hasError, setHasError] = React.useState(false);

  if (hasError && !fallbackSrc) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn("bg-muted text-muted-foreground", className)}
      />
    );
  }

  return (
    <img
      {...props}
      alt={alt}
      className={className}
      src={hasError ? (fallbackSrc ?? "") : src}
      onError={(e) => {
        setHasError(true);
        props.onError?.(e);
      }}
    />
  );
}


