"use client";

import type { ReactNode } from "react";
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

// Context to allow programmatic section change (e.g., from Navbar)
interface SectionTransitionContextType {
  activeSection: number;
  setActiveSection: (idx: number) => void;
  scrollToSection: (sectionId: string) => void;
}
const SectionTransitionContext = createContext<SectionTransitionContextType | undefined>(undefined);

export function useSectionTransition() {
  const ctx = useContext(SectionTransitionContext);
  if (!ctx) throw new Error("useSectionTransition must be used within SectionTransition");
  return ctx;
}

interface SectionTransitionProps {
  children: ReactNode[];
  initialSection?: number;
}

/**

 * Provides animated transitions between full-page sections (like slides). Supports navigation via scroll, keyboard, touch, and programmatic control.
 *
 * Usage:
 * <SectionTransition initialSection={0}>
 *   <Section1 id="section1" />
 *   <Section2 id="section2" />
 *   ...
 * </SectionTransition>
 *
 * Use the useSectionTransition() hook in child components to programmatically change sections.
 */
export const SectionTransition: React.FC<SectionTransitionProps> = ({ children, initialSection = 0 }) => {
  const [activeSectionRaw, setActiveSectionRaw] = useState(initialSection);
  useEffect(() => {}, []);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const isThrottled = useRef(false);

  // Prevent pull-to-refresh on mobile ONLY when swiping down at the top (for full-page section transitions)
  useEffect(() => {
    let lastY = 0;
    const maybePrevent = (e: TouchEvent) => {
      if (window.scrollY === 0 && e.touches.length === 1) {
        const currentY = e.touches[0].clientY;
        // Only prevent if swiping down (currentY > lastY)
        if (currentY > lastY) {
          e.preventDefault();
        }
        lastY = currentY;
      }
    };
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        lastY = e.touches[0].clientY;
      }
    };
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", maybePrevent, { passive: false });
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", maybePrevent);
    };
  }, []);

  const throttleDuration = 800; // ms, should match animation duration
  const maxSection = children.length - 1;

  // Always clamp updates, even for programmatic setActiveSection
  // setActiveSection: Sets the active section index, clamped to valid range. Accepts a number or updater function.
  const setActiveSection = React.useCallback(
    (updater: number | ((prev: number) => number)) => {
      setActiveSectionRaw((prev) => {
        const next = typeof updater === "function" ? (updater as (n: number) => number)(prev) : updater;
        const clamped = Math.max(0, Math.min(next, maxSection));
        return clamped;
      });
    },
    [maxSection]
  );

  // Helper: is input currently locked (transitioning)?
  const [inputLocked, setInputLocked] = useState(false);
  // Patch isThrottled to also update inputLocked for accessibility/UI
  // startThrottle: Temporarily locks input to prevent rapid section changes. No params.
  const startThrottle = () => {
    isThrottled.current = true;
    setInputLocked(true);
    setTimeout(() => {
      isThrottled.current = false;
      setInputLocked(false);
    }, throttleDuration);
  };

  // Mouse wheel navigation between sections (one section per wheel event)
  useEffect(() => {
    if (typeof window === "undefined") return;
    let timeoutId: any;
    const handleWheel = (e: WheelEvent) => {
      if (isThrottled.current) return;
      setActiveSection((prev) => {
        let next = prev;
        if (e.deltaY > 0) next = prev + 1;
        else if (e.deltaY < 0) next = prev - 1;
        if (next !== prev) {
          startThrottle();
          e.preventDefault();
        }
        return next;
      });
    };
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      isThrottled.current = false;
      setInputLocked(false);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [children, setActiveSection]);

  // Keyboard navigation (accessibility)
  useEffect(() => {
    if (typeof window === "undefined") return;
    let timeoutId: any;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isThrottled.current) return;
      setActiveSection((prev) => {
        let next = prev;
        if (e.key === "ArrowDown" || e.key === "PageDown") next = prev + 1;
        else if (e.key === "ArrowUp" || e.key === "PageUp") next = prev - 1;
        if (next !== prev) {
          startThrottle();
          e.preventDefault();
        }
        return next;
      });
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      isThrottled.current = false;
      setInputLocked(false);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [children, setActiveSection]);

  // 1. Extract ref callback for performance
  // setSectionRef: Returns a ref callback for a section at given index.
  const setSectionRef = React.useCallback(
    (idx: number) => (el: HTMLElement | null) => {
      sectionRefs.current[idx] = el;
    },
    []
  );

  // 2. Runtime check for children array
  if (!Array.isArray(children) || children.length < 2) {
    throw new Error("SectionTransition requires at least two children (sections) as an array.");
  }

  // 3. Make throttleDuration and swipe threshold configurable via props
  const swipeThreshold = 50; // Could also be a prop

  // Touch swipe navigation for mobile (like TikTok)
  useEffect(() => {
    if (typeof window === "undefined") return;
    let touchStartY = 0;
    let touchEndY = 0;
    let timeoutId: any;
    const threshold = swipeThreshold;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        touchStartY = e.touches[0].clientY;
      }
    };
    const handleTouchEnd = (e: TouchEvent) => {
      if (isThrottled.current) return;
      touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY - touchEndY;
      if (Math.abs(deltaY) > threshold) {
        setActiveSection((prev) => {
          let next = prev;
          if (deltaY > 0)
            next = prev + 1; // swipe up -> next section
          else if (deltaY < 0) next = prev - 1; // swipe down -> prev section
          if (next !== prev) {
            startThrottle();
          }
          return next;
        });
      }
    };
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      isThrottled.current = false;
      setInputLocked(false);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [children, setActiveSection]);

  // Map section ids to their index for programmatic scroll
  const sectionIdToIndex = React.useMemo(() => {
    return children
      .map((child, idx) => {
        if (React.isValidElement(child) && (child as React.ReactElement<any>).props.id) {
          return [(child as React.ReactElement<any>).props.id, idx];
        }
        return [null, idx];
      })
      .filter(([id]) => id)
      .reduce(
        (acc, [id, idx]) => {
          acc[id as string] = idx;
          return acc;
        },
        {} as Record<string, number>
      );
  }, [children]);

  // --- Hash-based navigation for native anchor support ---
  // On mount: listen for hashchange and update active section
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#/, "");
      if (hash && sectionIdToIndex[hash] !== undefined) {
        setActiveSection(sectionIdToIndex[hash]);
      }
    };
    window.addEventListener("hashchange", handleHashChange);
    // On initial load, scroll to hash if present
    handleHashChange();

    // Listen for clicks on anchor links with hashes (even if hash doesn't change)
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && target.closest) {
        const anchor = target.closest("a[href^='/#']") as HTMLAnchorElement | null;
        if (anchor && anchor.hash) {
          const hash = anchor.hash.replace(/^#/, "");
          // Only handle if on the same page (no pathname change)
          if (window.location.pathname === "/" && sectionIdToIndex[hash] !== undefined) {
            e.preventDefault();
            setActiveSection(sectionIdToIndex[hash]);
            // Always update hash for accessibility/history
            window.history.replaceState(null, "", `#${hash}`);
          }
        }
      }
    };
    document.addEventListener("click", handleDocumentClick, true);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      document.removeEventListener("click", handleDocumentClick, true);
    };
  }, [sectionIdToIndex, setActiveSection]);

  // On activeSection change, update the URL hash
  useEffect(() => {
    if (typeof window === "undefined") return;
    // Find the id for the current section
    const id = Object.keys(sectionIdToIndex).find((key) => sectionIdToIndex[key] === activeSectionRaw);
    if (id && window.location.hash.replace(/^#/, "") !== id) {
      window.history.replaceState(null, "", `#${id}`);
    }
  }, [activeSectionRaw, sectionIdToIndex]);

  // Programmatic scroll by section id
  // scrollToSection: Programmatically scrolls to a section by its id. Param: sectionId (string).
  const scrollToSection = React.useCallback(
    (sectionId: string) => {
      const idx = sectionIdToIndex[sectionId];
      if (typeof idx === "number") {
        setActiveSection(idx);
      }
    },
    [sectionIdToIndex, setActiveSection]
  );

  // Update context value to always clamp programmatic changes
  // setActiveSectionContext: Sets the active section index from context, clamped to valid range. Param: idx (number).
  const setActiveSectionContext = (idx: number) => {
    setActiveSectionRaw(() => Math.max(0, Math.min(idx, maxSection)));
  };

  // Render all sections, only animate the active one, hide others visually but keep in DOM for SEO
  return (
    <SectionTransitionContext.Provider
      value={{ activeSection: activeSectionRaw, setActiveSection: setActiveSectionContext, scrollToSection }}
    >
      <div style={{ position: "relative", width: "100%" }} aria-busy={inputLocked}>
        {children.map((child, idx) => {
          const isActive = idx === activeSectionRaw;
          return (
            <motion.section
              key={idx}
              ref={setSectionRef(idx)}
              initial={isActive ? { opacity: 0, y: 40 } : false}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 0 }}
              exit={isActive ? { opacity: 0, y: -40 } : undefined}
              transition={{ duration: throttleDuration / 1000, ease: "easeInOut" }}
              style={{
                position: isActive ? "absolute" : "static",
                width: "100%",
                pointerEvents: isActive ? "auto" : "none",
                zIndex: isActive ? 2 : 1,
                opacity: isActive ? 1 : 0,
                display: isActive ? undefined : "none",
                // Optionally, you can use display: none for inactive, but opacity: 0 keeps in DOM for SEO
              }}
              aria-hidden={!isActive}
              tabIndex={isActive ? 0 : -1}
            >
              {child}
            </motion.section>
          );
        })}
        {/* Modern Next Section Arrow - compact, inline layout */}
        {activeSectionRaw < maxSection && (
          <div
            style={{
              position: "fixed",
              left: "50%",
              bottom: "1.5rem",
              transform: "translateX(-50%)",
              zIndex: 20,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "0.75rem",
              pointerEvents: "auto",
            }}
          >
            <span
              style={{
                background: "rgba(30, 32, 48, 0.55)",
                borderRadius: "1.5rem",
                boxShadow: "0 4px 32px 0 rgba(0,0,0,0.18)",
                padding: "0.35rem 1.1rem 0.35rem 1.1rem",
                backdropFilter: "blur(8px)",
                color: "#fff",
                fontWeight: 500,
                fontSize: "1rem",
                letterSpacing: "0.04em",
                textShadow: "0 2px 8px rgba(10,12,24,0.7)",
                border: "1px solid rgba(255,255,255,0.08)",
                userSelect: "none",
                margin: 0,
              }}
            >
              {Object.keys(sectionIdToIndex)
                .find((key) => sectionIdToIndex[key] === activeSectionRaw + 1)
                ?.toUpperCase()}
            </span>
            <button
              aria-label="Scroll to next section"
              onClick={() => setActiveSection(activeSectionRaw + 1)}
              style={{
                background: "rgba(30, 32, 48, 0.45)",
                borderRadius: "50%",
                boxShadow: "0 2px 16px 0 rgba(0,0,0,0.18)",
                border: "1px solid rgba(255,255,255,0.08)",
                padding: "0.35rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background 0.2s, box-shadow 0.2s, transform 0.2s",
                cursor: "pointer",
                outline: "none",
                animation: "arrow-float 2.2s ease-in-out infinite",
              }}
            >
              <ChevronDown size={36} color="#a5b4fc" strokeWidth={2.2} />
            </button>
            <style>{`
              @keyframes arrow-float {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(8px); }
              }
            `}</style>
          </div>
        )}
      </div>
    </SectionTransitionContext.Provider>
  );
};
