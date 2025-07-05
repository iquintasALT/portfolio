'use client'
import React from "react";
import clsx from "clsx";

import { useRouter } from "next/navigation";

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
  // Animation state for slide direction
  const [slideDirection, setSlideDirection] = React.useState<'left' | 'right' | null>(null);
  const prevIndex = React.useRef(carouselIndex);

  // Detect direction on index change
  React.useEffect(() => {
    if (carouselIndex > prevIndex.current) setSlideDirection('left');
    else if (carouselIndex < prevIndex.current) setSlideDirection('right');
    prevIndex.current = carouselIndex;
    // Reset direction after animation
    const timeout = setTimeout(() => setSlideDirection(null), 250);
    return () => clearTimeout(timeout);
  }, [carouselIndex]);
  // --- Swipe/drag handlers for thumbnails ---
  const touchData = React.useRef({ x: 0, y: 0, dragging: false, moved: false, lastIndex: 0, startIndex: 0 });
  const mouseData = React.useRef({ x: 0, y: 0, dragging: false, moved: false, lastIndex: 0, startIndex: 0 });

  function handleThumbsTouchStart(e: React.TouchEvent) {
    if (e.touches.length === 1) {
      touchData.current.x = e.touches[0].clientX;
      touchData.current.y = e.touches[0].clientY;
      touchData.current.dragging = true;
      touchData.current.moved = false;
      touchData.current.lastIndex = carouselIndex;
      touchData.current.startIndex = carouselIndex;
    }
  }
  function handleThumbsTouchMove(e: React.TouchEvent) {
    if (!touchData.current.dragging) return;
    const dx = e.touches[0].clientX - touchData.current.x;
    const dy = e.touches[0].clientY - touchData.current.y;
    const threshold = 30; // px per project (default sensitivity)
    if (Math.abs(dx) > threshold && Math.abs(dx) > Math.abs(dy)) {
      const moveBy = Math.round(dx / threshold);
      let newIndex = touchData.current.startIndex - moveBy;
      newIndex = Math.max(0, Math.min(projects.length - 1, newIndex));
      if (newIndex !== touchData.current.lastIndex) {
        onSelect(projects[newIndex], newIndex);
        touchData.current.lastIndex = newIndex;
      }
    }
  }
  function handleThumbsTouchEnd(e: React.TouchEvent) {
    touchData.current.dragging = false;
    touchData.current.moved = false;
  }

  function handleThumbsMouseDown(e: React.MouseEvent) {
    mouseData.current.x = e.clientX;
    mouseData.current.y = e.clientY;
    mouseData.current.dragging = true;
    mouseData.current.moved = false;
    mouseData.current.lastIndex = carouselIndex;
    mouseData.current.startIndex = carouselIndex;
    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!mouseData.current.dragging) return;
      const dx = moveEvent.clientX - mouseData.current.x;
      const dy = moveEvent.clientY - mouseData.current.y;
      const threshold = 30; // px per project (default sensitivity)
      if (Math.abs(dx) > threshold && Math.abs(dx) > Math.abs(dy)) {
        const moveBy = Math.round(dx / threshold);
        let newIndex = mouseData.current.startIndex - moveBy;
        newIndex = Math.max(0, Math.min(projects.length - 1, newIndex));
        if (newIndex !== mouseData.current.lastIndex) {
          onSelect(projects[newIndex], newIndex);
          mouseData.current.lastIndex = newIndex;
        }
      }
    };
    const handleMouseUp = () => {
      mouseData.current.dragging = false;
      mouseData.current.moved = false;
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  }
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Calculate visible thumbnails window for mobile
  let thumbStart = 0, thumbEnd = projects.length;
  if (isMobile && projects.length > 5) {
    thumbStart = Math.max(0, Math.min(carouselIndex - 2, projects.length - 5));
    thumbEnd = thumbStart + 5;
  }
  const visibleThumbs = projects.slice(thumbStart, thumbEnd);
  const visibleProjects = projects;
  const currentProject = selected || visibleProjects[carouselIndex] || null;
  const router = useRouter();

  // --- Carousel thumbnail centering logic ---
  const thumbsContainerRef = React.useRef<HTMLDivElement>(null);
  const thumbRefs = React.useRef<(HTMLDivElement | null)[]>([]);

  React.useEffect(() => {
    // Find the index of the current project in the visibleThumbs array
    let localIndex = carouselIndex;
    if (isMobile && projects.length > 5) {
      localIndex = carouselIndex - thumbStart;
    }
    if (!thumbRefs.current[localIndex] || !thumbsContainerRef.current) return;
    const thumb = thumbRefs.current[localIndex];
    const container = thumbsContainerRef.current;
    if (thumb && container) {
      const thumbCenter = thumb.offsetLeft + thumb.offsetWidth / 2;
      const containerCenter = container.clientWidth / 2;
      const scrollTo = thumbCenter - containerCenter;
      container.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  }, [carouselIndex, visibleThumbs.length, isMobile]);

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
        onClick={() => router.push(`/projects/${slugify(project.title)}`)}
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
      <div
        ref={thumbsContainerRef}
        className={
          "flex items-center gap-2 mb-6 overflow-x-auto overflow-y-hidden w-full justify-center px-2 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent " +
          (slideDirection === 'left'
            ? 'animate-slide-left'
            : slideDirection === 'right'
            ? 'animate-slide-right'
            : '')
        }
        style={{ WebkitOverflowScrolling: 'touch' }}
        onTouchStart={handleThumbsTouchStart}
        onTouchMove={handleThumbsTouchMove}
        onTouchEnd={handleThumbsTouchEnd}
        onMouseDown={handleThumbsMouseDown}
      >
        {visibleThumbs.map((project, idx) => {
          // The real index in the projects array
          const realIdx = isMobile && projects.length > 5 ? thumbStart + idx : idx;
          return (
            <div
              key={project.id}
              ref={el => { thumbRefs.current[idx] = el; }}
              className={clsx("cursor-pointer", realIdx === carouselIndex ? "scale-110 z-10" : "opacity-60 hover:opacity-100 z-0")}
              onClick={() => onSelect(project, realIdx)}
              style={{ minWidth: '4rem', minHeight: '4rem', maxWidth: '20vw', maxHeight: '20vw' }}
            >
              {renderProjectThumb(project, realIdx === carouselIndex)}
            </div>
          );
        })}
      </div>
    </div>
  );
}
