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
          `bg-zinc-900/80 border border-indigo-700 rounded-full shadow-lg flex flex-col items-center p-[clamp(0.5rem,2vw,0.75rem)] ` +
          `w-[clamp(3.25rem,7vw,4.5rem)] h-[clamp(3.25rem,7vw,4.5rem)] aspect-square cursor-pointer transition-all hover:bg-indigo-800/80 group relative ` +
          "max-[380px]:w-[clamp(2.6rem,12vw,3.2rem)] max-[380px]:h-[clamp(2.6rem,12vw,3.2rem)] max-[380px]:aspect-square max-[380px]:p-[clamp(0.45rem,3vw,0.8rem)] " +
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
        <Image
          src={skill.icon}
          alt={skill.name}
          className="mb-1 w-[clamp(1.5rem,2.5vw,2rem)] h-[clamp(1.5rem,2.5vw,2rem)] max-[380px]:w-[clamp(1.3rem,7vw,1.8rem)] max-[380px]:h-[clamp(1.3rem,7vw,1.8rem)]"
          width={32}
          height={32}
          draggable={false}
        />
        <HelpCircle
          className="mb-1 w-[clamp(1.5rem,2.5vw,2rem)] h-[clamp(1.5rem,2.5vw,2rem)] text-zinc-500 orbit-fallback hidden max-[380px]:w-[clamp(1.3rem,7vw,1.8rem)] max-[380px]:h-[clamp(1.3rem,7vw,1.8rem)]"
          aria-label="placeholder icon"
        />
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
        `relative group bg-zinc-900/80 border rounded-2xl p-[clamp(0.5rem,2vw,1rem)] flex flex-col items-center shadow-md ` +
        `w-[clamp(3.5rem,8vw,5rem)] h-[clamp(3.5rem,8vw,5rem)] aspect-square sm:w-[clamp(4rem,9vw,5.5rem)] sm:h-[clamp(4rem,9vw,5.5rem)] sm:aspect-square transition-all cursor-pointer ` +
        "max-[380px]:w-[clamp(2.1rem,10vw,2.7rem)] max-[380px]:h-[clamp(2.1rem,10vw,2.7rem)] max-[380px]:aspect-square max-[380px]:p-[clamp(0.4rem,3vw,0.7rem)] " +
        "max-h-[700px]:w-[clamp(2.1rem,10vw,2.7rem)] max-h-[700px]:h-[clamp(2.1rem,10vw,2.7rem)] max-h-[700px]:aspect-square max-h-[700px]:p-[clamp(0.4rem,3vw,0.7rem)] " +
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
      <Image
        src={skill.icon}
        alt={skill.name}
        className="mb-1 w-[clamp(1.75rem,3vw,2.25rem)] h-[clamp(1.75rem,3vw,2.25rem)] max-[380px]:w-[clamp(1.2rem,6vw,1.6rem)] max-[380px]:h-[clamp(1.2rem,6vw,1.6rem)] max-h-[700px]:w-[clamp(1.2rem,6vw,1.6rem)] max-h-[700px]:h-[clamp(1.2rem,6vw,1.6rem)]"
        width={36}
        height={36}
        draggable={false}
      />
      <HelpCircle
        className="mb-1 w-[clamp(1.75rem,3vw,2.25rem)] h-[clamp(1.75rem,3vw,2.25rem)] text-zinc-500 micro-fallback hidden max-[380px]:w-[clamp(1.2rem,6vw,1.6rem)] max-[380px]:h-[clamp(1.2rem,6vw,1.6rem)] max-h-[700px]:w-[clamp(1.2rem,6vw,1.6rem)] max-h-[700px]:h-[clamp(1.2rem,6vw,1.6rem)]"
        aria-label="placeholder icon"
      />
      <div
        className={
          `font-bold text-xs mb-1 transition-colors text-center whitespace-normal w-full break-keep flex items-center justify-center ` +
          (highlighted || showTooltip ? "text-indigo-200" : "text-indigo-300")
        }
        style={{ wordBreak: "keep-all" }}
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
