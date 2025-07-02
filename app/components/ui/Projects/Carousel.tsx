import React from "react";
import clsx from "clsx";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "~/store/store";
import { setSelected, setCarouselIndex } from '~/store/projectUiSlice';
import projectsData from '~/../public/data/projects.json';

export function Carousel() {
  const dispatch = useDispatch();
  const {
    selected,
    carouselIndex,
  } = useSelector((state: RootState) => state.projectUi);
  const { search, tags } = useSelector((state: RootState) => state.filters);
  const projectList = projectsData as any[];

  // Filtering logic (should match ProjectsGrid)
  const filteredProjects = projectList.filter((project) => {
    const matchesSearch = project.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesTags =
      tags.length === 0 ||
      tags.every((tag: string) => project.libraries.includes(tag));
    // You can add category/language filters here if needed
    return matchesSearch && matchesTags;
  });
  const visibleProjects = filteredProjects.length > 0 ? filteredProjects : projectList;
  const currentProject = selected || visibleProjects[carouselIndex] || null;

  const handleSelect = (project: any, idx: number) => {
    dispatch(setSelected(project));
    dispatch(setCarouselIndex(idx));
  };
  const handlePrev = () => {
    const newIndex = (carouselIndex - 1 + visibleProjects.length) % visibleProjects.length;
    dispatch(setCarouselIndex(newIndex));
    dispatch(setSelected(visibleProjects[newIndex]));
  };
  const handleNext = () => {
    const newIndex = (carouselIndex + 1) % visibleProjects.length;
    dispatch(setCarouselIndex(newIndex));
    dispatch(setSelected(visibleProjects[newIndex]));
  };

  // Render project card
  const renderProjectCard = (project: any) => (
    <div className="flex flex-col items-center w-full">
      <img
        src={project.image}
        alt={project.title}
        className="object-cover rounded-2xl shadow-xl border-2 border-indigo-500 mx-8 w-72 h-72 max-w-[80vw] max-h-[40vh] mb-4"
      />
      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-100 mb-2 text-center">
        {project.title}
      </h2>
      <p className="text-zinc-300 text-base sm:text-lg mb-4 text-center">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2 mb-2 justify-center">
        {project.libraries.map((lib: string) => (
          <span
            key={lib}
            className="bg-zinc-800 text-zinc-300 px-3 py-1 rounded-full text-xs shadow border border-zinc-700"
          >
            {lib}
          </span>
        ))}
      </div>
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
        onClick={handlePrev}
        aria-label="Previous item"
      >
        <span className="sr-only">Previous</span>
        <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>
      </button>
      {/* Right Arrow */}
      <button
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700 rounded-full p-2 shadow-lg z-20 flex items-center justify-center mr-4 w-11 h-11"
        onClick={handleNext}
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
            onClick={() => handleSelect(project, idx)}
            style={{ minWidth: '4rem', minHeight: '4rem', maxWidth: '20vw', maxHeight: '20vw' }}
          >
            {renderProjectThumb(project, idx === carouselIndex)}
          </div>
        ))}
      </div>
    </div>
  );
}
