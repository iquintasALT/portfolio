import React, { useMemo, useState } from "react";
import { ProjectCard } from "~/components/ProjectCard";
import projectsData from "~/../public/data/projects.json";
import { FilterBar } from "~/components/FilterBar";
import { useSelector } from "react-redux";
import type { RootState } from "~/store/store";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { LayoutGrid, PanelRight } from "lucide-react";

// Define the Project type strictly
export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  language: string;
  libraries: string[];
}

// Type assertion for the imported JSON data
const projectList: Project[] = projectsData as Project[];

// Layout showcase options
const LAYOUTS = [
  { key: "carousel", label: "Carousel/Slider", icon: <LayoutGrid size={22} /> },
  { key: "sidepanel", label: "Grid + Side Panel", icon: <PanelRight size={22} /> },
];

export const ProjectsGrid: React.FC = () => {
  console.log('ProjectsGrid render');
  const { search, tags } = useSelector((state: RootState) => state.filters);
  const [selected, setSelected] = useState<Project | null>(null);
  const [flipped, setFlipped] = useState(false);
  const [layout, setLayout] = useState<string>(LAYOUTS[0].key);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const navigate = useNavigate();

  // Memoize allTags so it's only recalculated if projectList changes
  const allTags = useMemo(
    () => Array.from(new Set(projectList.flatMap((p) => p.libraries))),
    [projectList]
  );

  // Custom filter categories
  const CATEGORY_TAGS = ["Frontend", "Backend", "Videogame"];
  // Get all unique languages from projects
  const allLanguages = useMemo(
    () => Array.from(new Set(projectList.map((p) => p.language))),
    [projectList]
  );
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  // Filter projects by search, tags, category, and language
  const filteredProjects = useMemo(
    () =>
      projectList.filter((project) => {
        const matchesSearch = project.title
          .toLowerCase()
          .includes(search.toLowerCase());
        const matchesTags =
          tags.length === 0 ||
          tags.every((tag) => project.libraries.includes(tag));
        const matchesCategory =
          !selectedCategory || project.libraries.includes(selectedCategory);
        const matchesLanguage =
          !selectedLanguage || project.language === selectedLanguage;
        return (
          matchesSearch && matchesTags && matchesCategory && matchesLanguage
        );
      }),
    [projectList, search, tags, selectedCategory, selectedLanguage]
  );

  // Helper to slugify project title
  const slugify = (str: string) =>
    str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  // Handle card click
  const handleCardClick = (project: Project) => {
    setSelected(project);
    setTimeout(() => setFlipped(true), 200); // Delay for flip effect
  };

  // Handle close modal
  const handleClose = () => {
    setFlipped(false);
    setTimeout(() => setSelected(null), 400); // Wait for animation
  };

  // --- Layout Components ---
  // Carousel/Slider (true carousel with always-visible main image and navigation)
  const [carouselIndex, setCarouselIndex] = useState(0);
  const visibleProjects = filteredProjects.length > 0 ? filteredProjects : projectList;
  const currentProject = selected || visibleProjects[carouselIndex] || null;

  const handleSelect = (project: Project, idx: number) => {
    setSelected(project);
    setCarouselIndex(idx);
  };
  const handlePrev = () => {
    const newIndex = (carouselIndex - 1 + visibleProjects.length) % visibleProjects.length;
    setCarouselIndex(newIndex);
    setSelected(visibleProjects[newIndex]);
  };
  const handleNext = () => {
    const newIndex = (carouselIndex + 1) % visibleProjects.length;
    setCarouselIndex(newIndex);
    setSelected(visibleProjects[newIndex]);
  };

  const Carousel = () => {
    console.log('Carousel render');
    return (
      <div className="flex flex-col items-center justify-center w-full max-w-[900px] mx-auto h-[80vh] relative">
        {/* Left Arrow: fixed to left edge of carousel container */}
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700 rounded-full p-2 shadow-lg z-20"
          style={{
            width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginLeft: 16, // Increased margin for edge spacing
          }}
          onClick={handlePrev}
          aria-label="Previous project"
        >
          <span className="sr-only">Previous</span>
          <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        {/* Right Arrow: fixed to right edge of carousel container */}
        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700 rounded-full p-2 shadow-lg z-20"
          style={{
            width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginRight: 16, // Increased margin for edge spacing
          }}
          onClick={handleNext}
          aria-label="Next project"
        >
          <span className="sr-only">Next</span>
          <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
        </button>
        {/* Main image and arrows */}
        <div className="flex items-center justify-center w-full mb-6 relative min-h-[260px]">
          {/* Main image: fixed size for all breakpoints */}
          {currentProject && (
            <img
              src={currentProject.image}
              alt={currentProject.title}
              className="object-cover rounded-2xl shadow-xl border-2 border-indigo-500 mx-8"
              style={{ width: '18rem', height: '18rem', maxWidth: '80vw', maxHeight: '40vh' }}
            />
          )}
        </div>
        {/* Thumbnails: always visible, horizontally scrollable on mobile */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto w-full justify-center px-2 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent" style={{ WebkitOverflowScrolling: 'touch' }}>
          {visibleProjects.map((project, idx) => {
            console.log('Thumbnail render', project.title);
            return (
              <img
                key={project.id}
                src={project.image}
                alt={project.title}
                className={clsx(
                  "w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 object-cover rounded-xl shadow cursor-pointer border-2 transition-all duration-300",
                  (currentProject?.id === project.id) ? "border-indigo-500 scale-110 z-10" : "border-zinc-700 opacity-60 hover:opacity-100 z-0"
                )}
                onClick={() => handleSelect(project, idx)}
                style={{ minWidth: '4rem', minHeight: '4rem', maxWidth: '20vw', maxHeight: '20vw' }}
              />
            );
          })}
        </div>
        {currentProject && (
          <div className="bg-zinc-950 rounded-3xl shadow-2xl border border-zinc-800 p-4 sm:p-8 flex flex-col items-center animate-flip-expand w-full max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-100 mb-2 text-center">
              {currentProject.title}
            </h2>
            <p className="text-zinc-300 text-base sm:text-lg mb-4 text-center">
              {currentProject.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-6 justify-center">
              {currentProject.libraries.map((lib) => (
                <span
                  key={lib}
                  className="bg-zinc-800 text-zinc-300 px-3 py-1 rounded-full text-xs shadow border border-zinc-700"
                >
                  {lib}
                </span>
              ))}
            </div>
            <button
              className="mt-2 px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full shadow-lg font-semibold text-lg hover:scale-105 transition-transform"
              onClick={() => navigate(`/projects/${slugify(currentProject.title)}`)}
            >
              More about this project
            </button>
          </div>
        )}
      </div>
    );
  };

  // Grid + Persistent Side Panel (with bigger image)
  const SidePanel = () => {
    console.log('SidePanel render');
    return (
      <div className="flex h-[80vh] w-full max-w-[1200px] mx-auto rounded-2xl shadow-2xl bg-zinc-950/80 backdrop-blur-lg border border-zinc-800 overflow-hidden relative">
        <div className="w-2/3 overflow-y-auto p-4 border-r border-zinc-800">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredProjects.map((project) => {
              console.log('Grid item render', project.title);
              return (
                <div
                  key={project.id}
                  className={clsx(
                    "cursor-pointer group transition-transform duration-300",
                    selected?.id === project.id && "ring-2 ring-indigo-500"
                  )}
                  onClick={() => setSelected(project)}
                >
                  <ProjectCard {...project} />
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-1/3 flex flex-col items-center justify-center p-8 relative">
          {selected ? (
            <>
              <img
                src={selected.image}
                alt={selected.title}
                className="w-64 h-64 sm:w-80 sm:h-80 object-cover rounded-2xl shadow-xl mb-6 border-2 border-indigo-500"
              />
              <h2 className="text-3xl font-bold text-zinc-100 mb-2 text-center">
                {selected.title}
              </h2>
              <p className="text-zinc-300 text-lg mb-4 text-center">
                {selected.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-6 justify-center">
                {selected.libraries.map((lib) => (
                  <span
                    key={lib}
                    className="bg-zinc-800 text-zinc-300 px-3 py-1 rounded-full text-xs shadow border border-zinc-700"
                  >
                    {lib}
                  </span>
                ))}
              </div>
              <button
                className="mt-2 px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full shadow-lg font-semibold text-lg hover:scale-105 transition-transform"
                onClick={() => navigate(`/projects/${slugify(selected.title)}`)}
              >
                More about this project
              </button>
            </>
          ) : (
            <div className="text-zinc-400 text-lg text-center opacity-60">
              Select a project to see details
            </div>
          )}
        </div>
        {/* Layout switch button removed from inside grid */}
      </div>
    );
  };

  // --- Render selected layout ---
  let LayoutComponent = null;
  switch (layout) {
    case "carousel":
      LayoutComponent = <Carousel />;
      break;
    case "sidepanel":
      LayoutComponent = <SidePanel />;
      break;
    default:
      LayoutComponent = <Carousel />;
  }

  return (
    <div className="relative">
      {/* Pulsating filter button */}
      <button
        className={clsx(
          "fixed left-1/2 top-6 z-40 -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full shadow-lg px-6 py-3 font-bold text-lg focus:outline-none transition-all duration-300",
          filtersOpen ? "scale-110" : "animate-pulse scale-100"
        )}
        style={{ boxShadow: "0 0 24px 4px rgba(99,102,241,0.3)" }}
        onClick={() => setFiltersOpen((v) => !v)}
        aria-label="Toggle filters"
      >
        {filtersOpen ? "Hide Filters" : "Show Filters"}
      </button>
      {/* Animated filter bar overlay */}
      <div
        className={clsx(
          "fixed left-1/2 top-20 z-30 w-full max-w-2xl -translate-x-1/2 flex flex-col items-center transition-all duration-500",
          filtersOpen ? "opacity-100 scale-y-100 pointer-events-auto" : "opacity-0 scale-y-0 pointer-events-none"
        )}
        style={{ transformOrigin: "top center" }}
      >
        <div className="w-full bg-zinc-950/90 rounded-2xl shadow-2xl border border-zinc-800 p-4 backdrop-blur-lg flex flex-col gap-4">
          {/* Category filter (mobile first, horizontal scroll) */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {CATEGORY_TAGS.map((cat) => (
              <button
                key={cat}
                className={clsx(
                  "px-4 py-2 rounded-full font-semibold text-sm whitespace-nowrap border transition-all",
                  selectedCategory === cat
                    ? "bg-indigo-500 text-white border-indigo-500"
                    : "bg-zinc-800 text-zinc-200 border-zinc-700 hover:bg-zinc-700"
                )}
                onClick={() =>
                  setSelectedCategory(selectedCategory === cat ? null : cat)
                }
              >
                {cat}
              </button>
            ))}
          </div>
          {/* Language filter (mobile first, horizontal scroll) */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {allLanguages.map((lang) => (
              <button
                key={lang}
                className={clsx(
                  "px-4 py-2 rounded-full font-semibold text-sm whitespace-nowrap border transition-all",
                  selectedLanguage === lang
                    ? "bg-purple-600 text-white border-purple-600"
                    : "bg-zinc-800 text-zinc-200 border-zinc-700 hover:bg-zinc-700"
                )}
                onClick={() =>
                  setSelectedLanguage(selectedLanguage === lang ? null : lang)
                }
              >
                {lang}
              </button>
            ))}
          </div>
          <FilterBar allTags={allTags} />
        </div>
      </div>
      {/* Main content below filter bar */}
      <div className="pt-28">
        <div className="flex items-center gap-4 mb-4 justify-end">
          {/* Layout switch button (top right of grid) - hide on mobile */}
          <button
            className="hidden sm:flex bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700 rounded-full p-2 shadow-lg items-center justify-center transition-all"
            onClick={() => setLayout(layout === "carousel" ? "sidepanel" : "carousel")}
            aria-label="Switch layout"
          >
            {layout === "carousel" ? LAYOUTS[1].icon : LAYOUTS[0].icon}
          </button>
        </div>
        <div className="mt-2">{LayoutComponent}</div>
      </div>
      {/* Animations */}
      <style>{`
        .animate-flip-expand {
          transition: transform 0.5s cubic-bezier(.4,2,.3,1), box-shadow 0.5s;
          transform-style: preserve-3d;
        }
        .scale-100 { transform: scale(1) rotateY(0deg); }
        .scale-75 { transform: scale(0.75) rotateY(180deg); }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
};
