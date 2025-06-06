import { ChevronDown } from "lucide-react";

const HeroSection = () => {
  return (
    <section
      id="me"
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

          <p className="text-lg md:text-xl text-muted-foreground max-2-2xl mx-auto opacity-0 animate-fade-in-delay-3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

          </p>

          <div className="pt-4 opacity-0 animate-fade-in-delay-4">
            <a href="#projects" className="star-button">
              View my work
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
      <span>PROJECTS</span>
      <ChevronDown className="h-40 w-40 text-primary"/>
      </div>
    </section>
  );
};

export default HeroSection;
