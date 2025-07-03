import React from "react";
// import ReactDOM from "react-dom";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { HelpCircle } from "lucide-react";

interface Skill {
  name: string;
  icon: string;
  level: number;
  description: string;
}
interface SkillCategory {
  category: string;
  skills: Skill[];
}

interface OrbitingSkillsProps {
  category: SkillCategory;
}


const OrbitingSkills: React.FC<OrbitingSkillsProps> = ({ category }) => {
  const [hovered, setHovered] = React.useState<string | null>(null);
  const [touched, setTouched] = React.useState<string | null>(null);
  const center = { x: 200, y: 200 };
  const radius = 120;
  const skills = category.skills;
  // Animate orbit: each skill orbits around the center, not rotating itself
  return (
    <div className="relative w-full max-w-md h-[400px] mx-auto flex items-center justify-center overflow-visible select-none" style={{paddingTop: '3.5rem'}}>
      {/* Center category */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-700/80 to-zinc-900/80 flex items-center justify-center shadow-2xl border-4 border-indigo-400/40">
          <span className="text-indigo-200 font-bold text-xl select-none text-center px-2">{category.category}</span>
        </div>
      </div>
      {/* Orbiting skills */}
      {skills.map((skill, j) => {
        // Each skill orbits on its own unique radius
        const minRadius = 80;
        const radiusStep = 38;
        const skillRadius = minRadius + j * radiusStep;
        const baseAngle = (j / skills.length) * 2 * Math.PI;
        const duration = 8 + j * 1.5;
        // Use a ref to avoid re-rendering on every frame
        const orbitColor = '#818cf8';
        const skillRef = React.useRef<HTMLDivElement>(null);
        // Animate skill
        React.useEffect(() => {
          let frame: number;
          let start: number | null = null;
          function animateSkill(ts: number) {
            if (start === null) start = ts;
            const elapsed = ((ts - start) / 1000) % duration;
            const angle = baseAngle + (elapsed / duration) * 2 * Math.PI;
            const tx = Math.cos(angle) * skillRadius;
            const ty = Math.sin(angle) * skillRadius;
            if (skillRef.current) {
              skillRef.current.style.transform = `translate(-50%, -50%) translate(${tx}px, ${ty}px)`;
            }
            frame = requestAnimationFrame(animateSkill);
          }
          frame = requestAnimationFrame(animateSkill);
          return () => cancelAnimationFrame(frame);
        }, [baseAngle, duration, skillRadius]);

        return (
          <React.Fragment key={skill.name}>
            <div
              className="absolute pointer-events-none"
              style={{
                left: '50%',
                top: '50%',
                width: `${skillRadius * 2 + 24}px`,
                height: `${skillRadius * 2 + 24}px`,
                marginLeft: `-${skillRadius + 12}px`,
                marginTop: `-${skillRadius + 12}px`,
                borderRadius: '50%',
                border: `2px solid ${orbitColor}33`, // faint
                boxShadow: `0 0 32px 8px ${orbitColor}33, 0 0 64px 16px ${orbitColor}22`,
                opacity: 0.25,
                zIndex: 0,
                filter: 'blur(0.5px)',
                transition: 'none',
              }}
            />
            <div
              ref={skillRef}
              className={
                `absolute flex flex-col items-center transition-[z-index] duration-100` +
                ((hovered === skill.name || touched === skill.name) ? ' z-50' : ' z-10')
              }
              style={{ left: '50%', top: '50%' }}
            >
              <motion.div
                className="bg-zinc-900/80 border border-indigo-700 rounded-full shadow-lg flex flex-col items-center p-3 w-16 h-16 cursor-pointer transition-all hover:bg-indigo-800/80 group"
                whileHover={{ scale: 1.18 }}
                whileTap={{ scale: 1.1 }}
                onMouseEnter={() => setHovered(skill.name)}
                onMouseLeave={() => setHovered(null)}
                onTouchStart={() => setTouched(skill.name)}
                onTouchEnd={() => setTimeout(() => setTouched(null), 1200)}
              >
                {/* Icon with fallback */}
                <img
                  src={skill.icon}
                  alt={skill.name}
                  className="w-8 h-8 mb-1"
                  onError={e => {
                    const target = e.currentTarget;
                    target.onerror = null;
                    target.style.display = 'none';
                    const sibling = target.nextElementSibling;
                    if (sibling && sibling.classList.contains('orbit-fallback')) sibling.classList.remove('hidden');
                  }}
                />
                <HelpCircle className="w-8 h-8 mb-1 text-zinc-500 orbit-fallback hidden" aria-label="placeholder icon" />
                <span className="text-xs text-indigo-200 font-semibold text-center">{skill.name}</span>
                {/* Tooltip (not in portal, uses CSS stacking context) */}
                <div className={
                  `absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-44 bg-zinc-800 text-zinc-200 text-xs rounded-lg px-3 py-2 opacity-0 group-hover:opacity-100 pointer-events-none transition-all shadow-lg z-50` +
                  ((hovered === skill.name || touched === skill.name) ? ' opacity-100' : '')
                }>
                  <div className="font-semibold text-indigo-400 mb-1">{skill.name}</div>
                  <div>{skill.description}</div>
                </div>
              </motion.div>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default OrbitingSkills;
