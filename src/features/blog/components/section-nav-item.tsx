import React, { useEffect, useRef, useState } from "react";

export interface Section {
  id: string;
  title: string;
}

interface SectionNavItemProps {
  section: Section;
  activeId: string;
  isSubSection?: boolean;
}

const SectionNavItem: React.FC<SectionNavItemProps> = ({ section, activeId, isSubSection }) => {
  const [hovered, setHovered] = useState(false);
  const [fading, setFading] = useState(false);
  const fadeTimeout = useRef<NodeJS.Timeout | null>(null);

  // When hover ends, start fading
  const handleMouseLeave = () => {
    setFading(true);
    fadeTimeout.current = setTimeout(() => {
      setFading(false);
      setHovered(false);
    }, 40);
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
    <>
      {/* Arrow indicator */}
      <svg
        className={`absolute -left-4 top-1/2 -translate-y-1/2 text-indigo-400 transition-opacity duration-75
          ${isHovered ? "opacity-100" : "opacity-0"}`}
        aria-hidden="true"
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ pointerEvents: "none", position: "absolute" }}
      >
        <path
          d="M4 9h8m0 0-3-3m3 3-3 3"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <a
        href={`#${section.id}`}
        className={`relative block text-sm px-2 py-1 rounded transition-colors
          ${isHovered ? "bg-zinc-800/70" : ""}
          ${isActive ? "text-indigo-400 font-bold bg-zinc-800/60" : "text-zinc-400"}
          ${isHovered ? "transition-[filter,background-color,color] duration-75" : isFading ? "transition-[filter,background-color,color] duration-600" : "transition-[filter,background-color,color] duration-200"}
          ${isSubSection ? "pl-5 border-l-2 border-indigo-400/40 text-xs opacity-80" : ""}
        `}
        style={{
          filter: isHovered
            ? "brightness(1.25)"
            : isFading && !isActive
              ? "brightness(1)"
              : !isActive
                ? "brightness(1.08)"
                : "brightness(1)",
          color: isHovered
            ? "#a5b4fc" // indigo-300
            : isActive
              ? "#818cf8" // indigo-400
              : "#a1a1aa", // zinc-400
          transition: isFading
            ? "color 0.6s linear, filter 0.6s linear, background-color 0.6s linear"
            : "color 0.2s, filter 0.2s, background-color 0.2s",
        }}
        onPointerEnter={handleMouseEnter}
        onPointerLeave={handleMouseLeave}
      >
        {section.title}
      </a>
    </>
  );
};

export default SectionNavItem;
