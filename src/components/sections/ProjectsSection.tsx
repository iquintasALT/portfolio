'use client'
import React, { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSectionTransition } from "../ui/SectionTransitionWrapper";
import { FiltersPanel } from "../FiltersPanel";
import { LayoutGrid, PanelRight, Filter } from "lucide-react";
import projectsData from "~/../public/data/projects.json";
import { Carousel } from "~/components/ui/Projects/Carousel";
import { SidePanel } from "~/components/ui/Projects/SidePanel";



interface SectionProps {
  id: string;
}

const ProjectsSection: React.FC<SectionProps> = ({ id }) => {
  const { scrollToSection } = useSectionTransition();
  // --- State ---
  const dispatch = useDispatch();
  const [layout, setLayout] = useState<'carousel' | 'sidepanel'>('carousel');
  const [selected, setSelected] = useState<any>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  // --- Data ---
  const projectList = projectsData as any[];
  const allTags = useMemo(() => Array.from(new Set(projectList.flatMap((p) => p.libraries))), [projectList]);
  const allLanguages = useMemo(() => Array.from(new Set(projectList.map((p) => p.language))), [projectList]);

  // --- Filters from Redux ---
  const filtersOpen = useSelector((state: any) => state.projectUi.filtersOpen);
  const search = useSelector((state: any) => state.projectUi.search || "");
  const selectedCategory = useSelector((state: any) => state.projectUi.selectedCategory || null);
  const selectedLanguage = useSelector((state: any) => state.projectUi.selectedLanguage || null);
  const tags = useSelector((state: any) => state.filters.tags || []);

  // --- Filtering ---
  const filteredProjects = useMemo(
    () =>
      (projectList || []).filter((project) => {
        const matchesSearch = project.title.toLowerCase().includes((search || "").toLowerCase());
        const matchesTags = (tags || []).length === 0 || (tags || []).every((tag: string) => project.libraries.includes(tag));
        const matchesCategory = !selectedCategory || project.libraries.includes(selectedCategory);
        const matchesLanguage = !selectedLanguage || project.language === selectedLanguage;
        return matchesSearch && matchesTags && matchesCategory && matchesLanguage;
      }),
    [search, tags, selectedCategory, selectedLanguage, projectList]
  );
  const visibleProjects = filteredProjects.length > 0 ? filteredProjects : (projectList || []);
  const currentProject = selected || visibleProjects[carouselIndex] || null;

  // --- Handlers ---
  const handleSelect = (project: any, idx: number) => {
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
  const slugify = (str: string) => str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  // --- Layout ---
  let LayoutComponent = null;
  switch (layout) {
    case "carousel":
      LayoutComponent = (
        <Carousel
          projects={visibleProjects}
          selected={currentProject}
          carouselIndex={carouselIndex}
          onSelect={handleSelect}
          onPrev={handlePrev}
          onNext={handleNext}
          slugify={slugify}
        />
      );
      break;
    case "sidepanel":
      LayoutComponent = (
        <SidePanel
          filteredProjects={filteredProjects}
          selected={selected}
          setSelected={setSelected}
          slugify={slugify}
        />
      );
      break;
    default:
      LayoutComponent = null;
  }

  return (
    <section id={id} className="">
      <div className="w-full max-w-6xl mx-auto flex flex-row items-center justify-center pt-20 mb-6 gap-4">
        <h2 className="text-3xl md:text-4xl font-bold m-0 flex-shrink-0">
          My <span className="text-primary">Projects</span>
        </h2>
        <div className="flex flex-row items-center gap-2 relative ml-4">
          {/* Hide layout toggle on mobile, show only on sm+ */}
          <button
            className="hidden sm:flex bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700 rounded-full p-2 shadow-lg items-center justify-center transition-all"
            onClick={() => setLayout(layout === "carousel" ? "sidepanel" : "carousel")}
            aria-label="Switch layout"
          >
            {layout === "carousel" ? <PanelRight size={22} /> : <LayoutGrid size={22} />}
          </button>
          <button
            className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full p-2 shadow-lg flex items-center justify-center border-none transition-all relative z-20 hover:from-indigo-400 hover:to-purple-500 hover:scale-105 hover:shadow-xl focus:outline-none"
            onClick={() => dispatch({ type: 'projectUi/setFiltersOpen', payload: !filtersOpen })}
            aria-label="Show filters"
            id="filters-toggle-btn"
          >
            <Filter size={22} />
          </button>
        </div>
      </div>
      <div className="w-full max-w-6xl mx-auto flex flex-col justify-center items-center gap-8">
        <FiltersPanel
          allLanguages={allLanguages}
          allTags={allTags}
        />
        {LayoutComponent}
      </div>
    </section>
  );
};

export default ProjectsSection;