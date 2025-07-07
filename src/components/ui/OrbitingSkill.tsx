import React from "react";

import SkillDisplay from "../ui/SkillDisplay";

export type SkillWithOrbit = {
  name: string;
  icon: string;
  description: string;
  orbit: number;
  indexInOrbit: number;
  orbitSize: number;
};

export interface OrbitingSkillProps {
  skill: SkillWithOrbit;
  r: number;
}

const OrbitingSkill: React.FC<OrbitingSkillProps> = ({ skill, r }) => {
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
    <div ref={skillRef} className="absolute flex flex-col items-center" style={{ left: "50%", top: "50%" }}>
      <SkillDisplay
        skill={{ name: skill.name, icon: skill.icon, description: skill.description }}
        highlighted={false}
        className="!rounded-full !p-3 !w-16 !h-16"
        style={{ minHeight: 0 }}
      />
    </div>
  );
};

export default OrbitingSkill;
