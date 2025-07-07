"use client";

import { useEffect, useRef } from "react";

interface Star {
  radius: number; // distance from center
  angle: number; // current angle
  speed: number; // angular speed
  size: number; // star size
  color: string; // star color
}

const STAR_COUNT = 150;

// Speed multiplier for all stars (1 = normal, 2 = double speed, etc)
export const STAR_SPEED = 0.8;

function randomColor() {
  // Subtle blue/white/yellow
  const colors = ["#fff", "#ffe9c4", "#b5caff", "#fffbe6"];
  return colors[Math.floor(Math.random() * colors.length)];
}

function createStars(width: number, height: number): Star[] {
  // Use the diagonal as the max radius so stars can reach all corners
  const maxRadius = Math.sqrt(width * width + height * height) / 2;
  return Array.from({ length: STAR_COUNT }, () => ({
    radius: Math.random() * maxRadius * 0.98 + maxRadius * 0.02, // avoid center cluster
    angle: Math.random() * Math.PI * 2,
    speed: (Math.random() * 0.0008 + 0.0002) * (Math.random() > 0.5 ? 1 : -1),
    size: Math.random() * 1.5 + 0.5,
    color: randomColor(),
  }));
}

const StarBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const starsRef = useRef<Star[]>([]);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    starsRef.current = createStars(width, height);

    function handleResize() {
      width = window.innerWidth;
      height = window.innerHeight;
      if (canvasRef.current) {
        canvasRef.current.width = width;
        canvasRef.current.height = height;
      }
      starsRef.current = createStars(width, height);
    }
    window.addEventListener("resize", handleResize);

    function draw() {
      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx) return;
      // Clear for transparency
      ctx.clearRect(0, 0, width, height);
      ctx.globalAlpha = 0.5;
      const cx = width / 2;
      const cy = height / 2;
      for (const star of starsRef.current) {
        // Update angle
        star.angle += star.speed * 16 * STAR_SPEED; // speed up for fast-forward effect, multiplied by STAR_SPEED
        // Calculate position
        const x = cx + Math.cos(star.angle) * star.radius;
        const y = cy + Math.sin(star.angle) * star.radius;
        // Draw star
        ctx.save();
        ctx.shadowColor = star.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(x, y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.fill();
        ctx.restore();
      }
      ctx.globalAlpha = 1.0; // Reset after drawing stars
      animationRef.current = window.requestAnimationFrame(draw);
    }

    // Initial fill: clear for transparency
    ctx.clearRect(0, 0, width, height);
    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) window.cancelAnimationFrame(animationRef.current);
    };
  }, []);

  useEffect(() => {
    // Prevent pull-to-refresh on mobile when at top
    const maybePrevent = (e: TouchEvent) => {
      if (window.scrollY === 0 && e.touches[0].clientY > 0) {
        e.preventDefault();
      }
    };
    document.addEventListener("touchmove", maybePrevent, { passive: false });
    return () => {
      document.removeEventListener("touchmove", maybePrevent);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ display: "block" }}
    />
  );
};

export default StarBackground;
