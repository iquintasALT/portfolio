import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";

interface Skill {
  name: string;
  icon: string;
  description: string;
}

interface SkillDisplayProps {
  skill: Skill;
  // Optionally allow external control of highlight (e.g. for orbiting animation)
  highlighted?: boolean;
  // Optionally allow custom className for container
  className?: string;
  // Optionally allow custom style for container
  style?: React.CSSProperties;
}

const SkillDisplay: React.FC<SkillDisplayProps> = ({ skill, highlighted = false, className = "", style }) => {
  const [hovered, setHovered] = React.useState(false);
  const [touched, setTouched] = React.useState(false);
  // Show tooltip if hovered (desktop) or touched (mobile)
  const showTooltip = hovered || touched;

  // If className includes '!rounded-full', render orbit style, else grid style
  const isOrbit = className.includes("!rounded-full");

  if (isOrbit) {
    // Orbit style: circular, smaller, border-indigo, icon+name stacked, tooltip
    return (
      <motion.div
        className={
          `bg-zinc-900/80 border border-indigo-700 rounded-full shadow-lg flex flex-col items-center p-3 w-16 h-16 cursor-pointer transition-all hover:bg-indigo-800/80 group relative ` +
          className
        }
        whileHover={{ scale: 1.18 }}
        whileTap={{ scale: 1.1 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onTouchStart={() => setTouched(true)}
        onTouchEnd={() => setTimeout(() => setTouched(false), 1200)}
        tabIndex={0}
        aria-label={skill.name}
        style={style}
      >
        <Image src={skill.icon} alt={skill.name} className="w-8 h-8 mb-1" width={32} height={32} draggable={false} />
        <HelpCircle className="w-8 h-8 mb-1 text-zinc-500 orbit-fallback hidden" aria-label="placeholder icon" />
        <span className="text-xs text-indigo-200 font-semibold text-center">{skill.name}</span>
        {/* Tooltip */}
        <div
          className={
            `absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-44 bg-zinc-800 text-zinc-200 text-xs rounded-lg px-3 py-2 opacity-0 group-hover:opacity-100 pointer-events-none transition-all shadow-lg z-50` +
            (showTooltip ? " opacity-100" : "")
          }
        >
          <div className="font-semibold text-indigo-400 mb-1">{skill.name}</div>
          <div>{skill.description}</div>
        </div>
      </motion.div>
    );
  }

  // Grid style (default): slightly larger icon
  return (
    <div
      className={
        `relative group bg-zinc-900/80 border rounded-2xl p-2 flex flex-col items-center shadow-md w-16 h-16 sm:w-20 sm:h-20 transition-all cursor-pointer ` +
        (highlighted || showTooltip ? " border-indigo-400/80 bg-indigo-900/70 " : " border-zinc-700 ") +
        className
      }
      style={style}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onTouchStart={() => setTouched(true)}
      onTouchEnd={() => setTimeout(() => setTouched(false), 1200)}
      tabIndex={0}
      aria-label={skill.name}
    >
      {/* Icon with fallback */}
      <Image src={skill.icon} alt={skill.name} className="w-9 h-9 mb-1" width={36} height={36} draggable={false} />
      <HelpCircle className="w-9 h-9 mb-1 text-zinc-500 micro-fallback hidden" aria-label="placeholder icon" />
      <div
        className={
          `font-bold text-xs mb-1 transition-colors text-center truncate w-full ` +
          (highlighted || showTooltip ? "text-indigo-200" : "text-indigo-300")
        }
      >
        {skill.name}
      </div>
      {/* Tooltip */}
      <div
        className={
          "absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-40 bg-zinc-800 text-zinc-200 text-xs rounded-lg px-2 py-1 opacity-0 group-hover:opacity-100 pointer-events-none transition-all shadow-lg z-20" +
          (showTooltip ? " opacity-100" : "")
        }
      >
        <div className="font-semibold text-indigo-400 mb-1">{skill.name}</div>
        <div>{skill.description}</div>
      </div>
    </div>
  );
};

export default SkillDisplay;
