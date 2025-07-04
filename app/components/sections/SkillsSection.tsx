
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSectionTransition } from "../ui/SectionTransitionWrapper";
import SkillsGrid from "../SkillsGrid";
import OrbitingSkills from "../OrbitingSkills";
import { useSwipeableCarousel, SwipeIndicator } from "../ui/useSwipeableCarousel";

interface SectionProps {
  id: string;
}

interface Skill {
  name: string;
  icon: string;
  description: string;
}
interface SkillCategory {
  category: string;
  skills: Skill[];
}



const fetchSkills = async (): Promise<SkillCategory[]> => {
  const res = await fetch("/data/skills.json");
  return res.json();
};

const getSizeClass = (count: number) => {
  if (count <= 3) return "text-3xl sm:text-5xl";
  if (count <= 6) return "text-2xl sm:text-3xl";
  if (count <= 10) return "text-xl sm:text-2xl";
  return "text-lg sm:text-xl";
};

const SkillsSection: React.FC<SectionProps> = ({ id }) => {
  const { scrollToSection } = useSectionTransition();
  const [skills, setSkills] = useState<SkillCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [layout, setLayout] = useState<'micro' | 'orbit'>('micro');


  useEffect(() => {
    fetchSkills().then((data) => {
      if (Array.isArray(data)) {
        setSkills(data);
      } else if (data && typeof data === 'object') {
        setSkills([data]);
      } else {
        setSkills([]);
      }
      setLoading(false);
    });
  }, []);


  // --- Main render ---
  const prevSlideRef = React.useRef(0);
  const { activeSlide, setActiveSlide, handlers } = useSwipeableCarousel(skills.length);
  const [direction, setDirection] = React.useState<'left' | 'right'>('left');

  // Always track previous slide index
  React.useEffect(() => {
    prevSlideRef.current = activeSlide;
  }, [activeSlide]);

  // Patch handlers for swipes (no need to set direction here)
  const swipeHandlers = { ...handlers };

  // For button navigation, set direction and slide
  const handleSetActiveSlide = (newIndex: number, dir: 'left' | 'right') => {
    setDirection(dir);
    setActiveSlide(newIndex);
  };
  const LAYOUTS = [
    { key: 'micro', label: 'Grid', icon: '🔲' },
    { key: 'orbit', label: 'Orbit', icon: '🪐' },
  ];

  return (
    <section className="flex flex-col items-center overflow-hidden justify-start pt-20 min-h-screen px-2" id={id}>
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center gap-8">
        <div className="flex flex-row items-center gap-4 w-full justify-center mb-2 mt-0 sm:mt-2" style={{ minHeight: '64px' }}>
          <div className="flex items-center">
            <h2 className="text-3xl md:text-4xl font-bold text-center m-0">
              My <span className="text-primary">Skills</span>
            </h2>
          </div>
          <div className="flex gap-2 items-center ml-2">
            {LAYOUTS.map(opt => (
              <button
                key={opt.key}
                className={`px-4 py-2 rounded-lg font-semibold transition-all border-2 text-base flex items-center gap-2 ${layout === opt.key ? 'bg-indigo-600/80 border-indigo-400 text-white' : 'bg-zinc-900 border-zinc-700 text-indigo-200 hover:bg-indigo-800/40'}`}
                onClick={() => setLayout(opt.key as 'micro' | 'orbit')}
                type="button"
                aria-pressed={layout === opt.key}
              >
                <span>{opt.icon}</span> {opt.label}
              </button>
            ))}
          </div>
        </div>
        {loading ? (
          <div className="text-zinc-400 text-lg animate-pulse">Loading skills...</div>
        ) : (
          <div className="w-full flex flex-col items-center">
            {layout === 'micro' ? (
              <div className="w-full max-w-md relative overflow-visible" {...swipeHandlers}>
                {/* AnimatePresence for swipe transitions */}
                {skills[activeSlide] && (
                  <React.Fragment>
                    <div className="relative min-h-[320px] sm:min-h-[340px]">
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                          key={activeSlide}
                          initial={{ x: direction === 'left' ? 100 : -100, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          exit={{ x: direction === 'left' ? -100 : 100, opacity: 0 }}
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                          className="absolute left-0 top-0 w-full"
                        >
                          <div className="flex flex-col items-center w-full">
                            <div className="w-full flex items-center gap-2 mb-3">
                              <span className="text-lg sm:text-xl font-bold text-indigo-300 tracking-wide drop-shadow-md pl-1">{skills[activeSlide].category}</span>
                              <span className="flex-1 border-b border-zinc-800/60 ml-2" />
                            </div>
                            <SkillsGrid skills={[skills[activeSlide]]} className="[&_.SkillDisplay]:w-16 [&_.SkillDisplay]:h-16 [&_.SkillDisplay]:p-2 [&_.SkillDisplay_img]:w-7 [&_.SkillDisplay_img]:h-7" />
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                    <SwipeIndicator activeSlide={activeSlide} slideCount={skills.length} />
                    <div className="flex justify-center gap-4 mt-2">
                      <button
                        className="bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700 rounded-full p-2 shadow-lg z-20 flex items-center justify-center w-11 h-11 disabled:opacity-40 disabled:cursor-not-allowed"
                        onClick={() => {
                          handleSetActiveSlide(Math.max(activeSlide - 1, 0), 'right');
                        }}
                        disabled={activeSlide === 0}
                        aria-label="Previous category"
                      >
                        <span className="sr-only">Previous</span>
                        <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>
                      </button>
                      <button
                        className="bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700 rounded-full p-2 shadow-lg z-20 flex items-center justify-center w-11 h-11 disabled:opacity-40 disabled:cursor-not-allowed"
                        onClick={() => {
                          handleSetActiveSlide(Math.min(activeSlide + 1, skills.length - 1), 'left');
                        }}
                        disabled={activeSlide === skills.length - 1}
                        aria-label="Next category"
                      >
                        <span className="sr-only">Next</span>
                        <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
                      </button>
                    </div>
                  </React.Fragment>
                )}
              </div>
            ) : (
              <div className="w-full max-w-md relative overflow-visible" {...swipeHandlers}>
                {/* AnimatePresence for swipe transitions */}
                {skills[activeSlide] && (
                  <React.Fragment>
                    <div className="relative min-h-[400px]">
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                          key={activeSlide}
                          initial={{ x: direction === 'left' ? 100 : -100, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          exit={{ x: direction === 'left' ? -100 : 100, opacity: 0 }}
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                          className="absolute left-0 top-0 w-full"
                        >
                          <OrbitingSkills category={skills[activeSlide]} />
                        </motion.div>
                      </AnimatePresence>
                    </div>
                    <SwipeIndicator activeSlide={activeSlide} slideCount={skills.length} />
                    <div className="flex justify-center gap-4 mt-2">
                      <button
                        className="bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700 rounded-full p-2 shadow-lg z-20 flex items-center justify-center w-11 h-11 disabled:opacity-40 disabled:cursor-not-allowed"
                        onClick={() => {
                          handleSetActiveSlide(Math.max(activeSlide - 1, 0), 'right');
                        }}
                        disabled={activeSlide === 0}
                        aria-label="Previous category"
                      >
                        <span className="sr-only">Previous</span>
                        <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>
                      </button>
                      <button
                        className="bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700 rounded-full p-2 shadow-lg z-20 flex items-center justify-center w-11 h-11 disabled:opacity-40 disabled:cursor-not-allowed"
                        onClick={() => {
                          handleSetActiveSlide(Math.min(activeSlide + 1, skills.length - 1), 'left');
                        }}
                        disabled={activeSlide === skills.length - 1}
                        aria-label="Next category"
                      >
                        <span className="sr-only">Next</span>
                        <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
                      </button>
                    </div>
                  </React.Fragment>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default SkillsSection;