import React, { useEffect, useState } from "react";

interface PetCompanionProps {
  route: string;
}

const petMessages: Record<string, string> = {
  home: "Welcome home! Let's have some fun!",
  about: "Did you know? I love learning about you!",
  skills: "Skills are like treats. Collect them all!",
  projects: "Check out these cool projects!",
  contact: "Don't be shy, say hi!",
  default: "I'm here to keep you company!"
};

export const PetCompanion: React.FC<PetCompanionProps> = ({ route }) => {
  const [displayed, setDisplayed] = useState("");
  const [index, setIndex] = useState(0);
  const message = petMessages[route] || petMessages.default;

  useEffect(() => {
    setDisplayed("");
    setIndex(0);
  }, [route]);

  useEffect(() => {
    if (index < message.length) {
      const timeout = setTimeout(() => {
        setDisplayed((prev) => prev + message[index]);
        setIndex((i) => i + 1);
      }, 80); // Slower speed
      return () => clearTimeout(timeout);
    }
  }, [index, message]);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      {/* Pet image/emoji placeholder */}
      <div className="text-5xl mb-2 animate-bounce">🐾</div>
      {/* Dialogue box */}
      <div className="bg-white dark:bg-neutral-800 text-black dark:text-white rounded-lg shadow-lg px-4 py-2 max-w-xs min-h-[48px] border border-[hsl(var(--border))]">
        {Array.from(displayed).map((char, i) => (
          <span
            key={i}
            className="inline-block animate-pop"
            style={{ animationDelay: `${i * 0.04}s` }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes pop {
          0% { transform: scale(0.7); opacity: 0; }
          60% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(1); }
        }
        .animate-pop {
          animation: pop 0.3s cubic-bezier(.68,-0.55,.27,1.55) both;
        }
      `}</style>
    </div>
  );
};
