import React from "react";
import { useSwipeable } from "react-swipeable";

// Indicator bar component for swipeable carousels
export function SwipeIndicator({ activeSlide, slideCount }: { activeSlide: number; slideCount: number }) {
  return React.createElement(
    "div",
    { className: "flex justify-center gap-2 absolute left-0 right-0", style: { bottom: 0 } },
    Array.from({ length: slideCount }).map((_, idx) =>
      React.createElement("span", {
        key: idx,
        style: {
          display: "inline-block",
          width: 32,
          height: 4,
          borderRadius: 2,
          background: activeSlide === idx ? "#7c3aed" : "#e5e7eb",
          transition: "background 0.3s",
        },
      })
    )
  );
}

// Custom hook for swipeable carousel logic
export function useSwipeableCarousel(slideCount: number) {
  const [activeSlide, setActiveSlide] = React.useState(0);
  const handlers = useSwipeable({
    onSwipedLeft: () => setActiveSlide((prev) => Math.min(prev + 1, slideCount - 1)),
    onSwipedRight: () => setActiveSlide((prev) => Math.max(prev - 1, 0)),
    trackMouse: false,
    preventScrollOnSwipe: true,
  });
  return { activeSlide, setActiveSlide, handlers };
}
