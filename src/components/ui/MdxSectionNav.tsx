"use client";

import { useEffect, useState } from "react";

import SectionNavItem from "./SectionNavItem";

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
          <SectionNavItem key={section.id} section={section} activeId={activeId} />
        ))}
      </ul>
    </nav>
  );
}
