import React from "react";
import clsx from "clsx";

import { useNavigate } from "react-router-dom";

interface CarouselProps {
  projects: any[];
  selected: any;
  carouselIndex: number;
  onSelect: (project: any, idx: number) => void;
  onPrev: () => void;
  onNext: () => void;
  slugify: (str: string) => string;
}

export function Carousel({ projects, selected, carouselIndex, onSelect, onPrev, onNext, slugify }: CarouselProps) {
  const visibleProjects = projects;
  const currentProject = selected || visibleProjects[carouselIndex] || null;
  const navigate = useNavigate();

  // Render project card
  const renderProjectCard = (project: any) => (
    <div className="flex flex-col items-center w-full">
      <img
        src={project.image}
        alt={project.title}
        className="object-cover rounded-2xl shadow-xl border-2 border-indigo-500 mx-8 w-72 h-72 max-w-[80vw] max-h-[40vh] mb-4"
      />
      <div className="flex flex-row flex-wrap items-center justify-center gap-2 w-full mb-2">
        <h2 className="text-2xl sm:text-3xl font-bold text-zinc-100 text-center m-0">
          {project.title}
        </h2>
        {project.libraries.map((lib: string) => (
          <span
            key={lib}
            className="bg-zinc-800 text-zinc-300 px-2 py-1 rounded-full text-xs shadow border border-zinc-700 ml-1"
            style={{ whiteSpace: 'nowrap' }}
          >
            {lib}
          </span>
        ))}
      </div>
      <p className="text-zinc-300 text-base sm:text-lg mb-4 text-center">
        {project.description}
      </p>
      <button
        className="mt-2 px-4 py-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full shadow text-sm font-medium hover:scale-105 transition-transform"
        style={{ minWidth: 120 }}
        onClick={() => navigate(`/projects/${slugify(project.title)}`)}
      >
        More about this project
      </button>
    </div>
  );
  const renderProjectThumb = (project: any, isActive: boolean) => (
    <img
      src={project.image}
      alt={project.title}
      className={clsx(
        "w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 object-cover rounded-xl shadow border-2 transition-all duration-300",
        isActive ? "border-indigo-500 scale-110 z-10" : "border-zinc-700 opacity-60 hover:opacity-100 z-0"
      )}
    />
  );

  if (!visibleProjects || visibleProjects.length === 0) return null;

  return (
    <div className="flex flex-col items-center justify-start w-full max-w-[900px] mx-auto h-[80vh] relative">
      {/* Left Arrow */}
      <button
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700 rounded-full p-2 shadow-lg z-20 flex items-center justify-center ml-4 w-11 h-11"
        onClick={onPrev}
        aria-label="Previous item"
      >
        <span className="sr-only">Previous</span>
        <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>
      </button>
      {/* Right Arrow */}
      <button
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700 rounded-full p-2 shadow-lg z-20 flex items-center justify-center mr-4 w-11 h-11"
        onClick={onNext}
        aria-label="Next item"
      >
        <span className="sr-only">Next</span>
        <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
      </button>
      {/* Main item */}
      <div className="flex items-center justify-center w-full mb-6 relative min-h-[260px]">
        {currentProject && renderProjectCard(currentProject)}
      </div>
      {/* Thumbnails */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto w-full justify-center px-2 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent" style={{ WebkitOverflowScrolling: 'touch' }}>
        {visibleProjects.map((project, idx) => (
          <div
            key={project.id}
            className={clsx("cursor-pointer", idx === carouselIndex ? "scale-110 z-10" : "opacity-60 hover:opacity-100 z-0")}
            onClick={() => onSelect(project, idx)}
            style={{ minWidth: '4rem', minHeight: '4rem', maxWidth: '20vw', maxHeight: '20vw' }}
          >
            {renderProjectThumb(project, idx === carouselIndex)}
          </div>
        ))}
      </div>
    </div>
  );
}
