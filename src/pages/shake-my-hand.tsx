import { StandardPage } from "@/components/layout/standard-page";
import { SectionHeader } from "@/components/section-header";

export function ShakeMyHandPage() {
  return (
    <StandardPage>
      <section className="mx-auto max-w-6xl">
        <SectionHeader variant="page" title="Hello there! 🤝" />

        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Row 1 */}
          <div className="text-center">
            <p className="text-base sm:text-lg leading-relaxed text-foreground/80">
              My name is Trevor Woon. I was born and raised in the Bay Area. Since learning how to code I've found a
              passion for user interface design and development. As I continue to learn and grow, I hope to hone my
              ability to create functionally asthetic interfaces no matter the platform.
            </p>
          </div>
          <div className="flex justify-center">
            <div className="w-full max-w-md aspect-square bg-black" />
          </div>

          {/* Row 2 (alternating on desktop) */}
          <div className="flex justify-center order-3 md:order-none">
            <div className="w-full max-w-md aspect-square bg-black" />
          </div>
          <div className="text-center order-4 md:order-none">
            <p className="text-base sm:text-lg leading-relaxed text-foreground/80">
              My journey into software started at SJSU where I learned my first language, Python, in my first class. I
              built my first project, named FitFriends that my friends and I still use to this day!
            </p>
          </div>
        </div>

        <div className="mt-14 sm:mt-16 flex flex-col items-center gap-3 text-center">
          <div className="text-base sm:text-lg text-foreground/80">There more!</div>
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-6 w-6 text-foreground/70"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>

        <div className="mt-10 sm:mt-12">
          <div className="w-full h-56 sm:h-72 md:h-96 bg-black" />
        </div>
      </section>
    </StandardPage>
  );
}

export default ShakeMyHandPage;

