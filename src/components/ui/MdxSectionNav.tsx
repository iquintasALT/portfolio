"use client";
import { useEffect, useRef, useState } from "react";

interface Section {
  id: string;
  title: string;
}

interface MdxSectionNavProps {
  mdxRootSelector?: string;
}

export default function MdxSectionNav(props: MdxSectionNavProps) {
  const mdxRootSelector = props.mdxRootSelector ?? "#mdx-content";
  const [sections, setSections] = useState<Section[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  // Find all h2/h3 in the MDX content and build the nav
  useEffect(() => {
    const root = document.querySelector(mdxRootSelector);
    if (!root) return;
    const headings = Array.from(root.querySelectorAll("h2, h3")) as HTMLHeadingElement[];
    const sectionList: Section[] = headings
      .filter((el) => !!el.id)
      .map((el) => ({
        id: el.id,
        title: el.innerText,
      }));
    setSections(sectionList);
  }, [mdxRootSelector]);

  // Scrollspy: update active section on scroll
  useEffect(() => {
    if (sections.length === 0) return;
    const handleScroll = () => {
      let current = sections[0]?.id || "";
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.getBoundingClientRect().top;
          if (top < window.innerHeight * 0.25) {
            current = section.id;
          }
        }
      }
      setActiveId(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  if (sections.length === 0) return null;

  return (
    <nav className="sticky top-24 z-20 hidden lg:block w-64 pr-8">
      <ul className="space-y-2 border-l border-zinc-700 pl-4">
        {sections.map((section) => (
          <SectionNavItem
            key={section.id}
            section={section}
            activeId={activeId}
          />
        ))}
      </ul>
    </nav>
  );
}

function SectionNavItem({ section, activeId }: { section: Section; activeId: string }) {
  const [hovered, setHovered] = useState(false);
  const [fading, setFading] = useState(false);
  const fadeTimeout = useRef<NodeJS.Timeout | null>(null);

  // When hover ends, start fading
  const handleMouseLeave = () => {
    setFading(true);
    fadeTimeout.current = setTimeout(() => {
      setFading(false);
      setHovered(false);
    }, 600);
  };

  // If hover starts again, cancel fade
  const handleMouseEnter = () => {
    if (fadeTimeout.current) clearTimeout(fadeTimeout.current);
    setFading(false);
    setHovered(true);
  };

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (fadeTimeout.current) clearTimeout(fadeTimeout.current);
    };
  }, []);

  // Determine visual state
  const isActive = activeId === section.id && !hovered && !fading;
  const isHovered = hovered;
  const isFading = fading;

  return (
    <li className="relative group">
      {/* Arrow indicator */}
      <svg
        className={`absolute -left-4 top-1/2 -translate-y-1/2 text-indigo-400 transition-opacity duration-75
          ${isHovered ? "opacity-100" : "opacity-0"}`}
        aria-hidden="true"
        width="18" height="18" viewBox="0 0 18 18" fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M4 9h8m0 0-3-3m3 3-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <a
        href={`#${section.id}`}
        className={`block text-sm px-2 py-1 rounded transition-colors
          ${isHovered ? "bg-zinc-800/70" : ""}
          ${isActive ? "text-indigo-400 font-bold bg-zinc-800/60" : "text-zinc-400"}
          ${isHovered ? "transition-[filter,background-color,color] duration-75" : isFading ? "transition-[filter,background-color,color] duration-600" : "transition-[filter,background-color,color] duration-200"}
        `}
        style={{
          filter:
            isHovered
              ? "brightness(1.25)"
              : isFading && !isActive
              ? "brightness(1)"
              : !isActive
              ? "brightness(1.08)"
              : "brightness(1)",
          color:
            isHovered
              ? "#a5b4fc" // indigo-300
              : isActive
              ? "#818cf8" // indigo-400
              : "#a1a1aa", // zinc-400
          transition: isFading
            ? "color 0.6s linear, filter 0.6s linear, background-color 0.6s linear"
            : "color 0.2s, filter 0.2s, background-color 0.2s"
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {section.title}
      </a>
    </li>
  );
}