import React from "react";
import type { ReactNode } from "react";

interface ProjectCardProps {
  image: string;
  title: string;
  description: string;
  language: string;
  libraries: string[];
}

const languageIcons: Record<string, ReactNode> = {
  TypeScript: (
    <img
      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"
      alt="TypeScript"
      className="w-6 h-6 inline-block"
    />
  ),
  JavaScript: (
    <img
      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
      alt="JavaScript"
      className="w-6 h-6 inline-block"
    />
  ),
  Python: (
    <img
      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
      alt="Python"
      className="w-6 h-6 inline-block"
    />
  ),
  "C++": (
    <img
      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg"
      alt="C++"
      className="w-6 h-6 inline-block"
    />
  ),
  "C#": (
    <img
      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg"
      alt="C#"
      className="w-6 h-6 inline-block"
    />
  ),
  Lua: (
    <img
      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/lua/lua-original.svg"
      alt="Lua"
      className="w-6 h-6 inline-block"
    />
  ),
};

const techIcons: Record<string, ReactNode> = {
  SDL: (
    <img
      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sdl/sdl-original.svg"
      alt="SDL"
      className="w-6 h-6 inline-block"
    />
  ),
  Webassembly: (
    <img
      src="/icons/webassembly.svg"
      alt="WebAssembly"
      className="w-6 h-6 inline-block"
    />
  ),
  Unity: (
    <img
      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg"
      alt="Unity"
      className="w-6 h-6 inline-block"
    />
  ),
  React: (
    <img
      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
      alt="React"
      className="w-6 h-6 inline-block"
    />
  ),
  Redux: (
    <img
      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg"
      alt="Redux"
      className="w-6 h-6 inline-block"
    />
  ),
  OGRE: (
    <img
      src="/icons/ogre.svg"
      alt="OGRE"
      className="w-6 h-6 inline-block"
    />
  ),
  CMake: (
    <img
      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cmake/cmake-original.svg"
      alt="CMake"
      className="w-6 h-6 inline-block"
    />
  ),
  Phaser: (
    <img
      src="/icons/phaser.png"
      alt="Phaser"
      className="w-6 h-6 inline-block"
    />
  ),
};

function renderLanguageIcons(language: string) {
  // Support multiple languages separated by comma
  return language.split(",").map((lang, idx) => (
    <span key={lang.trim()} className="mr-1 last:mr-0">
      {languageIcons[lang.trim()] || lang.trim()}
    </span>
  ));
}

function renderTechIcons(techs: string[]) {
  return techs.map((tech) => (
    <span key={tech} className="ml-1">
      {techIcons[tech] || tech}
    </span>
  ));
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  image,
  title,
  description,
  language,
  libraries,
}) => {
  // Custom techs for each project (bottom right)
  const customTechs: Record<string, string[]> = {
    "Dome Visualizer": ["SDL", "Webassembly"],
    "Gungcho Gallery": ["Unity"],
    "Portfolio Website": ["React", "Redux"],
    "Triturados Game": ["OGRE", "CMake"],
    "Veiled Animation": ["Phaser"],
  };
  return (
    <div
      className="rounded-lg shadow-lg p-4 flex flex-col items-center card-hover border border-[hsl(var(--border))] bg-[hsl(var(--card))] text-[hsl(var(--foreground))] relative"
    >
      <img
        src={image}
        alt={title}
        className="w-full h-40 object-cover rounded-md mb-3 bg-[hsl(var(--background))]"
      />
      <h3 className="text-lg font-bold mb-1">{title}</h3>
      <p className="text-sm mb-2 text-[hsl(var(--foreground))] opacity-80">
        {description}
      </p>
      <div className="flex flex-wrap gap-1 justify-center mb-6">
        {libraries.map((lib) => (
          <span
            key={lib}
            className="px-2 py-1 rounded text-xs bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]"
          >
            {lib}
          </span>
        ))}
      </div>
      <div className="absolute bottom-4 left-4 flex items-center gap-2">
        {renderLanguageIcons(language)}
      </div>
      <div className="absolute bottom-4 right-4 flex items-center gap-2">
        {renderTechIcons(customTechs[title] || [])}
      </div>
    </div>
  );
};
