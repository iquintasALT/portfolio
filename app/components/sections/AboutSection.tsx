import { Code, User } from "lucide-react";

import FeatureCard from "~/components/ui/FeatureCard";
import { cn } from "~/lib/helpers";

const AboutSection = () => {
  return (
    <section id="about" className="flex items-center justify-center min-h-screen">
      {" "}
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          About <span className="text-primary"> Me</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">
              Passionate Web & Game Developer
            </h3>

            <p className="text-muted-foreground">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

            </p>

            <p className="text-muted-foreground">
               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
              <a href="#contact" className="star-button">
                {" "}
                Get In Touch
              </a>

              <a
                href=""
                className={cn(
                  "px-6 py-2 rounded-full border border-primary text-primary",
                  "hover:bg-primary/50 transition-colors duration-300"
                )}
              >
                Download CV
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <FeatureCard icon={Code} title="Web Development" description="Using React, Redux and the most efficient best practices" />
            <FeatureCard icon={User} title="Game Development" description="Worked on 3 big projects in the first 3 years of my career"/>
            <FeatureCard icon={Code} title="Still Learning" description="Keeping myself updated with newer courses and state of the art tools"/>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
