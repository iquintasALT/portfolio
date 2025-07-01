import { useSectionTransition } from "../ui/SectionTransitionWrapper";
import { Typewriter } from "react-simple-typewriter";

interface SectionProps {
  id: string;
}

const HeroSection: React.FC<SectionProps> = ({ id }) => {
  const { scrollToSection } = useSectionTransition();
  return (
    <section
      id={id}
      className="relative min-h-screen flex flex-col items-center justify-center px-4"
    >
      <div className="container max-w-4xl mx-auto text-center z-10">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            <span className="opacity-0 animate-fade-in"> Hi, I'm</span>
            <span className="text-primary opacity-0 animate-fade-in-delay-1">
              {" "}
              Iago
            </span>
            <span className="text-gradient ml-2 opacity-0 animate-fade-in-delay-1">
              {" "}
              Quintas
            </span>
          </h1>

          <h2 className="text-2xl md:text-3xl font-semibold mt-4 opacity-0 animate-fade-in-delay-2">
            I build{" "}
            <span className="text-primary font-bold">
              <Typewriter
                words={[
                  "Websites",
                  "Games",
                  "APIs",
                  "Experiences",
                  "Tools",
                  "Apps",
                ]}
                loop={0}
                cursor
                cursorStyle="|"
                typeSpeed={100}
                deleteSpeed={50}
                delaySpeed={2000}
              />
            </span>
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground max-2-2xl mx-auto opacity-0 animate-fade-in-delay-3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>

          <div className="pt-4 opacity-0 animate-fade-in-delay-4">
            <button
              className="star-button"
              onClick={() => scrollToSection("projects")}
              type="button"
            >
              View my work
            </button>
          </div>
        </div>
      </div>

      {/* Removed the old arrow/label, now handled by SectionTransitionWrapper */}
    </section>
  );
};

export default HeroSection;
