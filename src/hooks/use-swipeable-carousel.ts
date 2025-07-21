import { useState } from "react";
import { useSwipeable } from "react-swipeable";

// Custom hook for swipeable carousel logic
export function useSwipeableCarousel(slideCount: number) {
  const [activeSlide, setActiveSlide] = useState(0);
  const handlers = useSwipeable({
    onSwipedLeft: () => setActiveSlide((prev) => Math.min(prev + 1, slideCount - 1)),
    onSwipedRight: () => setActiveSlide((prev) => Math.max(prev - 1, 0)),
    trackMouse: false,
    preventScrollOnSwipe: true,
  });
  return { activeSlide, setActiveSlide, handlers };
}
