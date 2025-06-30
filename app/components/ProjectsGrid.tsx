import React, { useMemo } from "react";
import { ProjectCard } from "~/components/ProjectCard";
import projectsData from "~/../public/data/projects.json";
import { FilterBar } from "~/components/FilterBar";
import { useSelector } from "react-redux";
import type { RootState } from "~/store/store";

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

export const ProjectsGrid: React.FC = () => {
  const { search, tags } = useSelector((state: RootState) => state.filters);

  // Memoize allTags so it's only recalculated if projectList changes
  const allTags = useMemo(
    () => Array.from(new Set(projectList.flatMap((p) => p.libraries))),
    [projectList]
  );

  // Filter projects by search and tags
  const filteredProjects = useMemo(
    () =>
      projectList.filter((project) => {
        const matchesSearch = project.title
          .toLowerCase()
          .includes(search.toLowerCase());
        const matchesTags =
          tags.length === 0 ||
          tags.every((tag) => project.libraries.includes(tag));
        return matchesSearch && matchesTags;
      }),
    [projectList, search, tags]
  );

  return (
    <div>
      <FilterBar allTags={allTags} />
      <div className="flex flex-wrap justify-center max-w-[1040px] gap-y-4">
        {filteredProjects.map((project) => (
          <div key={project.id} className="sm:w-[220px] md:w-[220px]">
            <ProjectCard {...project} />
          </div>
        ))}
      </div>
    </div>
  );
};
