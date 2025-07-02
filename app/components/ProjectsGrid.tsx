import React, { useMemo } from "react";
import { ProjectCard } from "~/components/ProjectCard";
import projectsData from "~/../public/data/projects.json";
import { FiltersPanel } from "~/components/FiltersPanel";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "~/store/store";
import clsx from "clsx";
import { LayoutGrid, PanelRight } from "lucide-react";
import { Carousel } from "~/components/ui/Projects/Carousel";
import { SidePanel } from "~/components/ui/Projects/SidePanel";
import {
  setSelected,
  setCarouselIndex,
  setLayout,
  setFiltersOpen,
  setSelectedCategory,
  setSelectedLanguage,
} from '~/store/projectUiSlice';

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
  const dispatch = useDispatch();
  const { search, tags } = useSelector((state: RootState) => state.filters);
  const {
    selected,
    carouselIndex,
    layout,
    filtersOpen,
    selectedCategory,
    selectedLanguage,
  } = useSelector((state: RootState) => state.projectUi);

  // Memoize allTags so it's only recalculated if projectList changes
  const allTags = useMemo(
    () => Array.from(new Set(projectList.flatMap((p) => p.libraries))),
    []
  );

  // Custom filter categories
  const CATEGORY_TAGS = ["Frontend", "Backend", "Videogame"];
  // Get all unique languages from projects
  const allLanguages = useMemo(
    () => Array.from(new Set(projectList.map((p) => p.language))),
    []
  );

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
    [search, tags, selectedCategory, selectedLanguage]
  );

  // Carousel logic
  const visibleProjects = filteredProjects.length > 0 ? filteredProjects : projectList;
  const currentProject = selected || visibleProjects[carouselIndex] || null;

  const handleSelect = (project: Project, idx: number) => {
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

  const slugify = (str: string) =>
    str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  // Render project card for carousel
  const renderProjectCard = (project: Project) => (
    <div className="flex flex-col items-center w-full">
      <span className="block">
        <img
          src={project.image}
          alt={project.title}
          className="object-cover rounded-2xl shadow-xl border-2 border-indigo-500 mx-8 w-72 h-72 max-w-[80vw] max-h-[40vh] mb-4 pointer-events-none select-none"
          draggable="false"
        />
      </span>
      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-100 mb-2 text-center">
        {project.title}
      </h2>
      {/* Description in a rounded box, always visible and distinct */}
      <div className="bg-zinc-900/90 rounded-2xl px-6 py-4 mb-4 shadow-lg border-2 border-indigo-500 max-w-md w-full mx-auto flex justify-center z-20 relative">
        <p className="text-zinc-300 text-base sm:text-lg text-center">
          {project.description}
        </p>
      </div>
      <div className="flex flex-wrap gap-2 mb-2 justify-center">
        {project.libraries.map((lib) => (
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
  const renderProjectThumb = (project: Project, isActive: boolean) => (
    <span className="block">
      <img
        src={project.image}
        alt={project.title}
        className={clsx(
          "w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 object-cover rounded-xl shadow border-2 transition-all duration-300 pointer-events-none select-none",
          isActive ? "border-indigo-500 scale-110 z-10" : "border-zinc-700 opacity-60 hover:opacity-100 z-0"
        )}
        draggable="false"
      />
    </span>
  );

  // --- Render selected layout ---
  let LayoutComponent = null;
  switch (layout) {
    case "carousel":
      LayoutComponent = <Carousel />;
      break;
    case "sidepanel":
      LayoutComponent = (
        <SidePanel
          filteredProjects={filteredProjects}
          selected={selected}
          setSelected={(project: Project) => {
            const idx = filteredProjects.findIndex(p => p.id === project.id);
            handleSelect(project, idx === -1 ? 0 : idx);
          }}
          slugify={slugify}
        />
      );
      break;
    default:
      LayoutComponent = <Carousel />;
  }

  return (
    <div className="relative">
      <FiltersPanel allLanguages={allLanguages} allTags={allTags} />
      {/* Main content below filter bar */}
      <div className="pt-28">
        <div className="flex items-center gap-4 mb-4 justify-end">
          {/* Layout switch button (top right of grid) - hide on mobile */}
          <button
            className="hidden sm:flex bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700 rounded-full p-2 shadow-lg items-center justify-center transition-all"
            onClick={() => dispatch(setLayout(layout === "carousel" ? "sidepanel" : "carousel"))}
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
