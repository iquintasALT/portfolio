import React from "react";
import SkillDisplay from "./ui/SkillDisplay";

interface Skill {
  name: string;
  icon: string;
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
  // No need for local hovered/touched state, handled in SkillDisplay
  const skills = category.skills;
  const orbitCount = 3;
  const orbitRadii = [90, 140, 190];
  const orbitColor = '#818cf8';

  // Assign each skill to an orbit (cycle through 0,1,2)
  type SkillWithOrbit = Skill & { orbit: number; indexInOrbit: number; orbitSize: number };
  // Assign skills to orbits and calculate their index in orbit
  const orbitSkills: Skill[][] = Array.from({ length: orbitCount }, () => []);
  skills.forEach((skill, i) => {
    orbitSkills[i % orbitCount].push(skill);
  });
  // Build skillsWithOrbit array
  const skillsWithOrbit: SkillWithOrbit[] = [];
  orbitSkills.forEach((arr, orbitIdx) => {
    arr.forEach((skill, idx) => {
      skillsWithOrbit.push({ ...skill, orbit: orbitIdx, indexInOrbit: idx, orbitSize: arr.length });
    });
  });

  // Animate orbit: all skills on 3 orbits, evenly spaced
  return (
    <div className="relative w-full max-w-md h-[400px] mx-auto flex items-center justify-center overflow-visible select-none" style={{paddingTop: '3.5rem'}}>
      {/* Center category */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-700/80 to-zinc-900/80 flex items-center justify-center shadow-2xl border-4 border-indigo-400/40">
          <span className="text-indigo-200 font-bold text-xl select-none text-center px-2">{category.category}</span>
        </div>
      </div>
      {/* Draw 3 orbits only */}
      {orbitRadii.map((r, i) => (
        <div
          key={i}
          className="absolute pointer-events-none"
          style={{
            left: '50%',
            top: '50%',
            width: `${r * 2 + 24}px`,
            height: `${r * 2 + 24}px`,
            marginLeft: `-${r + 12}px`,
            marginTop: `-${r + 12}px`,
            borderRadius: '50%',
            border: `2px solid ${orbitColor}33`,
            boxShadow: `0 0 32px 8px ${orbitColor}33, 0 0 64px 16px ${orbitColor}22`,
            opacity: 0.25,
            zIndex: 0,
            filter: 'blur(0.5px)',
            transition: 'none',
          }}
        />
      ))}
      {/* Orbiting skills */}
      {skillsWithOrbit.map((skill, j) => {
        const r = orbitRadii[skill.orbit];
        const n = skill.orbitSize;
        const idx = skill.indexInOrbit;
        const baseAngle = (idx / n) * 2 * Math.PI;
        const duration = 10 + skill.orbit * 2;
        const skillRef = React.useRef<HTMLDivElement>(null);
        React.useEffect(() => {
          let frame: number;
          let start: number | null = null;
          function animateSkill(ts: number) {
            if (start === null) start = ts;
            const elapsed = ((ts - start) / 1000) % duration;
            const angle = baseAngle + (elapsed / duration) * 2 * Math.PI;
            const tx = Math.cos(angle) * r;
            const ty = Math.sin(angle) * r;
            if (skillRef.current) {
              skillRef.current.style.transform = `translate(-50%, -50%) translate(${tx}px, ${ty}px)`;
            }
            frame = requestAnimationFrame(animateSkill);
          }
          frame = requestAnimationFrame(animateSkill);
          return () => cancelAnimationFrame(frame);
        }, [baseAngle, duration, r]);

        return (
          <div
            key={skill.name}
            ref={skillRef}
            className={
              `absolute flex flex-col items-center transition-[z-index] duration-100 z-30`
            }
            style={{ left: '50%', top: '50%' }}
          >
            <SkillDisplay
              skill={{ name: skill.name, icon: skill.icon, description: skill.description }}
              highlighted={false}
              className="!rounded-full !p-3 !w-16 !h-16"
              style={{ minHeight: 0 }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default OrbitingSkills;
