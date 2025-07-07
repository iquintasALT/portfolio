import React from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

import type { Project } from "@/types/project";

interface SidePanelProps {
  filteredProjects: Project[];
  selected: Project | null;
  setSelected: (project: Project) => void;
  slugify: (str: string) => string;
}

export const SidePanel: React.FC<SidePanelProps> = ({ filteredProjects, selected, setSelected, slugify }) => {
  // No mobile-specific logic needed here; arrows are not rendered in this panel
  return (
    <div className="flex h-[80vh] w-full max-w-[1200px] mx-auto rounded-2xl shadow-2xl bg-zinc-950/80 backdrop-blur-lg border border-zinc-800 overflow-hidden relative">
      {/* Left Arrow (hidden on mobile) */}
      {/* Right Arrow (hidden on mobile) */}
      <div className="w-2/3 overflow-y-auto p-4 border-r border-zinc-800">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className={clsx(
                "cursor-pointer group transition-transform duration-300 p-4 bg-zinc-900/80 rounded-xl border border-zinc-800 hover:bg-zinc-800/80",
                selected?.id === project.id && "ring-2 ring-indigo-500"
              )}
              onClick={() => setSelected(project)}
            >
              <Image
                src={project.image}
                alt={project.title}
                className="w-full h-28 object-cover rounded mb-2 border border-zinc-700"
                width={200}
                height={112}
              />
              <h3 className="text-base font-semibold text-zinc-100 mb-1 line-clamp-1">{project.title}</h3>
              <p className="text-xs text-zinc-400 mb-2 line-clamp-2">{project.description}</p>
              <div className="flex flex-wrap gap-1 mb-1">
                {project.libraries.slice(0, 2).map((lib: string) => (
                  <span
                    key={lib}
                    className="bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded-full text-[10px] shadow border border-zinc-700"
                  >
                    {lib}
                  </span>
                ))}
              </div>
              <span className="text-[10px] text-indigo-400 font-mono">{project.language}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Details panel, no arrows on mobile */}
      <div className="w-1/3 flex flex-col items-center justify-center p-8 relative">
        {selected ? (
          <>
            <Image
              src={selected.image}
              alt={selected.title}
              className="w-64 h-64 sm:w-80 sm:h-80 object-cover rounded-2xl shadow-xl mb-6 border-2 border-indigo-500"
              width={300}
              height={300}
            />
            <h2 className="text-3xl font-bold text-zinc-100 mb-2 text-center">{selected.title}</h2>
            <p className="text-zinc-300 text-lg mb-4 text-center">{selected.description}</p>
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
            <Link
              href={`/projects/${slugify(selected.title)}`}
              className="mt-2 px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full shadow-lg font-semibold text-lg hover:scale-105 transition-transform inline-block text-center"
              prefetch={true}
            >
              More about this project
            </Link>
          </>
        ) : (
          <div className="text-zinc-400 text-lg text-center opacity-60">Select a project to see details</div>
        )}
      </div>
    </div>
  );
};
