import AboutSection from "@/components/sections/about-section";
import ContactSection from "@/components/sections/contact-section";
import HeroSection from "@/components/sections/hero-section";
import SectionTransition from "@/components/sections/section-transition-client";
import ProjectsSection from "@/features/projects/components/projects-section-server";
import SkillsSection from "@/features/skills/components/skills-section-server";

export default function Page() {
  return (
    <main>
      <SectionTransition>
        <HeroSection id="me" />
        <AboutSection id="about" />
        <section id="skills">
          <SkillsSection id="skills" />
        </section>
        <section id="projects">
          <ProjectsSection id="projects" />
        </section>
        <ContactSection id="contact" />
      </SectionTransition>
    </main>
  );
}
