import React from "react";
import clsx from "clsx";
import { useRouter } from "next/navigation";
// import type { Project } from "~/components/ProjectsGrid";
import { ProjectCard } from "~/components/ProjectCard";

import type { Project } from "~/components/ProjectsGrid";

interface SidePanelProps {
  filteredProjects: Project[];
  selected: Project | null;
  setSelected: (project: Project) => void;
  slugify: (str: string) => string;
}

export const SidePanel: React.FC<SidePanelProps> = ({
  filteredProjects,
  selected,
  setSelected,
  slugify,
}) => {
  const router = useRouter();
  return (
    <div className="flex h-[80vh] w-full max-w-[1200px] mx-auto rounded-2xl shadow-2xl bg-zinc-950/80 backdrop-blur-lg border border-zinc-800 overflow-hidden relative">
      <div className="w-2/3 overflow-y-auto p-4 border-r border-zinc-800">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredProjects.map((project) => (
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
          ))}
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
              {selected.libraries.map((lib: string) => (
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
              onClick={() => router.push(`/projects/${slugify(selected.title)}`)}
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
    </div>
  );
};
