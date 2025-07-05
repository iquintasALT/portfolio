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

interface SkillsGridProps {
  skills: SkillCategory[];
  activeCategory?: number;
  className?: string;
}

const SkillsGrid: React.FC<SkillsGridProps> = ({ skills, activeCategory, className = "" }) => {
  // If activeCategory is provided, only show that category
  const categories = typeof activeCategory === 'number' ? [skills[activeCategory]] : skills;
  return (
    <div className={"w-full max-w-4xl mx-auto flex flex-wrap gap-8 justify-center overflow-y-visible max-h-[60vh] " + className}>
      {categories.filter(Boolean).flatMap((cat) =>
        cat.skills.map((skill) => (
          <SkillDisplay key={skill.name} skill={skill} />
        ))
      )}
    </div>
  );
};

export default SkillsGrid;
