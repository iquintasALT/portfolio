import { useEffect, useRef, useState } from "react";

interface Star {
  id: number;
  size: number;
  x: number;
  y: number;
  opacity: number;
  animationDuration: number;
}

const StarBackground = () => {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const win = (typeof window !== "undefined") ? (globalThis as any).window : undefined;
    if (!win) return;
    const generateStars = () => {
      const numberOfStars = Math.floor(win.innerWidth * win.innerHeight / 10000);
      const newStars: Star[] = [];
      for (let i = 0; i < numberOfStars; ++i) {
        newStars.push({
          id: i,
          size: Math.random() * 3 + 1,
          x: Math.random() * 100,
          y: Math.random() * 100,
          opacity: Math.random() * 0.5 + 0.5,
          animationDuration: Math.random() * 4 + 2,
        });
      }
      setStars(newStars);
    };
    generateStars();
    win.addEventListener("resize", generateStars);
    return () => win.removeEventListener("resize", generateStars);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star animate-pulse-subtle"
          style={{
            width: star.size + "px",
            height: star.size + "px",
            left: star.x + "%",
            top: star.y + "%",
            opacity: star.opacity,
            animationDuration: star.animationDuration + "s",
            position: "absolute",
          }}
        />
      ))}
    </div>
  );
};

export default StarBackground;