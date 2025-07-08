"use client";

import { useEffect, useState } from "react";

import SectionNavItem from "./SectionNavItem";

type Section = {
  id: string;
  title: string;
  level: number;
  children?: Section[];
};

interface MdxSectionNavProps {
  mdxRootSelector?: string;
}

export default function MdxSectionNav(props: MdxSectionNavProps) {
  const mdxRootSelector = props.mdxRootSelector ?? "#mdx-content";
  const [sections, setSections] = useState<Section[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  // Find all h2/h3 in the MDX content and build a tree nav
  useEffect(() => {
    const root = document.querySelector(mdxRootSelector);
    if (!root) return;
    const headings = Array.from(root.querySelectorAll("h2, h3")) as HTMLHeadingElement[];
    const rawSections = headings
      .filter((el) => !!el.id)
      .map((el) => ({
        id: el.id,
        title: el.innerText,
        level: el.tagName === "H2" ? 2 : 3,
      }));
    // Build tree: h2 as parent, h3 as child
    const tree: Section[] = [];
    let lastH2: Section | null = null;
    for (const sec of rawSections) {
      if (sec.level === 2) {
        lastH2 = { ...sec, children: [] };
        tree.push(lastH2);
      } else if (sec.level === 3 && lastH2) {
        lastH2.children!.push(sec);
      }
    }
    setSections(tree);
  }, [mdxRootSelector]);

  // Scrollspy: update active section on scroll
  useEffect(() => {
    if (sections.length === 0) return;
    const flatSections: Section[] = [];
    for (const s of sections) {
      flatSections.push(s);
      if (s.children) flatSections.push(...s.children);
    }
    const handleScroll = () => {
      let current = flatSections[0]?.id || "";
      for (const section of flatSections) {
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
          <li key={section.id} className="list-none">
            <SectionNavItem section={section} activeId={activeId} />
            {section.children && section.children.length > 0 && (
              <ul className="ml-4 border-l border-zinc-700 pl-3 mt-1 space-y-1">
                {section.children.map((child) => (
                  <li key={child.id} className="list-none">
                    <SectionNavItem section={child} activeId={activeId} isSubSection />
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
