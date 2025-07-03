import React from "react";
import { motion } from "framer-motion";
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


interface SkillsMicroInteractionsProps {
  skills: SkillCategory[];
  activeCategory?: number;
}

const SkillsMicroInteractions: React.FC<SkillsMicroInteractionsProps> = ({ skills, activeCategory }) => {
  // If activeCategory is provided, only show that category
  const categories = typeof activeCategory === 'number' ? [skills[activeCategory]] : skills;
  return (
    <div className="w-full max-w-4xl mx-auto flex flex-wrap gap-8 justify-center overflow-y-auto max-h-[60vh]">
      {categories.filter(Boolean).flatMap((cat) =>
        cat.skills.map((skill) => (
          <motion.div
            key={skill.name}
            whileHover={{ scale: 1.1, boxShadow: "0 0 24px #6366f1" }}
            className="relative group bg-zinc-900/80 border border-zinc-700 rounded-2xl p-6 flex flex-col items-center shadow-lg w-40 min-h-[160px] transition-all cursor-pointer"
          >
            {/* Icon with fallback */}
            <img
              src={skill.icon}
              alt={skill.name}
              className="w-10 h-10 mb-2"
              onError={e => {
                const target = e.currentTarget;
                target.onerror = null;
                target.style.display = 'none';
                const sibling = target.nextElementSibling;
                if (sibling && sibling.classList.contains('micro-fallback')) sibling.classList.remove('hidden');
              }}
            />
            <HelpCircle className="w-10 h-10 mb-2 text-zinc-500 micro-fallback hidden" aria-label="placeholder icon" />
            <div className="font-bold text-base text-indigo-300 mb-1">{skill.name}</div>
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-zinc-800 text-zinc-200 text-xs rounded-lg px-3 py-2 opacity-0 group-hover:opacity-100 pointer-events-none transition-all shadow-lg z-20">
              <div className="font-semibold text-indigo-400 mb-1">{skill.name}</div>
              <div>{skill.description}</div>
            </div>
          </motion.div>
        ))
      )}
    </div>
  );
};

export default SkillsMicroInteractions;
