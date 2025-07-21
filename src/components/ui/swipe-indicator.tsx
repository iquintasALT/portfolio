import React from "react";

// Indicator bar component for swipeable carousels
export function SwipeIndicator({ activeSlide, slideCount }: { activeSlide: number; slideCount: number }) {
  return (
    <div className="flex justify-center gap-2 absolute left-0 right-0" style={{ bottom: 0 }}>
      {Array.from({ length: slideCount }).map((_, idx) => (
        <span
          key={idx}
          style={{
            display: "inline-block",
            width: 32,
            height: 4,
            borderRadius: 2,
            background: activeSlide === idx ? "#7c3aed" : "#e5e7eb",
            transition: "background 0.3s",
          }}
        />
      ))}
    </div>
  );
}
