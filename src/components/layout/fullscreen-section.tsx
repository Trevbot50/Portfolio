import { ReactNode } from 'react';

interface FullscreenSectionProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export function FullscreenSection({ id, children, className = '' }: FullscreenSectionProps) {
    return (
      <section
        id={id}
        className={`min-h-screen w-full flex flex-col ${className}`}
      >
        {children}
      </section>
    );
  }

export default FullscreenSection;