'use client'
import React from "react";
import { Code, User } from "lucide-react";
import { cn } from "~/lib/helpers";
import { useSectionTransition } from "../ui/SectionTransitionWrapper";
import { useSwipeableCarousel, SwipeIndicator } from "../ui/useSwipeableCarousel";
import FeatureCard from "~/components/ui/FeatureCard";
import texts from "@content/texts.json";

interface SectionProps {
  id: string;
}

const AboutSection: React.FC<SectionProps> = ({ id }) => {
  const { scrollToSection } = useSectionTransition();
  const { activeSlide, setActiveSlide, handlers } = useSwipeableCarousel(2);

  // Responsive: use grid on md+, carousel on mobile
  return (
    <section id={id} className="flex items-center justify-center min-h-screen">
      <div className="container mx-auto max-w-5xl hidden md:block">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          {texts.about.title} <span className="text-primary">{texts.about.titleHighlight}</span>
        </h2>

        {/* Desktop: grid, Mobile: carousel */}
        <div className="hidden md:grid grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">
              {texts.about.subtitle}
            </h3>
            {texts.about.paragraphs.map((p, i) => (
              <p className="text-muted-foreground" key={i}>{p}</p>
            ))}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
              <button
                className="star-button"
                onClick={() => scrollToSection("contact")}
                type="button"
              >
                {texts.about.cta}
              </button>
              <a
                href=""
                className={cn(
                  "px-6 py-2 rounded-full border border-primary text-primary",
                  "hover:bg-primary/50 transition-colors duration-300"
                )}
              >
                {texts.about.cv}
              </a>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6">
            <FeatureCard
              icon={Code}
              title={texts.about.features[0].title}
              description={texts.about.features[0].description}
            />
            <FeatureCard
              icon={User}
              title={texts.about.features[1].title}
              description={texts.about.features[1].description}
            />
            <FeatureCard
              icon={Code}
              title={texts.about.features[2].title}
              description={texts.about.features[2].description}
            />
          </div>
        </div>
      </div>
      {/* Mobile: swipeable carousel, full viewport width */}
      <div className="md:hidden w-screen max-w-none px-0 relative overflow-hidden" style={{ margin: 0 }} {...handlers}>
        <div
          style={{
            display: "flex",
            transition: "transform 0.7s cubic-bezier(.4,2,.6,1)",
            transform: `translateX(-${activeSlide * 100}vw)`,
            width: "200vw",
          }}
        >
          <div style={{ width: "100vw", minWidth: 0, boxSizing: "border-box", display: "flex", justifyContent: "center", padding: "0 20px" }}>
            <div className="space-y-6" style={{ width: "100%", maxWidth: 400 }}>
              <h3 className="text-2xl font-semibold">
                {texts.about.subtitle}
              </h3>
              {texts.about.paragraphs.map((p, i) => (
                <p className="text-muted-foreground" key={i}>{p}</p>
              ))}
              <div className="flex flex-col gap-4 pt-4 justify-center items-center w-full">
                <button
                  className="star-button w-full"
                  onClick={() => scrollToSection("contact")}
                  type="button"
                >
                  {texts.about.cta}
                </button>
                <a
                  href=""
                  className={cn(
                    "px-6 py-2 rounded-full border border-primary text-primary w-full",
                    "hover:bg-primary/50 transition-colors duration-300"
                  )}
                  style={{ textAlign: "center" }}
                >
                  {texts.about.cv}
                </a>
              </div>
            </div>
          </div>
          <div style={{ width: "100vw", minWidth: 0, boxSizing: "border-box", display: "flex", justifyContent: "center", padding: "0 20px" }}>
            <div className="grid grid-cols-1 gap-6" style={{ width: "100%", maxWidth: 400 }}>
              <FeatureCard
                icon={Code}
                title={texts.about.features[0].title}
                description={texts.about.features[0].description}
              />
              <FeatureCard
                icon={User}
                title={texts.about.features[1].title}
                description={texts.about.features[1].description}
              />
              <FeatureCard
                icon={Code}
                title={texts.about.features[2].title}
                description={texts.about.features[2].description}
              />
            </div>
          </div>
        </div>
        <SwipeIndicator activeSlide={activeSlide} slideCount={2} />
      </div>
    </section>
  );
};

export default AboutSection;
