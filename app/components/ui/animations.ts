import { motion } from "framer-motion";

export const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
};

export const glassCard =
  "backdrop-blur-md bg-[hsla(var(--card),0.7)] border border-[hsl(var(--border))] shadow-xl";
