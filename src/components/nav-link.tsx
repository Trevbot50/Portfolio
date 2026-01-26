import { motion } from "motion/react";
import { useState } from "react";

interface NavLinkProps {
  href: string;
  // Keep permissive so this file type-checks even before deps/types are installed.
  children?: any;
}

export function NavLink({ href, children }: NavLinkProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={href}
      className="relative inline-block overflow-hidden h-6"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="text-sm"
        animate={{
          y: isHovered ? "-150%" : "0%",
        }}
        transition={{
          duration: 0.3,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </motion.div>
      <motion.div
        className="text-sm absolute top-0 left-0"
        animate={{
          y: isHovered ? "0%" : "150%",
        }}
        transition={{
          duration: 0.3,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </motion.div>
    </a>
  );
}
