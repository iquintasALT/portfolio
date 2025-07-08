"use client";

import Link from "next/link";
import texts from "@content/texts.json";
import { Typewriter } from "react-simple-typewriter";

import { useSectionTransition } from "../ui/SectionTransition";

interface SectionProps {
  id: string;
}

const HeroSection: React.FC<SectionProps> = ({ id }) => {
  const { scrollToSection } = useSectionTransition();
  return (
    <section id={id} className="relative min-h-screen flex flex-col items-center justify-center px-4">
      <div className="container max-w-4xl mx-auto text-center z-10">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            <span className="opacity-0 animate-fade-in"> {texts.hero.greeting}</span>
            <span className="text-primary opacity-0 animate-fade-in-delay-1"> {texts.hero.firstName}</span>
            <span className="ml-2 opacity-0 animate-fade-in-delay-1"> {texts.hero.lastName}</span>
          </h1>

          <h2 className="text-2xl md:text-3xl font-semibold mt-4 opacity-0 animate-fade-in-delay-2">
            {texts.hero.subtitlePrefix}{" "}
            <span className="text-primary font-bold">
              <Typewriter
                words={texts.hero.subtitleWords}
                loop={0}
                cursor
                cursorStyle="|"
                typeSpeed={100}
                deleteSpeed={50}
                delaySpeed={2000}
              />
            </span>
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground max-2-2xl mx-auto opacity-0 animate-fade-in-delay-3">
            {texts.hero.description}
          </p>

          {/* WIP Warning Box as Button */}
          <div className="mt-6 flex flex-col items-center">
            <Link
              href="/projects/portfolio-website"
              className="relative w-full max-w-xl rounded-xl border border-yellow-300 bg-yellow-50/90 dark:bg-yellow-900/40 px-6 py-4 shadow-lg flex items-center gap-3 animate-fade-in-delay-4 transition hover:bg-yellow-100/90 dark:hover:bg-yellow-900/60 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              style={{ textDecoration: "none" }}
            >
              <svg
                className="w-6 h-6 text-yellow-500 shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01" />
              </svg>
              <div className="flex-1 text-left">
                <span className="font-semibold text-yellow-800 dark:text-yellow-200">Work in Progress:</span>
                <span className="ml-2 text-yellow-900 dark:text-yellow-100">
                  This site is under active development. Some features may be missing.
                </span>
              </div>
              <span className="ml-4 font-semibold text-yellow-900 dark:text-yellow-100 bg-yellow-200/70 dark:bg-yellow-800/60 rounded px-3 py-1 text-sm whitespace-nowrap">
                See Roadmap
              </span>
            </Link>
          </div>

          <div className="pt-4 opacity-0 animate-fade-in-delay-4">
            <button className="star-button" onClick={() => scrollToSection("projects")} type="button">
              {texts.hero.cta}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
