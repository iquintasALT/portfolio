import React, { useState } from "react";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { fadeInUp, glassCard } from "./ui/animations";

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

  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      className={
        `${glassCard} card-3d group rounded-2xl p-0 flex flex-col items-center card-hover relative cursor-pointer transition-transform duration-200 will-change-transform` +
        (flipped ? " flipped" : "")
      }
      whileHover={{ scale: 1.04, boxShadow: "0 8px 32px 0 rgba(31,38,135,0.37)" }}
      whileTap={{ scale: 0.97 }}
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      onClick={() => setFlipped((f) => !f)}
      tabIndex={0}
      onKeyDown={e => { if (e.key === "Enter" || e.key === " ") setFlipped(f => !f); }}
      aria-pressed={flipped}
      aria-label={flipped ? `Show front of ${title}` : `Show details of ${title}`}
      style={{ minHeight: 280, minWidth: 200, maxWidth: 340, width: "100%" }}
    >
      <div className={`card-inner-3d w-full h-full transition-transform duration-500 ease-in-out ${flipped ? "rotate-y-180" : ""}`}
        style={{ position: "relative", width: "100%", height: "100%" }}
      >
        {/* Front Side */}
        <div className="card-face-3d card-front absolute w-full h-full top-0 left-0 backface-hidden bg-[hsla(var(--card),0.85)] p-4 flex flex-col items-center rounded-2xl shadow-lg">
          <img
            src={image}
            alt={title}
            className="w-full h-36 object-cover rounded-lg mb-3 bg-[hsl(var(--background))] border border-[hsl(var(--border))] shadow-md"
            loading="lazy"
          />
          <h3 className="text-lg font-bold mb-1 text-center line-clamp-2">{title}</h3>
          <p className="text-sm mb-2 text-[hsl(var(--foreground))] opacity-80 text-center line-clamp-3">
            {description}
          </p>
          <div className="flex flex-wrap gap-1 justify-center mb-6">
            {libraries.map((lib) => (
              <span
                key={lib}
                className="px-2 py-1 rounded text-xs bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] shadow-sm"
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
        {/* Back Side */}
        <div className="card-face-3d card-back absolute w-full h-full top-0 left-0 backface-hidden rotate-y-180 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--secondary))] text-[hsl(var(--primary-foreground))] p-4 flex flex-col items-center rounded-2xl justify-center shadow-lg">
          <h3 className="text-lg font-bold mb-2 text-center">{title} Details</h3>
          <ul className="text-sm list-disc list-inside mb-2">
            {libraries.map((lib) => (
              <li key={lib}>{lib}</li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-2 justify-center mt-2">
            {renderTechIcons(customTechs[title] || [])}
          </div>
          <div className="flex flex-wrap gap-2 justify-center mt-2">
            {renderLanguageIcons(language)}
          </div>
          <span className="mt-4 text-xs opacity-80">Click or tap to flip back</span>
        </div>
      </div>
    </motion.div>
  );
};
