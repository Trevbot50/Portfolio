import { motion } from "motion/react";
import { NavLink } from "./nav-link";
import { useEffect, useRef } from "react";

export function Header() {
  const headerRef = useRef<HTMLElement | null>(null);
  const base = import.meta.env.BASE_URL ?? "/";

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const setHeaderHeightVar = () => {
      document.documentElement.style.setProperty("--header-height", `${el.offsetHeight}px`);
    };

    setHeaderHeightVar();

    const ro = new ResizeObserver(() => setHeaderHeightVar());
    ro.observe(el);
    window.addEventListener("resize", setHeaderHeightVar);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", setHeaderHeightVar);
    };
  }, []);

  return (
    <motion.header
      ref={headerRef as any}
      className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border/40 rounded-b-2xl shadow-lg"
      initial={{ y: "-100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <div className="px-6 py-4">
        <div className="max-w-screen-2xl mx-auto">
          <div className="relative flex items-center justify-between">
            {/* Logo */}
            <motion.a
              href={base}
              className="text-sm tracking-wide text-[#53D52F]"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              Trevor Woon
            </motion.a>

            {/* Desktop Navigation - Centered to page */}
            <nav className="absolute left-1/2 -translate-x-1/2 flex items-center gap-8">
              <motion.div
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 0.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <NavLink href={`${base}#about`}>About</NavLink>
              </motion.div>
              <motion.div
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 0.25,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <NavLink href={`${base}#projects`}>Projects</NavLink>
              </motion.div>
              <motion.div
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 0.3,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <NavLink href={`${base}#contact`}>Contact me</NavLink>
              </motion.div>
            </nav>

            {/* Location Text */}
            <motion.div
              className="text-sm text-muted-foreground"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.35,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              Bay Area, California
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}

export default Header;