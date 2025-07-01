import AboutSection from "~/components/sections/AboutSection";
import ContactSection from "~/components/sections/ContactSection";
import HeroSection from "~/components/sections/HeroSection";
import ProjectsSection from "~/components/sections/ProjectsSection";
import SkillsSection from "~/components/sections/SkillsSection";
import ThemeToggle from "~/components/ThemeToggle";
import Navbar from "~/components/ui/Navbar/Navbar";
import StarBackground from "~/components/ui/StarBackground";
import { SectionTransitionWrapper } from "~/components/ui/SectionTransitionWrapper";
import { PetCompanion } from "~/components/PetCompanion";
import { useParams } from "react-router-dom";

export function meta() {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const { id } = useParams();
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Theme toggle */}
      <ThemeToggle />
      {/* Background effects */}
      <StarBackground/>
      {/* Navbar */}
      <Navbar/>
      {/* Main content */}
      <main>
        <SectionTransitionWrapper>
          <HeroSection id="me" />
          <AboutSection id="about" />
          <SkillsSection id="skills" />
          <ProjectsSection id="projects" />
          <ContactSection id="contact" />
        </SectionTransitionWrapper>
      </main>
      {/* Pet Companion */}
      {/* <PetCompanion route={id || "home"} /> */}
      {/* Footer */}
    </div>
  );
}
