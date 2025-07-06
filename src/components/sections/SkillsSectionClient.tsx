"use client";
import React, { useRef, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SkillsGrid from "../SkillsGrid";
import OrbitingSkills from "../OrbitingSkills";
import { useSwipeableCarousel, SwipeIndicator } from "../ui/useSwipeableCarousel";

interface Skill {
  name: string;
  icon: string;
  description: string;
}
type SkillCategory = {
  category: string;
  skills: Skill[];
};
interface SkillsSectionClientProps {
  id: string;
  skills: SkillCategory[];
}

export default function SkillsSectionClient({ id, skills }: SkillsSectionClientProps) {
  const [layout, setLayout] = useState<'micro' | 'orbit'>('micro');
  const prevSlideRef = useRef(0);
  const { activeSlide, setActiveSlide, handlers } = useSwipeableCarousel(skills.length);
  const [direction, setDirection] = useState<'left' | 'right'>('left');

  useEffect(() => {
    prevSlideRef.current = activeSlide;
  }, [activeSlide]);

  const swipeHandlers = { ...handlers };
  const handleSetActiveSlide = (newIndex: number, dir: 'left' | 'right') => {
    setDirection(dir);
    setActiveSlide(newIndex);
  };
  const LAYOUTS = [
    { key: 'micro', label: 'Grid', icon: '🔲' },
    { key: 'orbit', label: 'Orbit', icon: '🪐' },
  ];

  return (
    <section id={id} className="flex flex-col items-center overflow-hidden justify-start pt-20 min-h-screen px-2">
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
        {layout === 'micro' ? (
          <div className="w-full max-w-md relative overflow-visible" {...swipeHandlers}>
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
                    >
                      <div className="flex flex-col items-center w-full">
                        <div className="w-full flex items-center gap-2 mb-3">
                          <span className="text-lg sm:text-xl font-bold text-indigo-300 tracking-wide drop-shadow-md pl-1">{skills[activeSlide].category}</span>
                          <span className="flex-1 border-b border-zinc-800/60 ml-2" />
                        </div>
                        {skills[activeSlide] && (
                          <SkillsGrid skills={[skills[activeSlide]]} className="[&_.SkillDisplay]:w-16 [&_.SkillDisplay]:h-16 [&_.SkillDisplay]:p-2 [&_.SkillDisplay_img]:w-7 [&_.SkillDisplay_img]:h-7" />
                        )}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
                {/* SwipeIndicator moved below the container */}
                <div className="mt-2 flex justify-center">
                  <SwipeIndicator activeSlide={activeSlide} slideCount={skills.length} />
                </div>
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
                      {skills[activeSlide] && <OrbitingSkills category={skills[activeSlide]} />}
                    </motion.div>
                  </AnimatePresence>
                </div>
                {/* SwipeIndicator moved below the container */}
                <div className="mt-2 flex justify-center">
                  <SwipeIndicator activeSlide={activeSlide} slideCount={skills.length} />
                </div>
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
    </section>
  );
}
